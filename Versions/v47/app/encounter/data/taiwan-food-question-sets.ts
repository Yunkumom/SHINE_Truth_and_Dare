import type { TaiwanFoodQuestionSet } from '../types'

export const TAIWAN_FOOD_QUESTION_SETS = [
  {
    id: 'taiwan-food-standard-v47',
    name: {
      zh: '台灣美食旅行題目',
      en: 'Taiwan Food Journey Prompts'
    },
    audience: 'standard',
    questionIds: [
      'question-food-north-beef-noodles-standard',
      'question-food-north-iron-eggs-standard',
      'question-food-north-hsinchu-rice-noodles-standard',
      'question-food-north-keelung-tempura-standard',
      'question-food-north-daxi-tofu-standard',
      'question-food-central-sun-cake-standard',
      'question-food-central-changhua-bawan-standard',
      'question-food-central-puli-shaoxing-standard',
      'question-food-central-hakka-lei-cha-standard',
      'question-food-central-gukeng-coffee-standard',
      'question-food-south-turkey-rice-standard',
      'question-food-south-tainan-beef-soup-standard',
      'question-food-south-papaya-milk-standard',
      'question-food-south-wanluan-pork-standard',
      'question-food-south-coffin-bread-standard',
      'question-food-east-hualien-mochi-standard',
      'question-food-east-chishang-rice-standard',
      'question-food-east-yilan-duck-standard',
      'question-food-east-hualien-chili-standard',
      'question-food-east-taitung-roselle-standard',
      'question-food-offshore-penghu-brown-sugar-standard',
      'question-food-offshore-penghu-cactus-standard',
      'question-food-offshore-kinmen-congee-standard',
      'question-food-offshore-kinmen-peanut-candy-standard',
      'question-food-offshore-matsu-fish-noodles-standard'
    ]
  },
  {
    id: 'taiwan-food-spicy-v47',
    name: {
      zh: '台灣美食旅行可選辛辣題',
      en: 'Taiwan Food Journey Optional Spicy Prompts'
    },
    audience: 'optional-spicy',
    questionIds: [
      'question-food-north-beef-noodles-spicy',
      'question-food-north-iron-eggs-spicy',
      'question-food-north-hsinchu-rice-noodles-spicy',
      'question-food-north-keelung-tempura-spicy',
      'question-food-north-daxi-tofu-spicy',
      'question-food-central-sun-cake-spicy',
      'question-food-central-changhua-bawan-spicy',
      'question-food-central-puli-shaoxing-spicy',
      'question-food-central-hakka-lei-cha-spicy',
      'question-food-central-gukeng-coffee-spicy',
      'question-food-south-turkey-rice-spicy',
      'question-food-south-tainan-beef-soup-spicy',
      'question-food-south-papaya-milk-spicy',
      'question-food-south-wanluan-pork-spicy',
      'question-food-south-coffin-bread-spicy',
      'question-food-east-hualien-mochi-spicy',
      'question-food-east-chishang-rice-spicy',
      'question-food-east-yilan-duck-spicy',
      'question-food-east-hualien-chili-spicy',
      'question-food-east-taitung-roselle-spicy',
      'question-food-offshore-penghu-brown-sugar-spicy',
      'question-food-offshore-penghu-cactus-spicy',
      'question-food-offshore-kinmen-congee-spicy',
      'question-food-offshore-kinmen-peanut-candy-spicy',
      'question-food-offshore-matsu-fish-noodles-spicy'
    ]
  }
] as const satisfies readonly TaiwanFoodQuestionSet[]
