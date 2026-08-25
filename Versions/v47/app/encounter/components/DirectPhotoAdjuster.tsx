import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { DEFAULT_ARTWORK_PRESENTATION } from '../presentation/presentation-model'
import type { ArtworkPresentation } from '../presentation/presentation-model'
import { DEFAULT_DIRECT_KEEPSAKE_DESIGN, DIRECT_KEEPSAKE_FONT_OPTIONS, resolveKeepsakeFocus } from '../lib/direct-keepsake'
import type { DirectKeepsakeDesign } from '../lib/direct-keepsake'
import type { Language } from '../types'

interface DirectPhotoAdjusterProps {
  imageSrc: string
  imageName: string
  blessing: string
  language: Language
  focus: { x: number, y: number }
  value: ArtworkPresentation
  design: DirectKeepsakeDesign
  onSave: (value: ArtworkPresentation, design: DirectKeepsakeDesign) => void
  onClose: () => void
}

type EditorTab = 'photo' | 'layout' | 'type'

export default function DirectPhotoAdjuster({ imageSrc, imageName, blessing, language, focus, value, design, onSave, onClose }: DirectPhotoAdjusterProps) {
  const [draft, setDraft] = useState(value)
  const [draftDesign, setDraftDesign] = useState(design)
  const [tab, setTab] = useState<EditorTab>('photo')
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])
  const setNumber = (key: keyof ArtworkPresentation, raw: string) => setDraft(current => ({ ...current, [key]: Number(raw) }))
  const setDesignNumber = (key: 'titleFontSize' | 'blessingFontSize' | 'blessingHeight', raw: string) => setDraftDesign(current => ({ ...current, [key]: Number(raw) }))
  const resolved = resolveKeepsakeFocus(focus, draft)
  const positionText = `${resolved.x}% ${resolved.y}%`
  const fontStack = DIRECT_KEEPSAKE_FONT_OPTIONS.find(option => option.value === draftDesign.fontFamily)?.css ?? DIRECT_KEEPSAKE_FONT_OPTIONS[0].css
  const style = { '--portrait-position': positionText, '--artwork-origin': positionText, '--artwork-zoom': draft.zoom, '--direct-title-font-size': `${draftDesign.titleFontSize}px`, '--direct-blessing-font-size': `${draftDesign.blessingFontSize}px`, '--direct-blessing-height': `${draftDesign.blessingHeight}px`, '--direct-card-font': fontStack } as CSSProperties
  const reset = () => { setDraft(DEFAULT_ARTWORK_PRESENTATION); setDraftDesign({ ...DEFAULT_DIRECT_KEEPSAKE_DESIGN, title: imageName }) }
  return <section className="artwork-editor artwork-position-editor direct-photo-editor direct-card-editor" role="dialog" aria-modal="true" aria-label="調整紀念卡 · Adjust keepsake card">
    <header><button type="button" onClick={onClose}>{language === 'en' ? 'Cancel' : '取消'}</button><div><b>{language === 'en' ? 'Adjust Card' : '調整紀念卡'}</b><small>{imageName}</small></div><button type="button" onClick={() => { onSave(draft, draftDesign); onClose() }}>{language === 'en' ? 'Save' : '儲存'}</button></header>
    <nav className="direct-card-editor-tabs" aria-label="卡片調整分頁 · Editor tabs">
      <button type="button" aria-pressed={tab === 'photo'} onClick={() => setTab('photo')}>照片 · PHOTO</button>
      <button type="button" aria-pressed={tab === 'layout'} onClick={() => setTab('layout')}>版面 · LAYOUT</button>
      <button type="button" aria-pressed={tab === 'type'} onClick={() => setTab('type')}>文字 · TYPE</button>
    </nav>
    <article className="direct-editor-card direct-keepsake-preview" style={style} data-font-family={draftDesign.fontFamily}>
      <div className="direct-keepsake-title"><span><b>{draftDesign.title || imageName}</b></span></div>
      <div className="direct-keepsake-image card-artwork-viewport"><img src={imageSrc} alt={imageName} style={style} /><div className="composition-grid" aria-hidden="true" /></div>
      <div className="direct-keepsake-blessing"><small>{language === 'en' ? 'BLESSING' : '給今天的祝福 · BLESSING'}</small><p>{blessing}</p></div>
    </article>
    <div className="artwork-editor-controls direct-card-editor-controls">
      {tab === 'photo' && <>
        <label>水平位置 · X <output>{draft.offsetX}%</output><input aria-label="紀念卡水平位置 · X" type="range" min="-100" max="100" step="1" value={draft.offsetX} onChange={event => setNumber('offsetX', event.target.value)} /></label>
        <label>垂直位置 · Y <output>{draft.offsetY}%</output><input aria-label="紀念卡垂直位置 · Y" type="range" min="-100" max="100" step="1" value={draft.offsetY} onChange={event => setNumber('offsetY', event.target.value)} /></label>
        <label>照片大小 · Size <output>{Math.round(draft.zoom * 100)}%</output><input aria-label="紀念卡照片大小 · Size" type="range" min="1" max="2.4" step="0.02" value={draft.zoom} onChange={event => setNumber('zoom', event.target.value)} /></label>
      </>}
      {tab === 'layout' && <label>祝福欄高度 · Blessing panel <output>{draftDesign.blessingHeight}px</output><input aria-label="祝福欄高度" type="range" min="64" max="130" step="2" value={draftDesign.blessingHeight} onChange={event => setDesignNumber('blessingHeight', event.target.value)} /></label>}
      {tab === 'type' && <>
        <label>卡片標題 · Card title<input type="text" maxLength={42} value={draftDesign.title} onChange={event => setDraftDesign(current => ({ ...current, title: event.target.value }))} /></label>
        <label>字體風格 · Font<select value={draftDesign.fontFamily} onChange={event => setDraftDesign(current => ({ ...current, fontFamily: event.target.value as DirectKeepsakeDesign['fontFamily'] }))}>{DIRECT_KEEPSAKE_FONT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <label>標題大小 · Title size <output>{draftDesign.titleFontSize}px</output><input aria-label="標題大小" type="range" min="12" max="22" step="1" value={draftDesign.titleFontSize} onChange={event => setDesignNumber('titleFontSize', event.target.value)} /></label>
        <label>祝福大小 · Blessing size <output>{draftDesign.blessingFontSize}px</output><input aria-label="祝福大小" type="range" min="11" max="22" step="1" value={draftDesign.blessingFontSize} onChange={event => setDesignNumber('blessingFontSize', event.target.value)} /></label>
      </>}
    </div>
    <footer><button type="button" onClick={reset}>{language === 'en' ? 'Reset Card' : '恢復卡片預設'}</button></footer>
  </section>
}
