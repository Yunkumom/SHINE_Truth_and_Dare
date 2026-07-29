import { describe, expect, it } from 'vitest'
import { DEITY_ART } from './deity-art'
import { adjustedPortraitFocus, calculateCoverPlacement, calculateZoomedCoverPlacement, portraitObjectPosition } from './portrait-focus'

describe('V32 portrait-safe artwork', () => {
  it('defines a bounded focal point for every artwork', () => {
    expect(DEITY_ART).toHaveLength(18)
    for (const art of DEITY_ART) {
      expect(art.portraitFocus.x).toBeGreaterThanOrEqual(20)
      expect(art.portraitFocus.x).toBeLessThanOrEqual(80)
      expect(art.portraitFocus.y).toBeGreaterThanOrEqual(8)
      expect(art.portraitFocus.y).toBeLessThanOrEqual(40)
      expect(portraitObjectPosition(art.portraitFocus)).toMatch(/^\d+% \d+%$/)
    }
  })

  it('applies bounded per-artwork focus and zoom without exposing the target', () => {
    expect(adjustedPortraitFocus({ x: 50, y: 22 }, { offsetX: 10, offsetY: -5 })).toEqual({ x: 60, y: 17 })
    const placement = calculateZoomedCoverPlacement({ width: 1000, height: 1500 }, { x: 60, y: 17 }, { x: 0, y: 0, width: 400, height: 500 }, 1.4)
    expect(placement.width).toBeGreaterThanOrEqual(400)
    expect(placement.height).toBeGreaterThanOrEqual(500)
    expect(placement.x).toBeLessThanOrEqual(0)
    expect(placement.y).toBeLessThanOrEqual(0)
  })

  it('uses the focal point when calculating cover placement', () => {
    const placement = calculateCoverPlacement({ width: 1024, height: 1536 }, { x: 50, y: 18 }, { x: 0, y: 0, width: 984, height: 900 })
    const focusY = placement.y + 1536 * placement.scale * .18
    expect(focusY).toBeGreaterThanOrEqual(0)
    expect(focusY).toBeLessThanOrEqual(900)
  })
})
