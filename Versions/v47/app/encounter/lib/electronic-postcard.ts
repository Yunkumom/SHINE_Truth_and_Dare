import type { Language } from '../types'

export const POSTCARD_CANVAS = { width: 1800, height: 1200 } as const

export interface ElectronicPostcardInput {
  cardId: string
  imageSrc: string
  logoSrc: string
  title: string
  subtitle: string
  recipient: string
  message: string
  sender: string
  language: Language
}

export interface ElectronicPostcardFiles {
  front: File
  back: File
}

interface ShareTarget {
  share?: (data: ShareData) => Promise<void>
  canShare?: (data?: ShareData) => boolean
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Postcard image could not be loaded: ${src}`))
    image.src = src
  })
}

function createCanvas() {
  const canvas = document.createElement('canvas')
  canvas.width = POSTCARD_CANVAS.width
  canvas.height = POSTCARD_CANVAS.height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable')
  return { canvas, context }
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
    const candidate = line + character
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line.trimEnd())
      line = character.trimStart()
    } else line = candidate
  }
  if (line) lines.push(line)
  return lines
}

function drawWrappedText(context: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines = 8) {
  const lines = wrapText(context, text, maxWidth).slice(0, maxLines)
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight))
}

function drawRoundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2)
  context.beginPath()
  context.moveTo(x + r, y)
  context.arcTo(x + width, y, x + width, y + height, r)
  context.arcTo(x + width, y + height, x, y + height, r)
  context.arcTo(x, y + height, x, y, r)
  context.arcTo(x, y, x + width, y, r)
  context.closePath()
}

async function canvasFile(canvas: HTMLCanvasElement, fileName: string) {
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('Postcard PNG creation failed')), 'image/png'))
  return new File([blob], fileName, { type: 'image/png' })
}

function safeCardId(cardId: string) {
  return cardId.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '') || 'memory'
}

async function createFront(input: ElectronicPostcardInput, artwork: HTMLImageElement, logo: HTMLImageElement) {
  const { canvas, context } = createCanvas()
  const paper = context.createLinearGradient(0, 0, POSTCARD_CANVAS.width, POSTCARD_CANVAS.height)
  paper.addColorStop(0, '#f8edd5')
  paper.addColorStop(1, '#dfc28f')
  context.fillStyle = paper
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = '#173f3b'
  drawRoundedRect(context, 55, 55, 1110, 1090, 30)
  context.fill()
  context.save()
  drawRoundedRect(context, 75, 75, 1070, 1050, 22)
  context.clip()
  context.fillStyle = '#e9dcc0'
  context.fillRect(75, 75, 1070, 1050)
  drawImageContain(context, artwork, 75, 75, 1070, 1050)
  context.restore()

  context.fillStyle = '#a94f35'
  context.font = '800 24px system-ui, sans-serif'
  context.fillText('A MOMENT FROM AUSTRALIA', 1240, 160)
  context.fillStyle = '#173f3b'
  context.font = '700 62px Georgia, serif'
  drawWrappedText(context, input.title, 1240, 250, 485, 72, 4)
  context.strokeStyle = '#b88749'
  context.lineWidth = 4
  context.beginPath()
  context.moveTo(1240, 565)
  context.lineTo(1710, 565)
  context.stroke()
  context.fillStyle = '#556863'
  context.font = '500 31px system-ui, sans-serif'
  drawWrappedText(context, input.subtitle, 1240, 635, 485, 43, 6)
  drawImageContain(context, logo, 1375, 865, 250, 250)
  return canvas
}

async function createBack(input: ElectronicPostcardInput, logo: HTMLImageElement) {
  const { canvas, context } = createCanvas()
  context.fillStyle = '#f7efd9'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = '#b98c55'
  context.lineWidth = 8
  context.strokeRect(36, 36, canvas.width - 72, canvas.height - 72)

  context.fillStyle = '#173f3b'
  context.font = '800 28px system-ui, sans-serif'
  context.fillText('A MEMORY MADE TO SHARE · 一份可以送出的回憶', 110, 125)
  context.strokeStyle = '#b98c55'
  context.lineWidth = 3
  context.beginPath()
  context.moveTo(930, 145)
  context.lineTo(930, 1060)
  context.stroke()

  context.fillStyle = '#a94f35'
  context.font = '800 24px system-ui, sans-serif'
  context.fillText('想送出去的話 · MESSAGE', 110, 230)
  context.fillStyle = '#253c38'
  context.font = '500 38px Georgia, serif'
  drawWrappedText(context, input.message || '謝謝你陪我一起找到這張卡的秘密。 · Thanks for sharing this little discovery with me.', 110, 310, 700, 56, 10)
  context.font = '600 30px system-ui, sans-serif'
  context.fillText(`寄件人 · FROM  ${input.sender || 'Yunkumom Friend'}`, 110, 985)

  context.strokeStyle = '#a94f35'
  context.lineWidth = 4
  context.strokeRect(1490, 105, 190, 230)
  context.fillStyle = '#a94f35'
  context.font = '800 22px system-ui, sans-serif'
  context.fillText('STAMP', 1545, 225)
  drawImageContain(context, logo, 1040, 120, 260, 260)

  context.fillStyle = '#173f3b'
  context.font = '800 26px system-ui, sans-serif'
  context.fillText('收件人 · TO', 1040, 470)
  context.font = '600 38px Georgia, serif'
  context.fillText(input.recipient || 'Someone special', 1040, 535)
  context.strokeStyle = '#9e8a67'
  context.lineWidth = 3
  for (let index = 0; index < 4; index += 1) {
    const y = 625 + index * 105
    context.beginPath()
    context.moveTo(1040, y)
    context.lineTo(1670, y)
    context.stroke()
  }
  context.fillStyle = '#6a705f'
  context.font = '600 24px system-ui, sans-serif'
  context.fillText(input.title, 1040, 1085)
  return canvas
}

export async function createElectronicPostcardFiles(input: ElectronicPostcardInput): Promise<ElectronicPostcardFiles> {
  const [artwork, logo] = await Promise.all([loadImage(input.imageSrc), loadImage(input.logoSrc)])
  const [frontCanvas, backCanvas] = await Promise.all([createFront(input, artwork, logo), createBack(input, logo)])
  const safeId = safeCardId(input.cardId)
  const [front, back] = await Promise.all([
    canvasFile(frontCanvas, `yunkumom-postcard-${safeId}-front.png`),
    canvasFile(backCanvas, `yunkumom-postcard-${safeId}-back.png`),
  ])
  return { front, back }
}

function downloadFiles(files: File[]) {
  files.forEach(file => {
    const url = URL.createObjectURL(file)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = file.name
    anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  })
}

export async function deliverElectronicPostcard({ front, back }: ElectronicPostcardFiles, target: ShareTarget = navigator): Promise<'shared' | 'downloaded' | 'cancelled'> {
  if (target.share && (!target.canShare || target.canShare({ files: [front, back] }))) {
    try {
      await target.share({ files: [front, back], title: 'Yunkumom · Electronic Postcard' })
      return 'shared'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled'
    }
  }
  downloadFiles([front, back])
  return 'downloaded'
}
