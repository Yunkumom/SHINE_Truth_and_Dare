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
}

const SCREEN_LABELS: Array<[LayoutScreen, string]> = [
  ['setup', 'Setup layout · 入口'],
  ['game', 'Game layout · 抽卡'],
  ['keepsake', 'Keepsake layout · 紀念卡'],
]

export default function LayoutEditor({ open, history, onHistoryChange, screen, onScreenChange, selectedBlock, onSelectBlock, onClose, snap = true, onSnapChange, docked = false }: LayoutEditorProps) {
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

  return <aside className={`layout-editor${docked ? ' is-docked' : ''}`} role="dialog" aria-label="Layout editor">
    <header><div><b>版面編輯器</b><small>LAYOUT EDITOR · V25</small></div>{!docked && <button type="button" onClick={onClose} aria-label="Close layout editor">×</button>}</header>
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
