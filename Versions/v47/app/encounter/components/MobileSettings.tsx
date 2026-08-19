import { useEffect, useMemo, useRef, useState } from 'react'
import type { ArtworkCollection, ArtworkPreference, ArtworkVariant, Card, Language, Level, Mode, QuestionPack, SessionQuestionManagerState } from '../types'
import { questionPackId } from '../data/question-packs'
import { SHINE_DEPTHS } from '../data/shine-question-book'
import ArtworkPicker from './ArtworkPicker'

type SettingsTab = 'general' | 'cards' | 'questions' | 'content' | 'positions'

interface MobileSettingsProps {
  open: boolean
  onClose: () => void
  level: Level
  mode: Mode
  onLevelChange: (level: Level) => void
  onModeChange: (mode: Mode) => void
  language: Language
  onLanguageChange: (language: Language) => void
  fontScale: number
  onFontScaleChange: (fontScale: number) => void
  artworks: readonly ArtworkVariant[]
  collections: readonly ArtworkCollection[]
  artworkPreference: ArtworkPreference
  onArtworkPreferenceChange: (preference: ArtworkPreference) => void
  questions: Card[]
  questionPacks: readonly QuestionPack[]
  manager: SessionQuestionManagerState
  onManagerChange: (manager: SessionQuestionManagerState) => void
  onSave?: (preference: ArtworkPreference, manager: SessionQuestionManagerState) => void
  savedArtworkIds?: string[]
  onClearArtworkPosition?: (artworkId: string) => void
}

const tabs: Array<[SettingsTab, string]> = [['general', '基本設定'], ['cards', '卡庫'], ['questions', '問題庫'], ['content', '卡片內容'], ['positions', '照片位置']]

