import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import {
  applyLayoutChange,
  createLayoutHistory,
  importLayout,
  redoLayout,
  resetAllLayouts,
  resetLayoutScreen,
  serializeLayout,
  undoLayout,
} from '../layout/layout-model'
import type { LayoutBlock, LayoutHistory, LayoutScreen } from '../layout/layout-model'
import { DEFAULT_ARTWORK_PRESENTATION, DEFAULT_PRESENTATION, normalizePresentation, presentationForArtwork } from '../presentation/presentation-model'
import type { PresentationDocument } from '../presentation/presentation-model'
import '../styles/layout-editor.css'

interface LayoutEditorProps {
  open: boolean
  history: LayoutHistory
  onHistoryChange: Dispatch<SetStateAction<LayoutHistory>> | ((history: LayoutHistory) => void)
  screen: LayoutScreen
  onScreenChange: (screen: LayoutScreen) => void
  selectedBlock: string
  onSelectBlock: (id: string) => void
  onClose: () => void
  snap?: boolean
  onSnapChange?: (snap: boolean) => void
  docked?: boolean
  presentation?: PresentationDocument
  artworkId?: string
  onPresentationChange?: (presentation: PresentationDocument) => void
}

const SCREEN_LABELS: Array<[LayoutScreen, string]> = [
  ['setup', 'Setup layout · 入口'],
  ['game', 'Game layout · 抽卡'],
  ['keepsake', 'Keepsake layout · 紀念卡'],
]

