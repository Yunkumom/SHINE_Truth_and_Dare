export interface ArtworkPresentation {
  offsetX: number
  offsetY: number
  zoom: number
}

export interface BlessingPresentation {
  fontScale: number
  lineHeight: number
  height: number
  padding: number
  offsetX: number
  offsetY: number
}

export interface QuestionPresentation {
  fontScale: number
}

export interface PresentationDocument {
  schemaVersion: 1
  artworkById: Record<string, ArtworkPresentation>
  artworkHeight: number
  question: QuestionPresentation
  blessing: BlessingPresentation
}

export const PRESENTATION_STORAGE_KEY = 'encounter-presentation-v34'
const FORBIDDEN_PERSONAL_KEY = /(?:name|contact|birthday|answer|note|adult|phone|email)/i
const clamp = (value: unknown, fallback: number, min: number, max: number) => {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? Math.max(min, Math.min(max, numeric)) : fallback
}

export const DEFAULT_ARTWORK_PRESENTATION: ArtworkPresentation = { offsetX: 0, offsetY: 0, zoom: 1 }
export const DEFAULT_PRESENTATION: PresentationDocument = {
  schemaVersion: 1,
  artworkById: {},
  artworkHeight: 62,
  question: { fontScale: 1.2 },
  blessing: { fontScale: 1.25, lineHeight: 1.25, height: 58, padding: 5, offsetX: 0, offsetY: 0 },
}

export function normalizePresentation(value: unknown): PresentationDocument {
  const candidate = value && typeof value === 'object' ? value as Partial<PresentationDocument> : {}
  const artworkById: Record<string, ArtworkPresentation> = {}
  if (candidate.artworkById && typeof candidate.artworkById === 'object') {
    for (const [id, raw] of Object.entries(candidate.artworkById)) {
      if (!/^[a-z0-9_-]{1,80}$/i.test(id) || !raw || typeof raw !== 'object') continue
      const adjustment = raw as Partial<ArtworkPresentation>
      artworkById[id] = {
        offsetX: clamp(adjustment.offsetX, 0, -30, 30),
        offsetY: clamp(adjustment.offsetY, 0, -30, 30),
        zoom: clamp(adjustment.zoom, 1, 1, 1.8),
      }
    }
  }
  const question = candidate.question && typeof candidate.question === 'object' ? candidate.question : DEFAULT_PRESENTATION.question
  const blessing = candidate.blessing && typeof candidate.blessing === 'object' ? candidate.blessing : DEFAULT_PRESENTATION.blessing
  return {
    schemaVersion: 1,
    artworkById,
    artworkHeight: clamp(candidate.artworkHeight, 62, 50, 70),
    question: { fontScale: clamp(question.fontScale, 1.2, .9, 1.8) },
    blessing: {
      fontScale: clamp(blessing.fontScale, 1.25, .9, 1.8),
      lineHeight: clamp(blessing.lineHeight, 1.25, 1, 1.8),
      height: clamp(blessing.height, 58, 28, 100),
      padding: clamp(blessing.padding, 5, 0, 16),
      offsetX: clamp(blessing.offsetX, 0, -40, 40),
      offsetY: clamp(blessing.offsetY, 0, -40, 40),
    },
  }
}

export function presentationForArtwork(document: PresentationDocument, artworkId: string): ArtworkPresentation {
  return document.artworkById[artworkId] ?? DEFAULT_ARTWORK_PRESENTATION
}

export function importPresentation(json: string): PresentationDocument {
  const parsed = JSON.parse(json) as unknown
  if (parsed && typeof parsed === 'object' && Object.keys(parsed).some(key => FORBIDDEN_PERSONAL_KEY.test(key))) throw new Error('Presentation JSON contains personal data')
  const serialized = JSON.stringify(parsed)
  if (FORBIDDEN_PERSONAL_KEY.test(serialized.replace(/"(?:artworkById|schemaVersion|artworkHeight|question|blessing|fontScale|lineHeight|height|padding|offsetX|offsetY|zoom)"/g, ''))) throw new Error('Presentation JSON contains personal data')
  return normalizePresentation(parsed)
}

export function loadStoredPresentation(): PresentationDocument {
  try { return normalizePresentation(JSON.parse(localStorage.getItem(PRESENTATION_STORAGE_KEY) ?? 'null')) }
  catch { return DEFAULT_PRESENTATION }
}

export function saveStoredPresentation(document: PresentationDocument) {
  localStorage.setItem(PRESENTATION_STORAGE_KEY, JSON.stringify(normalizePresentation(document)))
}
