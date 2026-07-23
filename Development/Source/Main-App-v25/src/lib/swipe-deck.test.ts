import { describe, expect, it } from 'vitest'
import { calculateSwipePose, decideSwipeRelease, isSwipeOriginAllowed } from './swipe-deck'

describe('v25 swipe deck policy', () => {
  it('returns below the 22% draw threshold and commits at the threshold', () => {
    expect(decideSwipeRelease({ upwardTravel: 123, cardHeight: 566, alreadyCommitted: false })).toBe('return')
    expect(decideSwipeRelease({ upwardTravel: 125, cardHeight: 566, alreadyCommitted: false })).toBe('commit')
  })

  it('prevents duplicate completion from one gesture', () => {
    expect(decideSwipeRelease({ upwardTravel: 200, cardHeight: 566, alreadyCommitted: true })).toBe('ignore')
  })

  it('follows pointer delta and clamps card tilt', () => {
    expect(calculateSwipePose({ dx: 30, dy: -80, cardWidth: 400, cardHeight: 559 })).toEqual({ x: 30, y: -80, rotation: 1.8, progress: 0.65 })
    expect(calculateSwipePose({ dx: 900, dy: -800, cardWidth: 400, cardHeight: 559 }).rotation).toBe(12)
  })

  it('reserves the artwork for hidden-Taiwan long press', () => {
    expect(isSwipeOriginAllowed('frame')).toBe(true)
    expect(isSwipeOriginAllowed('artwork')).toBe(false)
  })
})
