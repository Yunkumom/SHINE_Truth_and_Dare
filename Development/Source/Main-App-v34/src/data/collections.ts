import type { ArtworkCollection } from '../types'
import { DEITY_ART } from '../lib/deity-art'
import { TAIWAN_ZODIAC_LOCAL_STORIES_ART } from '../lib/local-zodiac-art'
import { TAIWAN_ZODIAC_CLASSIC_ART } from '../lib/zodiac-art'

export const DEFAULT_COLLECTION_ID = 'taiwan-deities'

export const ARTWORK_COLLECTIONS: readonly ArtworkCollection[] = [
  {
    id: DEFAULT_COLLECTION_ID,
    family: 'deity',
    region: 'TW',
    zhName: '台灣神明',
    enName: 'Taiwan Deities',
    zhDescription: '18 張藏有台灣輪廓的神祇卡面',
    enDescription: '18 deity artworks with hidden Taiwan silhouettes',
    availability: 'available',
    artworkIds: DEITY_ART.map(artwork => artwork.id),
  },
  { id: 'taiwan-zodiac-classic', family: 'astral', region: 'TW', zhName: '台灣星座・古典守護者', enName: 'Taiwan Zodiac · Classic Guardians', zhDescription: '保留 v33 的 12 張人物化古典星座卡面', enDescription: 'The twelve personified v33 zodiac guardians, preserved as a backup style', availability: 'available', artworkIds: TAIWAN_ZODIAC_CLASSIC_ART.map(artwork => artwork.id) },
  { id: 'taiwan-zodiac-local-stories', family: 'astral', region: 'TW', zhName: '台灣星座・地方故事', enName: 'Taiwan Zodiac · Local Stories', zhDescription: '以星座原型、現代台灣生活與地方文化重新設計的 12 張卡面', enDescription: 'Twelve zodiac-led scenes combining modern Taiwan with local culture', availability: 'available', artworkIds: TAIWAN_ZODIAC_LOCAL_STORIES_ART.map(artwork => artwork.id) },
  { id: 'world-deities', family: 'deity', region: 'WORLD', zhName: '各國神明', enName: 'World Deities', zhDescription: '依國家與文化建立的神祇系列', enDescription: 'Deity collections by culture and region', availability: 'planned', artworkIds: [] },
  { id: 'world-zodiac', family: 'astral', region: 'WORLD', zhName: '各國星座', enName: 'World Zodiac', zhDescription: '不同文化的星座與星象系列', enDescription: 'Zodiac and constellation traditions worldwide', availability: 'planned', artworkIds: [] },
]
