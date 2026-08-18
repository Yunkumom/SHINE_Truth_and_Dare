import { useEffect, useState } from 'react'
import EditableBlock from './components/EditableBlock'
import ArtworkAdjuster from './components/ArtworkAdjuster'
import DirectKeepsake from './components/DirectKeepsake'
import LayoutEditor from './components/LayoutEditor'
import ModeHome from './components/ModeHome'
import MobileSettings from './components/MobileSettings'
import SwipeDeck from './components/SwipeDeck'
import TaiwanReveal from './components/TaiwanReveal'
import taiwanCardBack from './assets/taiwan-card-back.png'
import { blessings } from './data/blessings'
import { cards } from './data/cards'
import { ARTWORK_COLLECTIONS, DEFAULT_COLLECTION_ID } from './data/collections'
import { ALL_QUESTION_PACK_IDS, governedQuestions, QUESTION_PACKS } from './data/question-packs'
import { SHINE_DEPTHS } from './data/shine-question-book'
import { isAdultOn } from './lib/age-gate'
import { DEITY_ART } from './lib/deity-art'
import { ALL_ARTWORKS } from './lib/artwork-catalog'
import { selectBlessing } from './lib/encounter'
import { resolvePreferredArtwork } from './lib/artwork-selection'
import { resolveManagedQuestion } from './lib/question-manager'
import { loadLanguage, loadFontScale, saveFontScale, saveLanguage } from './lib/preferences'
import { shareOrDownload } from './lib/share'
import { calculateDesktopScales, calculatePhoneScale } from './lib/viewport-scale'
import { portraitObjectPosition } from './lib/portrait-focus'
import { adjustedPortraitFocus } from './lib/portrait-focus'
import { applyLayoutChange, createLayoutHistory, loadStoredLayout, saveStoredLayout } from './layout/layout-model'
import type { LayoutBlock, LayoutScreen } from './layout/layout-model'
import { loadStoredPresentation, normalizePresentation, presentationForArtwork, saveStoredPresentation } from './presentation/presentation-model'
import type { ArtworkPreference, Card, EncounterComposition, Language, Level, Mode, ParticipantExchange, SessionQuestionManagerState } from './types'
import './styles/v32.css'
import './styles/v32-layout.css'
import './styles/v33.css'
import './styles/v34.css'
import './styles/v35.css'
import './styles/v36.css'
import './styles/v37.css'
import './styles/v40.css'
import './styles/v47-ux.css'

const copy = {
  zh: { heading: '讓一次簡單的對話，成為值得收藏的相遇。', subheading: 'Turn a simple conversation into a meeting worth keeping.', lead: '抽一張相遇卡，回答一個溫柔的問題，再把祝福送給今天認識的人。', leadEn: 'Draw a card, share an answer, and keep a blessing from today.', begin: '開始抽卡 · Begin', draw: '抽一張卡', next: '下一張', share: '製作紀念卡', back: '返回設定', install: 'iPhone：Safari → 分享 → 加入主畫面' },
  en: { heading: 'Turn a simple conversation into a meeting worth keeping.', subheading: '讓一次簡單的對話，成為值得收藏的相遇。', lead: 'Draw an encounter card, answer a gentle question, and send a blessing to someone you met today.', leadEn: '抽一張相遇卡，回答一個溫柔的問題，再把祝福送給今天認識的人。', begin: 'Begin the encounter', draw: 'Draw a card', next: 'Next card', share: 'Create keepsake', back: 'Back to setup', install: 'iPhone: Safari → Share → Add to Home Screen' },
}

const levelLabels = [['初見', 'First meeting'], ['熟悉', 'Familiar'], ['朋友', 'Friends'], ['親近', 'Close'], ['親密 18+', 'Intimate 18+']] as const
const forcedMobileSurface = new URLSearchParams(window.location.search).get('surface') === 'mobile'

function CardText({ card, language }: { card: Card, language: Language }) {
  return <div className="mythic-question">{card.zhTitle && <em className="mythic-question-title">{language === 'en' ? card.enTitle : language === 'bilingual' ? `${card.zhTitle} · ${card.enTitle}` : card.zhTitle}</em>}{language !== 'en' && <p lang="zh-Hant">{card.zh}</p>}{language !== 'zh' && <small className={language === 'en' ? 'english-primary' : ''} lang="en">{card.en}</small>}</div>
}

