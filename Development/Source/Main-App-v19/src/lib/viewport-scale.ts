export const PHONE_WIDTH = 430
export const PHONE_HEIGHT = 932
export const DESKTOP_BREAKPOINT = 561
export const DESKTOP_SAFE_MARGIN = 48

export type ViewportSize = { width: number, height: number }

export function calculatePhoneScale({ width, height }: ViewportSize): number {
  if (width < DESKTOP_BREAKPOINT) return 1
  const availableWidth = Math.max(0, width - DESKTOP_SAFE_MARGIN)
  const availableHeight = Math.max(0, height - DESKTOP_SAFE_MARGIN)
  return Math.min(1, availableWidth / PHONE_WIDTH, availableHeight / PHONE_HEIGHT)
}
