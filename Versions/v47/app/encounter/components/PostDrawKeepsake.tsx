import { useState } from 'react'
import type { EncounterComposition, Language, ParticipantExchange } from '../types'
import { artworkTitle, themedBlessingForArtwork } from '../lib/artwork-copy'
import SurfaceMenu from './SurfaceMenu'
import type { SurfaceMenuNavigationProps } from './SurfaceMenu'

interface PostDrawKeepsakeProps extends SurfaceMenuNavigationProps {
  encounter: EncounterComposition
  language: Language
  artworkStyle: React.CSSProperties
  participants: ParticipantExchange[]
  onParticipantChange: (role: ParticipantExchange['role'], patch: Partial<ParticipantExchange>) => void
  onBack: () => void
  onAdjustArtwork: () => void
  onDownload: (answerKeywords: string, blessing: EncounterComposition['blessing']) => Promise<void>
}
export default function PostDrawKeepsake({ encounter, language, artworkStyle, participants, onParticipantChange, onBack, onAdjustArtwork, onDownload, ...navigation }: PostDrawKeepsakeProps) {
  const themed = themedBlessingForArtwork(encounter.artwork)
  const [answerKeywords, setAnswerKeywords] = useState('')
  const [blessing, setBlessing] = useState(language === 'en' ? themed.en : themed.zh)
  const [busy, setBusy] = useState(false)
  const question = language === 'en' ? encounter.card.en : encounter.card.zh

  async function download() {
    if (busy) return
    setBusy(true)
    try { await onDownload(answerKeywords.trim(), { id: 'post-draw-custom', zh: blessing.trim(), en: blessing.trim() }) }
    finally { setBusy(false) }
  }

  return <section className="post-draw-keepsake" aria-label="抽卡後製作紀念卡">
    <header className="post-draw-header"><button type="button" onClick={onBack}>← 返回卡片</button><b>製作紀念卡</b><SurfaceMenu {...navigation}><button type="button" role="menuitem" onClick={onAdjustArtwork}>調整圖片大小與位置<small>ADJUST IMAGE</small></button></SurfaceMenu></header>
    <div className="post-draw-scroll">
      <article className="post-draw-keepsake-card taiwan-meander">
        <header><b>{artworkTitle(encounter.artwork, language === 'en' ? 'en' : 'zh')}</b></header>
        <div className="post-draw-art"><img src={encounter.artwork.src} alt={encounter.artwork.zhName} style={artworkStyle} /></div>
        <section className="post-draw-question"><small>今天的題目 · TODAY’S QUESTION</small><p>{question}</p><label data-privacy="memory-only-answer-keywords"><span>回答關鍵字（選填）</span><input maxLength={80} value={answerKeywords} onChange={event => setAnswerKeywords(event.target.value)} placeholder="例如：旅行、第一次、滷肉飯" autoComplete="off" /></label></section>
        <label className="post-draw-blessing"><span>祝福 · BLESSING</span><textarea maxLength={120} value={blessing} onChange={event => setBlessing(event.target.value)} /></label>
        <details className="post-draw-contact"><summary>交換聯絡方式（選填）</summary><div>{participants.map(participant => <fieldset key={participant.role}><label><input type="checkbox" checked={participant.include} onChange={event => onParticipantChange(participant.role, { include: event.target.checked })} />{participant.role === 'self' ? '我的資料' : '對方資料'}</label><input value={participant.name} onChange={event => onParticipantChange(participant.role, { name: event.target.value })} placeholder="名字" autoComplete="off" /><input value={participant.contact} onChange={event => onParticipantChange(participant.role, { contact: event.target.value })} placeholder="聯絡方式" autoComplete="off" /></fieldset>)}</div></details>
      </article>
    </div>
    <footer className="post-draw-actions"><button type="button" onClick={onBack}>返回</button><button type="button" disabled={!blessing.trim() || busy} onClick={download}>{busy ? '製作中…' : '下載／分享紀念卡'}</button></footer>
  </section>
}
