import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { EncounterComposition, Language, SessionQuestionManagerState } from '../types'
import {
  DEFAULT_ARTWORK_PRESENTATION,
  DEFAULT_PRESENTATION,
  normalizePresentation,
  presentationForArtwork,
} from '../presentation/presentation-model'
import type { ArtworkPresentation, PresentationDocument } from '../presentation/presentation-model'
import { adjustedPortraitFocus, portraitObjectPosition } from '../lib/portrait-focus'
import { artworkTitle } from '../lib/artwork-copy'

interface ArtworkAdjusterProps {
  open: boolean
  encounter: EncounterComposition
  language: Language
  manager: SessionQuestionManagerState
  value: PresentationDocument
  onChange: (value: PresentationDocument) => void
  onClose: () => void
}

type EditorTab = 'photo' | 'layout'

export default function ArtworkAdjuster({ open, encounter, language, manager, value, onChange, onClose }: ArtworkAdjusterProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [draft, setDraft] = useState(() => normalizePresentation(value))
  const [tab, setTab] = useState<EditorTab>('photo')

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, value, onClose])
  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButtonRef.current?.focus()
    return () => previousFocus?.focus()
  }, [open])
  if (!open) return null

  const artwork = encounter.artwork
  const photo = presentationForArtwork(draft, artwork.id)
  const focus = portraitObjectPosition(adjustedPortraitFocus(artwork.portraitFocus, photo))
  const imageStyle = {
    '--portrait-position': focus,
    '--artwork-origin': focus,
    '--artwork-zoom': photo.zoom,
  } as CSSProperties
  const cardStyle = {
    '--card-header-height': `${draft.headerHeight}%`,
    '--artwork-height': `${draft.artworkHeight}%`,
    '--text-height': `${100 - draft.headerHeight - draft.artworkHeight}%`,
    '--question-font-scale': draft.question.fontScale,
    '--blessing-font-scale': draft.blessing.fontScale,
    '--blessing-line-height': draft.blessing.lineHeight,
    '--blessing-height': `${draft.blessing.height}px`,
    '--blessing-padding': `${draft.blessing.padding}px`,
    '--blessing-offset-x': `${draft.blessing.offsetX}px`,
    '--blessing-offset-y': `${draft.blessing.offsetY}px`,
  } as CSSProperties

  const setPhoto = (key: keyof ArtworkPresentation, raw: string) => {
    setDraft(current => normalizePresentation({ ...current, artworkById: { ...current.artworkById, [artwork.id]: { ...presentationForArtwork(current, artwork.id), [key]: Number(raw) } } }))
  }
  const setSection = (key: 'headerHeight' | 'artworkHeight', raw: string) => {
    setDraft(current => normalizePresentation({ ...current, [key]: Number(raw) }))
  }
  const setTextScale = (key: 'question' | 'blessing', raw: string) => {
    setDraft(current => normalizePresentation({ ...current, [key]: { ...current[key], fontScale: Number(raw) } }))
  }
  const setBlessing = (key: 'height' | 'padding', raw: string) => {
    setDraft(current => normalizePresentation({ ...current, blessing: { ...current.blessing, [key]: Number(raw) } }))
  }
  const resetPerfect = () => setDraft(current => normalizePresentation({
    ...DEFAULT_PRESENTATION,
    artworkById: { ...current.artworkById, [artwork.id]: DEFAULT_ARTWORK_PRESENTATION },
  }))

  return <section className="artwork-editor artwork-position-editor card-layout-adjuster" role="dialog" aria-modal="true" aria-label="調整卡片 · Adjust card">
    <header><button ref={closeButtonRef} type="button" onClick={onClose} aria-label="取消卡片調整">取消</button><div><b>調整卡片</b><small>{artwork.zhName} · 即時預覽</small></div><button type="button" onClick={() => { onChange(draft); onClose() }} aria-label="儲存卡片調整">儲存</button></header>
    <nav className="card-adjust-tabs" role="tablist" aria-label="卡片調整類別">
      <button type="button" role="tab" aria-selected={tab === 'photo'} className={tab === 'photo' ? 'active' : ''} onClick={() => setTab('photo')}>照片 · Photo</button>
      <button type="button" role="tab" aria-selected={tab === 'layout'} className={tab === 'layout' ? 'active' : ''} onClick={() => setTab('layout')}>格子 · Layout</button>
    </nav>
    <div className="card-adjust-live-shell">
      <article className={`mythic-card card-adjust-live-preview${tab === 'layout' ? ' is-layout-guided' : ''}`} style={cardStyle} data-testid="card-adjust-live-preview">
        <div className="mythic-card-header" data-adjust-box="標題"><div><h2>{artworkTitle(artwork, language === 'en' ? 'en' : 'zh')}</h2></div></div>
        <div className="mythic-art-frame" data-adjust-box="圖片"><img src={artwork.src} alt={artwork.zhName} style={imageStyle} />{tab === 'photo' && <div className="composition-grid" data-testid="artwork-grid" aria-hidden="true" />}</div>
        <div className="mythic-text-panel" data-adjust-box="文字">
          {manager.showQuestion && <div className="mythic-question" data-adjust-box="問題">{language !== 'en' && <p lang="zh-Hant">{encounter.card.zh}</p>}{language !== 'zh' && <small className={language === 'en' ? 'english-primary' : ''} lang="en">{encounter.card.en}</small>}</div>}
        </div>
      </article>
    </div>
    <div className="artwork-editor-controls card-layout-controls" role="tabpanel">
      {tab === 'photo' ? <>
        <label>水平位置 · X <output>{photo.offsetX}%</output><input aria-label="水平位置 · X" type="range" min="-100" max="100" step="1" value={photo.offsetX} onChange={event => setPhoto('offsetX', event.target.value)} /></label>
        <label>垂直位置 · Y <output>{photo.offsetY}%</output><input aria-label="垂直位置 · Y" type="range" min="-100" max="100" step="1" value={photo.offsetY} onChange={event => setPhoto('offsetY', event.target.value)} /></label>
        <label>照片大小 · Size <output>{Math.round(photo.zoom * 100)}%</output><input aria-label="照片大小 · Size" type="range" min="1" max="2.4" step=".02" value={photo.zoom} onChange={event => setPhoto('zoom', event.target.value)} /></label>
      </> : <>
        <label>標題格高度 · Title <output>{draft.headerHeight}%</output><input aria-label="標題格高度" type="range" min="10" max="17" step="1" value={draft.headerHeight} onChange={event => setSection('headerHeight', event.target.value)} /></label>
        <label>圖片格高度 · Artwork <output>{draft.artworkHeight}%</output><input aria-label="圖片格高度" type="range" min="50" max="64" step="1" value={draft.artworkHeight} onChange={event => setSection('artworkHeight', event.target.value)} /></label>
        <label>問題字級 · Question <output>{Math.round(draft.question.fontScale * 100)}%</output><input aria-label="問題字級" type="range" min=".9" max="1.45" step=".05" value={draft.question.fontScale} onChange={event => setTextScale('question', event.target.value)} /></label>
        <label>祝福字級 · Blessing <output>{Math.round(draft.blessing.fontScale * 100)}%</output><input aria-label="祝福字級" type="range" min=".9" max="1.45" step=".05" value={draft.blessing.fontScale} onChange={event => setTextScale('blessing', event.target.value)} /></label>
        <label>祝福格高度 · Box <output>{draft.blessing.height}px</output><input aria-label="祝福格高度" type="range" min="34" max="72" step="2" value={draft.blessing.height} onChange={event => setBlessing('height', event.target.value)} /></label>
        <label>文字格內距 · Padding <output>{draft.blessing.padding}px</output><input aria-label="文字格內距" type="range" min="2" max="10" step="1" value={draft.blessing.padding} onChange={event => setBlessing('padding', event.target.value)} /></label>
      </>}
    </div>
    <footer><button type="button" className="editor-reset" onClick={resetPerfect}>恢復完美預設 · Perfect Default</button></footer>
  </section>
}