function questionMeta(card: Card) {
  return card.depth ? `${SHINE_DEPTHS[card.depth].symbol} · ${card.kind === 'activity' ? 'ACTIVITY' : 'QUESTION'}` : `L${card.level} · ${card.mode.toUpperCase()}`
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
const initialManagerState: SessionQuestionManagerState = { disabledQuestionIds: [], customQuestions: [], selectedQuestionId: null, enabledQuestionPackIds: [...ALL_QUESTION_PACK_IDS], drawnQuestionIds: [], showRealYou: true, showQuestion: true }

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
  const [desktopWorkspace, setDesktopWorkspace] = useState(() => !forcedMobileSurface && window.innerWidth >= 1100)
  const [desktopScales, setDesktopScales] = useState(() => calculateDesktopScales(window.innerHeight))
  const [yourName, setYourName] = useState('')
  const [theirName, setTheirName] = useState('')
  const [yourContact, setYourContact] = useState('')
  const [theirContact, setTheirContact] = useState('')
  const [includeYours, setIncludeYours] = useState(true)
  const [includeTheirs, setIncludeTheirs] = useState(true)
  const [desktopMode, setDesktopMode] = useState<'settings' | 'test'>('settings')
  const [directManipulation, setDirectManipulation] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [mobileDestination, setMobileDestination] = useState<'home' | 'setup' | 'keepsake-maker'>('home')
  const [artworkAdjusterOpen, setArtworkAdjusterOpen] = useState(false)
  const [artworkPreference, setArtworkPreference] = useState<ArtworkPreference>({ mode: 'random', collectionId: DEFAULT_COLLECTION_ID })
  const [questionManager, setQuestionManager] = useState<SessionQuestionManagerState>(initialManagerState)
  const [editorScreen, setEditorScreen] = useState<LayoutScreen>('setup')
  const [selectedBlock, setSelectedBlock] = useState('hero')
  const [snap, setSnap] = useState(true)
  const [layoutHistory, setLayoutHistory] = useState(() => createLayoutHistory(loadStoredLayout()))
  const [presentation, setPresentation] = useState(() => loadStoredPresentation())
  const t = language === 'en' ? copy.en : copy.zh
  const beginLabel = language === 'en' ? 'Begin Truth or Dare' : '開始真心話大冒險 · Begin'
  const editingActive = desktopWorkspace && desktopMode === 'settings'
  const activeScreen: LayoutScreen = editingActive ? editorScreen : keepsakeOpen ? 'keepsake' : playing ? 'game' : 'setup'
  const encounter = current ?? previewEncounter
  const participants: ParticipantExchange[] = [
    { role: 'self', name: yourName, contact: yourContact, include: includeYours },
    { role: 'other', name: theirName, contact: theirContact, include: includeTheirs },
  ]

  useEffect(() => { if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(() => setOfflineReady(true)).catch(() => undefined) }, [])
  useEffect(() => {
    const updateScale = () => {
      const viewport = window.visualViewport
      const width = viewport?.width ?? document.documentElement.clientWidth ?? window.innerWidth
      const height = viewport?.height ?? document.documentElement.clientHeight ?? window.innerHeight
      setPhoneScale(calculatePhoneScale({ width, height }))
      setDesktopWorkspace(!forcedMobileSurface && window.innerWidth >= 1100)
      setDesktopScales(calculateDesktopScales(window.innerHeight))
    }
    const viewport = window.visualViewport
    updateScale(); window.addEventListener('resize', updateScale); viewport?.addEventListener('resize', updateScale)
    return () => { window.removeEventListener('resize', updateScale); viewport?.removeEventListener('resize', updateScale) }
  }, [])
  useEffect(() => { saveStoredLayout(layoutHistory.present) }, [layoutHistory.present])
  useEffect(() => { saveStoredPresentation(presentation) }, [presentation])

  function chooseLanguage(value: Language) { setLanguage(value); saveLanguage(value) }
  function chooseLevel(value: Level) { if (value === 5 && !adult) { setSettingsOpen(false); setBirthdayOpen(true) } else setLevel(value) }
  function confirmAdult() { if (isAdultOn(birthday)) { setAdult(true); setLevel(5); setBirthdayOpen(false); setBirthday('') } else setStatus('Level 5 remains locked / Level 5 仍為鎖定') }
  function draw(artworkId?: string) {
    const question = resolveManagedQuestion({ base: governedQuestions, custom: questionManager.customQuestions, disabledQuestionIds: questionManager.disabledQuestionIds, enabledQuestionPackIds: questionManager.enabledQuestionPackIds, selectedQuestionId: questionManager.selectedQuestionId, drawnQuestionIds: questionManager.drawnQuestionIds, level, mode, previousId: current?.card.id })
    const card = question.card
    const artwork = artworkId
      ? resolvePreferredArtwork({ mode: 'specific', collectionId: artworkPreference.collectionId, artworkId }, ARTWORK_COLLECTIONS, ALL_ARTWORKS, current?.artwork.id)
      : resolvePreferredArtwork(artworkPreference, ARTWORK_COLLECTIONS, ALL_ARTWORKS, current?.artwork.id)
    const blessing = selectBlessing(blessings)
    setQuestionManager(manager => ({ ...manager, drawnQuestionIds: manager.selectedQuestionId ? manager.drawnQuestionIds : question.resetDrawHistory ? [card.id] : [...manager.drawnQuestionIds, card.id] }))
    setCurrent({ card, artwork, blessing }); setRevealed(true); setStatus(question.fallback ? '指定問題不符合目前等級或卡型，已安全改為隨機題目。 · Exact question was ineligible; a safe random question was used.' : language === 'en' ? `Revealed: ${card.en}` : `已翻開：${card.zh}`)
  }
  function chooseFontScale(nextValue: number) { const value = Math.max(.85, Math.min(1.25, Math.round(nextValue * 10) / 10)); setFontScale(value); saveFontScale(value) }
  async function exportKeepsake() { setStatus(await shareOrDownload(encounter, language, participants, layoutHistory.present, presentation)) }
  function goToSetup() { setPlaying(false); setKeepsakeOpen(false); setSettingsOpen(false); setArtworkAdjusterOpen(false); setMobileDestination('setup'); if (desktopMode === 'settings') { setEditorScreen('setup'); setSelectedBlock('hero') } }
  function goToModeHome() { goToSetup(); if (!desktopWorkspace) setMobileDestination('home') }
  function chooseTruthOrDare() { setMode('random'); goToSetup() }
  function changeBlock(screen: LayoutScreen, id: string, patch: Partial<LayoutBlock>) { setLayoutHistory(history => applyLayoutChange(history, screen, id, patch)) }
  function block(screen: LayoutScreen, id: string, children: React.ReactNode, className = '') {
    return <EditableBlock key={`${screen}-${id}`} id={id} block={layoutHistory.present.screens[screen][id]} editing={editingActive && editorScreen === screen} selected={editingActive && editorScreen === screen && selectedBlock === id} directManipulation={directManipulation} canvasScale={desktopWorkspace ? desktopScales.workbench : 1} snap={snap} onSelect={() => setSelectedBlock(id)} onChange={patch => changeBlock(screen, id, patch)} className={className}>{children}</EditableBlock>
  }
  function header(screen: 'setup' | 'game') {
    return block(screen, 'header', <header className="site-header"><button className="wordmark" type="button" onClick={goToModeHome} aria-label="返回模式選擇 · Back to modes"><span className="mark">✦</span><span>相遇卡 <small>ENCOUNTER CARDS · V47</small></span></button><div className="header-tools"><button type="button" className="card-library-trigger settings-trigger" aria-label="開啟設定 · Open settings" onClick={() => setSettingsOpen(true)}><span className="menu-icon" aria-hidden="true"><i /><i /><i /></span></button></div></header>, 'header-block')
  }

  const artworkPresentation = presentationForArtwork(presentation, encounter.artwork.id)
  const artworkFocus = adjustedPortraitFocus(encounter.artwork.portraitFocus, artworkPresentation)
  const artworkStyle = {
    '--portrait-position': portraitObjectPosition(artworkFocus),
    '--artwork-zoom': artworkPresentation.zoom,
    '--artwork-origin': portraitObjectPosition(artworkFocus),
  } as React.CSSProperties
  const cardPresentationStyle = {
    '--card-header-height': `${presentation.headerHeight}%`,
    '--artwork-height': `${presentation.artworkHeight}%`,
    '--text-height': `${100 - presentation.headerHeight - presentation.artworkHeight}%`,
    '--question-font-scale': presentation.question.fontScale,
    '--blessing-font-scale': presentation.blessing.fontScale,
    '--blessing-line-height': presentation.blessing.lineHeight,
    '--blessing-height': `${presentation.blessing.height}px`,
    '--blessing-padding': `${presentation.blessing.padding}px`,
    '--blessing-offset-x': `${presentation.blessing.offsetX}px`,
    '--blessing-offset-y': `${presentation.blessing.offsetY}px`,
  } as React.CSSProperties

  function clearArtworkPresentation(artworkId: string) {
    setPresentation(document => {
      const artworkById = { ...document.artworkById }
      delete artworkById[artworkId]
      return normalizePresentation({ ...document, artworkById })
    })
  }

  const setupScreen = <section className="screen-canvas setup-canvas" aria-label="開始遊戲設定 · Game setup">
    <div className="setup-content" aria-hidden={settingsOpen || undefined} inert={settingsOpen || undefined}>
    {header('setup')}
    {block('setup', 'hero', <div className="hero-copy"><h1 aria-label={t.heading}><span>{t.heading}</span><small>{t.subheading}</small></h1><p className="hero-lead"><span>{t.lead}</span><small>{t.leadEn}</small></p></div>, 'setup-hero-block')}
    {block('setup', 'fields', <div className="setup-card fields-card"><div className="panel-heading"><span>01</span><b>準備這次相遇 · Set the moment</b></div><div className="field-row"><label><span>你的名字 · Your name</span><input value={yourName} onChange={event => setYourName(event.target.value)} autoComplete="off" placeholder="你的名字 · Your name" /></label><label><span>對方名字 · Their name</span><input value={theirName} onChange={event => setTheirName(event.target.value)} autoComplete="off" placeholder="對方名字 · Their name" /></label></div><div className="field-row contact-row"><label><span>你的聯絡方式（選填） · Your contact</span><input value={yourContact} onChange={event => setYourContact(event.target.value)} autoComplete="off" placeholder="任何格式 · Any format" /></label><label><span>對方聯絡方式（選填） · Their contact</span><input value={theirContact} onChange={event => setTheirContact(event.target.value)} autoComplete="off" placeholder="任何格式 · Any format" /></label></div></div>, 'setup-fields-block')}
    {editingActive && block('setup', 'levels', <fieldset className="setup-card level-fieldset"><legend>選擇熟識程度 · Choose familiarity level</legend><div className="level-grid">{([1, 2, 3, 4, 5] as Level[]).map(value => <button type="button" key={value} className={level === value ? 'active' : ''} aria-label={`Level ${value}${value === 5 ? ' · 18+' : ''}`} aria-pressed={level === value} onClick={() => chooseLevel(value)}><b>L{value}</b><span>{levelLabels[value - 1][0]}</span></button>)}</div><small className="level-description">{levelLabels[level - 1][1]} · LEVEL {level}</small></fieldset>, 'setup-levels-block')}
    {editingActive && block('setup', 'modes', <fieldset className="setup-card mode-fieldset"><legend>想抽哪一種卡？ · Choose a card type</legend><div className="mode-grid">{([['truth', '○', '真心話', 'TRUTH'], ['dare', '△', '小挑戰', 'DARE'], ['random', '✦', '隨機', 'SURPRISE ME']] as const).map(([value, icon, zh, en]) => <button type="button" key={value} className={mode === value ? 'active' : ''} aria-label={value === 'truth' ? 'Truth' : value === 'dare' ? 'Dare' : 'Random'} aria-pressed={mode === value} onClick={() => setMode(value)}><span>{icon}</span><b>{zh}</b><small>{en}</small></button>)}</div></fieldset>, 'setup-modes-block')}
    {block('setup', 'begin', <div className="begin-dock"><button className="primary-button" aria-label={beginLabel} onClick={() => { setRevealed(false); setPlaying(true); setKeepsakeOpen(false); setSettingsOpen(false); setEditorScreen('game'); setSelectedBlock('card') }}><span>{beginLabel}</span><small>LEVEL {level} · V47 · TRUTH OR DARE</small><i>→</i></button><p className="install-note">{offlineReady ? '✓ Offline ready / 可離線使用' : t.install}</p></div>, 'setup-begin-block')}
    {birthdayOpen && <div className="age-gate" role="dialog" aria-label="Level 5 age gate"><label>Birthday<input aria-label="Birthday" type="date" value={birthday} onChange={event => setBirthday(event.target.value)} /></label><button onClick={confirmAdult}>Confirm 18+</button><button onClick={() => setBirthdayOpen(false)}>Cancel</button></div>}
    </div>
  </section>

  const gameScreen = <section className="screen-canvas game-canvas" aria-hidden={settingsOpen || artworkAdjusterOpen || undefined} inert={settingsOpen || artworkAdjusterOpen || undefined}>
    {header('game')}
    <div className="game-mobile-flow">
      {block('game', 'toolbar', <div className="game-toolbar"><button onClick={goToSetup}>← {t.back}</button><div className="game-meta"><span>LEVEL {level}</span><span>{mode.toUpperCase()}</span><span>42 ARTWORKS</span></div></div>, 'game-toolbar-block')}
      {block('game', 'card', <SwipeDeck key={current ? `${current.card.id}-${current.artwork.id}` : 'deck'} revealed={editingActive || revealed} onDraw={draw}><div className="card-face card-back"><img className="card-back-art" src={taiwanCardBack} alt="" draggable="false" /><div className="card-back-atmosphere" aria-hidden="true" /><div className="card-back-copy"><p>ENCOUNTER CARDS · V47</p><h2>相遇卡</h2><span>SWIPE UP TO DRAW · 向上滑動抽卡</span></div></div><div className="card-face card-front">{(current || editingActive) && <article className="mythic-card" data-testid="mythic-card" style={cardPresentationStyle}><div className="mythic-card-header"><div><span>護行之卡 · ENCOUNTER GUARDIAN</span><h2>{encounter.artwork.zhName}</h2><small>{encounter.artwork.enName}</small>{encounter.artwork.featureLabel && <small className="artwork-feature-note">台灣特色 · {localizedFeature(encounter.artwork, language)}</small>}</div><i>✦</i></div><div data-card-artwork><TaiwanReveal artwork={encounter.artwork} language={language}><img src={encounter.artwork.src} alt={`${encounter.artwork.zhName}・藏有台灣輪廓的卡面`} draggable="false" style={artworkStyle} /><div className="mythic-foil" /></TaiwanReveal></div><div className="mythic-text-panel">{questionManager.showRealYou && <div className="mythic-prompt-meta"><b>真正的你 · THE REAL YOU</b><span>{questionMeta(encounter.card)}</span></div>}{questionManager.showQuestion && <CardText card={encounter.card} language={language} />}<BlessingText encounter={encounter} language={language} /></div></article>}</div></SwipeDeck>, 'game-card-block')}
      <div className="game-context-row">
        {!revealed && !editingActive && <div className="compact-draw-settings"><span><small>抽卡選項 · DRAW OPTIONS</small><b>LEVEL {level} · {mode.toUpperCase()}</b></span><button type="button" onClick={() => setSettingsOpen(true)}>變更 · Change</button></div>}
        {revealed && current && !editingActive && <section className="artwork-control-panel compact-card-controls" aria-label="Choose and adjust card"><button type="button" onClick={() => setSettingsOpen(true)}>重新選擇</button><button type="button" onClick={() => setArtworkAdjusterOpen(true)}>調整卡片</button></section>}
      </div>
      <div className="game-primary-row">{block('game', 'actions', <div className="game-actions"><button className="primary-button draw-button" aria-label={current ? t.next : t.draw} onClick={() => draw()}>{current ? t.next : t.draw}<i>→</i></button>{current && <button className="secondary-button" onClick={() => { setKeepsakeOpen(true); setEditorScreen('keepsake'); setSelectedBlock('card') }}>{t.share}</button>}</div>, 'game-actions-block')}</div>
    </div>
  </section>

  const exchangeRows = participants.filter(item => item.include && (item.name || item.contact))
  const keepsakeScreen = <section className="screen-canvas keepsake-canvas" aria-label="Keepsake preview">
    {block('keepsake', 'card', <div className="keepsake-card-base" aria-hidden="true" />, 'keepsake-base-block')}
    {block('keepsake', 'header', <div className="keepsake-header"><div><small>護行之卡</small><h2>{encounter.artwork.zhName}</h2></div><i>✦</i></div>, 'keepsake-header-block')}
    {block('keepsake', 'artwork', <div className="keepsake-art"><img src={encounter.artwork.src} alt={`${encounter.artwork.zhName} keepsake artwork`} style={artworkStyle} /></div>, 'keepsake-art-block')}
    {questionManager.showQuestion && block('keepsake', 'question', <div className="keepsake-question">{questionManager.showRealYou && <div><b>⌖ 想去的地方</b><span>{questionMeta(encounter.card)}</span></div>}<CardText card={encounter.card} language={language} /></div>, 'keepsake-question-block')}
    {block('keepsake', 'blessing', <div className="keepsake-blessing" style={cardPresentationStyle}><b>給這次相遇的祝福 · BLESSING</b><span>{language === 'en' ? encounter.blessing.en : encounter.blessing.zh}</span></div>, 'keepsake-blessing-block')}
    {block('keepsake', 'exchange', <div className="keepsake-exchange"><b>聯絡資訊 · CONTACT EXCHANGE</b>{exchangeRows.map(item => <span key={item.role}>● {item.name || (item.role === 'self' ? 'You' : 'Guest')} · {item.contact}</span>)}</div>, 'keepsake-exchange-block')}
    {block('keepsake', 'actions', <div className="keepsake-actions"><div><label><input type="checkbox" aria-label="Include your contact" checked={includeYours} onChange={event => setIncludeYours(event.target.checked)} />Your contact</label><label><input type="checkbox" aria-label="Include their contact" checked={includeTheirs} onChange={event => setIncludeTheirs(event.target.checked)} />Their contact</label></div><button type="button" onClick={() => setKeepsakeOpen(false)}>← Card</button><button type="button" className="download-keepsake" onClick={exportKeepsake}>Download / Share</button></div>, 'keepsake-actions-block')}
  </section>

  const standardScreen = activeScreen === 'setup' ? setupScreen : activeScreen === 'game' ? gameScreen : keepsakeScreen
  const specialMobileScreen = !desktopWorkspace && mobileDestination === 'home'
    ? <ModeHome language={language} onChooseKeepsake={() => { setPlaying(false); setKeepsakeOpen(false); setMobileDestination('keepsake-maker') }} onChooseTruthOrDare={chooseTruthOrDare} />
    : !desktopWorkspace && mobileDestination === 'keepsake-maker'
      ? <DirectKeepsake language={language} artworks={ALL_ARTWORKS} collections={ARTWORK_COLLECTIONS} blessings={blessings} onBack={goToModeHome} onStatus={setStatus} />
      : null
  const screen = specialMobileScreen ?? standardScreen
  const shellName = specialMobileScreen ? mobileDestination : activeScreen
  const appShell = (preview = false) => <main className={`app-shell v32-shell v33-shell v34-shell v35-shell v37-shell v40-shell ${shellName}-shell${editingActive && !preview ? ' is-layout-editing' : ''}`} data-language={language} style={{ '--font-scale': fontScale, '--reader-font-scale': fontScale } as React.CSSProperties}>{screen}{!preview && !specialMobileScreen && <><MobileSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} level={level} mode={mode} onLevelChange={chooseLevel} onModeChange={setMode} language={language} onLanguageChange={chooseLanguage} fontScale={fontScale} onFontScaleChange={chooseFontScale} artworks={ALL_ARTWORKS} collections={ARTWORK_COLLECTIONS} artworkPreference={artworkPreference} onArtworkPreferenceChange={setArtworkPreference} questions={governedQuestions} questionPacks={QUESTION_PACKS} manager={questionManager} onManagerChange={setQuestionManager} savedArtworkIds={Object.keys(presentation.artworkById)} onClearArtworkPosition={clearArtworkPresentation} />{artworkAdjusterOpen && <ArtworkAdjuster open encounter={encounter} language={language} manager={questionManager} value={presentation} onChange={value => setPresentation(normalizePresentation(value))} onClose={() => setArtworkAdjusterOpen(false)} />}</>}{!preview && <p className="sr-only" aria-live="polite">{status}</p>}</main>

  const editorProps = { presentation, artworkId: encounter.artwork.id, onPresentationChange: (value: typeof presentation) => setPresentation(normalizePresentation(value)) }

  const desktopModeTabs = <div className="desktop-mode-switch desktop-mode-bookmark-tabs" role="group" aria-label="Desktop mode"><button type="button" aria-label="Settings mode" aria-pressed={desktopMode === 'settings'} className={desktopMode === 'settings' ? 'active' : ''} onClick={() => { setDesktopMode('settings'); setDirectManipulation(true) }}><span>編輯</span><small>EDIT</small></button><button type="button" aria-label="Test mode" aria-pressed={desktopMode === 'test'} className={desktopMode === 'test' ? 'active' : ''} onClick={() => { setDesktopMode('test'); setDirectManipulation(false) }}><span>測試</span><small>TEST</small></button></div>
  const studioScreens: Array<[LayoutScreen, string, string]> = [['setup', '入口設定', 'SETUP'], ['game', '抽卡畫面', 'DRAW'], ['keepsake', '紀念卡', 'KEEPSAKE']]
  const chooseStudioScreen = (nextScreen: LayoutScreen) => { setEditorScreen(nextScreen); setSelectedBlock(nextScreen === 'setup' ? 'hero' : 'card') }

  if (desktopWorkspace) return <div className="viewport-stage desktop-viewport">
    {desktopMode === 'settings'
      ? <div className="desktop-workspace" data-testid="desktop-workspace" style={{ '--workbench-scale': desktopScales.workbench, '--preview-scale': desktopScales.preview } as React.CSSProperties}>
          <header className="desktop-studio-toolbar"><div><b>相遇卡設計工作室</b><small>OWNER DESIGN STUDIO · V47</small></div><div className="studio-device-status"><span>430 × 932</span><span>符合畫面 · FIT</span><span>安全區域開啟 · SAFE AREA</span></div>{desktopModeTabs}</header>
          <nav className="owner-studio-screen-nav" aria-label="畫面 · Screens"><strong>畫面</strong><small>SCREENS</small>{studioScreens.map(([value, zh, en]) => <button type="button" key={value} className={editorScreen === value ? 'active' : ''} aria-pressed={editorScreen === value} onClick={() => chooseStudioScreen(value)}><span>{zh}</span><small>{en}</small></button>)}</nav>
          <section className="desktop-workbench-stage desktop-center-stage" data-testid="desktop-center-stage" aria-label="Desktop enlarged workspace"><div className="desktop-device-frame desktop-workbench-device"><div className="desktop-workbench-canvas">{appShell()}</div></div></section>
          <aside className="desktop-editor-rail owner-studio-inspector" data-testid="desktop-editor-rail"><LayoutEditor open history={layoutHistory} onHistoryChange={setLayoutHistory} screen={editorScreen} onScreenChange={chooseStudioScreen} selectedBlock={selectedBlock} onSelectBlock={setSelectedBlock} onClose={() => undefined} snap={snap} onSnapChange={setSnap} directManipulation={directManipulation} onDirectManipulationChange={setDirectManipulation} docked {...editorProps} /></aside>
        </div>
      : <section className="desktop-test-stage" aria-label="Desktop interactive phone test" style={{ '--workbench-scale': desktopScales.workbench } as React.CSSProperties}><div className="desktop-test-mode-tabs">{desktopModeTabs}</div><div className="desktop-device-frame desktop-test-device"><div className="desktop-test-canvas">{appShell()}</div></div></section>}
  </div>

  return <div className="viewport-stage v40-mobile-stage"><div className="phone-fit-stage" style={{ '--phone-scale': phoneScale } as React.CSSProperties}>{appShell()}</div></div>
}
