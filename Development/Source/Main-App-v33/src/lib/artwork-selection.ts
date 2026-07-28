import type { ArtworkCollection, ArtworkPreference, ArtworkVariant } from '../types'

const indexFor = (length: number, random: () => number) => Math.min(length - 1, Math.max(0, Math.floor(random() * length)))

export function availableArtworks(collections: readonly ArtworkCollection[], artworks: readonly ArtworkVariant[], collectionId: string): ArtworkVariant[] {
  const collection = collections.find(item => item.id === collectionId && item.availability === 'available')
  if (!collection) return []
  const allowed = new Set(collection.artworkIds)
  return artworks.filter(artwork => allowed.has(artwork.id))
}

export function resolvePreferredArtwork(preference: ArtworkPreference, collections: readonly ArtworkCollection[], artworks: readonly ArtworkVariant[], previousId?: string, random: () => number = Math.random): ArtworkVariant {
  const pool = availableArtworks(collections, artworks, preference.collectionId)
  if (!pool.length) throw new Error('No artwork is available for this collection')
  if (preference.mode === 'specific') {
    const selected = pool.find(artwork => artwork.id === preference.artworkId)
    if (selected) return selected
  }
  const candidates = pool.length > 1 ? pool.filter(artwork => artwork.id !== previousId) : pool
  return candidates[indexFor(candidates.length, random)]
}

export function createArtworkCandidates(collections: readonly ArtworkCollection[], artworks: readonly ArtworkVariant[], preference: ArtworkPreference, count = 3, random: () => number = Math.random): ArtworkVariant[] {
  const pool = availableArtworks(collections, artworks, preference.collectionId)
  if (!pool.length || count <= 0) return []
  const selected = preference.mode === 'specific' ? pool.find(item => item.id === preference.artworkId) : undefined
  if (selected) return [selected]
  const remaining = [...pool]
  const result: ArtworkVariant[] = []
  while (remaining.length && result.length < count) result.push(remaining.splice(indexFor(remaining.length, random), 1)[0])
  return result
}
