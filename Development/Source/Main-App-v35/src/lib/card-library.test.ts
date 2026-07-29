import { describe, expect, it } from 'vitest'
import { ARTWORK_COLLECTIONS } from '../data/collections'
import { ALL_ARTWORKS } from './artwork-catalog'
import { decideLibrarySwipe, filterLibraryArtworks, wrapLibraryIndex } from './card-library'

describe('card-library navigation policy', () => {
  it('wraps navigation at both ends without losing a card', () => {
    expect(wrapLibraryIndex(-1, 42)).toBe(41)
    expect(wrapLibraryIndex(42, 42)).toBe(0)
    expect(wrapLibraryIndex(7, 0)).toBe(0)
  })

  it('filters all 42 governed faces into their available series', () => {
    expect(filterLibraryArtworks(ALL_ARTWORKS, ARTWORK_COLLECTIONS, 'all')).toHaveLength(42)
    expect(filterLibraryArtworks(ALL_ARTWORKS, ARTWORK_COLLECTIONS, 'taiwan-deities')).toHaveLength(18)
    expect(filterLibraryArtworks(ALL_ARTWORKS, ARTWORK_COLLECTIONS, 'taiwan-zodiac-classic')).toHaveLength(12)
    expect(filterLibraryArtworks(ALL_ARTWORKS, ARTWORK_COLLECTIONS, 'taiwan-zodiac-local-stories')).toHaveLength(12)
  })

  it('commits one adjacent card only after a deliberate horizontal drag', () => {
    expect(decideLibrarySwipe({ horizontalTravel: -80, viewportWidth: 360 })).toBe('next')
    expect(decideLibrarySwipe({ horizontalTravel: 80, viewportWidth: 360 })).toBe('previous')
    expect(decideLibrarySwipe({ horizontalTravel: 24, viewportWidth: 360 })).toBe('return')
  })
})
