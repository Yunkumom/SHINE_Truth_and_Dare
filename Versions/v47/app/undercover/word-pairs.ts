import type { UndercoverWordPair } from './types.ts'

export const UNDERCOVER_WORD_PAIRS: readonly UndercoverWordPair[] = [
  { id: 'coffee-tea', a: { en: 'Coffee', zh: '咖啡' }, b: { en: 'Tea', zh: '茶' } },
  { id: 'moon-sun', a: { en: 'Moon', zh: '月亮' }, b: { en: 'Sun', zh: '太陽' } },
  { id: 'cat-dog', a: { en: 'Cat', zh: '貓' }, b: { en: 'Dog', zh: '狗' } },
  { id: 'beach-pool', a: { en: 'Beach', zh: '海灘' }, b: { en: 'Pool', zh: '游泳池' } },
  { id: 'train-metro', a: { en: 'Train', zh: '火車' }, b: { en: 'Metro', zh: '捷運' } },
  { id: 'cake-bread', a: { en: 'Cake', zh: '蛋糕' }, b: { en: 'Bread', zh: '麵包' } },
  { id: 'rain-snow', a: { en: 'Rain', zh: '雨' }, b: { en: 'Snow', zh: '雪' } },
  { id: 'doctor-nurse', a: { en: 'Doctor', zh: '醫生' }, b: { en: 'Nurse', zh: '護理師' } },
  { id: 'piano-guitar', a: { en: 'Piano', zh: '鋼琴' }, b: { en: 'Guitar', zh: '吉他' } },
  { id: 'mountain-island', a: { en: 'Mountain', zh: '高山' }, b: { en: 'Island', zh: '島嶼' } },
  { id: 'movie-series', a: { en: 'Movie', zh: '電影' }, b: { en: 'Series', zh: '影集' } },
  { id: 'breakfast-brunch', a: { en: 'Breakfast', zh: '早餐' }, b: { en: 'Brunch', zh: '早午餐' } },
  { id: 'museum-library', a: { en: 'Museum', zh: '博物館' }, b: { en: 'Library', zh: '圖書館' } },
  { id: 'camera-mirror', a: { en: 'Camera', zh: '相機' }, b: { en: 'Mirror', zh: '鏡子' } },
  { id: 'chef-baker', a: { en: 'Chef', zh: '廚師' }, b: { en: 'Baker', zh: '烘焙師' } },
  { id: 'river-lake', a: { en: 'River', zh: '河流' }, b: { en: 'Lake', zh: '湖泊' } },
  { id: 'candle-lantern', a: { en: 'Candle', zh: '蠟燭' }, b: { en: 'Lantern', zh: '燈籠' } },
  { id: 'passport-ticket', a: { en: 'Passport', zh: '護照' }, b: { en: 'Ticket', zh: '票券' } },
  { id: 'honey-jam', a: { en: 'Honey', zh: '蜂蜜' }, b: { en: 'Jam', zh: '果醬' } },
  { id: 'forest-garden', a: { en: 'Forest', zh: '森林' }, b: { en: 'Garden', zh: '花園' } },
  { id: 'letter-postcard', a: { en: 'Letter', zh: '信件' }, b: { en: 'Postcard', zh: '明信片' } },
  { id: 'scooter-bicycle', a: { en: 'Scooter', zh: '機車' }, b: { en: 'Bicycle', zh: '腳踏車' } },
  { id: 'night-market-mall', a: { en: 'Night market', zh: '夜市' }, b: { en: 'Shopping mall', zh: '百貨公司' } },
  { id: 'dumpling-bun', a: { en: 'Dumpling', zh: '水餃' }, b: { en: 'Steamed bun', zh: '包子' } },
] as const

const pairIndex = new Map(UNDERCOVER_WORD_PAIRS.map(pair => [pair.id, pair]))

export function undercoverWordPair(pairId: string) {
  return pairIndex.get(pairId) ?? null
}

