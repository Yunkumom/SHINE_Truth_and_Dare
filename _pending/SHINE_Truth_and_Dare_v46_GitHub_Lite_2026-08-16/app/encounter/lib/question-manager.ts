import type { Card, Level, Mode } from '../types'
import { questionPackId } from '../data/question-packs'
import { nextCard } from './game'

interface ManagedQuestionFilter {
  base: Card[]
  custom: Card[]
  disabledQuestionIds: string[]
  enabledQuestionPackIds: string[]
  level: Level
  mode: Mode
}

interface ManagedQuestionResolutionInput extends ManagedQuestionFilter {
  selectedQuestionId?: string | null
  drawnQuestionIds?: string[]
  previousId?: string
  random?: () => number
}

export interface ManagedQuestionResolution {
  card: Card
  fallback: boolean
  usedSafetyPool: boolean
  resetDrawHistory: boolean
}

function matchesSelection(card: Card, level: Level, mode: Mode) {
  return card.level === level && (mode === 'random' || card.mode === mode)
}

export function eligibleManagedQuestions({ base, custom, disabledQuestionIds, enabledQuestionPackIds, level, mode }: ManagedQuestionFilter) {
  const disabled = new Set(disabledQuestionIds)
  const enabledPacks = new Set(enabledQuestionPackIds)
  return [...base, ...custom].filter(card => !disabled.has(card.id) && (card.id.startsWith('custom-') || enabledPacks.has(questionPackId(card))) && matchesSelection(card, level, mode))
}

export function resolveManagedQuestion({
  base,
  custom,
  disabledQuestionIds,
  enabledQuestionPackIds,
  selectedQuestionId,
  drawnQuestionIds = [],
  level,
  mode,
  previousId,
  random = Math.random,
}: ManagedQuestionResolutionInput): ManagedQuestionResolution {
  const eligible = eligibleManagedQuestions({ base, custom, disabledQuestionIds, enabledQuestionPackIds, level, mode })
  const selected = selectedQuestionId ? eligible.find(card => card.id === selectedQuestionId) : undefined
  if (selected) return { card: selected, fallback: false, usedSafetyPool: false, resetDrawHistory: false }

  if (eligible.length) {
    const drawn = new Set(drawnQuestionIds)
    const remaining = eligible.filter(card => !drawn.has(card.id))
    const candidates = remaining.length ? remaining : eligible
    return {
      card: nextCard(candidates, previousId, random),
      fallback: Boolean(selectedQuestionId),
      usedSafetyPool: false,
      resetDrawHistory: remaining.length === 0,
    }
  }

  const enabledPacks = new Set(enabledQuestionPackIds)
  const safetyPool = base.filter(card => enabledPacks.has(questionPackId(card)) && matchesSelection(card, level, mode))
  const ultimateSafetyPool = safetyPool.length ? safetyPool : base.filter(card => matchesSelection(card, level, mode))
  if (!ultimateSafetyPool.length) throw new Error(`No governed questions are available for Level ${level} and mode ${mode}`)
  return {
    card: nextCard(ultimateSafetyPool, previousId, random),
    fallback: true,
    usedSafetyPool: true,
    resetDrawHistory: true,
  }
}
