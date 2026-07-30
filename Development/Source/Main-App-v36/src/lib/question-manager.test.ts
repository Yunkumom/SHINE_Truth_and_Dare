import { describe, expect, it } from 'vitest'
import type { Card } from '../types'
import { eligibleManagedQuestions, resolveManagedQuestion } from './question-manager'

const base: Card[] = [
  { id: 'base-l1-truth', level: 1, mode: 'truth', zh: '一', en: 'One' },
  { id: 'base-l1-dare', level: 1, mode: 'dare', zh: '二', en: 'Two' },
  { id: 'base-l2-truth', level: 2, mode: 'truth', zh: '三', en: 'Three' },
]

const custom: Card[] = [
  { id: 'custom-l1-truth', level: 1, mode: 'truth', zh: '自訂', en: 'Custom' },
]

describe('v36 session question manager', () => {
  it('filters built-in and custom questions by level, mode, and disabled IDs', () => {
    expect(eligibleManagedQuestions({ base, custom, disabledQuestionIds: ['base-l1-truth'], level: 1, mode: 'truth' }))
      .toEqual([custom[0]])
  })

  it('returns an eligible exact selection without coupling artwork or blessing state', () => {
    const result = resolveManagedQuestion({
      base,
      custom,
      disabledQuestionIds: [],
      selectedQuestionId: 'custom-l1-truth',
      level: 1,
      mode: 'random',
      random: () => 0,
    })
    expect(result).toEqual({ card: custom[0], fallback: false, usedSafetyPool: false })
  })

  it('falls back inside the enabled pool when an exact question is ineligible', () => {
    const result = resolveManagedQuestion({
      base,
      custom,
      disabledQuestionIds: ['custom-l1-truth'],
      selectedQuestionId: 'custom-l1-truth',
      level: 1,
      mode: 'truth',
      random: () => 0,
    })
    expect(result).toEqual({ card: base[0], fallback: true, usedSafetyPool: false })
  })

  it('uses the governed built-in pool when every session question is disabled', () => {
    const result = resolveManagedQuestion({
      base,
      custom,
      disabledQuestionIds: ['base-l1-truth', 'base-l1-dare', 'custom-l1-truth'],
      level: 1,
      mode: 'truth',
      random: () => 0,
    })
    expect(result).toEqual({ card: base[0], fallback: true, usedSafetyPool: true })
  })
})
