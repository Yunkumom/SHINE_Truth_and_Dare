import { useEffect, useMemo, useState } from 'react'
import EditableBlock from './components/EditableBlock'
import LayoutEditor from './components/LayoutEditor'
import SwipeDeck from './components/SwipeDeck'
import TaiwanReveal from './components/TaiwanReveal'
import { blessings } from './data/blessings'
import { cards } from './data/cards'
import { isAdultOn } from './lib/age-gate'
import { DEITY_ART } from './lib/deity-art'
import { selectArtwork, selectBlessing } from './lib/encounter'
import { eligibleCards, nextCard } from './lib/game'
import { loadLanguage, loadFontScale, saveFontScale, saveLanguage } from './lib/preferences'
import { shareOrDownload } from './lib/share'
import { calculatePhoneScale } from './lib/viewport-scale'
import { applyLayoutChange, createLayoutHistory, loadStoredLayout, saveStoredLayout } from './layout/layout-model'
import type { LayoutBlock, LayoutScreen } from './layout/layout-model'
import type { Card, EncounterComposition, Language, Level, Mode, ParticipantExchange } from './types'
import './styles/v24.css'
import './styles/v24-layout.css'

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
  const [yourName, setYourName] = useState('')
  const [theirName, setTheirName] = useState('')
  const [yourContact, setYourContact] = useState('')
  const [theirContact, setTheirContact] = useState('')
  const [includeYours, setIncludeYours] = useState(true)
  const [includeTheirs, setIncludeTheirs] = useState(true)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editorScreen, setEditorScreen] = useState<LayoutScreen>('setup')
  const [selectedBlock, setSelectedBlock] = useState('hero')
  const [snap, setSnap] = useState(true)
  const [layoutHistory, setLayoutHistory] = useState(() => createLayoutHistory(loadStoredLayout()))
  const t = language === 'en' ? copy.en : copy.zh
  const pool = useMemo(() => eligibleCards(cards, level, mode), [level, mode])
  const activeScreen: LayoutScreen = editorOpen ? editorScreen : keepsakeOpen ? 'keepsake' : playing ? 'game' : 'setup'
  const encounter = current ?? previewEncounter
  const participants: ParticipantExchange[] = [
    { role: 'self', name: yourName, contact: yourContact, include: includeYours },
    { role: 'other', name: theirName, contact: theirContact, include: includeTheirs },
  ]

  useEffect(() => { if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(() => setOfflineReady(true)).catch(() => undefined) }, [])
  useEffect(() => {
    const updateScale = () => setPhoneScale(calculatePhoneScale({ width: window.innerWidth, height: window.innerHeight }))
    const viewport = window.visualViewport
    updateScale(); window.addEventListener('resize', updateScale); viewport?.addEventListener('resize', updateScale)
    return () => { window.removeEventListener('resize', updateScale); viewport?.removeEventListener('resize', updateScale) }
  }, [])
  useEffect(() => { saveStoredLayout(layoutHistory.present) }, [layoutHistory.present])

  function chooseLanguage(value: Language) { setLanguage(value); saveLanguage(value) }
  function chooseLevel(value: Level) { if (value === 5 && !adult) setBirthdayOpen(true); else setLevel(value) }
  function confirmAdult() { if (isAdultOn(birthday)) { setAdult(true); setLevel(5); setBirthdayOpen(false); setBirthday('') } else setStatus('Level 5 remains locked / Level 5 仍為鎖定') }
  function draw() {
    const card = nextCard(pool, current?.card.id)
    const artwork = selectArtwork(DEITY_ART, current?.artwork.id)
    const blessing = selectBlessing(blessings)
    setCurrent({ card, artwork, blessing }); setRevealed(true); setStatus(language === 'en' ? `Revealed: ${card.en}` : `已翻開：${card.zh}`)
  }
  function changeFont(delta: number) { const value = Math.max(.85, Math.min(1.25, fontScale + delta)); setFontScale(value); saveFontScale(value) }
  async function exportKeepsake() { setStatus(await shareOrDownload(encounter, language, participants, layoutHistory.present)) }
  function goHome() { setPlaying(false); setKeepsakeOpen(false); if (editorOpen) { setEditorScreen('setup'); setSelectedBlock('hero') } }
  function openEditor() { const screen = keepsakeOpen ? 'keepsake' : playing ? 'game' : 'setup'; setEditorScreen(screen); setSelectedBlock(screen === 'setup' ? 'hero' : screen === 'game' ? 'card' : 'card'); setEditorOpen(true) }
  function changeBlock(screen: LayoutScreen, id: string, patch: Partial<LayoutBlock>) { setLayoutHistory(history => applyLayoutChange(history, screen, id, patch)) }
  function block(screen: LayoutScreen, id: string, children: React.ReactNode, className = '') {
    return <EditableBlock key={`${screen}-${id}`} id={id} block={layoutHistory.present.screens[screen][id]} editing={editorOpen && editorScreen === screen} selected={editorOpen && editorScreen === screen && selectedBlock === id} snap={snap} onSelect={() => setSelectedBlock(id)} onChange={patch => changeBlock(screen, id, patch)} className={className}>{children}</EditableBlock>
  }
  function header(screen: 'setup' | 'game') {
    return block(screen, 'header', <header className="site-header"><button className="wordmark" type="button" onClick={goHome} aria-label="Encounter Cards home"><span className="mark">✦</span><span>相遇卡 <small>ENCOUNTER CARDS · V24</small></span></button><div className="header-tools">{playing && <div className="font-size-control" aria-label="Font size"><button onClick={() => changeFont(-.1)}>A−</button><button onClick={() => changeFont(.1)}>A＋</button></div>}<button type="button" className="edit-trigger" aria-label="Edit layout · 編輯版面" onClick={openEditor}>⌘</button><div className="language-switch" role="group" aria-label="Language 語言">{([['zh', '中'], ['en', 'EN'], ['bilingual', '中/EN']] as const).map(([value, label]) => <button key={value} className={language === value ? 'active' : ''} aria-pressed={language === value} aria-label={value === 'zh' ? '中文' : value === 'en' ? 'English' : '雙語 Bilingual'} onClick={() => chooseLanguage(value)}>{label}</button>)}</div></div></header>, 'header-block')
  }

  const setupScreen = <section className="screen-canvas setup-canvas" aria-label="開始遊戲設定 · Game setup">
    {header('setup')}
    {block('setup', 'hero', <div className="hero-copy"><h1 aria-label={t.heading}><span>{t.heading}</span><small>{t.subheading}</small></h1><p className="hero-lead"><span>{t.lead}</span><small>{t.leadEn}</small></p></div>, 'setup-hero-block')}
    {block('setup', 'fields', <div className="setup-card fields-card"><div className="panel-heading"><span>01</span><b>準備這次相遇 · Set the moment</b></div><div className="field-row"><label><span>你的名字 · Your name</span><input value={yourName} onChange={event => setYourName(event.target.value)} autoComplete="off" placeholder="你的名字 · Your name" /></label><label><span>對方名字 · Their name</span><input value={theirName} onChange={event => setTheirName(event.target.value)} autoComplete="off" placeholder="對方名字 · Their name" /></label></div><div className="field-row contact-row"><label><span>你的聯絡方式（選填） · Your contact</span><input value={yourContact} onChange={event => setYourContact(event.target.value)} autoComplete="off" placeholder="任何格式 · Any format" /></label><label><span>對方聯絡方式（選填） · Their contact</span><input value={theirContact} onChange={event => setTheirContact(event.target.value)} autoComplete="off" placeholder="任何格式 · Any format" /></label></div></div>, 'setup-fields-block')}
    {block('setup', 'levels', <fieldset className="setup-card level-fieldset"><legend>選擇熟識程度 · Choose familiarity level</legend><div className="level-grid">{([1, 2, 3, 4, 5] as Level[]).map(value => <button type="button" key={value} className={level === value ? 'active' : ''} aria-label={`Level ${value}${value === 5 ? ' · 18+' : ''}`} aria-pressed={level === value} onClick={() => chooseLevel(value)}><b>L{value}</b><span>{levelLabels[value - 1][0]}</span></button>)}</div><small className="level-description">{levelLabels[level - 1][1]} · LEVEL {level}</small></fieldset>, 'setup-levels-block')}
    {block('setup', 'modes', <fieldset className="setup-card mode-fieldset"><legend>想抽哪一種卡？ · Choose a card type</legend><div className="mode-grid">{([['truth', '○', '真心話', 'TRUTH'], ['dare', '△', '小挑戰', 'DARE'], ['random', '✦', '隨機', 'SURPRISE ME']] as const).map(([value, icon, zh, en]) => <button type="button" key={value} className={mode === value ? 'active' : ''} aria-label={value === 'truth' ? 'Truth' : value === 'dare' ? 'Dare' : 'Random'} aria-pressed={mode === value} onClick={() => setMode(value)}><span>{icon}</span><b>{zh}</b><small>{en}</small></button>)}</div></fieldset>, 'setup-modes-block')}
    {block('setup', 'begin', <div className="begin-dock"><button className="primary-button" aria-label={t.begin} onClick={() => { setPlaying(true); setKeepsakeOpen(false) }}><span>{t.begin}</span><small>LEVEL {level} · V24 · {levelLabels[level - 1][1].toUpperCase()}</small><i>→</i></button><p className="install-note">{offlineReady ? '✓ Offline ready / 可離線使用' : t.install}</p></div>, 'setup-begin-block')}
    {birthdayOpen && <div className="age-gate" role="dialog" aria-label="Level 5 age gate"><label>Birthday<input aria-label="Birthday" type="date" value={birthday} onChange={event => setBirthday(event.target.value)} /></label><button onClick={confirmAdult}>Confirm 18+</button><button onClick={() => setBirthdayOpen(false)}>Cancel</button></div>}
  </section>

  const gameScreen = <section className="screen-canvas game-canvas">
    {header('game')}
    {block('game', 'toolbar', <div className="game-toolbar"><button onClick={goHome}>← Setup</button><div className="game-meta"><span>LEVEL {level}</span><span>{mode.toUpperCase()}</span><span>18 ARTWORKS</span></div></div>, 'game-toolbar-block')}
    {block('game', 'card', <SwipeDeck key={current ? `${current.card.id}-${current.artwork.id}` : 'deck'} revealed={editorOpen || revealed} onDraw={draw}><div className="card-face card-back"><span className="ornament">✦</span><p>ENCOUNTER CARDS · V24</p><h2>相遇卡</h2><span>SWIPE UP TO DRAW · 向上滑動抽卡</span></div><div className="card-face card-front">{(current || editorOpen) && <article className="mythic-card" data-testid="mythic-card"><div className="mythic-card-header"><div><span>護行之卡 · ENCOUNTER DEITY</span><h2>{encounter.artwork.zhName}</h2><small>{encounter.artwork.enName}</small></div><i>✦</i></div><div data-card-artwork><TaiwanReveal artwork={encounter.artwork} language={language}><img src={encounter.artwork.src} alt={`${encounter.artwork.zhName}・台灣神祇圖`} draggable="false" /><div className="mythic-foil" /></TaiwanReveal></div><div className="mythic-text-panel"><div className="mythic-prompt-meta"><b>真正的你 · THE REAL YOU</b><span>L{encounter.card.level} · {encounter.card.mode.toUpperCase()}</span></div><CardText card={encounter.card} language={language} /><BlessingText encounter={encounter} language={language} /></div></article>}</div></SwipeDeck>, 'game-card-block')}
    {block('game', 'actions', <div className="game-actions"><button className="primary-button draw-button" aria-label={current ? t.next : t.draw} onClick={draw}>{current ? t.next : t.draw}<i>→</i></button>{current && <button className="secondary-button" onClick={() => setKeepsakeOpen(true)}>{t.share}</button>}</div>, 'game-actions-block')}
  </section>

  const exchangeRows = participants.filter(item => item.include && (item.name || item.contact))
  const keepsakeScreen = <section className="screen-canvas keepsake-canvas" aria-label="Keepsake preview">
    {block('keepsake', 'card', <div className="keepsake-card-base" aria-hidden="true" />, 'keepsake-base-block')}
    {block('keepsake', 'header', <div className="keepsake-header"><div><small>護行之卡</small><h2>{encounter.artwork.zhName}</h2></div><i>✦</i></div>, 'keepsake-header-block')}
    {block('keepsake', 'artwork', <div className="keepsake-art"><img src={encounter.artwork.src} alt={`${encounter.artwork.zhName} keepsake artwork`} /></div>, 'keepsake-art-block')}
    {block('keepsake', 'question', <div className="keepsake-question"><div><b>⌖ 想去的地方</b><span>L{encounter.card.level} · {encounter.card.mode.toUpperCase()}</span></div><CardText card={encounter.card} language={language} /></div>, 'keepsake-question-block')}
    {block('keepsake', 'blessing', <div className="keepsake-blessing"><b>給這次相遇的祝福 · BLESSING</b><span>{language === 'en' ? encounter.blessing.en : encounter.blessing.zh}</span></div>, 'keepsake-blessing-block')}
    {block('keepsake', 'exchange', <div className="keepsake-exchange"><b>聯絡資訊 · CONTACT EXCHANGE</b>{exchangeRows.map(item => <span key={item.role}>● {item.name || (item.role === 'self' ? 'You' : 'Guest')} · {item.contact}</span>)}</div>, 'keepsake-exchange-block')}
    {block('keepsake', 'actions', <div className="keepsake-actions"><div><label><input type="checkbox" aria-label="Include your contact" checked={includeYours} onChange={event => setIncludeYours(event.target.checked)} />Your contact</label><label><input type="checkbox" aria-label="Include their contact" checked={includeTheirs} onChange={event => setIncludeTheirs(event.target.checked)} />Their contact</label></div><button type="button" onClick={() => setKeepsakeOpen(false)}>← Card</button><button type="button" className="download-keepsake" onClick={exportKeepsake}>Download / Share</button><button type="button" className="edit-keepsake" aria-label="Edit layout · 編輯版面" onClick={openEditor}>Edit</button></div>, 'keepsake-actions-block')}
  </section>

  return <div className="viewport-stage"><div className="phone-fit-stage" style={{ '--phone-scale': phoneScale } as React.CSSProperties}><main className={`app-shell v24-shell ${activeScreen}-shell${editorOpen ? ' is-layout-editing' : ''}`} style={{ '--font-scale': fontScale } as React.CSSProperties}>{activeScreen === 'setup' ? setupScreen : activeScreen === 'game' ? gameScreen : keepsakeScreen}<p className="sr-only" aria-live="polite">{status}</p></main></div><LayoutEditor open={editorOpen} history={layoutHistory} onHistoryChange={setLayoutHistory} screen={editorScreen} onScreenChange={setEditorScreen} selectedBlock={selectedBlock} onSelectBlock={setSelectedBlock} onClose={() => setEditorOpen(false)} snap={snap} onSnapChange={setSnap} /></div>
}
