import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { DEFAULT_ARTWORK_PRESENTATION } from '../presentation/presentation-model'
import type { ArtworkPresentation } from '../presentation/presentation-model'
import { resolveKeepsakeFocus } from '../lib/direct-keepsake'

interface DirectPhotoAdjusterProps {
  imageSrc: string
  imageName: string
  focus: { x: number, y: number }
  value: ArtworkPresentation
  onSave: (value: ArtworkPresentation) => void
  onClose: () => void
}

export default function DirectPhotoAdjuster({ imageSrc, imageName, focus, value, onSave, onClose }: DirectPhotoAdjusterProps) {
  const [draft, setDraft] = useState(value)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])
  const setNumber = (key: keyof ArtworkPresentation, raw: string) => setDraft(current => ({ ...current, [key]: Number(raw) }))
  const resolved = resolveKeepsakeFocus(focus, draft)
  const positionText = `${resolved.x}% ${resolved.y}%`
  const style = { '--portrait-position': positionText, '--artwork-origin': positionText, '--artwork-zoom': draft.zoom } as CSSProperties
  return <section className="artwork-editor artwork-position-editor direct-photo-editor" role="dialog" aria-modal="true" aria-label="調整紀念卡照片 · Adjust keepsake photo">
    <header><button type="button" onClick={onClose}>取消</button><div><b>調整照片</b><small>{imageName}</small></div><button type="button" onClick={() => { onSave(draft); onClose() }}>儲存</button></header>
    <div className="artwork-editor-preview card-artwork-viewport"><img src={imageSrc} alt={imageName} style={style} /><div className="composition-grid" aria-hidden="true" /></div>
    <div className="artwork-editor-controls">
      <label>水平位置 · X <output>{draft.offsetX}%</output><input aria-label="紀念卡水平位置 · X" type="range" min="-100" max="100" step="1" value={draft.offsetX} onChange={event => setNumber('offsetX', event.target.value)} /></label>
      <label>垂直位置 · Y <output>{draft.offsetY}%</output><input aria-label="紀念卡垂直位置 · Y" type="range" min="-100" max="100" step="1" value={draft.offsetY} onChange={event => setNumber('offsetY', event.target.value)} /></label>
      <label>照片大小 · Size <output>{Math.round(draft.zoom * 100)}%</output><input aria-label="紀念卡照片大小 · Size" type="range" min="1" max="2.4" step="0.02" value={draft.zoom} onChange={event => setNumber('zoom', event.target.value)} /></label>
    </div>
    <footer><button type="button" onClick={() => setDraft(DEFAULT_ARTWORK_PRESENTATION)}>恢復完整置中</button></footer>
  </section>
}
