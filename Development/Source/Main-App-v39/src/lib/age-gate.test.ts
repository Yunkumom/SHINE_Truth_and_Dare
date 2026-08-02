import { describe, expect, it } from 'vitest'
import { isAdultOn } from './age-gate'

describe('isAdultOn', () => {
  const today = new Date('2026-07-19T12:00:00Z')
  it('unlocks on the eighteenth birthday', () => expect(isAdultOn('2008-07-19', today)).toBe(true))
  it('stays locked one day before the eighteenth birthday', () => expect(isAdultOn('2008-07-20', today)).toBe(false))
  it('rejects missing or invalid dates', () => expect(isAdultOn('not-a-date', today)).toBe(false))
})
