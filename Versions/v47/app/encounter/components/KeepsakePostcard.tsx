import { useState } from 'react'
import type { Language } from '../types'
import yunkumomLogo from '../assets/brand/yunkumom-logo-transparent-v1.png'
import { createElectronicPostcardFiles, deliverElectronicPostcard } from '../lib/electronic-postcard'

interface KeepsakePostcardProps {
  cardId: string
  imageSrc: string
  title: string
  subtitle: string
  language: Language
  onClose: () => void
}

export default function KeepsakePostcard({ cardId, imageSrc, title, subtitle, language, onClose }: KeepsakePostcardProps) {
  const [side, setSide] = useState<'front' | 'back'>('front')
  const [recipient, setRecipient] = useState('')
  const [sender, setSender] = useState('')
  const [message, setMessage] = useState(language === 'en'
    ? 'Thanks for sharing this little Australian discovery with me.'
    : '謝謝你陪我一起找到這張澳洲卡片的秘密。')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')

  async function exportPostcard() {
    if (busy) return
    setBusy(true)
    setStatus('')
    try {
      const files = await createElectronicPostcardFiles({ cardId, imageSrc, logoSrc: yunkumomLogo, title, subtitle, recipient, sender, message, language })
      const result = await deliverElectronicPostcard(files)
      setStatus(result === 'shared' ? '雙面明信片已開啟分享 · Share sheet opened' : result === 'downloaded' ? '正面與背面已下載 · Both sides downloaded' : '已取消 · Cancelled')
    } catch {
      setStatus('明信片製作失敗，請再試一次。 · Could not create postcard.')
    } finally {
      setBusy(false)
    }
  }

  return <section className="keepsake-postcard-canvas" aria-label="電子紀念明信片 · Electronic keepsake postcard">
    <header className="postcard-header">
      <button type="button" onClick={onClose} aria-label="返回遊戲 · Back to game">←</button>
      <div><b>電子紀念明信片</b><small>ELECTRONIC POSTCARD</small></div>
      <img src={yunkumomLogo} alt="Yunkumom" />
    </header>

    <div className="postcard-side-tabs" role="tablist" aria-label="明信片正反面 · Postcard sides">
      <button type="button" role="tab" aria-selected={side === 'front'} className={side === 'front' ? 'active' : ''} onClick={() => setSide('front')}>正面<small>FRONT</small></button>
      <button type="button" role="tab" aria-selected={side === 'back'} className={side === 'back' ? 'active' : ''} onClick={() => setSide('back')}>背面<small>BACK</small></button>
    </div>

    <div className="postcard-preview-stage">
      {side === 'front'
        ? <article className="postcard-preview postcard-front-preview">
            <div className="postcard-front-art"><img src={imageSrc} alt={title} /></div>
            <div className="postcard-front-copy"><small>A MOMENT FROM AUSTRALIA</small><h1>{title}</h1><p>{subtitle}</p><img src={yunkumomLogo} alt="" aria-hidden="true" /></div>
          </article>
        : <article className="postcard-preview postcard-back-preview">
            <div className="postcard-message-preview"><small>想送出去的話 · MESSAGE</small><p>{message || '寫下一段想送出去的話…'}</p><b>寄件人 · FROM<br />{sender || 'Yunkumom Friend'}</b></div>
            <div className="postcard-address-preview"><span>STAMP</span><img src={yunkumomLogo} alt="" aria-hidden="true" /><small>收件人 · TO</small><b>{recipient || 'Someone special'}</b><i /><i /><i /></div>
          </article>}
    </div>

    <div className="postcard-fields">
      <div className="postcard-short-fields">
        <label>收件人 · TO<input value={recipient} maxLength={48} onChange={event => setRecipient(event.target.value)} placeholder="想送給誰？" /></label>
        <label>寄件人 · FROM<input value={sender} maxLength={48} onChange={event => setSender(event.target.value)} placeholder="你的署名（選填）" /></label>
      </div>
      <label className="postcard-message-field">想送出去的話 · MESSAGE<textarea value={message} maxLength={220} onChange={event => setMessage(event.target.value)} /></label>
    </div>

    <button type="button" className="postcard-export-button" disabled={busy} onClick={exportPostcard}>
      {busy ? '製作中… · CREATING…' : <><b>下載／分享雙面明信片</b><small>SHARE BOTH SIDES</small></>}
    </button>
    <p className="postcard-local-note">文字只留在這次製作，不儲存、不上傳 · MEMORY ONLY</p>
    <p className="postcard-status" aria-live="polite">{status}</p>
  </section>
}
