import { describe, expect, it } from 'vitest'
import { CARD_EXPORT_LAYOUT, DEITY_ART } from './deity-art'

describe('v21 deity card artwork', () => {
  it('keeps artwork, question, and blessing in separate export regions', () => {
    const { art, question, blessing } = CARD_EXPORT_LAYOUT
    expect(art.y + art.height).toBeLessThanOrEqual(question.y)
    expect(question.y + question.height).toBeLessThanOrEqual(blessing.y)
    expect(art.height).toBeGreaterThan(question.height + blessing.height)
  })

  it('registers two local variants for every one of nine deities', () => {
    expect(DEITY_ART).toHaveLength(18)
    const counts = DEITY_ART.reduce<Map<string, number>>((result, artwork) => {
      result.set(artwork.deityId, (result.get(artwork.deityId) ?? 0) + 1)
      return result
    }, new Map())
    expect([...counts.values()].every(count => count === 2)).toBe(true)
    expect(DEITY_ART.every(artwork => artwork.src.match(/(?:^data:image\/webp|\.webp$)/) && artwork.hiddenTaiwan)).toBe(true)
  })

  it('gives every artwork a bounded locator for its hidden Taiwan motif', () => {
    expect(DEITY_ART).toHaveLength(18)
    expect(DEITY_ART.every(artwork => {
      const hotspot = artwork.taiwanHotspot
      return hotspot
        && hotspot.x >= 0 && hotspot.x <= 100
        && hotspot.y >= 0 && hotspot.y <= 100
        && hotspot.scale > 0
        && Number.isFinite(hotspot.rotation)
    })).toBe(true)
    expect(new Set(DEITY_ART.map(artwork => JSON.stringify(artwork.taiwanHotspot))).size).toBe(18)
  })
})
