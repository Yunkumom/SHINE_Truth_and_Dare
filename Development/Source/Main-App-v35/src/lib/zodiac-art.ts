import aquariusSrc from '../assets/zodiac/taiwan/tw-zodiac-aquarius-safe-v33.webp'
import ariesSrc from '../assets/zodiac/taiwan/tw-zodiac-aries-safe-v33.webp'
import cancerSrc from '../assets/zodiac/taiwan/tw-zodiac-cancer-safe-v33.webp'
import capricornSrc from '../assets/zodiac/taiwan/tw-zodiac-capricorn-safe-v33.webp'
import geminiSrc from '../assets/zodiac/taiwan/tw-zodiac-gemini-safe-v33.webp'
import leoSrc from '../assets/zodiac/taiwan/tw-zodiac-leo-safe-v33.webp'
import libraSrc from '../assets/zodiac/taiwan/tw-zodiac-libra-safe-v33.webp'
import piscesSrc from '../assets/zodiac/taiwan/tw-zodiac-pisces-safe-v33.webp'
import sagittariusSrc from '../assets/zodiac/taiwan/tw-zodiac-sagittarius-safe-v33.webp'
import scorpioSrc from '../assets/zodiac/taiwan/tw-zodiac-scorpio-safe-v33.webp'
import taurusSrc from '../assets/zodiac/taiwan/tw-zodiac-taurus-safe-v33.webp'
import virgoSrc from '../assets/zodiac/taiwan/tw-zodiac-virgo-safe-v33.webp'
import type { ArtworkVariant, TaiwanHotspot } from '../types'

type ZodiacSeed = {
  id: string
  sign: string
  zhName: string
  enName: string
  src: string
  hiddenTaiwan: string
  hotspot: Omit<TaiwanHotspot, 'scale' | 'rotation' | 'accent'> & Partial<Pick<TaiwanHotspot, 'scale'>>
}

const zodiac = ({ id, sign, zhName, enName, src, hiddenTaiwan, hotspot }: ZodiacSeed): ArtworkVariant => ({
  id,
  deityId: sign,
  subjectId: sign,
  collectionId: 'taiwan-zodiac-classic',
  countryCode: 'TW',
  culture: 'Taiwan',
  subjectKind: 'zodiac',
  zhName,
  enName,
  src,
  hiddenTaiwan,
  featureLabel: classicFeatures[sign].label,
  featureDescription: classicFeatures[sign].description,
  portraitFocus: { x: 50, y: 22 },
  taiwanHotspot: { ...hotspot, scale: hotspot.scale ?? .88, rotation: 0, accent: '#fff1a8' },
})

const classicFeatures: Record<string, { label: { zh: string, en: string }, description: { zh: string, en: string } }> = {
  aries: { label: { zh: '合歡山與高山晨光', en: 'Hehuanshan and alpine dawn' }, description: { zh: '以合歡山雲海與高山日出呈現台灣中央山脈的開闊景觀。', en: 'Hehuanshan cloud seas and sunrise evoke Taiwan’s Central Mountain Range.' } },
  taurus: { label: { zh: '阿里山茶園', en: 'Alishan tea fields' }, description: { zh: '高山茶園與山霧是阿里山重要的農業文化景觀。', en: 'High-mountain tea and mist are central to Alishan’s agricultural landscape.' } },
  gemini: { label: { zh: '台灣燈籠工藝', en: 'Taiwanese lantern craft' }, description: { zh: '成對燈籠呼應台灣廟會、節慶與街區常見的燈藝。', en: 'Twin lanterns echo the lighting arts seen in Taiwanese temples and festivals.' } },
  cancer: { label: { zh: '澎湖潮汐與玄武岩', en: 'Penghu tides and basalt' }, description: { zh: '海潮與玄武岩地貌共同指向澎湖群島的海洋環境。', en: 'Tides and basalt formations point to Penghu’s island environment.' } },
  leo: { label: { zh: '台灣廟埕與日輪', en: 'Taiwanese temple courtyard' }, description: { zh: '廟埕是節慶、表演與社區相聚的重要公共空間。', en: 'Temple courtyards are important spaces for festivals, performance and community.' } },
  virgo: { label: { zh: '池上稻田', en: 'Chishang rice fields' }, description: { zh: '縱谷水源與稻作形成池上廣闊而整齊的農田景觀。', en: 'Valley water and rice farming shape Chishang’s broad agricultural landscape.' } },
  libra: { label: { zh: '大稻埕商業街屋', en: 'Dadaocheng shophouses' }, description: { zh: '茶業、街屋與河港共同記錄大稻埕的城市發展。', en: 'Tea trade, shophouses and the river port record Dadaocheng’s growth.' } },
  scorpio: { label: { zh: '太魯閣峽谷', en: 'Taroko Gorge' }, description: { zh: '大理岩峽谷與溪流呈現台灣東部劇烈的地質地景。', en: 'Marble walls and river water reflect eastern Taiwan’s dramatic geology.' } },
  sagittarius: { label: { zh: '玉山與台灣藍鵲', en: 'Yushan and Taiwan blue magpie' }, description: { zh: '最高峰玉山與特有種台灣藍鵲代表台灣高山生態。', en: 'Yushan and the endemic Taiwan blue magpie represent alpine ecology.' } },
  capricorn: { label: { zh: '清水斷崖', en: 'Qingshui Cliff' }, description: { zh: '中央山脈在清水斷崖直接臨接太平洋。', en: 'At Qingshui Cliff, Taiwan’s Central Range meets the Pacific.' } },
  aquarius: { label: { zh: '九份山城雨景', en: 'Rainy Jiufen hillside' }, description: { zh: '階梯巷弄與雨霧呈現九份依山而建的聚落樣貌。', en: 'Stair lanes and rain evoke Jiufen’s dense hillside settlement.' } },
  pisces: { label: { zh: '東海岸與黑潮', en: 'East coast and Kuroshio' }, description: { zh: '黑潮沿東岸北上，深刻影響台灣海洋生態與漁業。', en: 'The Kuroshio flows north along Taiwan’s east coast, shaping marine life and fisheries.' } },
}

