import { describe, expect, it } from 'vitest'
import { DEFAULT_PRESENTATION, importPresentation, normalizePresentation, presentationForArtwork } from './presentation-model'

describe('card presentation settings', () => {
  it('keeps corrections per artwork and clamps every visual control', () => {
    const value = normalizePresentation({
      ...DEFAULT_PRESENTATION,
      artworkById: { mazu: { offsetX: 999, offsetY: -999, zoom: 9 } },
      artworkHeight: 99,
      blessing: { fontScale: 9, lineHeight: 0, height: 999, padding: -5, offsetX: 999, offsetY: -999 },
    })
    expect(presentationForArtwork(value, 'mazu')).toEqual({ offsetX: 30, offsetY: -30, zoom: 1.8 })
    expect(value.artworkHeight).toBe(70)
    expect(value.blessing).toEqual({ fontScale: 1.6, lineHeight: 1, height: 100, padding: 0, offsetX: 40, offsetY: -40 })
  })

  it('rejects personal data in imported presentation JSON', () => {
    expect(() => importPresentation('{"schemaVersion":1,"contact":"secret"}')).toThrow(/personal/i)
  })
})
