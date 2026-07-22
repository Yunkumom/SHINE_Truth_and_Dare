import type { Card, Level, Mode } from '../types'

export function eligibleCards(cards: Card[], level: Level, mode: Mode): Card[] {
  return cards.filter(card => card.level === level && (mode === 'random' || card.mode === mode))
}

export function nextCard(cards: Card[], currentId?: string, random: () => number = Math.random): Card {
  if (!cards.length) throw new Error('No eligible cards')
  const candidates = cards.length > 1 ? cards.filter(card => card.id !== currentId) : cards
  return candidates[Math.min(candidates.length - 1, Math.floor(random() * candidates.length))]
}
