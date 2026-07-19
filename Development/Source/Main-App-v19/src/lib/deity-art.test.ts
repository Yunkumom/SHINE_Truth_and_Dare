import { describe, expect, it } from 'vitest'
import { CARD_EXPORT_LAYOUT, deityForCard } from './deity-art'

describe('v19 deity card artwork', () => {
  it('keeps the full artwork region separate from the question panel', () => {
    const { art, question } = CARD_EXPORT_LAYOUT
    expect(art.y + art.height).toBeLessThanOrEqual(question.y)
    expect(art.height).toBeGreaterThan(question.height)
  })

  it('selects a stable local Taiwan deity asset for every card', () => {
    const first = deityForCard('card-001')
    expect(first.src).toMatch(/(?:^\.\/assets\/deities\/.+-taiwan\.webp$|^data:image\/webp|\.webp$)/)
    expect(deityForCard('card-001')).toEqual(first)
  })
})
