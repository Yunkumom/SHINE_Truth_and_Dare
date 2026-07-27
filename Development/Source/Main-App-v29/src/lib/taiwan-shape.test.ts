import { describe, expect, it } from 'vitest'
import { TAIWAN_PATH, TAIWAN_VIEWBOX } from './taiwan-shape'

describe('canonical Taiwan contour', () => {
  it('provides a detailed, phone-readable main-island coastline', () => {
    expect(TAIWAN_VIEWBOX).toBe('0 0 120 240')
    expect(TAIWAN_PATH.startsWith('M')).toBe(true)
    expect((TAIWAN_PATH.match(/[ML]/g) ?? []).length).toBeGreaterThanOrEqual(40)
    expect(TAIWAN_PATH.endsWith('Z')).toBe(true)
    expect(TAIWAN_PATH).toContain('114.0')
    expect(TAIWAN_PATH).toContain('234.0')
  })
})
