import { describe, expect, it } from 'vitest'
import {
  DEFAULT_LAYOUT,
  applyLayoutChange,
  createLayoutHistory,
  importLayout,
  normalizeBlock,
  redoLayout,
  serializeLayout,
  undoLayout,
} from './layout-model'

describe('v22 layout document', () => {
  it('normalizes blocks into the 430 × 932 canvas and enforces minimum size', () => {
    expect(normalizeBlock({ x: -50, y: 920, width: 12, height: 8, fontScale: 4, padding: -3, z: 2 }))
      .toEqual({ x: 0, y: 892, width: 60, height: 40, fontScale: 2, padding: 0, z: 2 })
  })

  it('round-trips a versioned document without personal fields', () => {
    const json = serializeLayout(DEFAULT_LAYOUT)
    expect(json).toContain('"schemaVersion": 1')
    expect(json).not.toMatch(/name|contact|birthday|answer/i)
    expect(importLayout(json)).toEqual(DEFAULT_LAYOUT)
  })

  it.each(['name', 'contact', 'birthday', 'answer', 'email', 'phone'])('rejects imported personal key %s without replacing layout', key => {
    const unsafe = JSON.stringify({ ...DEFAULT_LAYOUT, [key]: 'private' })
    expect(() => importLayout(unsafe)).toThrow(/personal data/i)
  })

  it('keeps twenty undo steps and supports undo and redo', () => {
    let history = createLayoutHistory(DEFAULT_LAYOUT)
    for (let x = 1; x <= 25; x += 1) history = applyLayoutChange(history, 'setup', 'hero', { x })
    expect(history.past).toHaveLength(20)
    expect(history.present.screens.setup.hero.x).toBe(25)
    history = undoLayout(history)
    expect(history.present.screens.setup.hero.x).toBe(24)
    history = redoLayout(history)
    expect(history.present.screens.setup.hero.x).toBe(25)
  })
})