export default function MobileSettings({ open, onClose, level, mode, onLevelChange, onModeChange, language, onLanguageChange, fontScale, onFontScaleChange, artworks, collections, artworkPreference, onArtworkPreferenceChange, questions, questionPacks, manager, onManagerChange, onSave, savedArtworkIds = [], onClearArtworkPosition = () => undefined }: MobileSettingsProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [tab, setTab] = useState<SettingsTab>('general')
  const [questionLevel, setQuestionLevel] = useState<Level>(level)
  const [questionZh, setQuestionZh] = useState('')
  const [questionEn, setQuestionEn] = useState('')
  const [questionMode, setQuestionMode] = useState<'truth' | 'dare'>('truth')
  const [questionPackFilter, setQuestionPackFilter] = useState<string>('all')
  const [questionSearch, setQuestionSearch] = useState('')
  const [draftArtworkPreference, setDraftArtworkPreference] = useState<ArtworkPreference>(artworkPreference)
  const [draftManager, setDraftManager] = useState<SessionQuestionManagerState>(manager)
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

  const selectedArtwork = draftArtworkPreference.mode === 'specific' ? artworks.find(artwork => artwork.id === draftArtworkPreference.artworkId) : undefined
  const disabled = useMemo(() => new Set(draftManager.disabledQuestionIds), [draftManager.disabledQuestionIds])
  const normalizedSearch = questionSearch.trim().toLocaleLowerCase()
  const managedQuestions = [...questions, ...draftManager.customQuestions].filter(question => {
    const packMatches = questionPackFilter === 'all' || questionPackId(question) === questionPackFilter
    const searchMatches = !normalizedSearch || [question.zhTitle, question.enTitle, question.zh, question.en].some(value => value?.toLocaleLowerCase().includes(normalizedSearch))
    return question.level === questionLevel && packMatches && searchMatches
  })
  const updateManager = (patch: Partial<SessionQuestionManagerState>) => setDraftManager(value => ({ ...value, ...patch }))
  const toggleQuestion = (questionId: string, enabled: boolean) => {
    const next = new Set(draftManager.disabledQuestionIds)
    if (enabled) next.delete(questionId); else next.add(questionId)
    updateManager({ disabledQuestionIds: [...next], selectedQuestionId: !enabled && draftManager.selectedQuestionId === questionId ? null : draftManager.selectedQuestionId, drawnQuestionIds: [] })
  }
  const togglePack = (packId: string, enabled: boolean) => {
    const next = new Set(draftManager.enabledQuestionPackIds)
    if (enabled) next.add(packId); else if (next.size > 1) next.delete(packId)
    updateManager({ enabledQuestionPackIds: [...next], selectedQuestionId: draftManager.selectedQuestionId && questionPackId([...questions, ...draftManager.customQuestions].find(question => question.id === draftManager.selectedQuestionId) ?? questions[0]) === packId && !next.has(packId) ? null : draftManager.selectedQuestionId, drawnQuestionIds: [] })
  }
  const chooseExactQuestion = (question: Card) => {
    const packId = questionPackId(question)
    updateManager({
      selectedQuestionId: draftManager.selectedQuestionId === question.id ? null : question.id,
      disabledQuestionIds: draftManager.disabledQuestionIds.filter(id => id !== question.id),
      enabledQuestionPackIds: question.id.startsWith('custom-') || draftManager.enabledQuestionPackIds.includes(packId) ? draftManager.enabledQuestionPackIds : [...draftManager.enabledQuestionPackIds, packId],
      drawnQuestionIds: [],
    })
  }
  const addQuestion = (event: React.FormEvent) => {
    event.preventDefault()
    const zh = questionZh.trim()
    if (!zh) return
    const question: Card = { id: `custom-${Date.now()}`, level: questionLevel, mode: questionMode, zh, en: questionEn.trim() || zh }
    updateManager({ customQuestions: [...draftManager.customQuestions, question], drawnQuestionIds: [] })
    setQuestionZh(''); setQuestionEn('')
  }
  const deleteQuestion = (questionId: string) => updateManager({
    customQuestions: draftManager.customQuestions.filter(question => question.id !== questionId),
    selectedQuestionId: draftManager.selectedQuestionId === questionId ? null : draftManager.selectedQuestionId,
    disabledQuestionIds: draftManager.disabledQuestionIds.filter(id => id !== questionId),
    drawnQuestionIds: [],
  })

  if (!open) return null
  return <section className="library-manager" role="dialog" aria-modal="true" aria-label="TRUTH OR DARE settings">
    <header className="library-manager-header"><div><small>TRUTH OR DARE · V47</small><b>抽卡設定</b></div><button ref={closeButtonRef} type="button" onClick={onClose} aria-label="關閉設定">×</button></header>
    <nav className="library-manager-tabs" aria-label="設定分頁">{tabs.map(([value, label]) => <button type="button" key={value} aria-pressed={tab === value} onClick={() => setTab(value)}>{label}</button>)}</nav>

    {tab === 'general' && <section className="library-manager-panel">
      <h3>抽卡設定 · Draw Settings</h3><p>卡面、問題、熟識程度與卡型可分開選擇。</p>
      <div className="settings-group display-settings-group"><b>顯示與語言 · Display &amp; Language</b><label className="settings-select-row"><span>語言 · Language</span><select aria-label="選擇語言 · Choose language" value={language} onChange={event => onLanguageChange(event.target.value as Language)}><option value="zh">中文</option><option value="en">English</option><option value="bilingual">中文／English</option></select></label><div className="settings-font-row"><span>字體大小 · Font size</span><div role="group" aria-label="Font size"><button type="button" aria-label="縮小字體 · Decrease font size" onClick={() => onFontScaleChange(fontScale - .1)}>A−</button><output aria-live="polite">{Math.round(fontScale * 100)}%</output><button type="button" aria-label="放大字體 · Increase font size" onClick={() => onFontScaleChange(fontScale + .1)}>A＋</button></div></div></div>
      <div className="settings-group"><b>熟識程度 · Level</b><div className="settings-choice-grid" role="group" aria-label="Settings level">{([1, 2, 3, 4, 5] as Level[]).map(value => <button type="button" key={value} aria-label={`L${value}`} aria-pressed={level === value} onClick={() => onLevelChange(value)}>L{value}</button>)}</div></div>
      <div className="settings-group"><b>卡片類型 · Card Type</b><div className="settings-choice-grid" role="group" aria-label="Settings card type">{([['truth', '真心話'], ['dare', '小挑戰'], ['random', '隨機']] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={mode === value} onClick={() => onModeChange(value)}>{label}</button>)}</div></div>
      <div className="settings-summary-grid">
        <article><small>CARD</small><b>{selectedArtwork?.zhName ?? '隨機卡面'}</b><button type="button" onClick={() => setTab('cards')}>選擇指定卡片</button><button type="button" onClick={() => setDraftArtworkPreference({ mode: 'random', collectionId: draftArtworkPreference.collectionId })}>改為隨機卡面</button></article>
        <article><small>QUESTION</small><b>{draftManager.selectedQuestionId ? '已指定問題' : '隨機抽題'}</b><button type="button" onClick={() => setTab('questions')}>選擇指定問題</button><button type="button" onClick={() => updateManager({ selectedQuestionId: null, drawnQuestionIds: [] })}>改為隨機抽題</button></article>
      </div>
    </section>}

    {tab === 'cards' && <section className="library-manager-panel"><div className="manager-section-heading"><div><h3>卡庫 · Card Library</h3><p>先選擇草稿，儲存後才會套用到目前卡片。</p></div><button type="button" onClick={() => setDraftArtworkPreference({ mode: 'random', collectionId: draftArtworkPreference.collectionId })}>使用隨機卡面</button></div><ArtworkPicker artworks={artworks} collections={collections} selectedArtworkId={selectedArtwork?.id} initialCollectionId={draftArtworkPreference.collectionId} onSelect={artwork => setDraftArtworkPreference({ mode: 'specific', collectionId: artwork.collectionId ?? draftArtworkPreference.collectionId, artworkId: artwork.id })} /></section>}

    {tab === 'questions' && <section className="library-manager-panel">
      <div className="manager-section-heading"><div><h3>問題庫 · Question Library</h3><p>SHINE 62 題與經典 60 題可以分開啟用、隨機不重複抽取或指定下一題。</p></div><button type="button" onClick={() => updateManager({ selectedQuestionId: null, drawnQuestionIds: [] })}>恢復隨機</button></div>
      <div className="question-pack-list">{questionPacks.map(pack => <article key={pack.id} className="question-pack-card"><label><input type="checkbox" checked={draftManager.enabledQuestionPackIds.includes(pack.id)} onChange={event => togglePack(pack.id, event.target.checked)} /><span><b>{pack.zhName}</b><small>{pack.enName} · {pack.questionIds.length} CARDS</small></span></label><button type="button" aria-pressed={questionPackFilter === pack.id} onClick={() => setQuestionPackFilter(questionPackFilter === pack.id ? 'all' : pack.id)}>{questionPackFilter === pack.id ? '顯示全部' : '只看此題庫'}</button></article>)}</div>
      <div className="question-level-tabs" role="group" aria-label="Question level">{([1, 2, 3, 4, 5] as Level[]).map(value => <button type="button" key={value} aria-pressed={questionLevel === value} onClick={() => setQuestionLevel(value)}>L{value}</button>)}</div>
      <label className="question-search"><span>搜尋題目 · Search</span><input type="search" value={questionSearch} onChange={event => setQuestionSearch(event.target.value)} placeholder="輸入標題或題目內容" /></label>
      <div className="question-manager-status" aria-live="polite">L{questionLevel}：{managedQuestions.filter(question => !disabled.has(question.id)).length} / {managedQuestions.length} 題啟用</div>
      <div className="question-manager-list">{managedQuestions.map(question => {
        const custom = question.id.startsWith('custom-')
        const depth = question.depth ? SHINE_DEPTHS[question.depth] : null
        return <article className="question-manager-item" key={question.id}><label className="question-enable"><input type="checkbox" aria-label={`啟用 ${question.zh}`} checked={!disabled.has(question.id)} onChange={event => toggleQuestion(question.id, event.target.checked)} /><span>啟用</span></label><div className="question-manager-copy"><small>{depth ? `${depth.symbol} ${depth.zh}` : `L${question.level}`} · {question.kind === 'activity' ? 'ACTIVITY' : question.mode.toUpperCase()}{custom ? ' · CUSTOM' : ''}</small>{question.zhTitle && <strong>{question.zhTitle} · {question.enTitle}</strong>}<b>{question.zh}</b><span>{question.en}</span></div><div className="question-manager-actions"><button type="button" aria-pressed={draftManager.selectedQuestionId === question.id} onClick={() => chooseExactQuestion(question)}>{draftManager.selectedQuestionId === question.id ? '已指定' : '指定'}</button>{custom && <button type="button" onClick={() => deleteQuestion(question.id)}>刪除</button>}</div></article>
      })}</div>
      <form className="question-add-form" onSubmit={addQuestion}><b>新增目前 Level 的問題</b><textarea required placeholder="輸入中文問題" value={questionZh} onChange={event => setQuestionZh(event.target.value)} /><input placeholder="English translation（選填）" value={questionEn} onChange={event => setQuestionEn(event.target.value)} /><select aria-label="Question type" value={questionMode} onChange={event => setQuestionMode(event.target.value as 'truth' | 'dare')}><option value="truth">真心話 · Truth</option><option value="dare">小挑戰 · Dare</option></select><button type="submit" className="manager-primary">＋ 新增問題</button></form>
    </section>}

    {tab === 'content' && <section className="library-manager-panel"><h3>卡片內容 · Card Content</h3><p>遊戲卡固定只顯示題目；祝福保留在紀念卡。</p></section>}

    {tab === 'positions' && <section className="library-manager-panel"><h3>照片位置 · Saved Artwork Positions</h3><p>每張卡面的調整只保存非個人的位置與大小。</p><div className="saved-position-list">{savedArtworkIds.length ? savedArtworkIds.map(id => { const artwork = artworks.find(item => item.id === id); return <article key={id}><div><b>{artwork?.zhName ?? id}</b><small>{id}</small></div><button type="button" onClick={() => onClearArtworkPosition(id)}>清除</button></article> }) : <p>尚未儲存任何照片位置。</p>}</div></section>}
    {(tab === 'cards' || tab === 'questions') && <footer className="settings-draft-actions"><button type="button" onClick={onClose}>取消</button><button type="button" onClick={() => { onArtworkPreferenceChange(draftArtworkPreference); onManagerChange(draftManager); onSave?.(draftArtworkPreference, draftManager); onClose() }}>儲存並套用</button></footer>}
  </section>
}
