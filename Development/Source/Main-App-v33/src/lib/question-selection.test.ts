import { describe, expect, it } from 'vitest'
import { cards } from '../data/cards'
import { eligibleCards } from './game'
import { resolvePreferredQuestion } from './question-selection'

describe('v33 independent question preference', () => {
  it('keeps random as the default and avoids the previous eligible question', () => {
    const pool = eligibleCards(cards, 1, 'truth')
    const result = resolvePreferredQuestion({ mode: 'random', packId: 'classic-60' }, pool, pool[0].id, () => 0)
    expect(result.card.id).not.toBe(pool[0].id)
    expect(result.fallback).toBe(false)
  })

  it('returns an exact eligible question independently of artwork', () => {
    const pool = eligibleCards(cards, 1, 'truth')
    const result = resolvePreferredQuestion({ mode: 'specific', packId: 'classic-60', questionId: 'card-03' }, pool, undefined, () => .8)
    expect(result.card.id).toBe('card-03')
    expect(result.fallback).toBe(false)
  })

  it('falls back safely when the chosen question is not eligible for the current level and mode', () => {
    const pool = eligibleCards(cards, 2, 'dare')
    const result = resolvePreferredQuestion({ mode: 'specific', packId: 'classic-60', questionId: 'card-03' }, pool, undefined, () => 0)
    expect(result.card.level).toBe(2)
    expect(result.card.mode).toBe('dare')
    expect(result.fallback).toBe(true)
  })
})
