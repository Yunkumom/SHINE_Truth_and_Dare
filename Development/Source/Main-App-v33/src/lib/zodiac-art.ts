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
  collectionId: 'taiwan-zodiac',
  countryCode: 'TW',
  culture: 'Taiwan',
  subjectKind: 'zodiac',
  zhName,
  enName,
  src,
  hiddenTaiwan,
  portraitFocus: { x: 50, y: 22 },
  taiwanHotspot: { ...hotspot, scale: hotspot.scale ?? .88, rotation: 0, accent: '#fff1a8' },
})

export const TAIWAN_ZODIAC_ART: readonly ArtworkVariant[] = [
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
