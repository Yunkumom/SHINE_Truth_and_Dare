import type { Language } from '../types'
import { deliverCardFile } from './share'

export interface DirectKeepsakeInput {
  imageSrc: string
  imageName: string
  blessing: string
  language: Language
}

export const DIRECT_KEEPSAKE_CANVAS = { width: 1260, height: 1760 } as const

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Keepsake image could not be loaded'))
    image.src = src
  })
}

function drawImageContain(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight)
  const drawWidth = image.naturalWidth * scale
  const drawHeight = image.naturalHeight * scale
  context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight)
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

  const background = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  background.addColorStop(0, '#f8e8ca')
  background.addColorStop(.6, '#ddb882')
  background.addColorStop(1, '#7a3f33')
  context.fillStyle = background
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#fff7e8'
  context.fillRect(44, 44, 1172, 1672)
  context.strokeStyle = '#9a6b3e'
  context.lineWidth = 8
  context.strokeRect(44, 44, 1172, 1672)

  context.fillStyle = '#3d281c'
  context.font = '700 54px serif'
  context.fillText('相遇紀念卡', 92, 132)
  context.fillStyle = '#9a6b3e'
  context.font = '600 22px Georgia, serif'
  context.fillText('A MOMENT WORTH KEEPING · V39', 94, 173)
  context.textAlign = 'right'
  context.font = '700 46px serif'
  context.fillText('✦', 1164, 142)
  context.textAlign = 'left'

  context.fillStyle = '#112632'
  context.fillRect(88, 218, 1084, 1010)
  drawImageContain(context, image, 88, 218, 1084, 1010)
  context.strokeStyle = '#9a6b3e'
  context.lineWidth = 6
  context.strokeRect(88, 218, 1084, 1010)

  context.fillStyle = '#f3dfba'
  context.fillRect(88, 1246, 1084, 382)
  context.fillStyle = '#8a3f35'
  context.font = '700 24px system-ui'
  context.fillText('給這次相遇的祝福 · BLESSING', 130, 1300)
  context.fillStyle = '#2d2018'
  context.font = '600 42px serif'
  let y = 1370
  for (const line of wrapKeepsakeText(context, input.blessing, 994).slice(0, 5)) {
    context.fillText(line, 130, y)
    y += 62
  }
  context.fillStyle = '#725339'
  context.font = '500 21px system-ui'
  context.fillText(input.imageName, 130, 1668)

  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('PNG creation failed')), 'image/png'))
  return new File([blob], `keepsake-card-V39-${Date.now()}.png`, { type: 'image/png' })
}

export async function downloadDirectKeepsake(input: DirectKeepsakeInput) {
  return deliverCardFile(await createDirectKeepsakePng(input))
}
