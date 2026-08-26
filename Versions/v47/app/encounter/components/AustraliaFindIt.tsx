import { useEffect, useState } from 'react'
import type { AustraliaFindItCard, AustraliaFindItMode, FindItCopy } from '../data/australia-find-it'
import { AUSTRALIA_FIND_IT_CARDS } from '../data/australia-find-it'
import { australiaFindItArtwork } from '../lib/australia-find-it-art'
import { drawFindItCard } from '../lib/australia-find-it-game'
import SurfaceMenu from './SurfaceMenu'
import type { SurfaceMenuNavigationProps } from './SurfaceMenu'
import YunkumomMark from './YunkumomMark'

interface AustraliaFindItProps extends SurfaceMenuNavigationProps {
  onBack: () => void
}

const modes: Array<{ value: AustraliaFindItMode, zh: string, en: string }> = [
  { value: 'mixed', zh: '混合', en: 'MIXED' },
  { value: 'hidden-map', zh: '找地圖', en: 'HIDDEN MAP' },
  { value: 'spot-difference', zh: '找不同', en: 'DIFFERENCES' },
]

function localized(copy: FindItCopy, language: SurfaceMenuNavigationProps['language']) {
  if (language === 'en') return copy.en
  if (language === 'zh') return copy.zh
  return `${copy.zh} · ${copy.en}`
}

function cardKind(card: AustraliaFindItCard) {
  return card.kind === 'hidden-map' ? '找地圖 · HIDDEN MAP' : '找不同 · DIFFERENCES'
}

export default function AustraliaFindIt({ onBack, language, ...navigation }: AustraliaFindItProps) {
  const firstCard = AUSTRALIA_FIND_IT_CARDS[0]
  const [mode, setMode] = useState<AustraliaFindItMode>('mixed')
  const [current, setCurrent] = useState(firstCard)
  const [drawnIds, setDrawnIds] = useState<string[]>([firstCard.id])
  const [revealed, setRevealed] = useState(false)
  const [timerEnabled, setTimerEnabled] = useState(false)
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    if (!timerEnabled || revealed || seconds <= 0) return
    const interval = window.setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(interval)
  }, [timerEnabled, revealed, seconds])

  function resetRound(card: AustraliaFindItCard) {
    setCurrent(card)
    setRevealed(false)
    setSeconds(60)
  }

  function chooseMode(nextMode: AustraliaFindItMode) {
    const result = drawFindItCard(AUSTRALIA_FIND_IT_CARDS, nextMode, [])
    setMode(nextMode)
    setDrawnIds([result.card.id])
    resetRound(result.card)
  }

  function nextCard() {
    const result = drawFindItCard(AUSTRALIA_FIND_IT_CARDS, mode, drawnIds)
    setDrawnIds(result.resetHistory ? [result.card.id] : [...drawnIds, result.card.id])
    resetRound(result.card)
  }

  function showAnswer() {
    setRevealed(true)
  }

  const timerLabel = timerEnabled ? '關閉計時 · TIMER OFF' : '60 秒計時 · 60 SEC TIMER'
  const progress = `${String(current.number).padStart(2, '0')} / 50`
  const roundOver = revealed || (timerEnabled && seconds === 0)

  return <section className="australia-find-it-canvas" aria-label="大家來找碴 · Australia Find It">
    <header className="find-it-header">
      <button type="button" className="find-it-back" onClick={onBack} aria-label="返回遊戲選擇 · Back to games">←</button>
      <div className="find-it-brand"><span><YunkumomMark /></span><b>Yunkumom</b></div>
      <SurfaceMenu language={language} {...navigation} />
    </header>

    <div className="find-it-heading">
      <div><small>AUSTRALIA · CARD {progress}</small><h1>大家來找碴</h1><p>AUSTRALIA FIND IT</p></div>
      <span className="find-it-kind">{cardKind(current)}</span>
    </div>

    <div className="find-it-mode-tabs" role="radiogroup" aria-label="玩法 · Game mode">
      {modes.map(item => <button type="button" role="radio" aria-checked={mode === item.value} className={mode === item.value ? 'active' : ''} key={item.value} onClick={() => chooseMode(item.value)}><b>{item.zh}</b><small>{item.en}</small></button>)}
    </div>

    <article className="find-it-card">
      <div className="find-it-card-copy">
        <h2>{localized(current.title, language)}</h2>
        <p>{localized(current.instruction, language)}</p>
      </div>
      <div className="find-it-art-frame">
        <img src={australiaFindItArtwork(current.src)} alt={`${localized(current.title, language)} — ${localized(current.instruction, language)}`} draggable="false" />
        {roundOver && <div className="find-it-answer" role="status">
          <small>答案 · ANSWER</small>
          {language !== 'en' && <p lang="zh-Hant">{current.answer.zh}</p>}
          {language !== 'zh' && <p lang="en">{current.answer.en}</p>}
        </div>}
      </div>
    </article>

    <div className="find-it-status-row">
      <button type="button" className={timerEnabled ? 'timer-active' : ''} aria-pressed={timerEnabled} onClick={() => { setTimerEnabled(value => !value); setSeconds(60) }}>{timerLabel}</button>
      <output aria-live="polite" className={seconds <= 10 && timerEnabled ? 'timer-urgent' : ''}>{timerEnabled ? `00:${String(seconds).padStart(2, '0')}` : '∞'}</output>
    </div>

    <div className="find-it-actions">
      {!roundOver
        ? <><button type="button" className="find-it-reveal" onClick={showAnswer}>揭曉答案<small>REVEAL ANSWER</small></button><button type="button" className="find-it-found" onClick={showAnswer}>找到了<small>FOUND IT</small></button></>
        : <button type="button" className="find-it-next" onClick={nextCard}>下一張 · NEXT CARD <span>→</span></button>}
    </div>
    <p className="find-it-privacy">不記名、不上傳，只在這一局使用 · MEMORY ONLY</p>
  </section>
}
