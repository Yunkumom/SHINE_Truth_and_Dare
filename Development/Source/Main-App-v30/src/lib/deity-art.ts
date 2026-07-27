import mazuSrc from '../assets/deities/mazu-sea-safe-v30.webp'
import mazuLanternSrc from '../assets/deities/mazu-lantern-safe-v30.webp'
import guanyinSrc from '../assets/deities/guanyin-moon-safe-v30.webp'
import guanyinLotusSrc from '../assets/deities/guanyin-lotus-safe-v30.webp'
import guanshengSrc from '../assets/deities/guansheng-guardian-safe-v30.webp'
import guanshengCourtyardSrc from '../assets/deities/guansheng-courtyard-safe-v30.webp'
import xuantianSrc from '../assets/deities/xuantian-sea-safe-v30.webp'
import xuantianStairSrc from '../assets/deities/xuantian-stair-safe-v30.webp'
import baoshengSrc from '../assets/deities/baosheng-herbs-safe-v30.webp'
import baoshengApothecarySrc from '../assets/deities/baosheng-apothecary-safe-v30.webp'
import tudigongSrc from '../assets/deities/tudigong-throne-safe-v30.webp'
import tudigongHarvestSrc from '../assets/deities/tudigong-harvest-safe-v30.webp'
import wenchangSrc from '../assets/deities/wenchang-stars-safe-v30.webp'
import wenchangStudySrc from '../assets/deities/wenchang-study-safe-v30.webp'
import yueLaoSrc from '../assets/deities/yue-lao-moon-safe-v30.webp'
import yueLaoBanyanSrc from '../assets/deities/yue-lao-banyan-safe-v30.webp'
import zhushengSrc from '../assets/deities/zhusheng-lotus-safe-v30.webp'
import zhushengLampSrc from '../assets/deities/zhusheng-lamp-safe-v30.webp'
import type { ArtworkVariant } from '../types'

