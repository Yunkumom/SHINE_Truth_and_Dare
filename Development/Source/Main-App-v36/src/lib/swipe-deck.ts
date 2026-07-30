const DRAW_THRESHOLD = .22

export interface SwipePoseInput {
  dx: number
  dy: number
  cardWidth: number
  cardHeight: number
}

export interface SwipeReleaseInput {
  upwardTravel: number
  cardHeight: number
  alreadyCommitted: boolean
}

export function calculateSwipePose({ dx, dy, cardWidth, cardHeight }: SwipePoseInput) {
  const rotation = Math.max(-12, Math.min(12, dx / Math.max(cardWidth, 1) * 24))
  const progress = Math.max(0, Math.min(1, -dy / Math.max(cardHeight * DRAW_THRESHOLD, 1)))
  return { x: dx, y: dy, rotation: Math.round(rotation * 100) / 100, progress: Math.round(progress * 100) / 100 }
}

export function decideSwipeRelease({ upwardTravel, cardHeight, alreadyCommitted }: SwipeReleaseInput): 'return' | 'commit' | 'ignore' {
  if (alreadyCommitted) return 'ignore'
  return upwardTravel >= cardHeight * DRAW_THRESHOLD ? 'commit' : 'return'
}

export function isSwipeOriginAllowed(origin: 'frame' | 'artwork') {
  return origin === 'frame'
}
