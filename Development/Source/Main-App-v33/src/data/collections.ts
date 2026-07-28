import type { ArtworkCollection } from '../types'
import { DEITY_ART } from '../lib/deity-art'
import { TAIWAN_ZODIAC_ART } from '../lib/zodiac-art'

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
  { id: 'taiwan-zodiac', family: 'astral', region: 'TW', zhName: '台灣星座守護者', enName: 'Taiwan Astral Guardians', zhDescription: '12 張融合台灣景觀與完整台灣輪廓的星座卡面', enDescription: '12 zodiac guardians with Taiwanese scenery and complete Taiwan silhouettes', availability: 'available', artworkIds: TAIWAN_ZODIAC_ART.map(artwork => artwork.id) },
  { id: 'world-deities', family: 'deity', region: 'WORLD', zhName: '各國神明', enName: 'World Deities', zhDescription: '依國家與文化建立的神祇系列', enDescription: 'Deity collections by culture and region', availability: 'planned', artworkIds: [] },
  { id: 'world-zodiac', family: 'astral', region: 'WORLD', zhName: '各國星座', enName: 'World Zodiac', zhDescription: '不同文化的星座與星象系列', enDescription: 'Zodiac and constellation traditions worldwide', availability: 'planned', artworkIds: [] },
]
