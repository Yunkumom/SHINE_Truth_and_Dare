import { describe, expect, it } from 'vitest'
import { DESKTOP_SAFE_MARGIN, PHONE_HEIGHT, PHONE_WIDTH, calculatePhoneScale } from './viewport-scale'

describe('v18 phone-shell scale policy', () => {
  it('keeps the mobile 430 × 932 contract at 1×', () => {
    expect(calculatePhoneScale({ width: PHONE_WIDTH, height: PHONE_HEIGHT })).toBe(1)
  })

  it('fits the entire shell inside a 1280 × 900 desktop viewport', () => {
    expect(calculatePhoneScale({ width: 1280, height: 900 })).toBeCloseTo((900 - DESKTOP_SAFE_MARGIN) / PHONE_HEIGHT)
  })

  it('uses the narrower desktop dimension and never enlarges the phone', () => {
    expect(calculatePhoneScale({ width: 600, height: 1000 })).toBe(1)
    expect(calculatePhoneScale({ width: 1920, height: 1200 })).toBe(1)
  })
})
