import { describe, expect, it } from 'vitest'
import { TAIWAN_PATH, TAIWAN_VIEWBOX } from './taiwan-shape'

describe('canonical Taiwan contour', () => {
  it('provides one detailed geographic path for every reveal', () => {
    expect(TAIWAN_VIEWBOX).toBe('0 0 120 240')
    expect(TAIWAN_PATH.startsWith('M')).toBe(true)
    expect((TAIWAN_PATH.match(/[A-Z]/g) ?? []).length).toBeGreaterThanOrEqual(25)
    expect(TAIWAN_PATH.endsWith('Z')).toBe(true)
  })
})
