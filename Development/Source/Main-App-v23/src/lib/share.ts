import type { EncounterComposition, Language, ParticipantExchange } from '../types'
import { DEFAULT_LAYOUT } from '../layout/layout-model'
import type { LayoutDocument } from '../layout/layout-model'

export const KEEPSAKE_CANVAS = { width: 1260, height: 1760 } as const

export function getIncludedParticipants(participants: ParticipantExchange[]) {
  return participants.filter(participant => participant.include && Boolean(participant.name.trim() || participant.contact.trim()))
}

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

export async function createCardPng(composition: EncounterComposition, language: Language, participants: ParticipantExchange[] = [], layout: LayoutDocument = DEFAULT_LAYOUT): Promise<File> {
  const { card, artwork } = composition
  const image = await loadImage(artwork.src)
  const canvas = document.createElement('canvas')
  canvas.width = KEEPSAKE_CANVAS.width; canvas.height = KEEPSAKE_CANVAS.height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable')

  const background = context.createLinearGradient(0, 0, KEEPSAKE_CANVAS.width, KEEPSAKE_CANVAS.height)
  background.addColorStop(0, '#dba867'); background.addColorStop(1, '#7d3f31')
  context.fillStyle = background; context.fillRect(0, 0, KEEPSAKE_CANVAS.width, KEEPSAKE_CANVAS.height)
  context.strokeStyle = '#3f2418'; context.lineWidth = 12; context.strokeRect(22, 22, KEEPSAKE_CANVAS.width - 44, KEEPSAKE_CANVAS.height - 44)

  const source = layout.screens.keepsake
  const cardBlock = source.card
  const mapRect = (id: 'header' | 'artwork' | 'question' | 'blessing' | 'exchange') => {
    const value = source[id]
    return {
      x: (value.x - cardBlock.x) / cardBlock.width * KEEPSAKE_CANVAS.width,
      y: (value.y - cardBlock.y) / cardBlock.height * KEEPSAKE_CANVAS.height,
      width: value.width / cardBlock.width * KEEPSAKE_CANVAS.width,
      height: value.height / cardBlock.height * KEEPSAKE_CANVAS.height,
    }
  }
  const header = mapRect('header')
  const art = mapRect('artwork')
  const question = mapRect('question')
  const blessing = mapRect('blessing')
  const exchange = mapRect('exchange')

  context.fillStyle = '#f6dfad'; context.fillRect(header.x, header.y, header.width, header.height)
  context.fillStyle = '#7f5938'; context.font = '500 23px system-ui'; context.fillText('護行之卡 · ENCOUNTER DEITY', header.x + 42, header.y + 48)
  context.fillStyle = '#171411'; context.font = '700 62px serif'; context.fillText(artwork.zhName, header.x + 42, header.y + 120)
  context.textAlign = 'right'; context.fillStyle = '#8f2f28'; context.font = '600 27px system-ui'; context.fillText('✦', header.x + header.width - 48, header.y + 88); context.textAlign = 'left'

  context.fillStyle = '#07151d'; context.fillRect(art.x, art.y, art.width, art.height)
  drawImageCover(context, image, art.x, art.y, art.width, art.height)
  context.strokeStyle = '#8c5a1f'; context.lineWidth = 8; context.strokeRect(art.x, art.y, art.width, art.height)

  const lines = localizedLines(composition, language)
  context.fillStyle = '#f5e4c2'; context.fillRect(question.x, question.y, question.width, question.height)
  context.fillStyle = '#241a15'; context.font = '700 28px system-ui'; context.fillText('⌖ 想去的地方 · THE REAL YOU', question.x + 38, question.y + 43)
  context.textAlign = 'right'; context.fillStyle = '#8d4d32'; context.font = '600 20px system-ui'; context.fillText(`L${card.level} · ${card.mode.toUpperCase()} · V23`, question.x + question.width - 38, question.y + 43); context.textAlign = 'left'
  context.strokeStyle = '#b58a55'; context.lineWidth = 2; context.beginPath(); context.moveTo(question.x + 38, question.y + 67); context.lineTo(question.x + question.width - 38, question.y + 67); context.stroke()
  context.fillStyle = '#201816'
  drawPanelText(context, lines.question, question.x + 38, question.y + 103, question.width - 76, '600 37px serif', 46)

  context.fillStyle = '#efe0bd'; context.fillRect(blessing.x, blessing.y, blessing.width, blessing.height)
  context.fillStyle = '#9a4a3b'; context.font = '700 20px system-ui'; context.fillText('給這次相遇的祝福 · BLESSING', blessing.x + 38, blessing.y + 31)
  context.fillStyle = '#291c16'
  drawPanelText(context, lines.blessing, blessing.x + 360, blessing.y + 31, blessing.width - 398, '600 23px serif', 30)

  const included = getIncludedParticipants(participants)
  context.fillStyle = '#f6e3bd'; context.fillRect(exchange.x, exchange.y, exchange.width, exchange.height)
  if (included.length) {
    context.fillStyle = '#8f2f28'; context.font = '700 21px system-ui'; context.fillText('聯絡資訊 · CONTACT EXCHANGE', exchange.x + 38, exchange.y + 30)
    context.fillStyle = '#241a15'; context.font = '600 24px system-ui'
    included.forEach((participant, index) => context.fillText(`● ${participant.name || (participant.role === 'self' ? 'You' : 'Guest')}   ${participant.contact}`, exchange.x + 38, exchange.y + 66 + index * 38))
  }

  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('PNG creation failed')), 'image/png'))
  return new File([blob], `encounter-card-v23-${card.id}-${artwork.id}.png`, { type: 'image/png' })
}

interface ShareTarget {
  share?: (data: ShareData) => Promise<void>
  canShare?: (data?: ShareData) => boolean
}

export async function deliverCardFile(file: File, target: ShareTarget = navigator): Promise<'shared' | 'downloaded' | 'cancelled'> {
  if (target.share && (!target.canShare || target.canShare({ files: [file] }))) {
    try { await target.share({ files: [file], title: 'Encounter Cards v23' }); return 'shared' }
    catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled' }
  }
  const url = URL.createObjectURL(file)
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = file.name; anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  return 'downloaded'
}

export async function shareOrDownload(composition: EncounterComposition, language: Language, participants: ParticipantExchange[] = [], layout: LayoutDocument = DEFAULT_LAYOUT): Promise<'shared' | 'downloaded' | 'cancelled'> {
  return deliverCardFile(await createCardPng(composition, language, participants, layout))
}
