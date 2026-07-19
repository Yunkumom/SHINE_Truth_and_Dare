import mazuSrc from '../assets/deities/mazu-taiwan.webp'
import guanyinSrc from '../assets/deities/guanyin-taiwan.webp'
import guanshengSrc from '../assets/deities/guansheng-dijun-taiwan.webp'
import xuantianSrc from '../assets/deities/xuantian-shangdi-taiwan.webp'
import baoshengSrc from '../assets/deities/baosheng-dadi-taiwan.webp'
import tudigongSrc from '../assets/deities/tudigong-taiwan.webp'
import wenchangSrc from '../assets/deities/wenchang-dijun-taiwan.webp'
import yueLaoSrc from '../assets/deities/yue-lao-taiwan.webp'
import zhushengSrc from '../assets/deities/zhusheng-niangniang-taiwan.webp'

export type DeityArt = { id: string; zhName: string; enName: string; src: string }

export const DEITY_ART: readonly DeityArt[] = [
  ['mazu', '媽祖', 'Mazu', mazuSrc], ['guanyin', '觀音', 'Guanyin', guanyinSrc],
  ['guansheng-dijun', '關聖帝君', 'Guan Sheng Dijun', guanshengSrc], ['xuantian-shangdi', '玄天上帝', 'Xuantian Shangdi', xuantianSrc],
  ['baosheng-dadi', '保生大帝', 'Baosheng Dadi', baoshengSrc], ['tudigong', '土地公', 'Tudigong', tudigongSrc],
  ['wenchang-dijun', '文昌帝君', 'Wenchang Dijun', wenchangSrc], ['yue-lao', '月老', 'Yue Lao', yueLaoSrc],
  ['zhusheng-niangniang', '註生娘娘', 'Zhusheng Niangniang', zhushengSrc],
].map(([id, zhName, enName, src]) => ({ id, zhName, enName, src }))

export const CARD_EXPORT_LAYOUT = {
  header: { x: 42, y: 38, width: 996, height: 142 },
  art: { x: 48, y: 202, width: 984, height: 918 },
  question: { x: 48, y: 1144, width: 984, height: 426 },
} as const

export function deityForCard(cardId: string): DeityArt {
  const hash = [...cardId].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 0)
  return DEITY_ART[hash % DEITY_ART.length]
}
