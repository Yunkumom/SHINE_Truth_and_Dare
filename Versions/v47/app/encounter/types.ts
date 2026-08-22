export type Language = 'zh' | 'en' | 'bilingual'
export type Mode = 'truth' | 'dare' | 'random'
export type CardMode = Exclude<Mode, 'random'>
export type Level = 1 | 2 | 3 | 4 | 5
export type QuestionDepth = 'ice' | 'one' | 'two' | 'three'
export type QuestionKind = 'question' | 'activity'

export interface Card {
  id: string
  level: Level
  mode: CardMode
  zh: string
  en: string
  packId?: string
  depth?: QuestionDepth
  kind?: QuestionKind
  zhTitle?: string
  enTitle?: string
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

export interface SessionQuestionManagerState {
  disabledQuestionIds: string[]
  customQuestions: Card[]
  selectedQuestionId: string | null
  enabledQuestionPackIds: string[]
  drawnQuestionIds: string[]
  showRealYou: boolean
  showQuestion: boolean
  showCardMeta: boolean
  showBlessing: boolean
  showFeatureNote: boolean
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

export type TaiwanFoodRegion = 'north' | 'central' | 'south' | 'east' | 'offshore'
export type TaiwanFoodPromptType = 'taste-talk' | 'food-dare' | 'travel-surprise'

export interface LocalizedFoodText {
  zh: string
  en: string
}

export interface TaiwanFoodSubject {
  id: string
  number: number
  classic: boolean
  region: TaiwanFoodRegion
  place: LocalizedFoodText
  name: LocalizedFoodText
  flavors: { zh: string[], en: string[] }
  allergens: string[]
}

export interface TaiwanFoodStory {
  id: string
  subjectId: string
  text: LocalizedFoodText
  sourceUrl: string
}

export type TaiwanFoodQuestionAudience = 'standard' | 'optional-spicy'

export interface TaiwanFoodQuestion {
  id: string
  promptType: TaiwanFoodPromptType
  audience: TaiwanFoodQuestionAudience
  text: LocalizedFoodText
}

export interface TaiwanFoodQuestionSet {
  id: string
  name: LocalizedFoodText
  audience: TaiwanFoodQuestionAudience
  questionIds: readonly string[]
}

export interface TaiwanFoodCardDesign {
  id: string
  name: LocalizedFoodText
  aspectRatio: string
  frontLayout: string
  backLayout: string
}

export interface TaiwanFoodCardCompositionSpec {
  id: string
  subjectId: string
  artworkId: string
  storyId: string
  questionId: string
  spicyQuestionId: string
  questionSetIds: readonly string[]
  cardDesignId: string
}

export interface TaiwanFoodCardComposition {
  id: string
  subject: TaiwanFoodSubject
  artwork: { id: string, src: string }
  story: TaiwanFoodStory
  question: TaiwanFoodQuestion
  spicyQuestion: TaiwanFoodQuestion
  questionSets: readonly TaiwanFoodQuestionSet[]
  cardDesign: TaiwanFoodCardDesign
}
