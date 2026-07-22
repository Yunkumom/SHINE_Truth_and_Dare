import { describe, expect, it } from 'vitest'
import { eligibleCards, nextCard } from './game'
import type { Card } from '../types'

const cards: Card[] = [
  { id: 'a', level: 1, mode: 'truth', zh: '甲', en: 'A' },
  { id: 'b', level: 1, mode: 'dare', zh: '乙', en: 'B' },
  { id: 'c', level: 2, mode: 'truth', zh: '丙', en: 'C' }
]

describe('game selection', () => {
  it('filters by level and mode', () => expect(eligibleCards(cards, 1, 'truth').map(card => card.id)).toEqual(['a']))
  it('random includes both modes at the selected level', () => expect(eligibleCards(cards, 1, 'random')).toHaveLength(2))
  it('avoids the current card when another card exists', () => expect(nextCard(cards.slice(0, 2), 'a', () => 0).id).toBe('b'))
})
