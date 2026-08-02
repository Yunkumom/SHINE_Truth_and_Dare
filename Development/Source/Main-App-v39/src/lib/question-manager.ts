import type { Card, Level, Mode } from '../types'
import { nextCard } from './game'

interface ManagedQuestionFilter {
  base: Card[]
  custom: Card[]
  disabledQuestionIds: string[]
  level: Level
  mode: Mode
}

interface ManagedQuestionResolutionInput extends ManagedQuestionFilter {
  selectedQuestionId?: string | null
  previousId?: string
  random?: () => number
}

export interface ManagedQuestionResolution {
  card: Card
  fallback: boolean
  usedSafetyPool: boolean
}

function matchesSelection(card: Card, level: Level, mode: Mode) {
  return card.level === level && (mode === 'random' || card.mode === mode)
}

export function eligibleManagedQuestions({ base, custom, disabledQuestionIds, level, mode }: ManagedQuestionFilter) {
  const disabled = new Set(disabledQuestionIds)
  return [...base, ...custom].filter(card => !disabled.has(card.id) && matchesSelection(card, level, mode))
}

export function resolveManagedQuestion({
  base,
  custom,
  disabledQuestionIds,
  selectedQuestionId,
  level,
  mode,
  previousId,
  random = Math.random,
}: ManagedQuestionResolutionInput): ManagedQuestionResolution {
  const eligible = eligibleManagedQuestions({ base, custom, disabledQuestionIds, level, mode })
  const selected = selectedQuestionId ? eligible.find(card => card.id === selectedQuestionId) : undefined
  if (selected) return { card: selected, fallback: false, usedSafetyPool: false }

  if (eligible.length) {
    return {
      card: nextCard(eligible, previousId, random),
      fallback: Boolean(selectedQuestionId),
      usedSafetyPool: false,
    }
  }

  const safetyPool = base.filter(card => matchesSelection(card, level, mode))
  if (!safetyPool.length) throw new Error(`No governed questions are available for Level ${level} and mode ${mode}`)
  return {
    card: nextCard(safetyPool, previousId, random),
    fallback: true,
    usedSafetyPool: true,
  }
}
