import type { Card, Language } from '../types'

function cardText(card: Card, language: Language) {
  return language === 'zh' ? card.zh : language === 'en' ? card.en : `${card.zh}\n${card.en}`
}

export async function createCardPng(card: Card, language: Language): Promise<File> {
  const canvas = document.createElement('canvas')
  canvas.width = 1080; canvas.height = 1350
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable')
  const gradient = context.createLinearGradient(0, 0, 1080, 1350)
  gradient.addColorStop(0, '#12344a'); gradient.addColorStop(1, '#071019')
  context.fillStyle = gradient; context.fillRect(0, 0, 1080, 1350)
  context.fillStyle = '#e6c98b'; context.font = '700 44px system-ui'; context.fillText('ENCOUNTER CARDS · V17', 80, 110)
  context.fillStyle = '#ffffff'; context.font = '600 56px system-ui'
  const lines = cardText(card, language).split('\n')
  lines.forEach((line, index) => context.fillText(line.slice(0, 30), 80, 470 + index * 100))
  context.font = '400 32px system-ui'; context.fillStyle = '#b9d5df'; context.fillText(`LEVEL ${card.level} · ${card.mode.toUpperCase()}`, 80, 1220)
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error('PNG creation failed')), 'image/png'))
  return new File([blob], `encounter-card-v17-${card.id}.png`, { type: 'image/png' })
}

export async function shareOrDownload(card: Card, language: Language): Promise<'shared' | 'downloaded' | 'cancelled'> {
  const file = await createCardPng(card, language)
  if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
    try { await navigator.share({ files: [file], title: 'Encounter Cards v17' }); return 'shared' }
    catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled' }
  }
  const url = URL.createObjectURL(file)
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = file.name; anchor.click()
  URL.revokeObjectURL(url)
  return 'downloaded'
}
