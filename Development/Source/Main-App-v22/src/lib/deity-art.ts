import mazuSrc from '../assets/deities/mazu-taiwan.webp'
import mazuLanternSrc from '../assets/deities/mazu-lantern-taiwan.webp'
import guanyinSrc from '../assets/deities/guanyin-taiwan.webp'
import guanyinLotusSrc from '../assets/deities/guanyin-lotus-taiwan.webp'
import guanshengSrc from '../assets/deities/guansheng-dijun-taiwan.webp'
import guanshengCourtyardSrc from '../assets/deities/guansheng-dijun-courtyard-taiwan.webp'
import xuantianSrc from '../assets/deities/xuantian-shangdi-taiwan.webp'
import xuantianStairSrc from '../assets/deities/xuantian-shangdi-stair-taiwan.webp'
import baoshengSrc from '../assets/deities/baosheng-dadi-taiwan.webp'
import baoshengApothecarySrc from '../assets/deities/baosheng-dadi-apothecary-taiwan.webp'
import tudigongSrc from '../assets/deities/tudigong-taiwan.webp'
import tudigongHarvestSrc from '../assets/deities/tudigong-harvest-taiwan.webp'
import wenchangSrc from '../assets/deities/wenchang-dijun-taiwan.webp'
import wenchangStudySrc from '../assets/deities/wenchang-dijun-study-taiwan.webp'
import yueLaoSrc from '../assets/deities/yue-lao-taiwan.webp'
import yueLaoBanyanSrc from '../assets/deities/yue-lao-banyan-taiwan.webp'
import zhushengSrc from '../assets/deities/zhusheng-niangniang-taiwan.webp'
import zhushengLampSrc from '../assets/deities/zhusheng-niangniang-lamp-taiwan.webp'
import type { ArtworkVariant } from '../types'

export const DEITY_ART: readonly ArtworkVariant[] = [
  { id: 'mazu-sea', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: mazuSrc, hiddenTaiwan: 'luminous cloud silhouette', taiwanHotspot: { x: 58, y: 10, scale: .9, rotation: 8 } },
  { id: 'mazu-lantern', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: mazuLanternSrc, hiddenTaiwan: 'lantern metalwork', taiwanHotspot: { x: 79, y: 49, scale: .62, rotation: -7 } },
  { id: 'guanyin-moon', deityId: 'guanyin', zhName: '觀音', enName: 'Guanyin', src: guanyinSrc, hiddenTaiwan: 'moonlit cloud silhouette', taiwanHotspot: { x: 80, y: 13, scale: .82, rotation: 12 } },
  { id: 'guanyin-lotus', deityId: 'guanyin', zhName: '觀音', enName: 'Guanyin', src: guanyinLotusSrc, hiddenTaiwan: 'lotus-leaf negative space', taiwanHotspot: { x: 77, y: 87, scale: .7, rotation: -14 } },
  { id: 'guansheng-guardian', deityId: 'guansheng-dijun', zhName: '關聖帝君', enName: 'Guan Sheng Dijun', src: guanshengSrc, hiddenTaiwan: 'lightning silhouette', taiwanHotspot: { x: 78, y: 14, scale: .92, rotation: 16 } },
  { id: 'guansheng-courtyard', deityId: 'guansheng-dijun', zhName: '關聖帝君', enName: 'Guan Sheng Dijun', src: guanshengCourtyardSrc, hiddenTaiwan: 'polearm guard ornament', taiwanHotspot: { x: 26, y: 59, scale: .58, rotation: -18 } },
  { id: 'xuantian-sea', deityId: 'xuantian-shangdi', zhName: '玄天上帝', enName: 'Xuantian Shangdi', src: xuantianSrc, hiddenTaiwan: 'golden aura silhouette', taiwanHotspot: { x: 64, y: 12, scale: .86, rotation: 5 } },
  { id: 'xuantian-stair', deityId: 'xuantian-shangdi', zhName: '玄天上帝', enName: 'Xuantian Shangdi', src: xuantianStairSrc, hiddenTaiwan: 'basalt stair engraving', taiwanHotspot: { x: 74, y: 89, scale: .66, rotation: 21 } },
  { id: 'baosheng-herbs', deityId: 'baosheng-dadi', zhName: '保生大帝', enName: 'Baosheng Dadi', src: baoshengSrc, hiddenTaiwan: 'herbal aura silhouette', taiwanHotspot: { x: 27, y: 15, scale: .88, rotation: -11 } },
  { id: 'baosheng-apothecary', deityId: 'baosheng-dadi', zhName: '保生大帝', enName: 'Baosheng Dadi', src: baoshengApothecarySrc, hiddenTaiwan: 'bronze mortar ornament', taiwanHotspot: { x: 43, y: 69, scale: .6, rotation: 9 } },
  { id: 'tudigong-throne', deityId: 'tudigong', zhName: '土地公', enName: 'Tudigong', src: tudigongSrc, hiddenTaiwan: 'mountain aura silhouette', taiwanHotspot: { x: 35, y: 15, scale: .83, rotation: -5 } },
  { id: 'tudigong-harvest', deityId: 'tudigong', zhName: '土地公', enName: 'Tudigong', src: tudigongHarvestSrc, hiddenTaiwan: 'woven harvest basket', taiwanHotspot: { x: 42, y: 65, scale: .68, rotation: -15 } },
  { id: 'wenchang-stars', deityId: 'wenchang-dijun', zhName: '文昌帝君', enName: 'Wenchang Dijun', src: wenchangSrc, hiddenTaiwan: 'calligraphic aura silhouette', taiwanHotspot: { x: 79, y: 15, scale: .87, rotation: 14 } },
  { id: 'wenchang-study', deityId: 'wenchang-dijun', zhName: '文昌帝君', enName: 'Wenchang Dijun', src: wenchangStudySrc, hiddenTaiwan: 'book-corner embossing', taiwanHotspot: { x: 80, y: 90, scale: .57, rotation: 19 } },
  { id: 'yue-lao-moon', deityId: 'yue-lao', zhName: '月老', enName: 'Yue Lao', src: yueLaoSrc, hiddenTaiwan: 'red-thread constellation', taiwanHotspot: { x: 79, y: 20, scale: .94, rotation: 10 } },
  { id: 'yue-lao-banyan', deityId: 'yue-lao', zhName: '月老', enName: 'Yue Lao', src: yueLaoBanyanSrc, hiddenTaiwan: 'jade thread-spool pendant', taiwanHotspot: { x: 58, y: 75, scale: .56, rotation: -9 } },
  { id: 'zhusheng-lotus', deityId: 'zhusheng-niangniang', zhName: '註生娘娘', enName: 'Zhusheng Niangniang', src: zhushengSrc, hiddenTaiwan: 'garden aura silhouette', taiwanHotspot: { x: 61, y: 12, scale: .89, rotation: 6 } },
  { id: 'zhusheng-lamp', deityId: 'zhusheng-niangniang', zhName: '註生娘娘', enName: 'Zhusheng Niangniang', src: zhushengLampSrc, hiddenTaiwan: 'lotus-lamp filigree', taiwanHotspot: { x: 52, y: 68, scale: .64, rotation: -12 } },
]

export const CARD_EXPORT_LAYOUT = {
  header: { x: 42, y: 38, width: 996, height: 142 },
  art: { x: 48, y: 202, width: 984, height: 880 },
  question: { x: 48, y: 1106, width: 984, height: 270 },
  blessing: { x: 48, y: 1400, width: 984, height: 170 },
} as const
