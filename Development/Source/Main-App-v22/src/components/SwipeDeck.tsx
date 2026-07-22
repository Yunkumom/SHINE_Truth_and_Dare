import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import { calculateSwipePose, decideSwipeRelease } from '../lib/swipe-deck'

interface SwipeDeckProps {
  revealed: boolean
  onDraw: () => void
  children: ReactNode
}

interface GestureState {
  pointerId: number
  startX: number
  startY: number
  committed: boolean
}

const IDLE_POSE = { x: 0, y: 0, rotation: 0, progress: 0 }

export default function SwipeDeck({ revealed, onDraw, children }: SwipeDeckProps) {
  const [pose, setPose] = useState(IDLE_POSE)
  const [returning, setReturning] = useState(false)
  const [committing, setCommitting] = useState(false)
  const gesture = useRef<GestureState | null>(null)
  const commitTimer = useRef<number | null>(null)

  useEffect(() => () => {
    if (commitTimer.current !== null) window.clearTimeout(commitTimer.current)
  }, [])

  function begin(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('[data-card-artwork]')) return
    event.preventDefault()
    setReturning(false)
    gesture.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, committed: false }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    const active = gesture.current
    if (!active || active.pointerId !== event.pointerId || active.committed) return
    const rect = event.currentTarget.getBoundingClientRect()
    setPose(calculateSwipePose({
      dx: event.clientX - active.startX,
      dy: event.clientY - active.startY,
      cardWidth: rect.width || 400,
      cardHeight: rect.height || 562,
    }))
  }

  function finish(event: PointerEvent<HTMLDivElement>) {
    const active = gesture.current
    if (!active || active.pointerId !== event.pointerId) return
    const rect = event.currentTarget.getBoundingClientRect()
    const decision = decideSwipeRelease({
      upwardTravel: active.startY - event.clientY,
      cardHeight: rect.height || 562,
      alreadyCommitted: active.committed,
    })
    if (decision === 'commit') {
      active.committed = true
      setCommitting(true)
      setPose(calculateSwipePose({ dx: event.clientX - active.startX, dy: -Math.max(rect.height || 562, 562), cardWidth: rect.width || 400, cardHeight: rect.height || 562 }))
      commitTimer.current = window.setTimeout(onDraw, 180)
    } else if (decision === 'return') {
      setReturning(true)
      setPose(IDLE_POSE)
    }
    event.currentTarget.releasePointerCapture?.(event.pointerId)
    gesture.current = null
  }

  function cancel(event: PointerEvent<HTMLDivElement>) {
    if (!gesture.current) return
    setReturning(true)
    setPose(IDLE_POSE)
    gesture.current = null
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  const style = {
    '--swipe-progress': pose.progress,
    transform: `translate3d(${pose.x}px, ${pose.y}px, 0) rotate(${pose.rotation}deg)`,
  } as CSSProperties

  return <div className="card-stack v22-deck" data-testid="swipe-deck">
    <div className="stack-card stack-three" />
    <div className="stack-card stack-two" />
    <div className="stack-card stack-one" />
    <div
      className={`encounter-card swipe-card${revealed ? ' is-flipped' : ''}${returning ? ' is-returning' : ''}${committing ? ' is-committing' : ''}`}
      data-testid="swipe-card"
      style={style}
      onPointerDown={begin}
      onPointerMove={move}
      onPointerUp={finish}
      onPointerCancel={cancel}
    >{children}</div>
  </div>
}
