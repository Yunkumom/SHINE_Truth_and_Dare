import { useEffect, useMemo, useRef, useState } from 'react'
import { cards } from './data/cards'
import { isAdultOn } from './lib/age-gate'
import { eligibleCards, nextCard } from './lib/game'
import { loadFontScale, loadLanguage, saveFontScale, saveLanguage } from './lib/preferences'
import { shareOrDownload } from './lib/share'
import { calculatePhoneScale } from './lib/viewport-scale'
import type { Card, Language, Level, Mode } from './types'

const copy = {
  zh: { heading: '讓一次相遇，成為一段故事', begin: '開始相遇', draw: '抽一張卡', next: '下一張', share: '製作紀念卡', install: 'iPhone：Safari → 分享 → 加入主畫面' },
  en: { heading: 'Turn a meeting into a story', begin: 'Begin the encounter', draw: 'Draw a card', next: 'Next card', share: 'Create keepsake', install: 'iPhone: Safari → Share → Add to Home Screen' }
}

function CardText({ card, language }: { card: Card, language: Language }) {
  return <>{language !== 'en' && <p lang="zh-Hant">{card.zh}</p>}{language !== 'zh' && <p lang="en">{card.en}</p>}</>
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
  const [current, setCurrent] = useState<Card | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [controlsOpen, setControlsOpen] = useState(true)
  const [status, setStatus] = useState('')
  const [offlineReady, setOfflineReady] = useState(false)
  const [phoneScale, setPhoneScale] = useState(1)
  const dragStart = useRef<number | null>(null)
  const t = language === 'zh' ? copy.zh : copy.en
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
  function draw() { const card = nextCard(pool, current?.id); setCurrent(card); setRevealed(true); setStatus(language === 'en' ? `Revealed: ${card.en}` : `已翻開：${card.zh}`) }
  function changeFont(delta: number) { const value = Math.max(.85, Math.min(1.35, fontScale + delta)); setFontScale(value); saveFontScale(value) }
  async function share() { if (current) setStatus(await shareOrDownload(current, language)) }

  return <div className="phone-fit-stage" style={{ '--phone-scale': phoneScale } as React.CSSProperties}>
    <main className="app-shell" style={{ '--font-scale': fontScale } as React.CSSProperties}>
    <header><span>ENCOUNTER CARDS</span><b>V18</b></header>
    {!playing ? <section className="setup-screen">
      <div className="halo" aria-hidden="true">✦</div>
      <h1>{language === 'bilingual' ? <>{copy.zh.heading}<small>{copy.en.heading}</small></> : t.heading}</h1>
      <div className="segmented" aria-label="Language">
        {([['zh','中'],['en','EN'],['bilingual','中/EN']] as const).map(([value,label]) => <button key={value} aria-pressed={language === value} onClick={() => chooseLanguage(value)}>{label}</button>)}
      </div>
      <div className="fields"><label>你的名字 / Your name<input autoComplete="off" /></label><label>對方名字 / Their name<input autoComplete="off" /></label><label>選填聯絡方式 / Optional contact<input autoComplete="off" /></label></div>
      <fieldset><legend>熟識程度 / Familiarity</legend><div className="level-grid">{([1,2,3,4,5] as Level[]).map(value => <button key={value} aria-pressed={level === value} onClick={() => chooseLevel(value)}>Level {value}{value === 5 ? ' · 18+' : ''}</button>)}</div></fieldset>
      {birthdayOpen && <div className="age-gate" role="dialog" aria-label="Level 5 age gate"><label>Birthday<input aria-label="Birthday" type="date" value={birthday} onChange={event => setBirthday(event.target.value)} /></label><button onClick={confirmAdult}>Confirm 18+</button><button onClick={() => setBirthdayOpen(false)}>Cancel</button></div>}
      <fieldset><legend>模式 / Mode</legend><div className="segmented">{(['truth','dare','random'] as Mode[]).map(value => <button key={value} aria-pressed={mode === value} onClick={() => setMode(value)}>{value === 'truth' ? 'Truth' : value === 'dare' ? 'Dare' : 'Random'}</button>)}</div></fieldset>
      <button className="primary" onClick={() => setPlaying(true)}>{t.begin}</button>
      <p className="install-note">{offlineReady ? '✓ Offline ready / 可離線使用' : t.install}</p>
    </section> : <section className="game-screen">
      <div className="toolbar"><button onClick={() => setPlaying(false)}>← Setup</button><button aria-expanded={controlsOpen} onClick={() => setControlsOpen(value => !value)}>Controls</button></div>
      {controlsOpen && <div className="controls"><button onClick={() => changeFont(-.1)}>A−</button><button onClick={() => changeFont(.1)}>A＋</button><span>Level {level} · {mode}</span></div>}
      <div className={`encounter-card ${revealed ? 'revealed' : ''}`} tabIndex={0}
        onPointerDown={event => { dragStart.current = event.clientX }}
        onPointerUp={event => { if (dragStart.current !== null && Math.abs(event.clientX - dragStart.current) > 60) draw(); dragStart.current = null }}>
        <div className="card-back"><span>✦</span><p>DRAG TO DRAW</p></div>
        <div className="card-front">{current && <><span className="card-meta">LEVEL {current.level} · {current.mode.toUpperCase()}</span><div className="sigil" aria-hidden="true">✧</div><CardText card={current} language={language} /></>}</div>
      </div>
      <button className="primary" onClick={draw}>{current ? t.next : t.draw}</button>
      {current && <button className="secondary" onClick={share}>{t.share}</button>}
    </section>}
    <p className="sr-only" aria-live="polite">{status}</p>
    </main>
  </div>
}
