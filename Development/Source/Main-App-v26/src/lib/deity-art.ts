import mazuSrc from '../assets/deities/mazu-sea-taiwan-safe.webp'
import mazuLanternSrc from '../assets/deities/mazu-lantern-taiwan-safe.webp'
import guanyinSrc from '../assets/deities/guanyin-moon-taiwan-safe.webp'
import guanyinLotusSrc from '../assets/deities/guanyin-lotus-taiwan-safe.webp'
import guanshengSrc from '../assets/deities/guansheng-guardian-taiwan-safe.webp'
import guanshengCourtyardSrc from '../assets/deities/guansheng-courtyard-taiwan-safe.webp'
import xuantianSrc from '../assets/deities/xuantian-sea-taiwan-safe.webp'
import xuantianStairSrc from '../assets/deities/xuantian-stair-taiwan-safe.webp'
import baoshengSrc from '../assets/deities/baosheng-herbs-taiwan-safe.webp'
import baoshengApothecarySrc from '../assets/deities/baosheng-apothecary-taiwan-safe.webp'
import tudigongSrc from '../assets/deities/tudigong-throne-taiwan-safe.webp'
import tudigongHarvestSrc from '../assets/deities/tudigong-harvest-taiwan-safe.webp'
import wenchangSrc from '../assets/deities/wenchang-book-taiwan-safe.webp'
import wenchangStudySrc from '../assets/deities/wenchang-study-taiwan-safe.webp'
import yueLaoSrc from '../assets/deities/yuelao-book-taiwan-safe.webp'
import yueLaoBanyanSrc from '../assets/deities/yuelao-banyan-taiwan-safe.webp'
import zhushengSrc from '../assets/deities/zhusheng-tablet-taiwan-safe.webp'
import zhushengLampSrc from '../assets/deities/zhusheng-lamp-taiwan-safe.webp'
import type { ArtworkVariant } from '../types'

