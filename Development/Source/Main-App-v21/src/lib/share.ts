import type { EncounterComposition, Language } from '../types'
import { CARD_EXPORT_LAYOUT } from './deity-art'

export function localizedLines(composition: EncounterComposition, language: Language) {
  const question = language === 'zh' ? [composition.card.zh] : language === 'en' ? [composition.card.en] : [composition.card.zh, composition.card.en]
  const blessing = language === 'zh' ? [composition.blessing.zh] : language === 'en' ? [composition.blessing.en] : [composition.blessing.zh, composition.blessing.en]
  return { question, blessing }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Artwork could not be loaded: ${src}`))
    image.src = src
  })
}

function drawImageCover(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
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

function drawPanelText(context: CanvasRenderingContext2D, paragraphs: string[], x: number, y: number, width: number, font: string, lineHeight: number) {
  context.font = font
  let cursorY = y
  for (const paragraph of paragraphs) {
    for (const line of wrapText(context, paragraph, width)) { context.fillText(line, x, cursorY); cursorY += lineHeight }
    cursorY += 10
  }
}

export async function createCardPng(composition: EncounterComposition, language: Language): Promise<File> {
  const { card, artwork } = composition
  const image = await loadImage(artwork.src)
  const canvas = document.createElement('canvas')
  canvas.width = 1080; canvas.height = 1620
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable')

  const background = context.createLinearGradient(0, 0, 1080, 1620)
  background.addColorStop(0, '#dba867'); background.addColorStop(1, '#7d3f31')
  context.fillStyle = background; context.fillRect(0, 0, 1080, 1620)
  context.strokeStyle = '#3f2418'; context.lineWidth = 10; context.strokeRect(20, 20, 1040, 1580)

  context.fillStyle = '#f1d8a5'; context.fillRect(CARD_EXPORT_LAYOUT.header.x, CARD_EXPORT_LAYOUT.header.y, CARD_EXPORT_LAYOUT.header.width, CARD_EXPORT_LAYOUT.header.height)
  context.fillStyle = '#7f5938'; context.font = '500 23px system-ui'; context.fillText('相遇之神 · ENCOUNTER DEITY', 76, 77)
  context.fillStyle = '#171411'; context.font = '700 62px serif'; context.fillText(artwork.zhName, 74, 144)
  context.textAlign = 'right'; context.fillStyle = '#7b4b2c'; context.font = '600 25px system-ui'; context.fillText(artwork.enName, 1002, 137); context.textAlign = 'left'

  context.fillStyle = '#07151d'; context.fillRect(CARD_EXPORT_LAYOUT.art.x, CARD_EXPORT_LAYOUT.art.y, CARD_EXPORT_LAYOUT.art.width, CARD_EXPORT_LAYOUT.art.height)
  drawImageCover(context, image, CARD_EXPORT_LAYOUT.art.x, CARD_EXPORT_LAYOUT.art.y, CARD_EXPORT_LAYOUT.art.width, CARD_EXPORT_LAYOUT.art.height)
  context.strokeStyle = '#3c261b'; context.lineWidth = 8; context.strokeRect(CARD_EXPORT_LAYOUT.art.x, CARD_EXPORT_LAYOUT.art.y, CARD_EXPORT_LAYOUT.art.width, CARD_EXPORT_LAYOUT.art.height)

  const lines = localizedLines(composition, language)
  const question = CARD_EXPORT_LAYOUT.question
  context.fillStyle = '#f5e4c2'; context.fillRect(question.x, question.y, question.width, question.height)
  context.fillStyle = '#241a15'; context.font = '700 30px system-ui'; context.fillText('真正的你 · THE REAL YOU', question.x + 38, question.y + 48)
  context.textAlign = 'right'; context.fillStyle = '#8d4d32'; context.font = '600 21px system-ui'; context.fillText(`LEVEL ${card.level} · ${card.mode.toUpperCase()} · V21`, question.x + question.width - 38, question.y + 48); context.textAlign = 'left'
  context.strokeStyle = '#b58a55'; context.lineWidth = 2; context.beginPath(); context.moveTo(question.x + 38, question.y + 67); context.lineTo(question.x + question.width - 38, question.y + 67); context.stroke()
  context.fillStyle = '#201816'
  drawPanelText(context, lines.question, question.x + 38, question.y + 114, question.width - 76, '600 39px serif', 48)

  const blessing = CARD_EXPORT_LAYOUT.blessing
  context.fillStyle = '#efe0bd'; context.fillRect(blessing.x, blessing.y, blessing.width, blessing.height)
  context.fillStyle = '#9a4a3b'; context.font = '700 22px system-ui'; context.fillText('給這次相遇的祝福 · BLESSING', blessing.x + 38, blessing.y + 39)
  context.fillStyle = '#291c16'
  drawPanelText(context, lines.blessing, blessing.x + 38, blessing.y + 84, blessing.width - 76, '600 30px serif', 38)

  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('PNG creation failed')), 'image/png'))
  return new File([blob], `encounter-card-v21-${card.id}-${artwork.id}.png`, { type: 'image/png' })
}

interface ShareTarget {
  share?: (data: ShareData) => Promise<void>
  canShare?: (data?: ShareData) => boolean
}

export async function deliverCardFile(file: File, target: ShareTarget = navigator): Promise<'shared' | 'downloaded' | 'cancelled'> {
  if (target.share && (!target.canShare || target.canShare({ files: [file] }))) {
    try { await target.share({ files: [file], title: 'Encounter Cards v21' }); return 'shared' }
    catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled' }
  }
  const url = URL.createObjectURL(file)
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = file.name; anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  return 'downloaded'
}

export async function shareOrDownload(composition: EncounterComposition, language: Language): Promise<'shared' | 'downloaded' | 'cancelled'> {
  return deliverCardFile(await createCardPng(composition, language))
}
