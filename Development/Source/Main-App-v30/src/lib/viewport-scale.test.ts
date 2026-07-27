import { describe, expect, it } from 'vitest'
import { DESKTOP_SAFE_MARGIN, PHONE_HEIGHT, PHONE_WIDTH, calculatePhoneLayout, calculatePhoneScale } from './viewport-scale'

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

  it.each([[1920, 826], [1440, 900], [1280, 720], [1024, 768]])('centers the complete shell at %i × %i', (width, height) => {
    const layout = calculatePhoneLayout({ width, height })
    expect(layout.left).toBeCloseTo((width - layout.width) / 2)
    expect(layout.top).toBeCloseTo((height - layout.height) / 2)
    expect(layout.left).toBeGreaterThanOrEqual(0)
    expect(layout.top).toBeGreaterThanOrEqual(0)
    expect(layout.width).toBeLessThanOrEqual(width)
    expect(layout.height).toBeLessThanOrEqual(height)
  })
})
