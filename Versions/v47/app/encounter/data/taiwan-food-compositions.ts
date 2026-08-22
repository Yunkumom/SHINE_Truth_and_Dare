import { TAIWAN_FOOD_ART, TAIWAN_FOOD_ART_FOCUS, taiwanFoodArtworkFocus } from './taiwan-food-art'
import { TAIWAN_FOOD_CARD_DESIGNS } from './taiwan-food-card-designs'
import { TAIWAN_FOOD_QUESTIONS } from './taiwan-food-questions'
import { TAIWAN_FOOD_QUESTION_SETS } from './taiwan-food-question-sets'
import { TAIWAN_FOOD_STORIES } from './taiwan-food-stories'
import { TAIWAN_FOOD_SUBJECTS } from './taiwan-food-subjects'
import { resolveCardPresentationLayers } from '../lib/card-composition'
import type { TaiwanFoodCardComposition, TaiwanFoodCardCompositionSpec } from '../types'

export const TAIWAN_FOOD_COMPOSITION_SPECS = [
  {
    id: 'composition-food-north-beef-noodles',
    subjectId: 'food-north-beef-noodles',
    artworkId: 'art-food-north-beef-noodles',
    storyId: 'story-food-north-beef-noodles',
    questionId: 'question-food-north-beef-noodles-standard',
    spicyQuestionId: 'question-food-north-beef-noodles-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-north-iron-eggs',
    subjectId: 'food-north-iron-eggs',
    artworkId: 'art-food-north-iron-eggs',
    storyId: 'story-food-north-iron-eggs',
    questionId: 'question-food-north-iron-eggs-standard',
    spicyQuestionId: 'question-food-north-iron-eggs-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-north-hsinchu-rice-noodles',
    subjectId: 'food-north-hsinchu-rice-noodles',
    artworkId: 'art-food-north-hsinchu-rice-noodles',
    storyId: 'story-food-north-hsinchu-rice-noodles',
    questionId: 'question-food-north-hsinchu-rice-noodles-standard',
    spicyQuestionId: 'question-food-north-hsinchu-rice-noodles-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-north-keelung-tempura',
    subjectId: 'food-north-keelung-tempura',
    artworkId: 'art-food-north-keelung-tempura',
    storyId: 'story-food-north-keelung-tempura',
    questionId: 'question-food-north-keelung-tempura-standard',
    spicyQuestionId: 'question-food-north-keelung-tempura-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-north-daxi-tofu',
    subjectId: 'food-north-daxi-tofu',
    artworkId: 'art-food-north-daxi-tofu',
    storyId: 'story-food-north-daxi-tofu',
    questionId: 'question-food-north-daxi-tofu-standard',
    spicyQuestionId: 'question-food-north-daxi-tofu-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-central-sun-cake',
    subjectId: 'food-central-sun-cake',
    artworkId: 'art-food-central-sun-cake',
    storyId: 'story-food-central-sun-cake',
    questionId: 'question-food-central-sun-cake-standard',
    spicyQuestionId: 'question-food-central-sun-cake-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-central-changhua-bawan',
    subjectId: 'food-central-changhua-bawan',
    artworkId: 'art-food-central-changhua-bawan',
    storyId: 'story-food-central-changhua-bawan',
    questionId: 'question-food-central-changhua-bawan-standard',
    spicyQuestionId: 'question-food-central-changhua-bawan-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-central-puli-shaoxing',
    subjectId: 'food-central-puli-shaoxing',
    artworkId: 'art-food-central-puli-shaoxing',
    storyId: 'story-food-central-puli-shaoxing',
    questionId: 'question-food-central-puli-shaoxing-standard',
    spicyQuestionId: 'question-food-central-puli-shaoxing-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-central-hakka-lei-cha',
    subjectId: 'food-central-hakka-lei-cha',
    artworkId: 'art-food-central-hakka-lei-cha',
    storyId: 'story-food-central-hakka-lei-cha',
    questionId: 'question-food-central-hakka-lei-cha-standard',
    spicyQuestionId: 'question-food-central-hakka-lei-cha-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-central-gukeng-coffee',
    subjectId: 'food-central-gukeng-coffee',
    artworkId: 'art-food-central-gukeng-coffee',
    storyId: 'story-food-central-gukeng-coffee',
    questionId: 'question-food-central-gukeng-coffee-standard',
    spicyQuestionId: 'question-food-central-gukeng-coffee-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-south-turkey-rice',
    subjectId: 'food-south-turkey-rice',
    artworkId: 'art-food-south-turkey-rice',
    storyId: 'story-food-south-turkey-rice',
    questionId: 'question-food-south-turkey-rice-standard',
    spicyQuestionId: 'question-food-south-turkey-rice-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-south-tainan-beef-soup',
    subjectId: 'food-south-tainan-beef-soup',
    artworkId: 'art-food-south-tainan-beef-soup',
    storyId: 'story-food-south-tainan-beef-soup',
    questionId: 'question-food-south-tainan-beef-soup-standard',
    spicyQuestionId: 'question-food-south-tainan-beef-soup-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-south-papaya-milk',
    subjectId: 'food-south-papaya-milk',
    artworkId: 'art-food-south-papaya-milk',
    storyId: 'story-food-south-papaya-milk',
    questionId: 'question-food-south-papaya-milk-standard',
    spicyQuestionId: 'question-food-south-papaya-milk-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-south-wanluan-pork',
    subjectId: 'food-south-wanluan-pork',
    artworkId: 'art-food-south-wanluan-pork',
    storyId: 'story-food-south-wanluan-pork',
    questionId: 'question-food-south-wanluan-pork-standard',
    spicyQuestionId: 'question-food-south-wanluan-pork-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-south-coffin-bread',
    subjectId: 'food-south-coffin-bread',
    artworkId: 'art-food-south-coffin-bread',
    storyId: 'story-food-south-coffin-bread',
    questionId: 'question-food-south-coffin-bread-standard',
    spicyQuestionId: 'question-food-south-coffin-bread-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-east-hualien-mochi',
    subjectId: 'food-east-hualien-mochi',
    artworkId: 'art-food-east-hualien-mochi',
    storyId: 'story-food-east-hualien-mochi',
    questionId: 'question-food-east-hualien-mochi-standard',
    spicyQuestionId: 'question-food-east-hualien-mochi-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-east-chishang-rice',
    subjectId: 'food-east-chishang-rice',
    artworkId: 'art-food-east-chishang-rice',
    storyId: 'story-food-east-chishang-rice',
    questionId: 'question-food-east-chishang-rice-standard',
    spicyQuestionId: 'question-food-east-chishang-rice-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-east-yilan-duck',
    subjectId: 'food-east-yilan-duck',
    artworkId: 'art-food-east-yilan-duck',
    storyId: 'story-food-east-yilan-duck',
    questionId: 'question-food-east-yilan-duck-standard',
    spicyQuestionId: 'question-food-east-yilan-duck-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-east-hualien-chili',
    subjectId: 'food-east-hualien-chili',
    artworkId: 'art-food-east-hualien-chili',
    storyId: 'story-food-east-hualien-chili',
    questionId: 'question-food-east-hualien-chili-standard',
    spicyQuestionId: 'question-food-east-hualien-chili-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-east-taitung-roselle',
    subjectId: 'food-east-taitung-roselle',
    artworkId: 'art-food-east-taitung-roselle',
    storyId: 'story-food-east-taitung-roselle',
    questionId: 'question-food-east-taitung-roselle-standard',
    spicyQuestionId: 'question-food-east-taitung-roselle-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-offshore-penghu-brown-sugar',
    subjectId: 'food-offshore-penghu-brown-sugar',
    artworkId: 'art-food-offshore-penghu-brown-sugar',
    storyId: 'story-food-offshore-penghu-brown-sugar',
    questionId: 'question-food-offshore-penghu-brown-sugar-standard',
    spicyQuestionId: 'question-food-offshore-penghu-brown-sugar-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-offshore-penghu-cactus',
    subjectId: 'food-offshore-penghu-cactus',
    artworkId: 'art-food-offshore-penghu-cactus',
    storyId: 'story-food-offshore-penghu-cactus',
    questionId: 'question-food-offshore-penghu-cactus-standard',
    spicyQuestionId: 'question-food-offshore-penghu-cactus-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-offshore-kinmen-congee',
    subjectId: 'food-offshore-kinmen-congee',
    artworkId: 'art-food-offshore-kinmen-congee',
    storyId: 'story-food-offshore-kinmen-congee',
    questionId: 'question-food-offshore-kinmen-congee-standard',
    spicyQuestionId: 'question-food-offshore-kinmen-congee-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-offshore-kinmen-peanut-candy',
    subjectId: 'food-offshore-kinmen-peanut-candy',
    artworkId: 'art-food-offshore-kinmen-peanut-candy',
    storyId: 'story-food-offshore-kinmen-peanut-candy',
    questionId: 'question-food-offshore-kinmen-peanut-candy-standard',
    spicyQuestionId: 'question-food-offshore-kinmen-peanut-candy-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  },
  {
    id: 'composition-food-offshore-matsu-fish-noodles',
    subjectId: 'food-offshore-matsu-fish-noodles',
    artworkId: 'art-food-offshore-matsu-fish-noodles',
    storyId: 'story-food-offshore-matsu-fish-noodles',
    questionId: 'question-food-offshore-matsu-fish-noodles-standard',
    spicyQuestionId: 'question-food-offshore-matsu-fish-noodles-spicy',
    questionSetIds: [
      'taiwan-food-standard-v47',
      'taiwan-food-spicy-v47'
    ],
    cardDesignId: 'food-travel-journal-v47'
  }
] as const satisfies readonly TaiwanFoodCardCompositionSpec[]

function requiredById<T extends { id: string }>(items: readonly T[], id: string, layer: string): T {
  const item = items.find(candidate => candidate.id === id)
  if (!item) throw new Error(`Missing Taiwan food ${layer}: ${id}`)
  return item
}

export function composeTaiwanFoodCard(spec: TaiwanFoodCardCompositionSpec): TaiwanFoodCardComposition {
  const presentation = resolveCardPresentationLayers(spec, {
    artworks: Object.entries(TAIWAN_FOOD_ART).map(([id, src]) => ({ id, src, focus: TAIWAN_FOOD_ART_FOCUS[id] ?? taiwanFoodArtworkFocus(id) })),
    questions: TAIWAN_FOOD_QUESTIONS,
    questionSets: TAIWAN_FOOD_QUESTION_SETS,
    cardDesigns: TAIWAN_FOOD_CARD_DESIGNS,
  })
  return {
    id: spec.id,
    subject: requiredById(TAIWAN_FOOD_SUBJECTS, spec.subjectId, 'subject'),
    artwork: presentation.artwork,
    story: requiredById(TAIWAN_FOOD_STORIES, spec.storyId, 'story'),
    question: presentation.question,
    spicyQuestion: requiredById(TAIWAN_FOOD_QUESTIONS, spec.spicyQuestionId, 'spicy question'),
    questionSets: presentation.questionSets,
    cardDesign: presentation.cardDesign,
  }
}

export function resolveTaiwanFoodComposition(id: string): TaiwanFoodCardComposition {
  return composeTaiwanFoodCard(requiredById(TAIWAN_FOOD_COMPOSITION_SPECS, id, 'composition'))
}

export const TAIWAN_FOOD_COMPOSITIONS = TAIWAN_FOOD_COMPOSITION_SPECS.map(composeTaiwanFoodCard)
