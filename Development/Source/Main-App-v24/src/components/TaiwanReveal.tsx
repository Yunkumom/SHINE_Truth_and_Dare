import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from 'react'
import type { ArtworkVariant, Language } from '../types'
import { TAIWAN_PATH, TAIWAN_VIEWBOX } from '../lib/taiwan-shape'
import '../styles/taiwan-reveal.css'

const HOLD_TO_REVEAL_MS = 600
const REVEAL_AFTER_RELEASE_MS = 3000
const MOVE_CANCEL_DISTANCE = 12

interface TaiwanRevealProps {
  artwork: ArtworkVariant
  language: Language
  children: ReactNode
}

export default function TaiwanReveal({ artwork, language, children }: TaiwanRevealProps) {
  const [visible, setVisible] = useState(false)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pressOrigin = useRef<{ x: number, y: number } | null>(null)
  const revealedDuringPress = useRef(false)

  const clearHoldTimer = () => {
    if (holdTimer.current !== null) clearTimeout(holdTimer.current)
    holdTimer.current = null
  }
  const clearHideTimer = () => {
    if (hideTimer.current !== null) clearTimeout(hideTimer.current)
    hideTimer.current = null
  }
  const hideLater = () => {
    clearHideTimer()
    hideTimer.current = setTimeout(() => setVisible(false), REVEAL_AFTER_RELEASE_MS)
  }
  const reveal = (autoHide: boolean) => {
    clearHideTimer()
    setVisible(true)
    revealedDuringPress.current = true
    if (autoHide) hideLater()
  }
  const finishPress = () => {
    clearHoldTimer()
    pressOrigin.current = null
    if (revealedDuringPress.current) hideLater()
  }

  useEffect(() => () => {
    clearHoldTimer()
    clearHideTimer()
  }, [])

  const instruction = language === 'zh'
    ? `長按圖片尋找${artwork.zhName}畫作中隱藏的台灣`
    : language === 'en'
      ? `Press and hold the image to find Taiwan hidden in the ${artwork.enName} artwork`
      : '長按圖片尋找隱藏的台灣 · Press and hold the image to find hidden Taiwan'
  const revealedText = language === 'zh'
    ? `台灣位置已顯示：${artwork.hiddenTaiwan}`
    : language === 'en'
      ? `Taiwan location revealed: ${artwork.hiddenTaiwan}`
      : `台灣位置已顯示 · Taiwan location revealed: ${artwork.hiddenTaiwan}`
  const hotspotStyle = {
    left: `${artwork.taiwanHotspot.x}%`,
    top: `${artwork.taiwanHotspot.y}%`,
    '--taiwan-scale': artwork.taiwanHotspot.scale,
    '--taiwan-rotation': `${artwork.taiwanHotspot.rotation}deg`,
    '--taiwan-color': artwork.taiwanHotspot.color,
    '--taiwan-accent': artwork.taiwanHotspot.accent,
  } as CSSProperties

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.stopPropagation()
    clearHoldTimer()
    clearHideTimer()
    setVisible(false)
    revealedDuringPress.current = false
    pressOrigin.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture?.(event.pointerId)
    holdTimer.current = setTimeout(() => reveal(false), HOLD_TO_REVEAL_MS)
  }
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    event.stopPropagation()
    if (!pressOrigin.current || revealedDuringPress.current) return
    const distance = Math.hypot(event.clientX - pressOrigin.current.x, event.clientY - pressOrigin.current.y)
    if (distance > MOVE_CANCEL_DISTANCE) {
      clearHoldTimer()
      pressOrigin.current = null
    }
  }
  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    event.stopPropagation()
    event.currentTarget.releasePointerCapture?.(event.pointerId)
    finishPress()
  }
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    event.stopPropagation()
    reveal(true)
  }

  return <div
    className={`mythic-art-frame taiwan-reveal-target${visible ? ' is-taiwan-visible' : ''}`}
    role="button"
    tabIndex={0}
    aria-label={instruction}
    aria-pressed={visible}
    onPointerDown={handlePointerDown}
    onPointerMove={handlePointerMove}
    onPointerUp={handlePointerUp}
    onPointerCancel={event => { event.stopPropagation(); finishPress() }}
    onKeyDown={handleKeyDown}
    onContextMenu={event => { event.preventDefault(); event.stopPropagation() }}
  >
    {children}
    {visible && <>
      <div className="taiwan-locator" data-testid="taiwan-locator" style={hotspotStyle} aria-hidden="true">
        <svg viewBox={TAIWAN_VIEWBOX} focusable="false">
          <path className="taiwan-coastline-glow" data-testid="taiwan-shape" data-canonical-shape="taiwan-v24" d={TAIWAN_PATH} />
          <path className="taiwan-coastline-crisp" data-testid="taiwan-shape" data-canonical-shape="taiwan-v24" d={TAIWAN_PATH} />
        </svg>
      </div>
      <span className="sr-only" role="status">{revealedText}</span>
    </>}
  </div>
}