export const DEITY_ART: readonly ArtworkVariant[] = [
  { id: 'mazu-sea', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: mazuSrc, hiddenTaiwan: 'turquoise sleeve embroidery', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 67, y: 70, scale: .9, rotation: 7, color: '#24c9c3', accent: '#ff765f' } },
  { id: 'mazu-lantern', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: mazuLanternSrc, hiddenTaiwan: 'jade lantern inlay', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 70, y: 28, scale: .86, rotation: -7, color: '#54d7b2', accent: '#e8493f' } },
  { id: 'guanyin-moon', deityId: 'guanyin', zhName: '觀音', enName: 'Guanyin', src: guanyinSrc, hiddenTaiwan: 'cobalt vase enamel', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 49, y: 64, scale: .84, rotation: 8, color: '#2d79d7', accent: '#38e0d2' } },
  { id: 'guanyin-lotus', deityId: 'guanyin', zhName: '觀音', enName: 'Guanyin', src: guanyinLotusSrc, hiddenTaiwan: 'violet sash embroidery', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 65, y: 70, scale: .82, rotation: -10, color: '#7f65e8', accent: '#46d9e0' } },
  { id: 'guansheng-guardian', deityId: 'guansheng-dijun', zhName: '關聖帝君', enName: 'Guan Sheng Dijun', src: guanshengSrc, hiddenTaiwan: 'cinnabar shoulder armor', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 67, y: 51, scale: .86, rotation: 12, color: '#e23e35', accent: '#28c9c0' } },
  { id: 'guansheng-courtyard', deityId: 'guansheng-dijun', zhName: '關聖帝君', enName: 'Guan Sheng Dijun', src: guanshengCourtyardSrc, hiddenTaiwan: 'turquoise polearm inlay', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 38, y: 81, scale: .74, rotation: -16, color: '#26c6bd', accent: '#ef4c43' } },
  { id: 'xuantian-sea', deityId: 'xuantian-shangdi', zhName: '玄天上帝', enName: 'Xuantian Shangdi', src: xuantianSrc, hiddenTaiwan: 'blue sword enamel', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 58, y: 48, scale: .84, rotation: 5, color: '#3187df', accent: '#f6c45f' } },
  { id: 'xuantian-stair', deityId: 'xuantian-shangdi', zhName: '玄天上帝', enName: 'Xuantian Shangdi', src: xuantianStairSrc, hiddenTaiwan: 'teal chest armor', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 54, y: 50, scale: .82, rotation: -4, color: '#26b8ac', accent: '#ef5146' } },
  { id: 'baosheng-herbs', deityId: 'baosheng-dadi', zhName: '保生大帝', enName: 'Baosheng Dadi', src: baoshengSrc, hiddenTaiwan: 'emerald medicine scroll', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 65, y: 70, scale: .82, rotation: -9, color: '#38b96f', accent: '#f0c45e' } },
  { id: 'baosheng-apothecary', deityId: 'baosheng-dadi', zhName: '保生大帝', enName: 'Baosheng Dadi', src: baoshengApothecarySrc, hiddenTaiwan: 'turquoise medicine mortar', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 51, y: 64, scale: .8, rotation: 9, color: '#22c4bd', accent: '#ff735f' } },
  { id: 'tudigong-throne', deityId: 'tudigong', zhName: '土地公', enName: 'Tudigong', src: tudigongSrc, hiddenTaiwan: 'ruby gold-ingot inlay', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 39, y: 66, scale: .82, rotation: -6, color: '#d93651', accent: '#44c98a' } },
  { id: 'tudigong-harvest', deityId: 'tudigong', zhName: '土地公', enName: 'Tudigong', src: tudigongHarvestSrc, hiddenTaiwan: 'blue basket weaving', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 35, y: 61, scale: .8, rotation: -12, color: '#327fd6', accent: '#e9463f' } },
  { id: 'wenchang-stars', deityId: 'wenchang-dijun', zhName: '文昌帝君', enName: 'Wenchang Dijun', src: wenchangSrc, hiddenTaiwan: 'sapphire book inlay', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 69, y: 86, scale: .82, rotation: 11, color: '#245dcc', accent: '#e7bb54' } },
  { id: 'wenchang-study', deityId: 'wenchang-dijun', zhName: '文昌帝君', enName: 'Wenchang Dijun', src: wenchangStudySrc, hiddenTaiwan: 'violet illuminated scroll', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 52, y: 86, scale: .92, rotation: -4, color: '#8a61e6', accent: '#39c9bb' } },
  { id: 'yue-lao-moon', deityId: 'yue-lao', zhName: '月老', enName: 'Yue Lao', src: yueLaoSrc, hiddenTaiwan: 'rose-red marriage book inlay', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 71, y: 63, scale: .84, rotation: 10, color: '#d84d62', accent: '#2bc9bd' } },
  { id: 'yue-lao-banyan', deityId: 'yue-lao', zhName: '月老', enName: 'Yue Lao', src: yueLaoBanyanSrc, hiddenTaiwan: 'jade waist pendant', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 57, y: 86, scale: .86, rotation: -8, color: '#82d45f', accent: '#f4ce66' } },
  { id: 'zhusheng-lotus', deityId: 'zhusheng-niangniang', zhName: '註生娘娘', enName: 'Zhusheng Niangniang', src: zhushengSrc, hiddenTaiwan: 'coral ceremonial tablet', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 68, y: 72, scale: .84, rotation: 6, color: '#e58b8c', accent: '#45c7c1' } },
  { id: 'zhusheng-lamp', deityId: 'zhusheng-niangniang', zhName: '註生娘娘', enName: 'Zhusheng Niangniang', src: zhushengLampSrc, hiddenTaiwan: 'ruby lotus-lamp filigree', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 47, y: 32, scale: .9, rotation: -8, color: '#d9463f', accent: '#2f70d3' } },
]

export const CARD_EXPORT_LAYOUT = {
  header: { x: 42, y: 38, width: 996, height: 142 },
  art: { x: 48, y: 202, width: 984, height: 880 },
  question: { x: 48, y: 1106, width: 984, height: 270 },
  blessing: { x: 48, y: 1400, width: 984, height: 170 },
} as const