export default function LayoutEditor({ open, history, onHistoryChange, screen, onScreenChange, selectedBlock, onSelectBlock, onClose, snap = true, onSnapChange, docked = false, presentation = DEFAULT_PRESENTATION, artworkId, onPresentationChange }: LayoutEditorProps) {
  const [json, setJson] = useState('')
  const [status, setStatus] = useState('')
  if (!open) return null

  const blocks = history.present.screens[screen]
  const selected = blocks[selectedBlock] ?? blocks[Object.keys(blocks)[0]]

  function changeScreen(next: LayoutScreen) {
    onScreenChange(next)
    onSelectBlock(Object.keys(history.present.screens[next])[0])
  }

  function changeField(field: keyof LayoutBlock, value: number) {
    onHistoryChange(applyLayoutChange(history, screen, selectedBlock, { [field]: value }))
  }

  function exportDocument() {
    setJson(serializeLayout(history.present))
    setStatus('Layout JSON ready · 版面資料已產生')
  }

  function importDocument() {
    try {
      const imported = importLayout(json)
      onHistoryChange(createLayoutHistory(imported))
      setStatus('Layout imported · 版面已匯入')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Invalid layout JSON')
    }
  }

  const artwork = artworkId ? presentationForArtwork(presentation, artworkId) : DEFAULT_ARTWORK_PRESENTATION
  const showCardControls = screen !== 'setup' && Boolean(artworkId && onPresentationChange)

  function changeArtwork(field: keyof typeof artwork, value: number) {
    if (!artworkId || !onPresentationChange) return
    onPresentationChange(normalizePresentation({ ...presentation, artworkById: { ...presentation.artworkById, [artworkId]: { ...artwork, [field]: value } } }))
  }

  function changePresentation(field: 'artworkHeight' | keyof typeof presentation.blessing, value: number) {
    if (!onPresentationChange) return
    onPresentationChange(normalizePresentation(field === 'artworkHeight' ? { ...presentation, artworkHeight: value } : { ...presentation, blessing: { ...presentation.blessing, [field]: value } }))
  }

  function changeTextScale(section: 'question' | 'blessing', value: number) {
    if (!onPresentationChange) return
    onPresentationChange(normalizePresentation({ ...presentation, [section]: { ...presentation[section], fontScale: value } }))
  }

  return <aside className={`layout-editor${docked ? ' is-docked' : ''}`} role="dialog" aria-label="Layout editor">
    <header><div><b>版面編輯器</b><small>LAYOUT EDITOR · V31</small></div>{!docked && <button type="button" onClick={onClose} aria-label="Close layout editor">×</button>}</header>
    <nav aria-label="Layout preview">
      {SCREEN_LABELS.map(([value, label]) => <button type="button" key={value} className={screen === value ? 'active' : ''} onClick={() => changeScreen(value)} aria-label={label}>{label.split(' · ')[1]}</button>)}
    </nav>
    <div className="editor-row">
      <label>Block<select aria-label="Block" value={selectedBlock} onChange={event => onSelectBlock(event.currentTarget.value)}>{Object.keys(blocks).map(id => <option key={id} value={id}>{id}</option>)}</select></label>
      <label className="snap-toggle"><input type="checkbox" checked={snap} onChange={event => onSnapChange?.(event.currentTarget.checked)} />4px grid</label>
    </div>
    <div className="editor-numbers">
      {(['x', 'y', 'width', 'height', 'fontScale', 'padding', 'z'] as const).map(field => <label key={field}>{field === 'fontScale' ? 'Font' : field[0].toUpperCase() + field.slice(1)}<input aria-label={field === 'fontScale' ? 'Font scale' : field[0].toUpperCase() + field.slice(1)} type="number" step={field === 'fontScale' ? .05 : 1} value={selected[field]} onChange={event => changeField(field, Number(event.currentTarget.value))} /></label>)}
    </div>
    {showCardControls && <section className="card-presentation-controls" aria-label="Card presentation settings">
      <div className="editor-section-heading"><b>卡片圖像</b><small>THIS ARTWORK</small></div>
      <div className="editor-numbers presentation-grid">
        <label>Horizontal<input aria-label="Artwork horizontal" type="number" min="-30" max="30" value={artwork.offsetX} onChange={event => changeArtwork('offsetX', Number(event.currentTarget.value))} /></label>
        <label>Vertical<input aria-label="Artwork vertical" type="number" min="-30" max="30" value={artwork.offsetY} onChange={event => changeArtwork('offsetY', Number(event.currentTarget.value))} /></label>
        <label>Zoom<input aria-label="Artwork zoom" type="number" min="1" max="1.8" step=".05" value={artwork.zoom} onChange={event => changeArtwork('zoom', Number(event.currentTarget.value))} /></label>
        <label>Height %<input aria-label="Artwork height" type="number" min="50" max="70" value={presentation.artworkHeight} onChange={event => changePresentation('artworkHeight', Number(event.currentTarget.value))} /></label>
      </div>
      <div className="editor-section-heading"><b>問題與祝福字級</b><small>QUESTION &amp; BLESSING</small></div>
      <div className="type-scale-controls">
        <label><span>問題 Question</span><input aria-label="Question font size" type="number" min=".9" max="1.8" step=".05" value={presentation.question.fontScale} onChange={event => changeTextScale('question', Number(event.currentTarget.value))} /><input aria-label="Question font size slider" type="range" min=".9" max="1.8" step=".05" value={presentation.question.fontScale} onChange={event => changeTextScale('question', Number(event.currentTarget.value))} /></label>
        <label><span>祝福 Blessing</span><input aria-label="Blessing font size" type="number" min=".9" max="1.8" step=".05" value={presentation.blessing.fontScale} onChange={event => changeTextScale('blessing', Number(event.currentTarget.value))} /><input aria-label="Blessing font size slider" type="range" min=".9" max="1.8" step=".05" value={presentation.blessing.fontScale} onChange={event => changeTextScale('blessing', Number(event.currentTarget.value))} /></label>
      </div>
      <div className="editor-section-heading"><b>祝福框排版</b><small>BLESSING BOX</small></div>
      <div className="editor-numbers presentation-grid">
        <label>Line<input aria-label="Blessing line height" type="number" min="1" max="1.8" step=".05" value={presentation.blessing.lineHeight} onChange={event => changePresentation('lineHeight', Number(event.currentTarget.value))} /></label>
        <label>Height<input aria-label="Blessing height" type="number" min="28" max="100" value={presentation.blessing.height} onChange={event => changePresentation('height', Number(event.currentTarget.value))} /></label>
        <label>Padding<input aria-label="Blessing padding" type="number" min="0" max="16" value={presentation.blessing.padding} onChange={event => changePresentation('padding', Number(event.currentTarget.value))} /></label>
        <label>Horizontal<input aria-label="Blessing horizontal" type="number" min="-40" max="40" value={presentation.blessing.offsetX} onChange={event => changePresentation('offsetX', Number(event.currentTarget.value))} /></label>
        <label>Vertical<input aria-label="Blessing vertical" type="number" min="-40" max="40" value={presentation.blessing.offsetY} onChange={event => changePresentation('offsetY', Number(event.currentTarget.value))} /></label>
      </div>
    </section>}
    <div className="editor-history">
      <button type="button" aria-label="Undo" disabled={!history.past.length} onClick={() => onHistoryChange(undoLayout(history))}>↶ Undo</button>
      <button type="button" aria-label="Redo" disabled={!history.future.length} onClick={() => onHistoryChange(redoLayout(history))}>Redo ↷</button>
      <button type="button" onClick={() => onHistoryChange(resetLayoutScreen(history, screen))}>Reset screen</button>
      <button type="button" onClick={() => onHistoryChange(resetAllLayouts(history))}>Reset all</button>
    </div>
    <label className="json-field">Layout JSON<textarea aria-label="Layout JSON" value={json} onChange={event => setJson(event.currentTarget.value)} spellCheck={false} /></label>
    <div className="editor-exchange"><button type="button" aria-label="Export layout" onClick={exportDocument}>Export JSON</button><button type="button" aria-label="Import layout" onClick={importDocument}>Import JSON</button></div>
    {status && <p role="alert">{status}</p>}
  </aside>
}
