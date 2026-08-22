import type { TaiwanFoodCardDesign } from '../types'

export const TAIWAN_FOOD_CARD_DESIGNS = [
  {
    id: 'food-travel-journal-v47',
    name: {
      zh: '美食旅行誌',
      en: 'Food Travel Journal'
    },
    aspectRatio: '63 / 88',
    frontLayout: 'portrait-artwork',
    backLayout: 'story-and-question'
  },
  {
    id: 'food-travel-journal-compact-v47',
    name: {
      zh: '美食旅行誌精簡版',
      en: 'Compact Food Travel Journal'
    },
    aspectRatio: '63 / 88',
    frontLayout: 'portrait-artwork',
    backLayout: 'question-first'
  }
] as const satisfies readonly TaiwanFoodCardDesign[]
