import { useMemo, useState } from 'react'
import type { ArtworkCollection, ArtworkVariant } from '../types'

interface ArtworkPickerProps {
  artworks: readonly ArtworkVariant[]
  collections: readonly ArtworkCollection[]
  selectedArtworkId?: string
  initialCollectionId?: string
  onSelect: (artwork: ArtworkVariant) => void
}

export default function ArtworkPicker({ artworks, collections, selectedArtworkId, initialCollectionId, onSelect }: ArtworkPickerProps) {
  const available = collections.filter(collection => collection.availability === 'available')
  const [collectionId, setCollectionId] = useState(() => available.some(collection => collection.id === initialCollectionId) ? initialCollectionId! : available[0]?.id ?? '')
  const current = available.find(collection => collection.id === collectionId) ?? available[0]
  const visible = useMemo(() => {
    const ids = new Set(current?.artworkIds ?? [])
    return artworks.filter(artwork => ids.has(artwork.id))
  }, [artworks, current])

  return <div className="photo-picker-surface">
    <nav className="photo-picker-albums" aria-label="卡片系列 · Card collections">
      {available.map(collection => <button type="button" key={collection.id} aria-pressed={collection.id === current?.id} onClick={() => setCollectionId(collection.id)}>{collection.zhName}<small>{collection.artworkIds.length}</small></button>)}
    </nav>
    <p className="photo-picker-summary">只更換卡面，問題與祝福語仍獨立選擇。</p>
    <div className="photo-picker-grid">
      {visible.map(artwork => <button type="button" className="photo-picker-tile" key={artwork.id} aria-label={`指定 ${artwork.zhName}`} aria-pressed={artwork.id === selectedArtworkId} onClick={() => onSelect(artwork)}>
        <img src={artwork.src} alt="" />
        <span>{artwork.zhName}</span>
        <i aria-hidden="true">✓</i>
      </button>)}
    </div>
  </div>
}