export const DEITY_ART: readonly ArtworkVariant[] = [
  { id: 'mazu-sea', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: mazuSrc, hiddenTaiwan: 'turquoise central-sash embroidery', portraitFocus: { x: 50, y: 15 }, taiwanHotspot: { x: 50, y: 80, scale: .9, rotation: 0, color: '#24c9c3', accent: '#fff1a8' } },
  { id: 'mazu-lantern', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: mazuLanternSrc, hiddenTaiwan: 'jade lantern inlay', portraitFocus: { x: 50, y: 15 }, taiwanHotspot: { x: 51, y: 77, scale: .86, rotation: 0, color: '#54d7b2', accent: '#fff1a8' } },
  { id: 'guanyin-moon', deityId: 'guanyin', zhName: '觀音', enName: 'Guanyin', src: guanyinSrc, hiddenTaiwan: 'cobalt vase enamel', portraitFocus: { x: 50, y: 18 }, taiwanHotspot: { x: 51, y: 68, scale: .86, rotation: 0, color: '#2d79d7', accent: '#8ff4ee' } },
  { id: 'guanyin-lotus', deityId: 'guanyin', zhName: '觀音', enName: 'Guanyin', src: guanyinLotusSrc, hiddenTaiwan: 'violet central-sash embroidery', portraitFocus: { x: 50, y: 40 }, taiwanHotspot: { x: 48, y: 87, scale: .88, rotation: 0, color: '#7f65e8', accent: '#fff1a8' } },
  { id: 'guansheng-guardian', deityId: 'guansheng-dijun', zhName: '關聖帝君', enName: 'Guan Sheng Dijun', src: guanshengSrc, hiddenTaiwan: 'cinnabar chest-armor inlay', portraitFocus: { x: 50, y: 15 }, taiwanHotspot: { x: 51, y: 67, scale: .88, rotation: 0, color: '#e23e35', accent: '#ffe78f' } },
  { id: 'guansheng-courtyard', deityId: 'guansheng-dijun', zhName: '關聖帝君', enName: 'Guan Sheng Dijun', src: guanshengCourtyardSrc, hiddenTaiwan: 'turquoise chest medallion', portraitFocus: { x: 50, y: 30 }, taiwanHotspot: { x: 50, y: 80, scale: .86, rotation: 0, color: '#26c6bd', accent: '#fff1a8' } },
  { id: 'xuantian-sea', deityId: 'xuantian-shangdi', zhName: '玄天上帝', enName: 'Xuantian Shangdi', src: xuantianSrc, hiddenTaiwan: 'sapphire chest-armor inlay', portraitFocus: { x: 50, y: 12 }, taiwanHotspot: { x: 50, y: 59, scale: .88, rotation: 0, color: '#3187df', accent: '#f6e29b' } },
  { id: 'xuantian-stair', deityId: 'xuantian-shangdi', zhName: '玄天上帝', enName: 'Xuantian Shangdi', src: xuantianStairSrc, hiddenTaiwan: 'teal belt-guard inlay', portraitFocus: { x: 50, y: 15 }, taiwanHotspot: { x: 50, y: 73, scale: .86, rotation: 0, color: '#26b8ac', accent: '#fff1a8' } },
  { id: 'baosheng-herbs', deityId: 'baosheng-dadi', zhName: '保生大帝', enName: 'Baosheng Dadi', src: baoshengSrc, hiddenTaiwan: 'emerald medicine-scroll inlay', portraitFocus: { x: 50, y: 18 }, taiwanHotspot: { x: 50, y: 69, scale: .9, rotation: 0, color: '#38b96f', accent: '#fff1a8' } },
  { id: 'baosheng-apothecary', deityId: 'baosheng-dadi', zhName: '保生大帝', enName: 'Baosheng Dadi', src: baoshengApothecarySrc, hiddenTaiwan: 'turquoise medicine-mortar enamel', portraitFocus: { x: 50, y: 20 }, taiwanHotspot: { x: 51, y: 76, scale: .72, rotation: 0, color: '#22c4bd', accent: '#fff1a8' } },
  { id: 'tudigong-throne', deityId: 'tudigong', zhName: '土地公', enName: 'Tudigong', src: tudigongSrc, hiddenTaiwan: 'ruby gold-ingot inlay', portraitFocus: { x: 50, y: 18 }, taiwanHotspot: { x: 50, y: 68, scale: .78, rotation: 0, color: '#d93651', accent: '#ffe7a3' } },
  { id: 'tudigong-harvest', deityId: 'tudigong', zhName: '土地公', enName: 'Tudigong', src: tudigongHarvestSrc, hiddenTaiwan: 'sapphire harvest-basket weave', portraitFocus: { x: 50, y: 18 }, taiwanHotspot: { x: 50, y: 74, scale: .88, rotation: 0, color: '#327fd6', accent: '#fff1a8' } },
  { id: 'wenchang-stars', deityId: 'wenchang-dijun', zhName: '文昌帝君', enName: 'Wenchang Dijun', src: wenchangSrc, hiddenTaiwan: 'sapphire book-cover inlay', portraitFocus: { x: 50, y: 18 }, taiwanHotspot: { x: 51, y: 74, scale: .84, rotation: 0, color: '#245dcc', accent: '#fff1a8' } },
  { id: 'wenchang-study', deityId: 'wenchang-dijun', zhName: '文昌帝君', enName: 'Wenchang Dijun', src: wenchangStudySrc, hiddenTaiwan: 'violet illuminated scroll', portraitFocus: { x: 50, y: 30 }, taiwanHotspot: { x: 51, y: 80, scale: .94, rotation: 0, color: '#8a61e6', accent: '#fff1a8' } },
  { id: 'yue-lao-moon', deityId: 'yue-lao', zhName: '月老', enName: 'Yue Lao', src: yueLaoSrc, hiddenTaiwan: 'rose-red marriage-book inlay', portraitFocus: { x: 50, y: 18 }, taiwanHotspot: { x: 50, y: 74, scale: .88, rotation: 0, color: '#d84d62', accent: '#fff1a8' } },
  { id: 'yue-lao-banyan', deityId: 'yue-lao', zhName: '月老', enName: 'Yue Lao', src: yueLaoBanyanSrc, hiddenTaiwan: 'jade central pendant', portraitFocus: { x: 50, y: 18 }, taiwanHotspot: { x: 47, y: 74, scale: .88, rotation: 0, color: '#82d45f', accent: '#fff1a8' } },
  { id: 'zhusheng-lotus', deityId: 'zhusheng-niangniang', zhName: '註生娘娘', enName: 'Zhusheng Niangniang', src: zhushengSrc, hiddenTaiwan: 'coral ceremonial-tablet inlay', portraitFocus: { x: 50, y: 15 }, taiwanHotspot: { x: 50, y: 70, scale: .9, rotation: 0, color: '#e58b8c', accent: '#fff1a8' } },
  { id: 'zhusheng-lamp', deityId: 'zhusheng-niangniang', zhName: '註生娘娘', enName: 'Zhusheng Niangniang', src: zhushengLampSrc, hiddenTaiwan: 'ruby lotus-lamp filigree', portraitFocus: { x: 50, y: 8 }, taiwanHotspot: { x: 50, y: 65, scale: .84, rotation: 0, color: '#d9463f', accent: '#ffe7a3' } },
]

export const CARD_EXPORT_LAYOUT = {
  header: { x: 42, y: 38, width: 996, height: 142 },
  art: { x: 48, y: 202, width: 984, height: 880 },
  question: { x: 48, y: 1106, width: 984, height: 270 },
  blessing: { x: 48, y: 1400, width: 984, height: 170 },
} as const
