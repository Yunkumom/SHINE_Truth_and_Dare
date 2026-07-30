import { useEffect, useMemo, useRef, useState } from 'react'
import type { ArtworkCollection, ArtworkPreference, ArtworkVariant, Card, Level, Mode, SessionQuestionManagerState } from '../types'
import ArtworkPicker from './ArtworkPicker'

type SettingsTab = 'general' | 'cards' | 'questions' | 'content' | 'positions'

interface MobileSettingsProps {
  open: boolean
  onClose: () => void
  level: Level
  mode: Mode
  onLevelChange: (level: Level) => void
  onModeChange: (mode: Mode) => void
  artworks: readonly ArtworkVariant[]
  collections: readonly ArtworkCollection[]
  artworkPreference: ArtworkPreference
  onArtworkPreferenceChange: (preference: ArtworkPreference) => void
  questions: Card[]
  manager: SessionQuestionManagerState
  onManagerChange: (manager: SessionQuestionManagerState) => void
  savedArtworkIds?: string[]
  onClearArtworkPosition?: (artworkId: string) => void
}

const tabs: Array<[SettingsTab, string]> = [['general', '基本設定'], ['cards', '卡庫'], ['questions', '問題庫'], ['content', '卡片內容'], ['positions', '照片位置']]

export default function MobileSettings({ open, onClose, level, mode, onLevelChange, onModeChange, artworks, collections, artworkPreference, onArtworkPreferenceChange, questions, manager, onManagerChange, savedArtworkIds = [], onClearArtworkPosition = () => undefined }: MobileSettingsProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [tab, setTab] = useState<SettingsTab>('general')
  const [questionLevel, setQuestionLevel] = useState<Level>(level)
  const [questionZh, setQuestionZh] = useState('')
  const [questionEn, setQuestionEn] = useState('')
  const [questionMode, setQuestionMode] = useState<'truth' | 'dare'>('truth')
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

  const selectedArtwork = artworkPreference.mode === 'specific' ? artworks.find(artwork => artwork.id === artworkPreference.artworkId) : undefined
  const disabled = useMemo(() => new Set(manager.disabledQuestionIds), [manager.disabledQuestionIds])
  const managedQuestions = [...questions, ...manager.customQuestions].filter(question => question.level === questionLevel)
  const updateManager = (patch: Partial<SessionQuestionManagerState>) => onManagerChange({ ...manager, ...patch })
  const toggleQuestion = (questionId: string, enabled: boolean) => {
    const next = new Set(manager.disabledQuestionIds)
    if (enabled) next.delete(questionId); else next.add(questionId)
    updateManager({ disabledQuestionIds: [...next], selectedQuestionId: !enabled && manager.selectedQuestionId === questionId ? null : manager.selectedQuestionId })
  }
  const addQuestion = (event: React.FormEvent) => {
    event.preventDefault()
    const zh = questionZh.trim()
    if (!zh) return
    const question: Card = { id: `custom-${Date.now()}`, level: questionLevel, mode: questionMode, zh, en: questionEn.trim() || zh }
    updateManager({ customQuestions: [...manager.customQuestions, question] })
    setQuestionZh(''); setQuestionEn('')
  }
  const deleteQuestion = (questionId: string) => updateManager({
    customQuestions: manager.customQuestions.filter(question => question.id !== questionId),
    selectedQuestionId: manager.selectedQuestionId === questionId ? null : manager.selectedQuestionId,
    disabledQuestionIds: manager.disabledQuestionIds.filter(id => id !== questionId),
  })

  if (!open) return null
  return <section className="library-manager" role="dialog" aria-modal="true" aria-label="相遇卡設定 · Encounter settings">
    <header className="library-manager-header"><div><small>ENCOUNTER SETTINGS · V37</small><b>相遇卡設定</b></div><button ref={closeButtonRef} type="button" onClick={onClose} aria-label="關閉設定">×</button></header>
    <nav className="library-manager-tabs" aria-label="設定分頁">{tabs.map(([value, label]) => <button type="button" key={value} aria-pressed={tab === value} onClick={() => setTab(value)}>{label}</button>)}</nav>

    {tab === 'general' && <section className="library-manager-panel">
      <h3>抽卡設定 · Draw Settings</h3><p>卡面、問題、熟識程度與卡型可分開選擇。</p>
      <div className="settings-group"><b>熟識程度 · Level</b><div className="settings-choice-grid" role="group" aria-label="Settings level">{([1, 2, 3, 4, 5] as Level[]).map(value => <button type="button" key={value} aria-label={`L${value}`} aria-pressed={level === value} onClick={() => onLevelChange(value)}>L{value}</button>)}</div></div>
      <div className="settings-group"><b>卡片類型 · Card Type</b><div className="settings-choice-grid" role="group" aria-label="Settings card type">{([['truth', '真心話'], ['dare', '小挑戰'], ['random', '隨機']] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={mode === value} onClick={() => onModeChange(value)}>{label}</button>)}</div></div>
      <div className="settings-summary-grid">
        <article><small>CARD</small><b>{selectedArtwork?.zhName ?? '隨機卡面'}</b><button type="button" onClick={() => setTab('cards')}>選擇指定卡片</button><button type="button" onClick={() => onArtworkPreferenceChange({ mode: 'random', collectionId: artworkPreference.collectionId })}>改為隨機卡面</button></article>
        <article><small>QUESTION</small><b>{manager.selectedQuestionId ? '已指定問題' : '隨機抽題'}</b><button type="button" onClick={() => setTab('questions')}>選擇指定問題</button><button type="button" onClick={() => updateManager({ selectedQuestionId: null })}>改為隨機抽題</button></article>
      </div>
    </section>}

    {tab === 'cards' && <section className="library-manager-panel"><div className="manager-section-heading"><div><h3>卡庫 · Card Library</h3><p>從 42 張受治理卡面中選擇；問題與祝福仍保持獨立。</p></div><button type="button" onClick={() => onArtworkPreferenceChange({ mode: 'random', collectionId: artworkPreference.collectionId })}>使用隨機卡面</button></div><ArtworkPicker artworks={artworks} collections={collections} selectedArtworkId={selectedArtwork?.id} initialCollectionId={artworkPreference.collectionId} onSelect={artwork => onArtworkPreferenceChange({ mode: 'specific', collectionId: artwork.collectionId ?? artworkPreference.collectionId, artworkId: artwork.id })} /></section>}

    {tab === 'questions' && <section className="library-manager-panel">
      <div className="manager-section-heading"><div><h3>問題庫 · Question Library</h3><p>啟用、停用、指定或新增 session-only 問題。</p></div><button type="button" onClick={() => updateManager({ selectedQuestionId: null })}>恢復隨機</button></div>
      <div className="question-level-tabs" role="group" aria-label="Question level">{([1, 2, 3, 4, 5] as Level[]).map(value => <button type="button" key={value} aria-pressed={questionLevel === value} onClick={() => setQuestionLevel(value)}>L{value}</button>)}</div>
      <div className="question-manager-status" aria-live="polite">L{questionLevel}：{managedQuestions.filter(question => !disabled.has(question.id)).length} / {managedQuestions.length} 題啟用</div>
      <div className="question-manager-list">{managedQuestions.map(question => {
        const custom = question.id.startsWith('custom-')
        return <article className="question-manager-item" key={question.id}><label className="question-enable"><input type="checkbox" aria-label={`啟用 ${question.zh}`} checked={!disabled.has(question.id)} onChange={event => toggleQuestion(question.id, event.target.checked)} /><span>啟用</span></label><div className="question-manager-copy"><small>{question.mode.toUpperCase()}{custom ? ' · CUSTOM' : ''}</small><b>{question.zh}</b><span>{question.en}</span></div><div className="question-manager-actions"><button type="button" aria-pressed={manager.selectedQuestionId === question.id} onClick={() => updateManager({ selectedQuestionId: manager.selectedQuestionId === question.id ? null : question.id })}>{manager.selectedQuestionId === question.id ? '已指定' : '指定'}</button>{custom && <button type="button" onClick={() => deleteQuestion(question.id)}>刪除</button>}</div></article>
      })}</div>
      <form className="question-add-form" onSubmit={addQuestion}><b>新增目前 Level 的問題</b><textarea required placeholder="輸入中文問題" value={questionZh} onChange={event => setQuestionZh(event.target.value)} /><input placeholder="English translation（選填）" value={questionEn} onChange={event => setQuestionEn(event.target.value)} /><select aria-label="Question type" value={questionMode} onChange={event => setQuestionMode(event.target.value as 'truth' | 'dare')}><option value="truth">真心話 · Truth</option><option value="dare">小挑戰 · Dare</option></select><button type="submit" className="manager-primary">＋ 新增問題</button></form>
    </section>}

    {tab === 'content' && <section className="library-manager-panel"><h3>卡片內容 · Card Content</h3><p>控制目前 session 的裝飾標籤與問題顯示。</p><div className="content-toggle-list"><label><input type="checkbox" aria-label="真正的你 · The Real You" checked={manager.showRealYou} onChange={event => updateManager({ showRealYou: event.target.checked })} /><span><b>真正的你</b><small>THE REAL YOU</small></span></label><label><input type="checkbox" aria-label="問題 · Question" checked={manager.showQuestion} onChange={event => updateManager({ showQuestion: event.target.checked })} /><span><b>問題</b><small>QUESTION</small></span></label></div><p className="content-combination-note">祝福會固定保留在卡片、紀念卡與 PNG 中，無法關閉。</p></section>}

    {tab === 'positions' && <section className="library-manager-panel"><h3>照片位置 · Saved Artwork Positions</h3><p>每張卡面的調整只保存非個人的位置與大小。</p><div className="saved-position-list">{savedArtworkIds.length ? savedArtworkIds.map(id => { const artwork = artworks.find(item => item.id === id); return <article key={id}><div><b>{artwork?.zhName ?? id}</b><small>{id}</small></div><button type="button" onClick={() => onClearArtworkPosition(id)}>清除</button></article> }) : <p>尚未儲存任何照片位置。</p>}</div></section>}
  </section>
}
