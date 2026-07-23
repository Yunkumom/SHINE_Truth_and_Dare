import { describe, expect, it } from 'vitest'
import { DEITY_ART } from './deity-art'
import { calculateCoverPlacement, portraitObjectPosition } from './portrait-focus'

describe('v25 portrait-safe artwork', () => {
  it('defines a bounded focal point for every artwork', () => {
    expect(DEITY_ART).toHaveLength(18)
    for (const art of DEITY_ART) {
      expect(art.portraitFocus.x).toBeGreaterThanOrEqual(20)
      expect(art.portraitFocus.x).toBeLessThanOrEqual(80)
      expect(art.portraitFocus.y).toBeGreaterThanOrEqual(8)
      expect(art.portraitFocus.y).toBeLessThanOrEqual(38)
      expect(portraitObjectPosition(art.portraitFocus)).toMatch(/^\d+% \d+%$/)
    }
  })

  it('uses the focal point when calculating cover placement', () => {
    const placement = calculateCoverPlacement({ width: 1024, height: 1536 }, { x: 50, y: 18 }, { x: 0, y: 0, width: 984, height: 900 })
    const focusY = placement.y + 1536 * placement.scale * .18
    expect(focusY).toBeGreaterThanOrEqual(0)
    expect(focusY).toBeLessThanOrEqual(900)
  })
})
