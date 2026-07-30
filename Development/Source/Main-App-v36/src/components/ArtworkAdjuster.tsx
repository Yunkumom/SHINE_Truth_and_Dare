import { useEffect, useRef } from 'react'
import type { ArtworkVariant } from '../types'
import { DEFAULT_ARTWORK_PRESENTATION } from '../presentation/presentation-model'
import type { ArtworkPresentation } from '../presentation/presentation-model'

interface ArtworkAdjusterProps {
  open: boolean
  artwork: ArtworkVariant
  value: ArtworkPresentation
  onChange: (value: ArtworkPresentation) => void
  onClose: () => void
}

export default function ArtworkAdjuster({ open, artwork, value, onChange, onClose }: ArtworkAdjusterProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])
  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButtonRef.current?.focus()
    return () => previousFocus?.focus()
  }, [open])
  if (!open) return null
  const setNumber = (key: keyof ArtworkPresentation, raw: string) => onChange({ ...value, [key]: Number(raw) })
  return <section className="artwork-editor artwork-position-editor" role="dialog" aria-modal="true" aria-label="調整卡面照片 · Adjust artwork">
    <header><div><b>調整目前卡面</b><small>ADJUST ARTWORK</small></div><button ref={closeButtonRef} type="button" onClick={onClose} aria-label="關閉照片調整">×</button></header>
    <div className="artwork-editor-preview"><img src={artwork.src} alt={artwork.zhName} style={{ objectPosition: `${artwork.portraitFocus.x + value.offsetX}% ${artwork.portraitFocus.y + value.offsetY}%`, transform: `scale(${value.zoom})` }} /></div>
    <div className="artwork-editor-controls">
      <label>水平位置 · X<input type="range" min="-30" max="30" step="1" value={value.offsetX} onChange={event => setNumber('offsetX', event.target.value)} /></label>
      <label>垂直位置 · Y<input type="range" min="-30" max="30" step="1" value={value.offsetY} onChange={event => setNumber('offsetY', event.target.value)} /></label>
      <label>照片大小 · Size<input type="range" min="1" max="1.8" step="0.02" value={value.zoom} onChange={event => setNumber('zoom', event.target.value)} /></label>
    </div>
    <footer><button type="button" onClick={() => onChange(DEFAULT_ARTWORK_PRESENTATION)}>重設</button><button type="button" className="manager-primary" onClick={onClose}>完成</button></footer>
  </section>
}
