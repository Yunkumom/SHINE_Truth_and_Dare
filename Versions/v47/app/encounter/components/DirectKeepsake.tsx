import { useEffect, useMemo, useState } from 'react'
import type { ArtworkCollection, ArtworkVariant, Blessing, Language } from '../types'
import { DEFAULT_DIRECT_KEEPSAKE_DESIGN, DIRECT_KEEPSAKE_FONT_OPTIONS, downloadDirectKeepsake } from '../lib/direct-keepsake'
import type { DirectKeepsakeDesign } from '../lib/direct-keepsake'
import ArtworkPicker from './ArtworkPicker'
import DirectPhotoAdjuster from './DirectPhotoAdjuster'
import { DEFAULT_ARTWORK_PRESENTATION } from '../presentation/presentation-model'
import type { ArtworkPresentation } from '../presentation/presentation-model'
import { adjustedPortraitFocus, portraitObjectPosition } from '../lib/portrait-focus'
import { artworkTitle, themedBlessingForArtwork } from '../lib/artwork-copy'
import SurfaceMenu from './SurfaceMenu'
import type { SurfaceMenuNavigationProps } from './SurfaceMenu'

interface DirectKeepsakeProps extends SurfaceMenuNavigationProps {
  language: Language
  artworks: readonly ArtworkVariant[]
  collections: readonly ArtworkCollection[]
  blessings: readonly Blessing[]
  onBack: () => void
  onStatus: (message: string) => void
}

