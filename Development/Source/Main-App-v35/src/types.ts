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

export interface TaiwanHotspot {
  x: number
  y: number
  scale: number
  rotation: number
  color: string
  accent: string
}

export interface ArtworkVariant {
  id: string
  deityId: string
  subjectId?: string
  collectionId?: string
  countryCode?: string
  culture?: string
  subjectKind?: 'deity' | 'zodiac'
  zhName: string
  enName: string
  src: string
  hiddenTaiwan: string
  featureLabel?: { zh: string, en: string }
  featureDescription?: { zh: string, en: string }
  portraitFocus: { x: number, y: number }
  taiwanHotspot: TaiwanHotspot
}

export type CollectionFamily = 'deity' | 'astral'
export type CollectionAvailability = 'available' | 'planned'

export interface ArtworkCollection {
  id: string
  family: CollectionFamily
  region: string
  zhName: string
  enName: string
  zhDescription: string
  enDescription: string
  availability: CollectionAvailability
  artworkIds: readonly string[]
}

export type ArtworkPreference =
  | { mode: 'random', collectionId: string }
  | { mode: 'specific', collectionId: string, artworkId: string }

export type QuestionPreference =
  | { mode: 'random', packId: string }
  | { mode: 'specific', packId: string, questionId: string }

export interface QuestionPack {
  id: string
  zhName: string
  enName: string
  questionIds: readonly string[]
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

export interface ParticipantExchange {
  role: 'self' | 'other'
  name: string
  contact: string
  include: boolean
}
