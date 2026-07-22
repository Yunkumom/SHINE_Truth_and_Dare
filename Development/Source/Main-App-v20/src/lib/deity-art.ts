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
  { id: 'mazu-sea', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: mazuSrc, hiddenTaiwan: 'luminous cloud silhouette' },
  { id: 'mazu-lantern', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: mazuLanternSrc, hiddenTaiwan: 'lantern metalwork' },
  { id: 'guanyin-moon', deityId: 'guanyin', zhName: '觀音', enName: 'Guanyin', src: guanyinSrc, hiddenTaiwan: 'moonlit cloud silhouette' },
  { id: 'guanyin-lotus', deityId: 'guanyin', zhName: '觀音', enName: 'Guanyin', src: guanyinLotusSrc, hiddenTaiwan: 'lotus-leaf negative space' },
  { id: 'guansheng-guardian', deityId: 'guansheng-dijun', zhName: '關聖帝君', enName: 'Guan Sheng Dijun', src: guanshengSrc, hiddenTaiwan: 'lightning silhouette' },
  { id: 'guansheng-courtyard', deityId: 'guansheng-dijun', zhName: '關聖帝君', enName: 'Guan Sheng Dijun', src: guanshengCourtyardSrc, hiddenTaiwan: 'polearm guard ornament' },
  { id: 'xuantian-sea', deityId: 'xuantian-shangdi', zhName: '玄天上帝', enName: 'Xuantian Shangdi', src: xuantianSrc, hiddenTaiwan: 'golden aura silhouette' },
  { id: 'xuantian-stair', deityId: 'xuantian-shangdi', zhName: '玄天上帝', enName: 'Xuantian Shangdi', src: xuantianStairSrc, hiddenTaiwan: 'basalt stair engraving' },
  { id: 'baosheng-herbs', deityId: 'baosheng-dadi', zhName: '保生大帝', enName: 'Baosheng Dadi', src: baoshengSrc, hiddenTaiwan: 'herbal aura silhouette' },
  { id: 'baosheng-apothecary', deityId: 'baosheng-dadi', zhName: '保生大帝', enName: 'Baosheng Dadi', src: baoshengApothecarySrc, hiddenTaiwan: 'bronze mortar ornament' },
  { id: 'tudigong-throne', deityId: 'tudigong', zhName: '土地公', enName: 'Tudigong', src: tudigongSrc, hiddenTaiwan: 'mountain aura silhouette' },
  { id: 'tudigong-harvest', deityId: 'tudigong', zhName: '土地公', enName: 'Tudigong', src: tudigongHarvestSrc, hiddenTaiwan: 'woven harvest basket' },
  { id: 'wenchang-stars', deityId: 'wenchang-dijun', zhName: '文昌帝君', enName: 'Wenchang Dijun', src: wenchangSrc, hiddenTaiwan: 'calligraphic aura silhouette' },
  { id: 'wenchang-study', deityId: 'wenchang-dijun', zhName: '文昌帝君', enName: 'Wenchang Dijun', src: wenchangStudySrc, hiddenTaiwan: 'book-corner embossing' },
  { id: 'yue-lao-moon', deityId: 'yue-lao', zhName: '月老', enName: 'Yue Lao', src: yueLaoSrc, hiddenTaiwan: 'red-thread constellation' },
  { id: 'yue-lao-banyan', deityId: 'yue-lao', zhName: '月老', enName: 'Yue Lao', src: yueLaoBanyanSrc, hiddenTaiwan: 'jade thread-spool pendant' },
  { id: 'zhusheng-lotus', deityId: 'zhusheng-niangniang', zhName: '註生娘娘', enName: 'Zhusheng Niangniang', src: zhushengSrc, hiddenTaiwan: 'garden aura silhouette' },
  { id: 'zhusheng-lamp', deityId: 'zhusheng-niangniang', zhName: '註生娘娘', enName: 'Zhusheng Niangniang', src: zhushengLampSrc, hiddenTaiwan: 'lotus-lamp filigree' },
]

export const CARD_EXPORT_LAYOUT = {
  header: { x: 42, y: 38, width: 996, height: 142 },
  art: { x: 48, y: 202, width: 984, height: 880 },
  question: { x: 48, y: 1106, width: 984, height: 270 },
  blessing: { x: 48, y: 1400, width: 984, height: 170 },
} as const
