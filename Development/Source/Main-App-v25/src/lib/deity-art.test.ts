import { describe, expect, it } from 'vitest'
import { CARD_EXPORT_LAYOUT, DEITY_ART } from './deity-art'

describe('v25 deity card artwork', () => {
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

  it('keeps every hidden Taiwan locator inside the visible card crop', () => {
    expect(DEITY_ART).toHaveLength(18)
    expect(DEITY_ART.every(artwork => {
      const hotspot = artwork.taiwanHotspot
      return hotspot
        && hotspot.x >= 25 && hotspot.x <= 75
        && hotspot.y >= 10 && hotspot.y <= 90
        && hotspot.scale > 0
        && Number.isFinite(hotspot.rotation)
        && /^#[0-9a-f]{6}$/i.test(hotspot.color)
        && /^#[0-9a-f]{6}$/i.test(hotspot.accent)
    })).toBe(true)
    expect(new Set(DEITY_ART.map(artwork => JSON.stringify(artwork.taiwanHotspot))).size).toBe(18)
    expect(new Set(DEITY_ART.map(artwork => artwork.taiwanHotspot.color)).size).toBeGreaterThanOrEqual(9)
    expect(DEITY_ART.every(artwork => artwork.src.includes('taiwan-safe'))).toBe(true)
  })
})
