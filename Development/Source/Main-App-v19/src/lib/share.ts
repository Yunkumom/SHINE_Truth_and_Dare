import type { Card, Language } from '../types'
import { CARD_EXPORT_LAYOUT, deityForCard } from './deity-art'

function cardLines(card: Card, language: Language) {
  return language === 'zh' ? [card.zh] : language === 'en' ? [card.en] : [card.zh, card.en]
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Artwork could not be loaded: ${src}`))
    image.src = src
  })
}

function drawImageContain(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight)
  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale
  context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight)
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = []
  let line = ''
  for (const character of [...text]) {
    const next = line + character
    if (line && context.measureText(next).width > maxWidth) { lines.push(line); line = character }
    else line = next
  }
  if (line) lines.push(line)
  return lines
}

export async function createCardPng(card: Card, language: Language): Promise<File> {
  const artwork = deityForCard(card.id)
  const image = await loadImage(artwork.src)
  const canvas = document.createElement('canvas')
  canvas.width = 1080; canvas.height = 1620
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable')

  const background = context.createLinearGradient(0, 0, 1080, 1620)
  background.addColorStop(0, '#e6bd7c'); background.addColorStop(1, '#8d4d32')
  context.fillStyle = background; context.fillRect(0, 0, 1080, 1620)
  context.fillStyle = '#f4dfb6'; context.fillRect(CARD_EXPORT_LAYOUT.header.x, CARD_EXPORT_LAYOUT.header.y, CARD_EXPORT_LAYOUT.header.width, CARD_EXPORT_LAYOUT.header.height)
  context.fillStyle = '#141517'; context.font = '700 62px serif'; context.fillText(artwork.zhName, 74, 136)
  context.fillStyle = '#8d4d32'; context.font = '500 25px system-ui'; context.fillText('相遇之神 · ENCOUNTER DEITY', 76, 76)
  context.textAlign = 'right'; context.fillStyle = '#7b4b2c'; context.font = '600 26px system-ui'; context.fillText(artwork.enName, 1004, 126); context.textAlign = 'left'

  context.fillStyle = '#07151d'; context.fillRect(CARD_EXPORT_LAYOUT.art.x, CARD_EXPORT_LAYOUT.art.y, CARD_EXPORT_LAYOUT.art.width, CARD_EXPORT_LAYOUT.art.height)
  drawImageContain(context, image, CARD_EXPORT_LAYOUT.art.x, CARD_EXPORT_LAYOUT.art.y, CARD_EXPORT_LAYOUT.art.width, CARD_EXPORT_LAYOUT.art.height)
  context.strokeStyle = '#3c261b'; context.lineWidth = 8; context.strokeRect(CARD_EXPORT_LAYOUT.art.x, CARD_EXPORT_LAYOUT.art.y, CARD_EXPORT_LAYOUT.art.width, CARD_EXPORT_LAYOUT.art.height)

  const panel = CARD_EXPORT_LAYOUT.question
  context.fillStyle = '#f7e7c5'; context.fillRect(panel.x, panel.y, panel.width, panel.height)
  context.fillStyle = '#241a15'; context.font = '700 31px system-ui'; context.fillText('真正的你 · THE REAL YOU', panel.x + 42, panel.y + 58)
  context.textAlign = 'right'; context.fillStyle = '#8d4d32'; context.font = '600 24px system-ui'; context.fillText(`LEVEL ${card.level} · ${card.mode.toUpperCase()} · V19`, panel.x + panel.width - 38, panel.y + 58); context.textAlign = 'left'
  context.strokeStyle = '#b58a55'; context.lineWidth = 2; context.beginPath(); context.moveTo(panel.x + 38, panel.y + 80); context.lineTo(panel.x + panel.width - 38, panel.y + 80); context.stroke()
  context.fillStyle = '#201816'; context.font = '600 44px serif'
  let cursorY = panel.y + 142
  for (const paragraph of cardLines(card, language)) {
    for (const line of wrapText(context, paragraph, panel.width - 84)) { context.fillText(line, panel.x + 42, cursorY); cursorY += 58 }
    cursorY += 18
  }
  context.fillStyle = '#9a4a3b'; context.font = '600 23px system-ui'; context.fillText('守護這次相遇 · KEEP THE ENCOUNTER', panel.x + 42, panel.y + panel.height - 35)

  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('PNG creation failed')), 'image/png'))
  return new File([blob], `encounter-card-v19-${card.id}.png`, { type: 'image/png' })
}

export async function shareOrDownload(card: Card, language: Language): Promise<'shared' | 'downloaded' | 'cancelled'> {
  const file = await createCardPng(card, language)
  if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
    try { await navigator.share({ files: [file], title: 'Encounter Cards v19' }); return 'shared' }
    catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled' }
  }
  const url = URL.createObjectURL(file)
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = file.name; anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  return 'downloaded'
}
