import type { ArtworkVariant, Blessing } from '../types'

function selectIndex(length: number, random: () => number) {
  return Math.min(length - 1, Math.max(0, Math.floor(random() * length)))
}

export function selectArtwork(artworks: readonly ArtworkVariant[], previousId?: string, random: () => number = Math.random): ArtworkVariant {
  if (!artworks.length) throw new Error('No deity artwork is available')
  const candidates = artworks.length > 1 ? artworks.filter(artwork => artwork.id !== previousId) : [...artworks]
  return candidates[selectIndex(candidates.length, random)]
}

export function selectBlessing(blessings: readonly Blessing[], random: () => number = Math.random): Blessing {
  if (!blessings.length) throw new Error('No blessing is available')
  return blessings[selectIndex(blessings.length, random)]
}
