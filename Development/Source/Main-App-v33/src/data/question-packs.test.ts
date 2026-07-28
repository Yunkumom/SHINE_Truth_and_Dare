import { describe, expect, it } from 'vitest'
import { QUESTION_PACKS } from './question-packs'

describe('v33 scalable question registry', () => {
  it('governs the current sixty questions as the classic pack', () => {
    expect(QUESTION_PACKS).toHaveLength(1)
    expect(QUESTION_PACKS[0].id).toBe('classic-60')
    expect(QUESTION_PACKS[0].questionIds).toHaveLength(60)
  })
})