export default function DirectKeepsake({ language, artworks, collections, blessings, onBack, onStatus, ...navigation }: DirectKeepsakeProps) {
  const [artwork, setArtwork] = useState<ArtworkVariant>(artworks[0])
  const [uploaded, setUploaded] = useState<{ url: string, name: string } | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [adjusterOpen, setAdjusterOpen] = useState(false)
  const [adjustment, setAdjustment] = useState<ArtworkPresentation>(DEFAULT_ARTWORK_PRESENTATION)
  const [design, setDesign] = useState<DirectKeepsakeDesign>(() => ({ ...DEFAULT_DIRECT_KEEPSAKE_DESIGN, title: artworkTitle(artworks[0], language === 'en' ? 'en' : 'zh') }))
  const [blessingId, setBlessingId] = useState('artwork-theme')
  const [customBlessing, setCustomBlessing] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => () => { if (uploaded) URL.revokeObjectURL(uploaded.url) }, [uploaded])

  const themedBlessing = themedBlessingForArtwork(artwork)
  const selectedBlessing = blessingId === 'artwork-theme' ? themedBlessing : blessings.find(item => item.id === blessingId)
  const blessingText = blessingId === 'custom'
    ? customBlessing.trim()
    : language === 'en' ? selectedBlessing?.en ?? '' : selectedBlessing?.zh ?? ''
  const imageSrc = uploaded?.url ?? artwork.src
  const imageName = uploaded?.name ?? artworkTitle(artwork, language === 'en' ? 'en' : 'zh')
  const previewAlt = useMemo(() => `${imageName} keepsake preview`, [imageName])
  const baseFocus = uploaded ? { x: 50, y: 50 } : artwork.portraitFocus
  const photoFocus = portraitObjectPosition(adjustedPortraitFocus(baseFocus, adjustment))
  const fontStack = DIRECT_KEEPSAKE_FONT_OPTIONS.find(option => option.value === design.fontFamily)?.css ?? DIRECT_KEEPSAKE_FONT_OPTIONS[0].css
  const photoStyle = { '--portrait-position': photoFocus, '--artwork-origin': photoFocus, '--artwork-zoom': adjustment.zoom } as React.CSSProperties
  const cardStyle = { ...photoStyle, '--direct-title-font-size': `${design.titleFontSize}px`, '--direct-blessing-font-size': `${design.blessingFontSize}px`, '--direct-blessing-height': `${design.blessingHeight}px`, '--direct-card-font': fontStack } as React.CSSProperties

  function chooseUpload(file?: File) {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    setUploaded(previous => { if (previous) URL.revokeObjectURL(previous.url); return { url, name: file.name } })
    setAdjustment(DEFAULT_ARTWORK_PRESENTATION)
    setDesign({ ...DEFAULT_DIRECT_KEEPSAKE_DESIGN, title: file.name.replace(/\.[^.]+$/, '') })
  }

  async function download() {
    if (!blessingText || busy) return
    setBusy(true)
    try {
      const result = await downloadDirectKeepsake({ imageSrc, imageName, blessing: blessingText, language, adjustment, focus: baseFocus, design })
      onStatus(result === 'shared' ? '紀念卡已開啟分享 · Share sheet opened' : result === 'downloaded' ? '紀念卡已下載 · Keepsake downloaded' : '已取消 · Cancelled')
    } catch {
      onStatus('紀念卡製作失敗，請重新選擇照片。 · Could not create the keepsake.')
    } finally { setBusy(false) }
  }

  return <section className="direct-keepsake-canvas" aria-label="直接製作紀念卡 · Create a keepsake">
    <header className="direct-keepsake-header">
      <button type="button" onClick={onBack} aria-label="返回模式選擇 · Back to modes">←</button>
      <div><b>{language === 'en' ? 'Create a Keepsake' : '直接製作紀念卡'}</b><small>{language === 'en' ? '直接製作紀念卡' : 'CREATE A KEEPSAKE'}</small></div>
      <SurfaceMenu {...navigation}>
        <button type="button" role="menuitem" onClick={() => setPickerOpen(true)}>{language === 'en' ? 'Choose Card' : '選擇卡片'}<small>CHOOSE CARD</small></button>
        <label className="surface-menu-upload" role="menuitem">{language === 'en' ? 'Upload Photo' : '上傳照片'}<small>UPLOAD PHOTO</small><input type="file" accept="image/*" onChange={event => chooseUpload(event.target.files?.[0])} /></label>
        <button type="button" role="menuitem" onClick={() => setAdjusterOpen(true)}>{language === 'en' ? 'Adjust Card Design' : '調整圖片大小與位置'}<small>PHOTO · LAYOUT · TYPE</small></button>
      </SurfaceMenu>
    </header>
    <div className="direct-keepsake-content">
      <article className="direct-keepsake-preview taiwan-meander" style={cardStyle} data-font-family={design.fontFamily}>
        <div className="direct-keepsake-title">
          <span><b>{design.title || imageName}</b></span>
        </div>
        <div className="direct-keepsake-image card-artwork-viewport"><img src={imageSrc} alt={previewAlt} style={photoStyle} /></div>
        <div className="direct-keepsake-blessing"><small>{language === 'en' ? 'BLESSING' : '給今天的祝福 · BLESSING'}</small><p>{blessingText || (language === 'en' ? 'Write a blessing for this keepsake.' : '在這裡寫下想送出的祝福。')}</p></div>
      </article>
      <div className="direct-keepsake-controls">
        <label className="direct-blessing-select">{language === 'en' ? 'Blessing' : '祝福語 · Blessing'}<select value={blessingId} onChange={event => setBlessingId(event.target.value)}><option value="artwork-theme">{language === 'en' ? themedBlessing.en : themedBlessing.zh}</option>{blessings.map(item => <option key={item.id} value={item.id}>{language === 'en' ? item.en : item.zh}</option>)}<option value="custom">{language === 'en' ? 'Write my own' : '自己寫 · Write my own'}</option></select></label>
        {blessingId === 'custom' && <textarea aria-label="自訂祝福語 · Custom blessing" maxLength={120} value={customBlessing} onChange={event => setCustomBlessing(event.target.value)} placeholder="寫下想送給對方的祝福…" />}
        <button type="button" className="direct-download-button" disabled={!blessingText || busy} onClick={download}>{busy ? (language === 'en' ? 'Creating…' : '製作中…') : (language === 'en' ? 'Download / Share' : '下載／分享')}</button>
      </div>
    </div>
    {pickerOpen && <div className="direct-artwork-picker" role="dialog" aria-label="選擇紀念卡圖片">
      <header><b>選一張喜歡的圖片</b><button type="button" onClick={() => setPickerOpen(false)} aria-label="關閉圖片選擇">×</button></header>
      <ArtworkPicker artworks={artworks} collections={collections} selectedArtworkId={uploaded ? undefined : artwork.id} initialCollectionId={artwork.collectionId} onSelect={value => { setArtwork(value); setBlessingId('artwork-theme'); setAdjustment(DEFAULT_ARTWORK_PRESENTATION); setDesign({ ...DEFAULT_DIRECT_KEEPSAKE_DESIGN, title: artworkTitle(value, language === 'en' ? 'en' : 'zh') }); setUploaded(previous => { if (previous) URL.revokeObjectURL(previous.url); return null }); setPickerOpen(false); setAdjusterOpen(true) }} />
    </div>}
    {adjusterOpen && <DirectPhotoAdjuster imageSrc={imageSrc} imageName={imageName} blessing={blessingText} language={language} focus={baseFocus} value={adjustment} design={design} onSave={(nextAdjustment, nextDesign) => { setAdjustment(nextAdjustment); setDesign(nextDesign) }} onClose={() => setAdjusterOpen(false)} />}
  </section>
}
