import { describe, expect, it } from 'vitest'
import { DEFAULT_PRESENTATION, importPresentation, normalizePresentation, presentationForArtwork } from './presentation-model'

describe('card presentation settings', () => {
  it('starts with independently readable question and blessing text defaults', () => {
    expect(DEFAULT_PRESENTATION.question.fontScale).toBe(1.2)
    expect(DEFAULT_PRESENTATION.blessing.fontScale).toBe(1.25)
  })

  it('keeps corrections per artwork and clamps every visual control', () => {
    const value = normalizePresentation({
      ...DEFAULT_PRESENTATION,
      artworkById: { mazu: { offsetX: 999, offsetY: -999, zoom: 9 } },
      artworkHeight: 99,
      question: { fontScale: 9 },
      blessing: { fontScale: 9, lineHeight: 0, height: 999, padding: -5, offsetX: 999, offsetY: -999 },
    })
    expect(presentationForArtwork(value, 'mazu')).toEqual({ offsetX: 50, offsetY: -60, zoom: 2.4 })
    expect(value.artworkHeight).toBe(70)
    expect(value.question).toEqual({ fontScale: 1.8 })
    expect(value.blessing).toEqual({ fontScale: 1.8, lineHeight: 1, height: 100, padding: 0, offsetX: 40, offsetY: -40 })
  })

  it('clamps both typography controls to the approved readable range', () => {
    expect(normalizePresentation({ question: { fontScale: 0 }, blessing: { ...DEFAULT_PRESENTATION.blessing, fontScale: 0 } }).question.fontScale).toBe(.9)
    expect(normalizePresentation({ question: { fontScale: 99 }, blessing: { ...DEFAULT_PRESENTATION.blessing, fontScale: 99 } }).blessing.fontScale).toBe(1.8)
  })

  it('rejects personal data in imported presentation JSON', () => {
    expect(() => importPresentation('{"schemaVersion":1,"contact":"secret"}')).toThrow(/personal/i)
  })
})
