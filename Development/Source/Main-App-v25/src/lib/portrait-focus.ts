export interface PortraitFocus { x: number, y: number }
export interface Size { width: number, height: number }
export interface Rect extends Size { x: number, y: number }

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

export function portraitObjectPosition(focus: PortraitFocus): string {
  return `${clamp(focus.x, 0, 100)}% ${clamp(focus.y, 0, 100)}%`
}

export function calculateCoverPlacement(source: Size, focus: PortraitFocus, target: Rect) {
  const scale = Math.max(target.width / source.width, target.height / source.height)
  const width = source.width * scale
  const height = source.height * scale
  const desiredX = target.x + target.width / 2 - width * clamp(focus.x, 0, 100) / 100
  const desiredY = target.y + target.height / 2 - height * clamp(focus.y, 0, 100) / 100
  return {
    x: clamp(desiredX, target.x + target.width - width, target.x),
    y: clamp(desiredY, target.y + target.height - height, target.y),
    width,
    height,
    scale,
  }
}
