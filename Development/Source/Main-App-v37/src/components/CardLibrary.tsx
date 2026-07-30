import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from 'react'
import type { ArtworkCollection, ArtworkVariant } from '../types'
import { decideLibrarySwipe, filterLibraryArtworks, wrapLibraryIndex } from '../lib/card-library'

interface CardLibraryProps {
  artworks: readonly ArtworkVariant[]
  collections: readonly ArtworkCollection[]
  selectedArtworkId?: string
  renderCard: (artwork: ArtworkVariant, index: number) => ReactNode
  onChoose: (artwork: ArtworkVariant) => void
  onClose: () => void
}

interface DragState {
  pointerId: number
  startX: number
}

export default function CardLibrary({ artworks, collections, selectedArtworkId, renderCard, onChoose, onClose }: CardLibraryProps) {
  const [filterId, setFilterId] = useState<string>('all')
  const [index, setIndex] = useState(() => Math.max(0, artworks.findIndex(artwork => artwork.id === selectedArtworkId)))
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const drag = useRef<DragState | null>(null)
  const availableCollections = useMemo(() => collections.filter(collection => collection.availability === 'available'), [collections])
  const filteredArtworks = useMemo(() => filterLibraryArtworks(artworks, collections, filterId), [artworks, collections, filterId])
  const currentIndex = wrapLibraryIndex(index, filteredArtworks.length)
  const currentArtwork = filteredArtworks[currentIndex]

  useEffect(() => { dialogRef.current?.focus() }, [])

  function navigate(delta: number) {
    setIndex(value => wrapLibraryIndex(value + delta, filteredArtworks.length))
    setDragX(0)
    setDragging(false)
  }

  function chooseFilter(nextFilterId: string) {
    const nextArtworks = filterLibraryArtworks(artworks, collections, nextFilterId)
    const selectedIndex = nextArtworks.findIndex(artwork => artwork.id === selectedArtworkId)
    setFilterId(nextFilterId)
    setIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setDragX(0)
  }

  function beginDrag(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('button')) return
    event.preventDefault()
    drag.current = { pointerId: event.pointerId, startX: event.clientX }
    setDragging(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return
    setDragX(event.clientX - drag.current.startX)
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const active = drag.current
    if (!active || active.pointerId !== event.pointerId) return
    const travel = event.clientX - active.startX
    const decision = decideLibrarySwipe({ horizontalTravel: travel, viewportWidth: event.currentTarget.getBoundingClientRect().width || 360 })
    event.currentTarget.releasePointerCapture?.(event.pointerId)
    drag.current = null
    if (decision === 'next') navigate(1)
    else if (decision === 'previous') navigate(-1)
    else { setDragX(0); setDragging(false) }
  }

  function cancelDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return
    event.currentTarget.releasePointerCapture?.(event.pointerId)
    drag.current = null
    setDragX(0)
    setDragging(false)
  }

  function handleKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1) }
    if (event.key === 'Escape') { event.preventDefault(); onClose() }
  }

  const cardIndexes = [-1, 0, 1].map(offset => wrapLibraryIndex(currentIndex + offset, filteredArtworks.length))
  const trackStyle = { '--library-drag-x': `${dragX}px` } as CSSProperties

  return <div ref={dialogRef} className="card-library" role="dialog" aria-modal="true" aria-label="卡庫 · Card library" tabIndex={-1} onKeyDown={handleKeys}>
    <header className="card-library-header">
      <button type="button" className="card-library-close" aria-label="關閉卡庫 · Close card library" onClick={onClose}>←</button>
      <div><b>卡庫</b><small>CARD LIBRARY · V37</small></div>
      <span aria-live="polite">{filteredArtworks.length ? currentIndex + 1 : 0} / {filteredArtworks.length}</span>
    </header>

    <div className="card-library-filters" role="group" aria-label="卡庫系列篩選 · Card library filters">
      <button type="button" aria-pressed={filterId === 'all'} onClick={() => chooseFilter('all')}>全部 <small>{artworks.length}</small></button>
      {availableCollections.map(collection => <button type="button" key={collection.id} aria-pressed={filterId === collection.id} aria-label={`篩選 ${collection.zhName} · ${collection.artworkIds.length} 張`} onClick={() => chooseFilter(collection.id)}>{collection.zhName}<small>{collection.artworkIds.length}</small></button>)}
    </div>

    <div className="card-library-stage">
      <button type="button" className="card-library-arrow is-previous" aria-label="上一張卡 · Previous card" onClick={() => navigate(-1)}>‹</button>
      <div className={`card-library-viewport${dragging ? ' is-dragging' : ''}`} data-testid="card-library-viewport" onPointerDown={beginDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={cancelDrag}>
        <div className="card-library-track" style={trackStyle}>
          {currentArtwork && cardIndexes.map((artworkIndex, positionIndex) => {
            const artwork = filteredArtworks[artworkIndex]
            const position = positionIndex - 1
            return <article key={`${artwork.id}-${position}`} className="card-library-card" data-position={position} data-testid="library-card" aria-hidden={position !== 0 ? 'true' : undefined} aria-label={position === 0 ? `目前卡片 ${artwork.zhName} · Current card ${artwork.enName} · ${artwork.id}` : undefined}>
              {renderCard(artwork, artworkIndex)}
            </article>
          })}
        </div>
      </div>
      <button type="button" className="card-library-arrow is-next" aria-label="下一張卡 · Next card" onClick={() => navigate(1)}>›</button>
    </div>

    {currentArtwork && <footer className="card-library-footer">
      <div><b>{currentArtwork.zhName}</b><small>{currentArtwork.enName}</small>{currentArtwork.featureLabel && <span>台灣特色 · {currentArtwork.featureLabel.zh}</span>}</div>
      <p>預覽題目與祝福僅供觀看；正式抽卡仍會獨立選擇。<small>Preview copy only. The live question and blessing stay independent.</small></p>
      <button type="button" onClick={() => onChoose(currentArtwork)}>選擇這張卡面 · Choose this face</button>
    </footer>}
  </div>
}
