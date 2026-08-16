import { cards, CLASSIC_QUESTION_PACK_ID } from './cards'
import { shineQuestionCards, SHINE_QUESTION_PACK_ID } from './shine-question-book'
import type { Card, QuestionPack } from '../types'

export const DEFAULT_QUESTION_PACK_ID = SHINE_QUESTION_PACK_ID

export const ALL_QUESTION_PACK_IDS = [CLASSIC_QUESTION_PACK_ID, SHINE_QUESTION_PACK_ID] as const

export const governedQuestions: Card[] = [...cards, ...shineQuestionCards]

export const QUESTION_PACKS: readonly QuestionPack[] = [
  {
    id: DEFAULT_QUESTION_PACK_ID,
    zhName: 'SHINE 真心話・連結問題集',
    enName: 'SHINE Question Book',
    questionIds: shineQuestionCards.map(card => card.id),
  },
  {
    id: CLASSIC_QUESTION_PACK_ID,
    zhName: '經典相遇 60 題',
    enName: 'Classic Encounter 60',
    questionIds: cards.map(card => card.id),
  },
]

export function questionPackId(card: Card) {
  return card.packId ?? CLASSIC_QUESTION_PACK_ID
}
