import type { Language } from '../types'
import { deliverCardFile } from './share'
import { calculateZoomedCoverPlacement } from './portrait-focus'
import type { ArtworkPresentation } from '../presentation/presentation-model'

export interface DirectKeepsakeInput {
  imageSrc: string
  imageName: string
  blessing: string
  language: Language
  adjustment: ArtworkPresentation
  focus: { x: number, y: number }
}

export const DIRECT_KEEPSAKE_CANVAS = { width: 1260, height: 1760 } as const
export const DIRECT_KEEPSAKE_LAYOUT = {
  borderWidth: 15,
  padding: 24,
  panelGap: 15,
  titleHeight: 145,
  blessingHeight: 230,
  panelRadius: 33,
} as const

interface CanvasRect { x: number, y: number, width: number, height: number }

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Keepsake image could not be loaded'))
    image.src = src
  })
}

export function resolveKeepsakeFocus(focus: { x: number, y: number }, adjustment: ArtworkPresentation) {
  return {
    x: Math.max(0, Math.min(100, focus.x + adjustment.offsetX)),
    y: Math.max(0, Math.min(100, focus.y + adjustment.offsetY)),
  }
}

function roundedRectPath(context: CanvasRenderingContext2D, rect: CanvasRect, radius: number) {
  const safeRadius = Math.min(radius, rect.width / 2, rect.height / 2)
  context.beginPath()
  context.moveTo(rect.x + safeRadius, rect.y)
  context.arcTo(rect.x + rect.width, rect.y, rect.x + rect.width, rect.y + rect.height, safeRadius)
  context.arcTo(rect.x + rect.width, rect.y + rect.height, rect.x, rect.y + rect.height, safeRadius)
  context.arcTo(rect.x, rect.y + rect.height, rect.x, rect.y, safeRadius)
  context.arcTo(rect.x, rect.y, rect.x + rect.width, rect.y, safeRadius)
  context.closePath()
}

function drawRoundedPanel(context: CanvasRenderingContext2D, rect: CanvasRect, fill: string, radius = DIRECT_KEEPSAKE_LAYOUT.panelRadius) {
  roundedRectPath(context, rect, radius)
  context.fillStyle = fill
  context.fill()
}

function drawImageCover(context: CanvasRenderingContext2D, image: HTMLImageElement, rect: CanvasRect, input: DirectKeepsakeInput) {
  const placement = calculateZoomedCoverPlacement(
    { width: image.naturalWidth, height: image.naturalHeight },
    resolveKeepsakeFocus(input.focus, input.adjustment),
    rect,
    input.adjustment.zoom,
  )
  context.save()
  roundedRectPath(context, rect, DIRECT_KEEPSAKE_LAYOUT.panelRadius)
  context.clip()
  context.drawImage(image, placement.x, placement.y, placement.width, placement.height)
  context.restore()
}

function fitKeepsakeTitle(context: Pick<CanvasRenderingContext2D, 'measureText'>, text: string, maxWidth: number) {
  if (context.measureText(text).width <= maxWidth) return text
  const characters = [...text]
  while (characters.length && context.measureText(`${characters.join('')}…`).width > maxWidth) characters.pop()
  return `${characters.join('')}…`
}

export function wrapKeepsakeText(context: Pick<CanvasRenderingContext2D, 'measureText'>, text: string, maxWidth: number) {
  const words = /\s/.test(text.trim()) ? text.trim().split(/\s+/) : [...text.trim()]
  const separator = /\s/.test(text.trim()) ? ' ' : ''
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line}${separator}${word}` : word
    if (line && context.measureText(candidate).width > maxWidth) { lines.push(line); line = word }
    else line = candidate
  }
  if (line) lines.push(line)
  return lines
}

export async function createDirectKeepsakePng(input: DirectKeepsakeInput): Promise<File> {
  const image = await loadImage(input.imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = DIRECT_KEEPSAKE_CANVAS.width
  canvas.height = DIRECT_KEEPSAKE_CANVAS.height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable')

  const { borderWidth, padding, panelGap, titleHeight, blessingHeight, panelRadius } = DIRECT_KEEPSAKE_LAYOUT
  const panelInset = borderWidth + padding
  const panelWidth = canvas.width - panelInset * 2
  const contentHeight = canvas.height - panelInset * 2
  const artworkHeight = contentHeight - titleHeight - blessingHeight - panelGap * 2
  const layout = {
    card: { x: borderWidth / 2, y: borderWidth / 2, width: canvas.width - borderWidth, height: canvas.height - borderWidth },
    title: { x: panelInset, y: panelInset, width: panelWidth, height: titleHeight },
    artwork: { x: panelInset, y: panelInset + titleHeight + panelGap, width: panelWidth, height: artworkHeight },
    blessing: { x: panelInset, y: panelInset + titleHeight + panelGap * 2 + artworkHeight, width: panelWidth, height: blessingHeight },
  }

  context.clearRect(0, 0, canvas.width, canvas.height)
  drawRoundedPanel(context, layout.card, '#efd6a5', 66)
  roundedRectPath(context, layout.card, 66)
  context.strokeStyle = '#9a633e'
  context.lineWidth = borderWidth
  context.stroke()

  drawRoundedPanel(context, layout.title, '#f8e7c5')
  context.fillStyle = '#3d281c'
  context.font = '800 45px serif'
  context.textBaseline = 'middle'
  context.fillText(fitKeepsakeTitle(context, input.imageName, panelWidth - 150), layout.title.x + 30, layout.title.y + layout.title.height / 2)
  context.textAlign = 'right'
  context.fillStyle = '#8e382e'
  context.font = '700 43px serif'
  context.fillText('✦', layout.title.x + layout.title.width - 30, layout.title.y + layout.title.height / 2)
  context.textAlign = 'left'
  context.textBaseline = 'alphabetic'

  drawRoundedPanel(context, layout.artwork, '#132a36')
  drawImageCover(context, image, layout.artwork, input)

  drawRoundedPanel(context, layout.blessing, '#f8e7c5', panelRadius)
  context.fillStyle = '#8a3f35'
  context.font = '800 21px system-ui'
  context.fillText('給今天的祝福 · BLESSING', layout.blessing.x + 27, layout.blessing.y + 46)
  context.fillStyle = '#2d2018'
  context.font = '700 42px serif'
  let blessingLines = wrapKeepsakeText(context, input.blessing, layout.blessing.width - 54)
  let blessingLineHeight = 55
  let y = layout.blessing.y + 105
  if (blessingLines.length > 3) {
    context.font = '700 36px serif'
    blessingLines = wrapKeepsakeText(context, input.blessing, layout.blessing.width - 54)
    blessingLineHeight = 40
    y = layout.blessing.y + 95
  }
  for (const line of blessingLines.slice(0, 4)) {
    context.fillText(line, layout.blessing.x + 27, y)
    y += blessingLineHeight
  }

  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('PNG creation failed')), 'image/png'))
  return new File([blob], `keepsake-card-V47-${Date.now()}.png`, { type: 'image/png' })
}

export async function downloadDirectKeepsake(input: DirectKeepsakeInput) {
  return deliverCardFile(await createDirectKeepsakePng(input))
}
