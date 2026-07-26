import { describe, expect, it } from 'vitest'
import { DEVICE_FRAME, IPHONE_PRO_MAX_MM, PHONE_CANVAS } from './device-frame'

describe('desktop iPhone Pro Max frame', () => {
  it('uses the supplied 78.0 by 163.4 millimeter ratio around the unchanged canvas', () => {
    expect(IPHONE_PRO_MAX_MM).toEqual({ width: 78, height: 163.4 })
    expect(DEVICE_FRAME).toEqual({ width: 445, height: 932 })
    expect(PHONE_CANVAS).toEqual({ width: 430, height: 932 })
    expect(DEVICE_FRAME.width / DEVICE_FRAME.height).toBeCloseTo(78 / 163.4, 3)
  })
})
