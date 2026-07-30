import { describe, expect, it } from 'vitest'
import { ARTWORK_COLLECTIONS, DEFAULT_COLLECTION_ID } from '../data/collections'
import { DEITY_ART } from './deity-art'
import { createArtworkCandidates, resolvePreferredArtwork } from './artwork-selection'

describe('v32 collection and artwork selection', () => {
  it('exposes only governed Taiwan deity artwork as available', () => {
    expect(ARTWORK_COLLECTIONS.find(item => item.id === DEFAULT_COLLECTION_ID)?.artworkIds).toHaveLength(18)
    expect(ARTWORK_COLLECTIONS.filter(item => item.availability === 'planned').every(item => item.artworkIds.length === 0)).toBe(true)
  })

  it('locks an artwork without coupling it to question or blessing data', () => {
    const selected = resolvePreferredArtwork({ mode: 'specific', collectionId: DEFAULT_COLLECTION_ID, artworkId: 'mazu-sea' }, ARTWORK_COLLECTIONS, DEITY_ART, undefined, () => .9)
    expect(selected.id).toBe('mazu-sea')
    expect(selected).not.toHaveProperty('question')
    expect(selected).not.toHaveProperty('blessing')
  })

  it('locks a specific preference to one face instead of offering overrides', () => {
    const candidates = createArtworkCandidates(ARTWORK_COLLECTIONS, DEITY_ART, { mode: 'specific', collectionId: DEFAULT_COLLECTION_ID, artworkId: 'mazu-sea' }, 3, () => 0)
    expect(candidates).toHaveLength(1)
    expect(candidates[0].id).toBe('mazu-sea')
  })

  it('creates three distinct favorite faces in random mode', () => {
    const candidates = createArtworkCandidates(ARTWORK_COLLECTIONS, DEITY_ART, { mode: 'random', collectionId: DEFAULT_COLLECTION_ID }, 3, () => 0)
    expect(candidates).toHaveLength(3)
    expect(new Set(candidates.map(item => item.id)).size).toBe(3)
  })
})
