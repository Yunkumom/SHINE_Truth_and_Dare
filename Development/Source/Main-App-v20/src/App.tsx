import { useEffect, useMemo, useRef, useState } from 'react'
import { blessings } from './data/blessings'
import { cards } from './data/cards'
import { isAdultOn } from './lib/age-gate'
import { DEITY_ART } from './lib/deity-art'
import { selectArtwork, selectBlessing } from './lib/encounter'
import { eligibleCards, nextCard } from './lib/game'
import { loadFontScale, loadLanguage, saveFontScale, saveLanguage } from './lib/preferences'
import { shareOrDownload } from './lib/share'
import { calculatePhoneScale } from './lib/viewport-scale'
import type { Card, EncounterComposition, Language, Level, Mode } from './types'
import './styles/v20.css'

const copy = {
  zh: {
    heading: '讓一次簡單的對話，成為值得收藏的相遇。',
    subheading: 'Turn a simple conversation into a meeting worth keeping.',
    lead: '抽一張相遇卡，回答一個溫柔的問題，再把祝福送給今天認識的人。',
    leadEn: 'Draw a card, share an answer, and keep a blessing from today.',
    begin: '開始抽卡 · Begin', draw: '抽一張卡', next: '下一張', share: '製作紀念卡', install: 'iPhone：Safari → 分享 → 加入主畫面',
  },
  en: {
    heading: 'Turn a simple conversation into a meeting worth keeping.',
    subheading: '讓一次簡單的對話，成為值得收藏的相遇。',
    lead: 'Draw an encounter card, answer a gentle question, and send a blessing to someone you met today.',
    leadEn: '抽一張相遇卡，回答一個溫柔的問題，再把祝福送給今天認識的人。',
    begin: 'Begin the encounter', draw: 'Draw a card', next: 'Next card', share: 'Create keepsake', install: 'iPhone: Safari → Share → Add to Home Screen',
  },
}

const levelLabels = [
  ['初見', 'First meeting'], ['熟悉', 'Familiar'], ['朋友', 'Friends'], ['親近', 'Close'], ['親密 18+', 'Intimate 18+'],
] as const

function CardText({ card, language }: { card: Card, language: Language }) {
  return <div className="mythic-question">
    {language !== 'en' && <p lang="zh-Hant">{card.zh}</p>}
    {language !== 'zh' && <small className={language === 'en' ? 'english-primary' : ''} lang="en">{card.en}</small>}
  </div>
}

