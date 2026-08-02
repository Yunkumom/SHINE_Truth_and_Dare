import type { ArtworkCollection, ArtworkVariant } from '../types'

export type LibrarySwipeDecision = 'previous' | 'next' | 'return'

export function wrapLibraryIndex(index: number, length: number) {
  if (length <= 0) return 0
  return ((index % length) + length) % length
}
export function filterLibraryArtworks(
  artworks: readonly ArtworkVariant[],
  collections: readonly ArtworkCollection[],
  filterId: 'all' | string,
) {
  if (filterId === 'all') return [...artworks]
  const collection = collections.find(item => item.id === filterId && item.availability === 'available')
  if (!collection) return []
  const allowed = new Set(collection.artworkIds)
  return artworks.filter(artwork => allowed.has(artwork.id))
}

export function decideLibrarySwipe({ horizontalTravel, viewportWidth }: { horizontalTravel: number, viewportWidth: number }): LibrarySwipeDecision {
  const threshold = Math.max(52, Math.max(viewportWidth, 1) * .16)
  if (horizontalTravel <= -threshold) return 'next'
  if (horizontalTravel >= threshold) return 'previous'
  return 'return'
}
