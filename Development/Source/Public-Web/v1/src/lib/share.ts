export interface ShareCardInput {
  title: string
  prompt: string
  blessing: string
  image: string
}

const wrap = (context: CanvasRenderingContext2D, text: string, width: number) => {
  const lines: string[] = []
  for (const paragraph of text.split('\n')) {
    let line = ''
    for (const character of paragraph) {
      const candidate = line + character
      if (context.measureText(candidate).width > width && line) {
        lines.push(line)
        line = character
      } else line = candidate
    }
    if (line) lines.push(line)
  }
  return lines
}

const loadImage = (source: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image()
  image.onload = () => resolve(image)
  image.onerror = reject
  image.src = source
})

export async function createCardPng(input: ShareCardInput): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 1600
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable')

  context.fillStyle = '#071824'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = '#d7ad56'
  context.lineWidth = 8
  context.strokeRect(48, 48, 1104, 1504)
  context.fillStyle = '#ead8ae'
  context.font = '700 72px serif'
  context.fillText(input.title, 92, 142)

  try {
    const image = await loadImage(input.image)
    const scale = Math.max(1016 / image.width, 760 / image.height)
    const width = image.width * scale
    const height = image.height * scale
    context.save()
    context.beginPath()
    context.rect(92, 190, 1016, 760)
    context.clip()
    context.drawImage(image, 92 + (1016 - width) / 2, 190 + (760 - height) / 2, width, height)
    context.restore()
  } catch {
    context.fillStyle = '#102b3c'
    context.fillRect(92, 190, 1016, 760)
  }

  context.fillStyle = '#f1e2bd'
  context.font = '46px serif'
  wrap(context, input.prompt, 1016).slice(0, 5).forEach((line, index) => context.fillText(line, 92, 1035 + index * 62))
  context.fillStyle = '#d7ad56'
  context.font = '34px serif'
  wrap(context, input.blessing, 1016).slice(0, 3).forEach((line, index) => context.fillText(line, 92, 1380 + index * 48))
  context.font = '24px sans-serif'
  context.fillText('TRUTH AND DARE · ENCOUNTER CARDS · V1', 92, 1510)

  return await new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('PNG generation failed')), 'image/png'))
}

export async function shareEncounterCard(input: ShareCardInput) {
  const blob = await createCardPng(input)
  const file = new File([blob], 'truth-and-dare-card.png', {type: 'image/png'})
  if (navigator.share && navigator.canShare?.({files: [file]})) {
    await navigator.share({title: input.title, text: input.prompt, files: [file]})
    return 'shared' as const
  }
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = file.name
  link.click()
  URL.revokeObjectURL(url)
  return 'downloaded' as const
}
