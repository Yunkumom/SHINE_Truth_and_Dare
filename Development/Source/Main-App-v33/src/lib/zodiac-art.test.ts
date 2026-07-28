import { describe, expect, it } from 'vitest'
import { ARTWORK_COLLECTIONS } from '../data/collections'
import { ALL_ARTWORKS } from './artwork-catalog'
import { TAIWAN_ZODIAC_ART } from './zodiac-art'

describe('v33 Taiwan Astral Guardians', () => {
  it('registers all twelve local portrait-safe zodiac masters', () => {
    expect(TAIWAN_ZODIAC_ART).toHaveLength(12)
    expect(new Set(TAIWAN_ZODIAC_ART.map(artwork => artwork.subjectId)).size).toBe(12)
    expect(TAIWAN_ZODIAC_ART.every(artwork => artwork.collectionId === 'taiwan-zodiac')).toBe(true)
    expect(TAIWAN_ZODIAC_ART.every(artwork => artwork.countryCode === 'TW' && artwork.culture === 'Taiwan')).toBe(true)
    expect(TAIWAN_ZODIAC_ART.every(artwork => artwork.subjectKind === 'zodiac')).toBe(true)
    expect(TAIWAN_ZODIAC_ART.every(artwork => artwork.src.includes('safe-v33.webp'))).toBe(true)
  })

  it('keeps complete Taiwan locators inside the central crop-safe region', () => {
    expect(TAIWAN_ZODIAC_ART.every(artwork => artwork.taiwanHotspot.x >= 40 && artwork.taiwanHotspot.x <= 60)).toBe(true)
    expect(TAIWAN_ZODIAC_ART.every(artwork => artwork.taiwanHotspot.y >= 35 && artwork.taiwanHotspot.y <= 92)).toBe(true)
    expect(TAIWAN_ZODIAC_ART.every(artwork => artwork.hiddenTaiwan.toLowerCase().includes('taiwan'))).toBe(true)
  })

  it('publishes two available collections and thirty total faces', () => {
    expect(ARTWORK_COLLECTIONS.filter(collection => collection.availability === 'available')).toHaveLength(2)
    expect(ARTWORK_COLLECTIONS.find(collection => collection.id === 'taiwan-zodiac')?.artworkIds).toHaveLength(12)
    expect(ALL_ARTWORKS).toHaveLength(30)
  })
})
