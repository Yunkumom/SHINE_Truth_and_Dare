import { cards } from './cards'
import type { QuestionPack } from '../types'

export const DEFAULT_QUESTION_PACK_ID = 'classic-60'

export const QUESTION_PACKS: readonly QuestionPack[] = [
  {
    id: DEFAULT_QUESTION_PACK_ID,
    zhName: '經典相遇 60 題',
    enName: 'Classic Encounter 60',
    questionIds: cards.map(card => card.id),
  },
]
