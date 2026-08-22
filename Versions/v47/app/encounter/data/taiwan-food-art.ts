import food01 from '../assets/food-v47/01-braised-beef-noodles-v47.webp'
import food02 from '../assets/food-v47/02-tamsui-iron-eggs-v47.webp'
import food03 from '../assets/food-v47/03-hsinchu-rice-noodles-v47.webp'
import food04 from '../assets/food-v47/04-keelung-tempura-v47.webp'
import food05 from '../assets/food-v47/05-daxi-dried-tofu-v47.webp'
import food06 from '../assets/food-v47/06-sun-cake-v47.webp'
import food07 from '../assets/food-v47/07-changhua-bawan-v47.webp'
import food08 from '../assets/food-v47/08-puli-shaoxing-v47.webp'
import food09 from '../assets/food-v47/09-hakka-lei-cha-v47.webp'
import food10 from '../assets/food-v47/10-gukeng-coffee-v47.webp'
import food11 from '../assets/food-v47/11-turkey-rice-v47.webp'
import food12 from '../assets/food-v47/12-tainan-beef-soup-v47.webp'
import food13 from '../assets/food-v47/13-papaya-milk-v47.webp'
import food14 from '../assets/food-v47/14-wanluan-pork-knuckle-v47.webp'
import food15 from '../assets/food-v47/15-coffin-bread-v47.webp'
import food16 from '../assets/food-v47/16-hualien-mochi-v47.webp'
import food17 from '../assets/food-v47/17-chishang-rice-bento-v47.webp'
import food18 from '../assets/food-v47/18-yilan-smoked-duck-v47.webp'
import food19 from '../assets/food-v47/19-peeled-chili-v47.webp'
import food20 from '../assets/food-v47/20-candied-roselle-v47.webp'
import food21 from '../assets/food-v47/21-brown-sugar-cake-v47.webp'
import food22 from '../assets/food-v47/22-cactus-fruit-ice-v47.webp'
import food23 from '../assets/food-v47/23-kinmen-congee-v47.webp'
import food24 from '../assets/food-v47/24-peanut-candy-v47.webp'
import food25 from '../assets/food-v47/25-matsu-fish-noodles-v47.webp'

export const TAIWAN_FOOD_ART: Readonly<Record<string, string>> = {
  'art-food-north-beef-noodles': food01,
  'art-food-north-iron-eggs': food02,
  'art-food-north-hsinchu-rice-noodles': food03,
  'art-food-north-keelung-tempura': food04,
  'art-food-north-daxi-tofu': food05,
  'art-food-central-sun-cake': food06,
  'art-food-central-changhua-bawan': food07,
  'art-food-central-puli-shaoxing': food08,
  'art-food-central-hakka-lei-cha': food09,
  'art-food-central-gukeng-coffee': food10,
  'art-food-south-turkey-rice': food11,
  'art-food-south-tainan-beef-soup': food12,
  'art-food-south-papaya-milk': food13,
  'art-food-south-wanluan-pork': food14,
  'art-food-south-coffin-bread': food15,
  'art-food-east-hualien-mochi': food16,
  'art-food-east-chishang-rice': food17,
  'art-food-east-yilan-duck': food18,
  'art-food-east-hualien-chili': food19,
  'art-food-east-taitung-roselle': food20,
  'art-food-offshore-penghu-brown-sugar': food21,
  'art-food-offshore-penghu-cactus': food22,
  'art-food-offshore-kinmen-congee': food23,
  'art-food-offshore-kinmen-peanut-candy': food24,
  'art-food-offshore-matsu-fish-noodles': food25,
}

export const TAIWAN_FOOD_ART_FOCUS: Readonly<Record<string, { x: number, y: number }>> = {
  'art-food-north-beef-noodles': { x: 50, y: 44 },
}

export function taiwanFoodArtworkFocus(id: string) {
  return TAIWAN_FOOD_ART_FOCUS[id] ?? { x: 50, y: 50 }
}
