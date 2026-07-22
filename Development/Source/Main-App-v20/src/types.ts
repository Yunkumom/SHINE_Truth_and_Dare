export type Language = 'zh' | 'en' | 'bilingual'
export type Mode = 'truth' | 'dare' | 'random'
export type CardMode = Exclude<Mode, 'random'>
export type Level = 1 | 2 | 3 | 4 | 5

export interface Card {
  id: string
  level: Level
  mode: CardMode
  zh: string
  en: string
}

export interface ArtworkVariant {
  id: string
  deityId: string
  zhName: string
  enName: string
  src: string
  hiddenTaiwan: string
}

export interface Blessing {
  id: string
  zh: string
  en: string
}

export interface EncounterComposition {
  card: Card
  artwork: ArtworkVariant
  blessing: Blessing
}
