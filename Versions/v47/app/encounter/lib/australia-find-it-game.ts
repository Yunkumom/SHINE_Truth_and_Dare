import type { AustraliaFindItCard, AustraliaFindItMode } from '../data/australia-find-it.ts'

export function cardsForFindItMode(cards: readonly AustraliaFindItCard[], mode: AustraliaFindItMode) {
  return mode === 'mixed' ? [...cards] : cards.filter(card => card.kind === mode)
}

export function drawFindItCard(
  cards: readonly AustraliaFindItCard[],
  mode: AustraliaFindItMode,
  drawnIds: readonly string[],
  random: () => number = Math.random,
) {
  const eligible = cardsForFindItMode(cards, mode)
  if (!eligible.length) throw new Error(`No Australia Find It cards for mode: ${mode}`)
  const remaining = eligible.filter(card => !drawnIds.includes(card.id))
  const resetHistory = remaining.length === 0
  const pool = resetHistory ? eligible : remaining
  const index = Math.min(pool.length - 1, Math.max(0, Math.floor(random() * pool.length)))
  return { card: pool[index], resetHistory }
}
