import { useEffect, useMemo, useState } from 'react'
import EditableBlock from './components/EditableBlock'
import CardLibrary from './components/CardLibrary'
import LayoutEditor from './components/LayoutEditor'
import SwipeDeck from './components/SwipeDeck'
import TaiwanReveal from './components/TaiwanReveal'
import { blessings } from './data/blessings'
import { cards } from './data/cards'
import { ARTWORK_COLLECTIONS, DEFAULT_COLLECTION_ID } from './data/collections'
import { DEFAULT_QUESTION_PACK_ID, QUESTION_PACKS } from './data/question-packs'
import { isAdultOn } from './lib/age-gate'
import { DEITY_ART } from './lib/deity-art'
import { ALL_ARTWORKS } from './lib/artwork-catalog'
import { selectBlessing } from './lib/encounter'
import { createArtworkCandidates, resolvePreferredArtwork } from './lib/artwork-selection'
import { eligibleCards } from './lib/game'
import { resolvePreferredQuestion } from './lib/question-selection'
import { loadLanguage, loadFontScale, saveFontScale, saveLanguage } from './lib/preferences'
import { shareOrDownload } from './lib/share'
import { calculateDesktopScales, calculatePhoneScale } from './lib/viewport-scale'
import { portraitObjectPosition } from './lib/portrait-focus'
import { adjustedPortraitFocus } from './lib/portrait-focus'
import { applyLayoutChange, createLayoutHistory, loadStoredLayout, saveStoredLayout } from './layout/layout-model'
import type { LayoutBlock, LayoutScreen } from './layout/layout-model'
import { loadStoredPresentation, normalizePresentation, presentationForArtwork, saveStoredPresentation } from './presentation/presentation-model'
import type { ArtworkPreference, ArtworkVariant, Card, EncounterComposition, Language, Level, Mode, ParticipantExchange, QuestionPreference } from './types'
import './styles/v32.css'
import './styles/v32-layout.css'
import './styles/v33.css'
import './styles/v34.css'
import './styles/v35.css'

const copy = {
  zh: { heading: '讓一次簡單的對話，成為值得收藏的相遇。', subheading: 'Turn a simple conversation into a meeting worth keeping.', lead: '抽一張相遇卡，回答一個溫柔的問題，再把祝福送給今天認識的人。', leadEn: 'Draw a card, share an answer, and keep a blessing from today.', begin: '開始抽卡 · Begin', draw: '抽一張卡', next: '下一張', share: '製作紀念卡', install: 'iPhone：Safari → 分享 → 加入主畫面' },
  en: { heading: 'Turn a simple conversation into a meeting worth keeping.', subheading: '讓一次簡單的對話，成為值得收藏的相遇。', lead: 'Draw an encounter card, answer a gentle question, and send a blessing to someone you met today.', leadEn: '抽一張相遇卡，回答一個溫柔的問題，再把祝福送給今天認識的人。', begin: 'Begin the encounter', draw: 'Draw a card', next: 'Next card', share: 'Create keepsake', install: 'iPhone: Safari → Share → Add to Home Screen' },
}

const levelLabels = [['初見', 'First meeting'], ['熟悉', 'Familiar'], ['朋友', 'Friends'], ['親近', 'Close'], ['親密 18+', 'Intimate 18+']] as const

function CardText({ card, language }: { card: Card, language: Language }) {
  return <div className="mythic-question">{language !== 'en' && <p lang="zh-Hant">{card.zh}</p>}{language !== 'zh' && <small className={language === 'en' ? 'english-primary' : ''} lang="en">{card.en}</small>}</div>
}

function BlessingText({ encounter, language }: { encounter: EncounterComposition, language: Language }) {
  return <div className="mythic-blessing"><span>給這次相遇的祝福 · BLESSING</span>{language !== 'en' && <p lang="zh-Hant">{encounter.blessing.zh}</p>}{language !== 'zh' && <small className={language === 'en' ? 'english-primary' : ''} lang="en">{encounter.blessing.en}</small>}</div>
}

