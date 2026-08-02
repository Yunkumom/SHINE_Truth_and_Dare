import { useEffect, useRef, useState } from 'react'
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
  const [draft, setDraft] = useState(value)
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
  const setNumber = (key: keyof ArtworkPresentation, raw: string) => setDraft(current => ({ ...current, [key]: Number(raw) }))
  return <section className="artwork-editor artwork-position-editor" role="dialog" aria-modal="true" aria-label="調整卡面照片 · Adjust artwork">
    <header><button ref={closeButtonRef} type="button" onClick={onClose} aria-label="取消照片調整">取消</button><div><b>調整照片</b><small>{artwork.zhName}</small></div><button type="button" onClick={() => { onChange(draft); onClose() }} aria-label="儲存照片調整">儲存</button></header>
    <div className="artwork-editor-preview"><img src={artwork.src} alt={artwork.zhName} style={{ transform: `translate(${draft.offsetX}%, ${draft.offsetY}%) scale(${draft.zoom})` }} /><div className="composition-grid" data-testid="artwork-grid" aria-hidden="true" /></div>
    <div className="artwork-editor-controls">
      <label>水平位置 · X <output>{draft.offsetX}%</output><input aria-label="水平位置 · X" type="range" min="-50" max="50" step="1" value={draft.offsetX} onChange={event => setNumber('offsetX', event.target.value)} /></label>
      <label>垂直位置 · Y <output>{draft.offsetY}%</output><input aria-label="垂直位置 · Y" type="range" min="-60" max="60" step="1" value={draft.offsetY} onChange={event => setNumber('offsetY', event.target.value)} /></label>
      <label>照片大小 · Size <output>{Math.round(draft.zoom * 100)}%</output><input aria-label="照片大小 · Size" type="range" min="1" max="2.4" step="0.02" value={draft.zoom} onChange={event => setNumber('zoom', event.target.value)} /></label>
    </div>
    <footer><button type="button" onClick={() => setDraft(DEFAULT_ARTWORK_PRESENTATION)}>恢復完整置中</button></footer>
  </section>
}