export const TAIWAN_ZODIAC_CLASSIC_ART: readonly ArtworkVariant[] = [
  // Calibrated to the default rendered card crop; the manifest retains master-image coordinates.
  zodiac({ id: 'tw-zodiac-aries', sign: 'aries', zhName: '牡羊座・合歡破曉', enName: 'Aries · Hehuan Dawn', src: ariesSrc, hiddenTaiwan: 'turquoise Taiwan chest clasp', hotspot: { x: 49, y: 54, color: '#25c9c4' } }),
  zodiac({ id: 'tw-zodiac-taurus', sign: 'taurus', zhName: '金牛座・阿里山茶境', enName: 'Taurus · Alishan Tea Mist', src: taurusSrc, hiddenTaiwan: 'ruby Taiwan tea-basket medallion', hotspot: { x: 50, y: 87, color: '#c93e37' } }),
  zodiac({ id: 'tw-zodiac-gemini', sign: 'gemini', zhName: '雙子座・雙燈相映', enName: 'Gemini · Twin Lanterns', src: geminiSrc, hiddenTaiwan: 'jade Taiwan embroidery joining twin sashes', hotspot: { x: 50, y: 91, color: '#55c78b', scale: .76 } }),
  zodiac({ id: 'tw-zodiac-cancer', sign: 'cancer', zhName: '巨蟹座・澎湖月潮', enName: 'Cancer · Penghu Moon Tide', src: cancerSrc, hiddenTaiwan: 'coral-red Taiwan breastplate inlay', hotspot: { x: 50, y: 59, color: '#d15b43' } }),
  zodiac({ id: 'tw-zodiac-leo', sign: 'leo', zhName: '獅子座・廟埕日輪', enName: 'Leo · Temple Sun', src: leoSrc, hiddenTaiwan: 'cobalt Taiwan belt medallion', hotspot: { x: 46, y: 73, color: '#2c70c9' } }),
  zodiac({ id: 'tw-zodiac-virgo', sign: 'virgo', zhName: '處女座・池上豐穗', enName: 'Virgo · Chishang Harvest', src: virgoSrc, hiddenTaiwan: 'violet Taiwan apron embroidery', hotspot: { x: 50, y: 89, color: '#8b63df', scale: .78 } }),
  zodiac({ id: 'tw-zodiac-libra', sign: 'libra', zhName: '天秤座・大稻埕衡光', enName: 'Libra · Dadaocheng Balance', src: libraSrc, hiddenTaiwan: 'emerald Taiwan scale counterweight', hotspot: { x: 49, y: 62, color: '#35a86c' } }),
  zodiac({ id: 'tw-zodiac-scorpio', sign: 'scorpio', zhName: '天蠍座・峽谷雷行', enName: 'Scorpio · Gorge Thunder', src: scorpioSrc, hiddenTaiwan: 'amber Taiwan gauntlet inlay', hotspot: { x: 47, y: 67, color: '#e3902f' } }),
  zodiac({ id: 'tw-zodiac-sagittarius', sign: 'sagittarius', zhName: '射手座・玉山逐光', enName: 'Sagittarius · Yushan Flight', src: sagittariusSrc, hiddenTaiwan: 'crimson Taiwan chest clasp', hotspot: { x: 56, y: 48, color: '#c6413b', scale: .8 } }),
  zodiac({ id: 'tw-zodiac-capricorn', sign: 'capricorn', zhName: '摩羯座・清水崖誓', enName: 'Capricorn · Qingshui Resolve', src: capricornSrc, hiddenTaiwan: 'turquoise Taiwan shoulder buckle', hotspot: { x: 46, y: 41, color: '#25bcb6', scale: .8 } }),
  zodiac({ id: 'tw-zodiac-aquarius', sign: 'aquarius', zhName: '水瓶座・九份雨泉', enName: 'Aquarius · Jiufen Rain Spring', src: aquariusSrc, hiddenTaiwan: 'gold Taiwan ceramic-vessel relief', hotspot: { x: 49, y: 78, color: '#e5b84d' } }),
  zodiac({ id: 'tw-zodiac-pisces', sign: 'pisces', zhName: '雙魚座・東岸月海', enName: 'Pisces · East Coast Moon Sea', src: piscesSrc, hiddenTaiwan: 'magenta Taiwan jewel between twin fish', hotspot: { x: 50, y: 62, color: '#d34b99' } }),
]

/** @deprecated Use the explicit classic collection name in v34. */
export const TAIWAN_ZODIAC_ART = TAIWAN_ZODIAC_CLASSIC_ART
