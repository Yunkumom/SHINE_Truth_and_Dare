import { useEffect, useMemo, useState } from 'react'
import type { ArtworkCollection, ArtworkVariant, Blessing, Language } from '../types'
import { downloadDirectKeepsake } from '../lib/direct-keepsake'
import ArtworkPicker from './ArtworkPicker'
import DirectPhotoAdjuster from './DirectPhotoAdjuster'
import { DEFAULT_ARTWORK_PRESENTATION } from '../presentation/presentation-model'
import type { ArtworkPresentation } from '../presentation/presentation-model'
import { adjustedPortraitFocus, portraitObjectPosition } from '../lib/portrait-focus'

interface DirectKeepsakeProps {
  language: Language
  artworks: readonly ArtworkVariant[]
  collections: readonly ArtworkCollection[]
  blessings: readonly Blessing[]
  onBack: () => void
  onStatus: (message: string) => void
}

export default function DirectKeepsake({ language, artworks, collections, blessings, onBack, onStatus }: DirectKeepsakeProps) {
  const [artwork, setArtwork] = useState<ArtworkVariant>(artworks[0])
  const [uploaded, setUploaded] = useState<{ url: string, name: string } | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [adjusterOpen, setAdjusterOpen] = useState(false)
  const [adjustment, setAdjustment] = useState<ArtworkPresentation>(DEFAULT_ARTWORK_PRESENTATION)
  const [blessingId, setBlessingId] = useState(blessings[0]?.id ?? 'custom')
  const [customBlessing, setCustomBlessing] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => () => { if (uploaded) URL.revokeObjectURL(uploaded.url) }, [uploaded])

  const selectedBlessing = blessings.find(item => item.id === blessingId)
  const blessingText = blessingId === 'custom'
    ? customBlessing.trim()
    : language === 'en' ? selectedBlessing?.en ?? '' : selectedBlessing?.zh ?? ''
  const imageSrc = uploaded?.url ?? artwork.src
  const imageName = uploaded?.name ?? (language === 'en' ? artwork.enName : artwork.zhName)
  const previewAlt = useMemo(() => `${imageName} keepsake preview`, [imageName])
  const baseFocus = uploaded ? { x: 50, y: 50 } : artwork.portraitFocus
  const photoFocus = portraitObjectPosition(adjustedPortraitFocus(baseFocus, adjustment))
  const photoStyle = { '--portrait-position': photoFocus, '--artwork-origin': photoFocus, '--artwork-zoom': adjustment.zoom } as React.CSSProperties

  function chooseUpload(file?: File) {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setUploaded(previous => { if (previous) URL.revokeObjectURL(previous.url); return { url, name: file.name } })
    setAdjustment(DEFAULT_ARTWORK_PRESENTATION)
  }

  async function download() {
    if (!blessingText || busy) return
    setBusy(true)
    try {
      const result = await downloadDirectKeepsake({ imageSrc, imageName, blessing: blessingText, language, adjustment, focus: baseFocus })
      onStatus(result === 'shared' ? '紀念卡已開啟分享 · Share sheet opened' : result === 'downloaded' ? '紀念卡已下載 · Keepsake downloaded' : '已取消 · Cancelled')
    } catch {
      onStatus('紀念卡製作失敗，請重新選擇照片。 · Could not create the keepsake.')
    } finally { setBusy(false) }
  }

  return <section className="direct-keepsake-canvas" aria-label="直接製作紀念卡 · Create a keepsake">
    <header className="direct-keepsake-header">
      <button type="button" onClick={onBack} aria-label="返回模式選擇 · Back to modes">←</button>
      <div><b>直接製作紀念卡</b><small>CREATE A KEEPSAKE</small></div>
      <span>V46</span>
    </header>
    <div className="direct-keepsake-content">
      <article className="direct-keepsake-preview">
        <div className="direct-keepsake-title"><span><small>相遇紀念卡</small><b>{imageName}</b></span><i>✦</i></div>
        <div className="direct-keepsake-image card-artwork-viewport"><img src={imageSrc} alt={previewAlt} style={photoStyle} /></div>
        <div className="direct-keepsake-blessing"><small>給這次相遇的祝福 · BLESSING</small><p>{blessingText || '在這裡寫下想送出的祝福。'}</p></div>
      </article>
      <div className="direct-keepsake-controls">
        <div className="direct-photo-actions">
          <button type="button" onClick={() => setPickerOpen(true)}>選擇卡面</button>
          <label>上傳照片<input type="file" accept="image/*" onChange={event => chooseUpload(event.target.files?.[0])} /></label>
          <button type="button" className="direct-adjust-photo" onClick={() => setAdjusterOpen(true)}>調整圖片大小與位置</button>
        </div>
        <label className="direct-blessing-select">祝福語 · Blessing<select value={blessingId} onChange={event => setBlessingId(event.target.value)}>{blessings.map(item => <option key={item.id} value={item.id}>{language === 'en' ? item.en : item.zh}</option>)}<option value="custom">自己寫 · Write my own</option></select></label>
        {blessingId === 'custom' && <textarea aria-label="自訂祝福語 · Custom blessing" maxLength={120} value={customBlessing} onChange={event => setCustomBlessing(event.target.value)} placeholder="寫下想送給對方的祝福…" />}
        <button type="button" className="direct-download-button" disabled={!blessingText || busy} onClick={download}>{busy ? '製作中…' : '下載／分享紀念卡'}</button>
      </div>
    </div>
    {pickerOpen && <div className="direct-artwork-picker" role="dialog" aria-label="選擇紀念卡圖片">
      <header><b>選一張喜歡的圖片</b><button type="button" onClick={() => setPickerOpen(false)} aria-label="關閉圖片選擇">×</button></header>
      <ArtworkPicker artworks={artworks} collections={collections} selectedArtworkId={uploaded ? undefined : artwork.id} initialCollectionId={artwork.collectionId} onSelect={value => { setArtwork(value); setAdjustment(DEFAULT_ARTWORK_PRESENTATION); setUploaded(previous => { if (previous) URL.revokeObjectURL(previous.url); return null }); setPickerOpen(false); setAdjusterOpen(true) }} />
    </div>}
    {adjusterOpen && <DirectPhotoAdjuster imageSrc={imageSrc} imageName={imageName} focus={baseFocus} value={adjustment} onSave={setAdjustment} onClose={() => setAdjusterOpen(false)} />}
  </section>
}
