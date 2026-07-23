export const LAYOUT_CANVAS = { width: 430, height: 932 } as const
export const LAYOUT_SCHEMA_VERSION = 1 as const
const HISTORY_LIMIT = 20
const PERSONAL_KEYS = /^(name|contact|birthday|answer|email|phone|note)s?$/i
const STORAGE_KEY = 'encounter-layout-v24'

export type LayoutScreen = 'setup' | 'game' | 'keepsake'

export interface LayoutBlock {
  x: number
  y: number
  width: number
  height: number
  fontScale: number
  padding: number
  z: number
}

export interface LayoutDocument {
  schemaVersion: typeof LAYOUT_SCHEMA_VERSION
  canvas: typeof LAYOUT_CANVAS
  screens: Record<LayoutScreen, Record<string, LayoutBlock>>
}

export interface LayoutHistory {
  past: LayoutDocument[]
  present: LayoutDocument
  future: LayoutDocument[]
}

const block = (x: number, y: number, width: number, height: number, z = 1): LayoutBlock => ({
  x, y, width, height, fontScale: 1, padding: 0, z,
})

export const DEFAULT_LAYOUT: LayoutDocument = {
  schemaVersion: LAYOUT_SCHEMA_VERSION,
  canvas: LAYOUT_CANVAS,
  screens: {
    setup: {
      header: block(0, 0, 430, 62, 5),
      hero: block(18, 72, 394, 132),
      fields: block(22, 214, 386, 170),
      levels: block(22, 392, 386, 96),
      modes: block(22, 498, 386, 152),
      begin: block(22, 852, 386, 62, 6),
    },
    game: {
      header: block(0, 0, 430, 62, 5),
      toolbar: block(16, 68, 398, 42, 4),
      card: block(14, 116, 402, 562, 3),
      actions: block(14, 858, 402, 58, 6),
    },
    keepsake: {
      card: block(14, 68, 402, 562, 2),
      header: block(25, 76, 380, 64, 3),
      artwork: block(25, 142, 380, 300, 3),
      question: block(25, 446, 380, 82, 3),
      blessing: block(25, 532, 380, 40, 3),
      exchange: block(25, 576, 380, 48, 3),
      actions: block(14, 858, 402, 58, 6),
    },
  },
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Number.isFinite(value) ? value : min))
const round = (value: number) => Math.round(value * 100) / 100

export function normalizeBlock(candidate: LayoutBlock): LayoutBlock {
  const width = round(clamp(candidate.width, 60, LAYOUT_CANVAS.width))
  const height = round(clamp(candidate.height, 40, LAYOUT_CANVAS.height))
  return {
    x: round(clamp(candidate.x, 0, LAYOUT_CANVAS.width - width)),
    y: round(clamp(candidate.y, 0, LAYOUT_CANVAS.height - height)),
    width,
    height,
    fontScale: round(clamp(candidate.fontScale, .65, 2)),
    padding: round(clamp(candidate.padding, 0, 48)),
    z: Math.round(clamp(candidate.z, 0, 20)),
  }
}

function clone(document: LayoutDocument): LayoutDocument {
  return structuredClone(document)
}

function assertNoPersonalKeys(value: unknown): void {
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    if (PERSONAL_KEYS.test(key)) throw new Error(`Layout JSON contains forbidden personal data key: ${key}`)
    assertNoPersonalKeys(child)
  }
}

function normalizeDocument(candidate: unknown): LayoutDocument {
  if (!candidate || typeof candidate !== 'object') throw new Error('Layout JSON must be an object')
  assertNoPersonalKeys(candidate)
  const input = candidate as Partial<LayoutDocument>
  if (input.schemaVersion !== LAYOUT_SCHEMA_VERSION) throw new Error('Unsupported layout schema version')
  if (!input.screens || typeof input.screens !== 'object') throw new Error('Layout screens are missing')
  const output = clone(DEFAULT_LAYOUT)
  for (const screen of Object.keys(DEFAULT_LAYOUT.screens) as LayoutScreen[]) {
    const incoming = input.screens[screen]
    if (!incoming || typeof incoming !== 'object') throw new Error(`Layout screen is missing: ${screen}`)
    for (const id of Object.keys(DEFAULT_LAYOUT.screens[screen])) {
      const value = incoming[id]
      if (!value || typeof value !== 'object') throw new Error(`Layout block is missing: ${screen}.${id}`)
      output.screens[screen][id] = normalizeBlock(value)
    }
  }
  return output
}

export function serializeLayout(document: LayoutDocument): string {
  return JSON.stringify(normalizeDocument(document), null, 2)
}

export function importLayout(json: string): LayoutDocument {
  let parsed: unknown
  try { parsed = JSON.parse(json) } catch { throw new Error('Layout JSON is invalid') }
  return normalizeDocument(parsed)
}

export function createLayoutHistory(document = DEFAULT_LAYOUT): LayoutHistory {
  return { past: [], present: clone(document), future: [] }
}

export function applyLayoutChange(history: LayoutHistory, screen: LayoutScreen, id: string, patch: Partial<LayoutBlock>): LayoutHistory {
  const current = history.present.screens[screen][id]
  if (!current) return history
  const next = clone(history.present)
  next.screens[screen][id] = normalizeBlock({ ...current, ...patch })
  return { past: [...history.past, clone(history.present)].slice(-HISTORY_LIMIT), present: next, future: [] }
}

export function undoLayout(history: LayoutHistory): LayoutHistory {
  const previous = history.past.at(-1)
  if (!previous) return history
  return { past: history.past.slice(0, -1), present: clone(previous), future: [clone(history.present), ...history.future].slice(0, HISTORY_LIMIT) }
}

export function redoLayout(history: LayoutHistory): LayoutHistory {
  const next = history.future[0]
  if (!next) return history
  return { past: [...history.past, clone(history.present)].slice(-HISTORY_LIMIT), present: clone(next), future: history.future.slice(1) }
}

export function resetLayoutScreen(history: LayoutHistory, screen: LayoutScreen): LayoutHistory {
  const next = clone(history.present)
  next.screens[screen] = clone(DEFAULT_LAYOUT).screens[screen]
  return { past: [...history.past, clone(history.present)].slice(-HISTORY_LIMIT), present: next, future: [] }
}

export function resetAllLayouts(history: LayoutHistory): LayoutHistory {
  return { past: [...history.past, clone(history.present)].slice(-HISTORY_LIMIT), present: clone(DEFAULT_LAYOUT), future: [] }
}

export function loadStoredLayout(storage: Pick<Storage, 'getItem'> = localStorage): LayoutDocument {
  const saved = storage.getItem(STORAGE_KEY)
  if (!saved) return clone(DEFAULT_LAYOUT)
  try { return importLayout(saved) } catch { return clone(DEFAULT_LAYOUT) }
}

export function saveStoredLayout(document: LayoutDocument, storage: Pick<Storage, 'setItem'> = localStorage): void {
  storage.setItem(STORAGE_KEY, serializeLayout(document))
}
