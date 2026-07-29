import { describe, expect, it } from 'vitest'
import { ARTWORK_COLLECTIONS } from '../data/collections'
import { ALL_ARTWORKS } from './artwork-catalog'
import { TAIWAN_ZODIAC_LOCAL_STORIES_ART } from './local-zodiac-art'
import { TAIWAN_ZODIAC_CLASSIC_ART } from './zodiac-art'

describe('v34 Taiwan zodiac collection versions', () => {
  it('preserves all twelve classic v33 guardians as an available backup collection', () => {
    expect(TAIWAN_ZODIAC_CLASSIC_ART).toHaveLength(12)
    expect(TAIWAN_ZODIAC_CLASSIC_ART.every(artwork => artwork.collectionId === 'taiwan-zodiac-classic')).toBe(true)
    expect(TAIWAN_ZODIAC_CLASSIC_ART.every(artwork => artwork.src.includes('safe-v33.webp'))).toBe(true)
  })

  it('registers twelve crop-safe local-story zodiac masters with bilingual teaching notes', () => {
    expect(TAIWAN_ZODIAC_LOCAL_STORIES_ART).toHaveLength(12)
    expect(new Set(TAIWAN_ZODIAC_LOCAL_STORIES_ART.map(artwork => artwork.subjectId)).size).toBe(12)
    expect(TAIWAN_ZODIAC_LOCAL_STORIES_ART.every(artwork => artwork.collectionId === 'taiwan-zodiac-local-stories')).toBe(true)
    expect(TAIWAN_ZODIAC_LOCAL_STORIES_ART.every(artwork => artwork.countryCode === 'TW' && artwork.culture === 'Taiwan')).toBe(true)
    expect(TAIWAN_ZODIAC_LOCAL_STORIES_ART.every(artwork => artwork.subjectKind === 'zodiac')).toBe(true)
    expect(TAIWAN_ZODIAC_LOCAL_STORIES_ART.every(artwork => artwork.src.includes('safe-v34.webp'))).toBe(true)
    expect(TAIWAN_ZODIAC_LOCAL_STORIES_ART.every(artwork => artwork.featureLabel?.zh && artwork.featureLabel.en)).toBe(true)
    expect(TAIWAN_ZODIAC_LOCAL_STORIES_ART.every(artwork => artwork.featureDescription?.zh && artwork.featureDescription.en)).toBe(true)
  })

  it('publishes three available collection versions and forty-two total faces', () => {
    expect(ARTWORK_COLLECTIONS.filter(collection => collection.availability === 'available')).toHaveLength(3)
    expect(ARTWORK_COLLECTIONS.find(collection => collection.id === 'taiwan-zodiac-classic')?.artworkIds).toHaveLength(12)
    expect(ARTWORK_COLLECTIONS.find(collection => collection.id === 'taiwan-zodiac-local-stories')?.artworkIds).toHaveLength(12)
    expect(ALL_ARTWORKS).toHaveLength(42)
  })
})