function BlessingText({ encounter, language }: { encounter: EncounterComposition, language: Language }) {
  return <div className="mythic-blessing">
    <span>給這次相遇的祝福 · BLESSING</span>
    {language !== 'en' && <p lang="zh-Hant">{encounter.blessing.zh}</p>}
    {language !== 'zh' && <small className={language === 'en' ? 'english-primary' : ''} lang="en">{encounter.blessing.en}</small>}
  </div>
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => loadLanguage())
  const [fontScale, setFontScale] = useState(() => loadFontScale())
  const [level, setLevel] = useState<Level>(1)
  const [mode, setMode] = useState<Mode>('random')
  const [birthdayOpen, setBirthdayOpen] = useState(false)
  const [birthday, setBirthday] = useState('')
  const [adult, setAdult] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState<EncounterComposition | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(true)
  const [status, setStatus] = useState('')
  const [offlineReady, setOfflineReady] = useState(false)
  const [phoneScale, setPhoneScale] = useState(1)
  const dragStart = useRef<number | null>(null)
  const t = language === 'en' ? copy.en : copy.zh
  const pool = useMemo(() => eligibleCards(cards, level, mode), [level, mode])

  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(() => setOfflineReady(true)).catch(() => undefined)
  }, [])

  useEffect(() => {
    const updateScale = () => setPhoneScale(calculatePhoneScale({ width: window.innerWidth, height: window.innerHeight }))
    const viewport = window.visualViewport
    updateScale()
    window.addEventListener('resize', updateScale)
    viewport?.addEventListener('resize', updateScale)
    return () => {
      window.removeEventListener('resize', updateScale)
      viewport?.removeEventListener('resize', updateScale)
    }
  }, [])

  function chooseLanguage(value: Language) { setLanguage(value); saveLanguage(value) }
  function chooseLevel(value: Level) {
    if (value === 5 && !adult) { setBirthdayOpen(true); return }
    setLevel(value)
  }
  function confirmAdult() {
    if (isAdultOn(birthday)) { setAdult(true); setLevel(5); setBirthdayOpen(false); setBirthday('') }
    else setStatus('Level 5 remains locked / Level 5 仍為鎖定')
  }
  function draw() {
    const card = nextCard(pool, current?.card.id)
    const artwork = selectArtwork(DEITY_ART, current?.artwork.id)
    const blessing = selectBlessing(blessings)
    setCurrent({ card, artwork, blessing })
    setRevealed(true)
    setStatus(language === 'en' ? `Revealed: ${card.en}` : `已翻開：${card.zh}`)
  }
  function changeFont(delta: number) {
    const value = Math.max(.85, Math.min(1.25, fontScale + delta))
    setFontScale(value); saveFontScale(value)
  }
  async function share() { if (current) setStatus(await shareOrDownload(current, language)) }

  return <div className="viewport-stage">
    <div className="phone-fit-stage" style={{ '--phone-scale': phoneScale } as React.CSSProperties}>
      <main className={`app-shell ${playing ? 'game-shell' : 'landing-shell'}`} style={{ '--font-scale': fontScale } as React.CSSProperties}>
        <header className="site-header">
          <button className="wordmark" type="button" onClick={() => setPlaying(false)} aria-label="Encounter Cards home">
            <span className="mark">✦</span>
            <span>相遇卡 <small>ENCOUNTER CARDS · V20</small></span>
          </button>
          <div className="header-tools">
            {playing && <div className="font-size-control" aria-label="Font size"><button onClick={() => changeFont(-.1)}>A−</button><button onClick={() => changeFont(.1)}>A＋</button></div>}
            <div className="language-switch" role="group" aria-label="Language 語言">
              {([['zh', '中'], ['en', 'EN'], ['bilingual', '中/EN']] as const).map(([value, label]) => <button key={value} className={language === value ? 'active' : ''} aria-pressed={language === value} aria-label={value === 'zh' ? '中文' : value === 'en' ? 'English' : '雙語 Bilingual'} onClick={() => chooseLanguage(value)}>{label}</button>)}
            </div>
          </div>
        </header>

        {!playing ? <section className="hero" id="top">
          <div className="hero-copy">
            <h1 aria-label={t.heading}>
              <span>{t.heading}</span>
              <small>{t.subheading}</small>
            </h1>
            <p className="hero-lead"><span>{t.lead}</span><small>{t.leadEn}</small></p>
          </div>

          <div className="setup-panel" aria-label="開始遊戲設定 · Game setup">
            <div className="panel-heading"><span>01</span><b>準備這次相遇 · Set the moment</b></div>
            <div className="field-row">
              <label><span>你的名字 · Your name</span><input autoComplete="off" placeholder="你的名字 · Your name" /></label>
              <label><span>對方名字 · Their name</span><input autoComplete="off" placeholder="對方名字 · Their name" /></label>
            </div>
            <div className="field-row contact-row">
              <label><span>你的聯絡方式（選填） · Your contact</span><input autoComplete="off" placeholder="任何格式 · Any format" /></label>
              <label><span>對方聯絡方式（選填） · Their contact</span><input autoComplete="off" placeholder="任何格式 · Any format" /></label>
            </div>
            <fieldset className="level-fieldset">
              <legend>選擇熟識程度 · Choose familiarity level</legend>
              <div className="level-grid">{([1, 2, 3, 4, 5] as Level[]).map(value => <button type="button" key={value} className={level === value ? 'active' : ''} aria-label={`Level ${value}${value === 5 ? ' · 18+' : ''}`} aria-pressed={level === value} onClick={() => chooseLevel(value)}><b>L{value}</b><span>{levelLabels[value - 1][0]}</span></button>)}</div>
              <small className="level-description">{levelLabels[level - 1][1]} · LEVEL {level}</small>
            </fieldset>
            {birthdayOpen && <div className="age-gate" role="dialog" aria-label="Level 5 age gate"><label>Birthday<input aria-label="Birthday" type="date" value={birthday} onChange={event => setBirthday(event.target.value)} /></label><button onClick={confirmAdult}>Confirm 18+</button><button onClick={() => setBirthdayOpen(false)}>Cancel</button></div>}
            <fieldset>
              <legend>想抽哪一種卡？ · Choose a card type</legend>
              <div className="mode-grid">
                {([['truth', '○', '真心話', 'TRUTH'], ['dare', '△', '小挑戰', 'DARE'], ['random', '✦', '隨機', 'SURPRISE ME']] as const).map(([value, icon, zh, en]) => <button type="button" key={value} className={mode === value ? 'active' : ''} aria-label={value === 'truth' ? 'Truth' : value === 'dare' ? 'Dare' : 'Random'} aria-pressed={mode === value} onClick={() => setMode(value)}><span>{icon}</span><b>{zh}</b><small>{en}</small></button>)}
              </div>
            </fieldset>
            <button className="primary-button" aria-label={t.begin} onClick={() => setPlaying(true)}><span>{t.begin}</span><small>LEVEL {level} · V20 · {levelLabels[level - 1][1].toUpperCase()}</small><i>→</i></button>
            <p className="install-note">{offlineReady ? '✓ Offline ready / 可離線使用' : t.install}</p>
          </div>
        </section> : <section className="game-layout">
          <div className="game-toolbar"><button onClick={() => setPlaying(false)}>← Setup</button><button aria-expanded={controlsOpen} onClick={() => setControlsOpen(value => !value)}>Controls</button></div>
          {controlsOpen && <div className="game-meta"><span>LEVEL {level}</span><span>{mode.toUpperCase()}</span><span>18 ARTWORKS</span></div>}
          <div className={`card-stack ${current ? 'has-card' : ''}`}>
            <div className="stack-card stack-two" aria-hidden="true" /><div className="stack-card stack-one" aria-hidden="true" />
            <div className={`encounter-card ${revealed ? 'is-flipped' : ''}`} tabIndex={0}
              onPointerDown={event => { dragStart.current = event.clientX }}
              onPointerUp={event => { if (dragStart.current !== null && Math.abs(event.clientX - dragStart.current) > 60) draw(); dragStart.current = null }}>
              <div className="card-face card-back"><span className="ornament">✦</span><p>ENCOUNTER CARDS · V20</p><h2>相遇卡</h2><span>DRAG TO DRAW · 滑動抽卡</span></div>
              <div className="card-face card-front">{current && <article className="mythic-card" data-testid="mythic-card">
                <div className="mythic-card-header"><div><span>相遇之神 · ENCOUNTER DEITY</span><h2>{current.artwork.zhName}</h2><small>{current.artwork.enName}</small></div><i>✦</i></div>
                <div className="mythic-art-frame"><img src={current.artwork.src} alt={`${current.artwork.zhName}・台灣神祇圖`} /><div className="mythic-foil" /></div>
                <div className="mythic-text-panel"><div className="mythic-prompt-meta"><b>真正的你 · THE REAL YOU</b><span>L{current.card.level} · {current.card.mode.toUpperCase()}</span></div><CardText card={current.card} language={language} /><BlessingText encounter={current} language={language} /></div>
              </article>}</div>
            </div>
          </div>
          <div className="game-actions"><button className="primary-button draw-button" aria-label={current ? t.next : t.draw} onClick={draw}>{current ? t.next : t.draw}<i>→</i></button>{current && <button className="secondary-button" onClick={share}>{t.share}</button>}</div>
        </section>}
        <p className="sr-only" aria-live="polite">{status}</p>
      </main>
    </div>
  </div>
}