function localizedFeature(artwork: EncounterComposition['artwork'], language: Language) {
  if (!artwork.featureLabel) return ''
  if (language === 'en') return artwork.featureLabel.en
  if (language === 'bilingual') return `${artwork.featureLabel.zh} · ${artwork.featureLabel.en}`
  return artwork.featureLabel.zh
}

const previewEncounter: EncounterComposition = { card: cards[0], artwork: DEITY_ART[0], blessing: blessings[0] }

export default function App() {
  const [language, setLanguage] = useState<Language>(() => loadLanguage())
  const [fontScale, setFontScale] = useState(() => loadFontScale())
  const [level, setLevel] = useState<Level>(1)
  const [mode, setMode] = useState<Mode>('random')
  const [birthdayOpen, setBirthdayOpen] = useState(false)
  const [birthday, setBirthday] = useState('')
  const [adult, setAdult] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [keepsakeOpen, setKeepsakeOpen] = useState(false)
  const [current, setCurrent] = useState<EncounterComposition | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [status, setStatus] = useState('')
  const [offlineReady, setOfflineReady] = useState(false)
  const [phoneScale, setPhoneScale] = useState(1)
  const [desktopWorkspace, setDesktopWorkspace] = useState(() => window.innerWidth >= 1100)
  const [desktopScales, setDesktopScales] = useState(() => calculateDesktopScales(window.innerHeight))
  const [yourName, setYourName] = useState('')
  const [theirName, setTheirName] = useState('')
  const [yourContact, setYourContact] = useState('')
  const [theirContact, setTheirContact] = useState('')
  const [includeYours, setIncludeYours] = useState(true)
  const [includeTheirs, setIncludeTheirs] = useState(true)
  const [desktopMode, setDesktopMode] = useState<'settings' | 'test'>('settings')
  const [directManipulation, setDirectManipulation] = useState(false)
  const [advancedDeckOpen, setAdvancedDeckOpen] = useState(false)
  const [cardLibraryOpen, setCardLibraryOpen] = useState(false)
  const [artworkPreference, setArtworkPreference] = useState<ArtworkPreference>({ mode: 'random', collectionId: DEFAULT_COLLECTION_ID })
  const [questionPreference, setQuestionPreference] = useState<QuestionPreference>({ mode: 'random', packId: DEFAULT_QUESTION_PACK_ID })
  const [questionSearch, setQuestionSearch] = useState('')
  const [candidateArtworks, setCandidateArtworks] = useState(() => createArtworkCandidates(ARTWORK_COLLECTIONS, ALL_ARTWORKS, { mode: 'random', collectionId: DEFAULT_COLLECTION_ID }))
  const [editorScreen, setEditorScreen] = useState<LayoutScreen>('setup')
  const [selectedBlock, setSelectedBlock] = useState('hero')
  const [snap, setSnap] = useState(true)
  const [layoutHistory, setLayoutHistory] = useState(() => createLayoutHistory(loadStoredLayout()))
  const [presentation, setPresentation] = useState(() => loadStoredPresentation())
  const t = language === 'en' ? copy.en : copy.zh
  const pool = useMemo(() => eligibleCards(cards, level, mode), [level, mode])
  const activeCollection = ARTWORK_COLLECTIONS.find(collection => collection.id === artworkPreference.collectionId) ?? ARTWORK_COLLECTIONS[0]
  const collectionArtworks = useMemo(() => {
    const ids = new Set(activeCollection.artworkIds)
    return ALL_ARTWORKS.filter(artwork => ids.has(artwork.id))
  }, [activeCollection])
  const visibleQuestions = useMemo(() => {
    const query = questionSearch.trim().toLocaleLowerCase()
    if (!query) return pool
    return pool.filter(card => `${card.id} ${card.zh} ${card.en}`.toLocaleLowerCase().includes(query))
  }, [pool, questionSearch])
  const editingActive = desktopWorkspace && desktopMode === 'settings'
  const activeScreen: LayoutScreen = editingActive ? editorScreen : keepsakeOpen ? 'keepsake' : playing ? 'game' : 'setup'
  const encounter = current ?? previewEncounter
  const participants: ParticipantExchange[] = [
    { role: 'self', name: yourName, contact: yourContact, include: includeYours },
    { role: 'other', name: theirName, contact: theirContact, include: includeTheirs },
  ]

  useEffect(() => { if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(() => setOfflineReady(true)).catch(() => undefined) }, [])
  useEffect(() => {
    const updateScale = () => { setPhoneScale(calculatePhoneScale({ width: window.innerWidth, height: window.innerHeight })); setDesktopWorkspace(window.innerWidth >= 1100); setDesktopScales(calculateDesktopScales(window.innerHeight)) }
    const viewport = window.visualViewport
    updateScale(); window.addEventListener('resize', updateScale); viewport?.addEventListener('resize', updateScale)
    return () => { window.removeEventListener('resize', updateScale); viewport?.removeEventListener('resize', updateScale) }
  }, [])
  useEffect(() => { saveStoredLayout(layoutHistory.present) }, [layoutHistory.present])
  useEffect(() => { saveStoredPresentation(presentation) }, [presentation])

  function chooseLanguage(value: Language) { setLanguage(value); saveLanguage(value) }
  function chooseLevel(value: Level) { if (value === 5 && !adult) setBirthdayOpen(true); else setLevel(value) }
  function confirmAdult() { if (isAdultOn(birthday)) { setAdult(true); setLevel(5); setBirthdayOpen(false); setBirthday('') } else setStatus('Level 5 remains locked / Level 5 仍為鎖定') }
  function draw(artworkId?: string) {
    const question = resolvePreferredQuestion(questionPreference, pool, current?.card.id)
    const card = question.card
    const artwork = artworkId
      ? resolvePreferredArtwork({ mode: 'specific', collectionId: artworkPreference.collectionId, artworkId }, ARTWORK_COLLECTIONS, ALL_ARTWORKS, current?.artwork.id)
      : resolvePreferredArtwork(artworkPreference, ARTWORK_COLLECTIONS, ALL_ARTWORKS, current?.artwork.id)
    const blessing = selectBlessing(blessings)
    setCurrent({ card, artwork, blessing }); setRevealed(true); setStatus(question.fallback ? '指定問題不符合目前等級或卡型，已安全改為隨機題目。 · Exact question was ineligible; a safe random question was used.' : language === 'en' ? `Revealed: ${card.en}` : `已翻開：${card.zh}`)
  }
  function chooseCollection(collectionId: string) {
    setArtworkPreference({ mode: 'random', collectionId })
  }
  function chooseLibraryArtwork(artwork: ArtworkVariant) {
    setArtworkPreference({ mode: 'specific', collectionId: artwork.collectionId ?? DEFAULT_COLLECTION_ID, artworkId: artwork.id })
    setCardLibraryOpen(false)
    setStatus(`已指定卡面：${artwork.zhName} · Artwork selected: ${artwork.enName}`)
  }
  function changeFont(delta: number) { const value = Math.max(.85, Math.min(1.25, fontScale + delta)); setFontScale(value); saveFontScale(value) }
  async function exportKeepsake() { setStatus(await shareOrDownload(encounter, language, participants, layoutHistory.present, presentation)) }
  function goHome() { setPlaying(false); setKeepsakeOpen(false); setCardLibraryOpen(false); if (desktopMode === 'settings') { setEditorScreen('setup'); setSelectedBlock('hero') } }
  function changeBlock(screen: LayoutScreen, id: string, patch: Partial<LayoutBlock>) { setLayoutHistory(history => applyLayoutChange(history, screen, id, patch)) }
  function block(screen: LayoutScreen, id: string, children: React.ReactNode, className = '') {
    return <EditableBlock key={`${screen}-${id}`} id={id} block={layoutHistory.present.screens[screen][id]} editing={editingActive && editorScreen === screen} selected={editingActive && editorScreen === screen && selectedBlock === id} directManipulation={directManipulation} canvasScale={desktopWorkspace ? desktopScales.workbench : 1} snap={snap} onSelect={() => setSelectedBlock(id)} onChange={patch => changeBlock(screen, id, patch)} className={className}>{children}</EditableBlock>
  }
  function header(screen: 'setup' | 'game') {
    return block(screen, 'header', <header className="site-header"><button className="wordmark" type="button" onClick={goHome} aria-label="Encounter Cards home"><span className="mark">✦</span><span>相遇卡 <small>ENCOUNTER CARDS · V35</small></span></button><div className="header-tools">{screen === 'setup' && <button type="button" className="card-library-trigger" aria-label="開啟卡庫 · Open card library" onClick={() => { setAdvancedDeckOpen(false); setCardLibraryOpen(true) }}><span aria-hidden="true">☰</span><small>卡庫</small></button>}{playing && <div className="font-size-control" aria-label="Font size"><button onClick={() => changeFont(-.1)}>A−</button><button onClick={() => changeFont(.1)}>A＋</button></div>}<div className="language-switch" role="group" aria-label="Language 語言">{([['zh', '中'], ['en', 'EN'], ['bilingual', '中/EN']] as const).map(([value, label]) => <button key={value} className={language === value ? 'active' : ''} aria-pressed={language === value} aria-label={value === 'zh' ? '中文' : value === 'en' ? 'English' : '雙語 Bilingual'} onClick={() => chooseLanguage(value)}>{label}</button>)}</div></div></header>, 'header-block')
  }

  const artworkPresentation = presentationForArtwork(presentation, encounter.artwork.id)
  const artworkFocus = adjustedPortraitFocus(encounter.artwork.portraitFocus, artworkPresentation)
  const artworkStyle = {
    '--portrait-position': portraitObjectPosition(artworkFocus),
    '--artwork-zoom': artworkPresentation.zoom,
    '--artwork-origin': portraitObjectPosition(artworkFocus),
  } as React.CSSProperties
  const cardPresentationStyle = {
    '--artwork-height': `${presentation.artworkHeight}%`,
    '--text-height': `${90 - presentation.artworkHeight}%`,
    '--question-font-scale': presentation.question.fontScale,
    '--blessing-font-scale': presentation.blessing.fontScale,
    '--blessing-line-height': presentation.blessing.lineHeight,
    '--blessing-height': `${presentation.blessing.height}px`,
    '--blessing-padding': `${presentation.blessing.padding}px`,
    '--blessing-offset-x': `${presentation.blessing.offsetX}px`,
    '--blessing-offset-y': `${presentation.blessing.offsetY}px`,
  } as React.CSSProperties

  function renderLibraryCard(artwork: ArtworkVariant) {
    const artworkIndex = Math.max(0, ALL_ARTWORKS.findIndex(item => item.id === artwork.id))
    const preview: EncounterComposition = {
      artwork,
      card: cards[artworkIndex % cards.length],
      blessing: blessings[artworkIndex % blessings.length],
    }
    const previewPresentation = presentationForArtwork(presentation, artwork.id)
    const previewFocus = adjustedPortraitFocus(artwork.portraitFocus, previewPresentation)
    const previewArtworkStyle = {
      '--portrait-position': portraitObjectPosition(previewFocus),
      '--artwork-zoom': previewPresentation.zoom,
      '--artwork-origin': portraitObjectPosition(previewFocus),
    } as React.CSSProperties
    return <article className="mythic-card library-mythic-card" style={cardPresentationStyle}>
      <div className="mythic-card-header"><div><span>護行之卡 · ENCOUNTER GUARDIAN</span><h2>{artwork.zhName}</h2><small>{artwork.enName}</small>{artwork.featureLabel && <small className="artwork-feature-note">台灣特色 · {localizedFeature(artwork, language)}</small>}</div><i>✦</i></div>
      <div className="mythic-art-frame"><img src={artwork.src} alt={`${artwork.zhName}・卡庫完整卡面`} draggable="false" style={previewArtworkStyle} /><div className="mythic-foil" /></div>
      <div className="mythic-text-panel"><div className="mythic-prompt-meta"><b>真正的你 · THE REAL YOU</b><span>L{preview.card.level} · {preview.card.mode.toUpperCase()}</span></div><CardText card={preview.card} language={language} /><BlessingText encounter={preview} language={language} /></div>
    </article>
  }

  const setupScreen = <section className="screen-canvas setup-canvas" aria-label="開始遊戲設定 · Game setup">
    <div className="setup-content" aria-hidden={cardLibraryOpen || undefined} inert={cardLibraryOpen || undefined}>
    {header('setup')}
    {block('setup', 'hero', <div className="hero-copy"><h1 aria-label={t.heading}><span>{t.heading}</span><small>{t.subheading}</small></h1><p className="hero-lead"><span>{t.lead}</span><small>{t.leadEn}</small></p></div>, 'setup-hero-block')}
    {block('setup', 'fields', <div className="setup-card fields-card"><div className="panel-heading"><span>01</span><b>準備這次相遇 · Set the moment</b></div><div className="field-row"><label><span>你的名字 · Your name</span><input value={yourName} onChange={event => setYourName(event.target.value)} autoComplete="off" placeholder="你的名字 · Your name" /></label><label><span>對方名字 · Their name</span><input value={theirName} onChange={event => setTheirName(event.target.value)} autoComplete="off" placeholder="對方名字 · Their name" /></label></div><div className="field-row contact-row"><label><span>你的聯絡方式（選填） · Your contact</span><input value={yourContact} onChange={event => setYourContact(event.target.value)} autoComplete="off" placeholder="任何格式 · Any format" /></label><label><span>對方聯絡方式（選填） · Their contact</span><input value={theirContact} onChange={event => setTheirContact(event.target.value)} autoComplete="off" placeholder="任何格式 · Any format" /></label></div></div>, 'setup-fields-block')}
    {block('setup', 'levels', <fieldset className="setup-card level-fieldset"><legend>選擇熟識程度 · Choose familiarity level</legend><div className="level-grid">{([1, 2, 3, 4, 5] as Level[]).map(value => <button type="button" key={value} className={level === value ? 'active' : ''} aria-label={`Level ${value}${value === 5 ? ' · 18+' : ''}`} aria-pressed={level === value} onClick={() => chooseLevel(value)}><b>L{value}</b><span>{levelLabels[value - 1][0]}</span></button>)}</div><small className="level-description">{levelLabels[level - 1][1]} · LEVEL {level}</small></fieldset>, 'setup-levels-block')}
    {block('setup', 'modes', <fieldset className="setup-card mode-fieldset"><legend>想抽哪一種卡？ · Choose a card type</legend><div className="mode-grid">{([['truth', '○', '真心話', 'TRUTH'], ['dare', '△', '小挑戰', 'DARE'], ['random', '✦', '隨機', 'SURPRISE ME']] as const).map(([value, icon, zh, en]) => <button type="button" key={value} className={mode === value ? 'active' : ''} aria-label={value === 'truth' ? 'Truth' : value === 'dare' ? 'Dare' : 'Random'} aria-pressed={mode === value} onClick={() => setMode(value)}><span>{icon}</span><b>{zh}</b><small>{en}</small></button>)}</div></fieldset>, 'setup-modes-block')}
    <div className="advanced-deck-choice" data-no-layout-drag>
      <button type="button" className="advanced-deck-disclosure" aria-expanded={advancedDeckOpen} aria-controls="advanced-deck-panel" aria-label="進階指定 · Exact choice" onClick={() => setAdvancedDeckOpen(open => !open)}><span>進階指定 · Exact choice</span><b>{artworkPreference.mode === 'specific' || questionPreference.mode === 'specific' ? '已指定 · CUSTOM' : '預設隨機 · RANDOM'} {advancedDeckOpen ? '−' : '+'}</b></button>
      {advancedDeckOpen && <div id="advanced-deck-panel" className="advanced-deck-panel" role="dialog" aria-label="Advanced deck choice panel">
        <div className="advanced-deck-panel-heading"><div><b>圖片與問題可分開指定</b><small>ARTWORK &amp; QUESTION ARE INDEPENDENT</small></div><button type="button" aria-label="Close advanced deck choice" onClick={() => setAdvancedDeckOpen(false)}>×</button></div>
        <section className="exact-choice-section" aria-label="Artwork exact choice"><div className="exact-choice-heading"><b>01 卡面 · ARTWORK</b><button type="button" aria-pressed={artworkPreference.mode === 'random'} onClick={() => setArtworkPreference({ mode: 'random', collectionId: artworkPreference.collectionId })}>隨機卡面</button></div>
          <div className="collection-version-label"><b>系列版本 · Collection version</b><span>先選神明或星座版本，再選指定卡面；預設仍為隨機。</span></div>
          <div className="collection-roadmap">{ARTWORK_COLLECTIONS.map(collection => collection.availability === 'available' ? <button type="button" key={collection.id} className={collection.id === artworkPreference.collectionId ? 'is-selected' : ''} aria-label={`選擇牌組 ${collection.zhName}`} aria-pressed={collection.id === artworkPreference.collectionId} onClick={() => chooseCollection(collection.id)}><b>{collection.zhName}</b><span>{collection.enName} · {collection.artworkIds.length}</span></button> : <article key={collection.id} className="is-planned"><b>{collection.zhName} · {collection.enName}</b><span>規劃中 · Planned</span></article>)}</div>
          <div className="artwork-picker" aria-label="Artwork choices">{collectionArtworks.map(artwork => <button type="button" key={artwork.id} aria-label={`指定 ${artwork.zhName} · ${artwork.id}`} aria-pressed={artworkPreference.mode === 'specific' && artworkPreference.artworkId === artwork.id} onClick={() => setArtworkPreference({ mode: 'specific', collectionId: activeCollection.id, artworkId: artwork.id })}><img src={artwork.src} alt="" /><span>{artwork.zhName}</span>{artwork.featureLabel && <small>台灣特色 · {artwork.featureLabel.zh}</small>}{artwork.featureDescription && <em>{artwork.featureDescription.zh}</em>}</button>)}</div>
        </section>
        <section className="exact-choice-section question-choice" aria-label="Question exact choice"><div className="exact-choice-heading"><b>02 問題 · QUESTION</b><button type="button" aria-pressed={questionPreference.mode === 'random'} onClick={() => setQuestionPreference({ mode: 'random', packId: DEFAULT_QUESTION_PACK_ID })}>隨機問題</button></div>
          <p>{QUESTION_PACKS[0].zhName} · {QUESTION_PACKS[0].enName} · 目前符合 {pool.length} 題</p>
          <input type="search" aria-label="搜尋問題 · Search questions" value={questionSearch} onChange={event => setQuestionSearch(event.target.value)} placeholder="搜尋題號、中文或英文" />
          <div className="question-picker" aria-label="Eligible question choices">{visibleQuestions.map(card => <button type="button" key={card.id} aria-label={`指定問題 ${card.id} · ${card.zh}`} aria-pressed={questionPreference.mode === 'specific' && questionPreference.questionId === card.id} onClick={() => setQuestionPreference({ mode: 'specific', packId: DEFAULT_QUESTION_PACK_ID, questionId: card.id })}><span>{card.id.toUpperCase()} · L{card.level} · {card.mode.toUpperCase()}</span><b>{card.zh}</b><small>{card.en}</small></button>)}</div>
        </section>
      </div>}
    </div>
    {block('setup', 'begin', <div className="begin-dock"><button className="primary-button" aria-label={t.begin} onClick={() => { setCandidateArtworks(createArtworkCandidates(ARTWORK_COLLECTIONS, ALL_ARTWORKS, artworkPreference)); setRevealed(false); setPlaying(true); setKeepsakeOpen(false); setAdvancedDeckOpen(false); setEditorScreen('game'); setSelectedBlock('card') }}><span>{t.begin}</span><small>LEVEL {level} · V35 · {levelLabels[level - 1][1].toUpperCase()}</small><i>→</i></button><p className="install-note">{offlineReady ? '✓ Offline ready / 可離線使用' : t.install}</p></div>, 'setup-begin-block')}
    {birthdayOpen && <div className="age-gate" role="dialog" aria-label="Level 5 age gate"><label>Birthday<input aria-label="Birthday" type="date" value={birthday} onChange={event => setBirthday(event.target.value)} /></label><button onClick={confirmAdult}>Confirm 18+</button><button onClick={() => setBirthdayOpen(false)}>Cancel</button></div>}
    </div>
    {cardLibraryOpen && <CardLibrary artworks={ALL_ARTWORKS} collections={ARTWORK_COLLECTIONS} selectedArtworkId={artworkPreference.mode === 'specific' ? artworkPreference.artworkId : undefined} renderCard={renderLibraryCard} onChoose={chooseLibraryArtwork} onClose={() => setCardLibraryOpen(false)} />}
  </section>

  const gameScreen = <section className="screen-canvas game-canvas">
    {header('game')}
    {block('game', 'toolbar', <div className="game-toolbar"><button onClick={goHome}>← Setup</button><div className="game-meta"><span>LEVEL {level}</span><span>{mode.toUpperCase()}</span><span>42 ARTWORKS</span></div></div>, 'game-toolbar-block')}
    {block('game', 'card', <SwipeDeck key={current ? `${current.card.id}-${current.artwork.id}` : 'deck'} revealed={editingActive || revealed} onDraw={draw}><div className="card-face card-back"><span className="ornament">✦</span><p>ENCOUNTER CARDS · V35</p><h2>相遇卡</h2><span>SWIPE UP TO DRAW · 向上滑動抽卡</span></div><div className="card-face card-front">{(current || editingActive) && <article className="mythic-card" data-testid="mythic-card" style={cardPresentationStyle}><div className="mythic-card-header"><div><span>護行之卡 · ENCOUNTER GUARDIAN</span><h2>{encounter.artwork.zhName}</h2><small>{encounter.artwork.enName}</small>{encounter.artwork.featureLabel && <small className="artwork-feature-note">台灣特色 · {localizedFeature(encounter.artwork, language)}</small>}</div><i>✦</i></div><div data-card-artwork><TaiwanReveal artwork={encounter.artwork} language={language}><img src={encounter.artwork.src} alt={`${encounter.artwork.zhName}・藏有台灣輪廓的卡面`} draggable="false" style={artworkStyle} /><div className="mythic-foil" /></TaiwanReveal></div><div className="mythic-text-panel"><div className="mythic-prompt-meta"><b>真正的你 · THE REAL YOU</b><span>L{encounter.card.level} · {encounter.card.mode.toUpperCase()}</span></div><CardText card={encounter.card} language={language} /><BlessingText encounter={encounter} language={language} /></div></article>}</div></SwipeDeck>, 'game-card-block')}
    {!revealed && !editingActive && <section className="artwork-candidate-fan" aria-label="Choose a favorite card face"><div><b>挑一張喜歡的卡面</b><small>CHOOSE A FAVORITE FACE</small></div><div>{candidateArtworks.map(artwork => <button type="button" key={artwork.id} aria-label={`選擇 ${artwork.zhName} · Choose ${artwork.enName} · ${artwork.id}`} onClick={() => draw(artwork.id)}><img src={artwork.src} alt="" /><span>{artwork.zhName}</span></button>)}</div></section>}
    {block('game', 'actions', <div className="game-actions"><button className="primary-button draw-button" aria-label={current ? t.next : t.draw} onClick={() => draw()}>{current ? t.next : t.draw}<i>→</i></button>{current && <button className="secondary-button" onClick={() => { setKeepsakeOpen(true); setEditorScreen('keepsake'); setSelectedBlock('card') }}>{t.share}</button>}</div>, 'game-actions-block')}
  </section>

  const exchangeRows = participants.filter(item => item.include && (item.name || item.contact))
  const keepsakeScreen = <section className="screen-canvas keepsake-canvas" aria-label="Keepsake preview">
    {block('keepsake', 'card', <div className="keepsake-card-base" aria-hidden="true" />, 'keepsake-base-block')}
    {block('keepsake', 'header', <div className="keepsake-header"><div><small>護行之卡</small><h2>{encounter.artwork.zhName}</h2></div><i>✦</i></div>, 'keepsake-header-block')}
    {block('keepsake', 'artwork', <div className="keepsake-art"><img src={encounter.artwork.src} alt={`${encounter.artwork.zhName} keepsake artwork`} style={artworkStyle} /></div>, 'keepsake-art-block')}
    {block('keepsake', 'question', <div className="keepsake-question"><div><b>⌖ 想去的地方</b><span>L{encounter.card.level} · {encounter.card.mode.toUpperCase()}</span></div><CardText card={encounter.card} language={language} /></div>, 'keepsake-question-block')}
    {block('keepsake', 'blessing', <div className="keepsake-blessing" style={cardPresentationStyle}><b>給這次相遇的祝福 · BLESSING</b><span>{language === 'en' ? encounter.blessing.en : encounter.blessing.zh}</span></div>, 'keepsake-blessing-block')}
    {block('keepsake', 'exchange', <div className="keepsake-exchange"><b>聯絡資訊 · CONTACT EXCHANGE</b>{exchangeRows.map(item => <span key={item.role}>● {item.name || (item.role === 'self' ? 'You' : 'Guest')} · {item.contact}</span>)}</div>, 'keepsake-exchange-block')}
    {block('keepsake', 'actions', <div className="keepsake-actions"><div><label><input type="checkbox" aria-label="Include your contact" checked={includeYours} onChange={event => setIncludeYours(event.target.checked)} />Your contact</label><label><input type="checkbox" aria-label="Include their contact" checked={includeTheirs} onChange={event => setIncludeTheirs(event.target.checked)} />Their contact</label></div><button type="button" onClick={() => setKeepsakeOpen(false)}>← Card</button><button type="button" className="download-keepsake" onClick={exportKeepsake}>Download / Share</button></div>, 'keepsake-actions-block')}
  </section>

  const screen = activeScreen === 'setup' ? setupScreen : activeScreen === 'game' ? gameScreen : keepsakeScreen
  const appShell = (preview = false) => <main className={`app-shell v32-shell v33-shell v34-shell v35-shell ${activeScreen}-shell${editingActive && !preview ? ' is-layout-editing' : ''}`} data-language={language} style={{ '--font-scale': fontScale } as React.CSSProperties}>{screen}{!preview && <p className="sr-only" aria-live="polite">{status}</p>}</main>

  const editorProps = { presentation, artworkId: encounter.artwork.id, onPresentationChange: (value: typeof presentation) => setPresentation(normalizePresentation(value)) }

  if (desktopWorkspace) return <div className="viewport-stage desktop-viewport">
    <div className="desktop-mode-switch" role="group" aria-label="Desktop mode"><button type="button" aria-label="Settings mode" aria-pressed={desktopMode === 'settings'} className={desktopMode === 'settings' ? 'active' : ''} onClick={() => setDesktopMode('settings')}>設定模式 <small>SETTINGS</small></button><button type="button" aria-label="Test mode" aria-pressed={desktopMode === 'test'} className={desktopMode === 'test' ? 'active' : ''} onClick={() => { setDesktopMode('test'); setDirectManipulation(false) }}>測試模式 <small>TEST</small></button></div>
    {desktopMode === 'settings'
      ? <div className="desktop-workspace" data-testid="desktop-workspace" style={{ '--workbench-scale': desktopScales.workbench, '--preview-scale': desktopScales.preview } as React.CSSProperties}><section className="desktop-workbench" aria-label="Desktop enlarged workspace"><div className="desktop-workbench-stage"><div className="desktop-device-frame desktop-workbench-device"><div className="desktop-workbench-canvas">{appShell()}</div></div></div><LayoutEditor open history={layoutHistory} onHistoryChange={setLayoutHistory} screen={editorScreen} onScreenChange={setEditorScreen} selectedBlock={selectedBlock} onSelectBlock={setSelectedBlock} onClose={() => undefined} snap={snap} onSnapChange={setSnap} directManipulation={directManipulation} onDirectManipulationChange={setDirectManipulation} docked {...editorProps} /></section><aside className="desktop-phone-preview" aria-label="78 by 163.4 millimeter iPhone Pro Max preview"><div className="desktop-device-frame desktop-preview-device"><div className="desktop-phone-canvas" aria-hidden="true" inert>{appShell(true)}</div></div></aside></div>
      : <section className="desktop-test-stage" aria-label="Desktop interactive phone test" style={{ '--workbench-scale': desktopScales.workbench } as React.CSSProperties}><div className="desktop-device-frame desktop-test-device"><div className="desktop-test-canvas">{appShell()}</div></div></section>}
  </div>

  return <div className="viewport-stage"><div className="phone-fit-stage" style={{ '--phone-scale': phoneScale } as React.CSSProperties}>{appShell()}</div></div>
}
