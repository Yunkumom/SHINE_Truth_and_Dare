import type { Card, QuestionPreference } from '../types'
import { nextCard } from './game'

export interface QuestionResolution {
  card: Card
  fallback: boolean
}
export function resolvePreferredQuestion(preference: QuestionPreference, eligible: Card[], previousId?: string, random: () => number = Math.random): QuestionResolution {
  if (preference.mode === 'specific') {
    const selected = eligible.find(card => card.id === preference.questionId)
    if (selected) return { card: selected, fallback: false }
    return { card: nextCard(eligible, previousId, random), fallback: true }
  }
  return { card: nextCard(eligible, previousId, random), fallback: false }
}
