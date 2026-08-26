const modules = import.meta.glob('../assets/australia-find-it-v1/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export function australiaFindItArtwork(sourceKey: string) {
  const fileName = sourceKey.split('/').at(-1)
  const resolved = modules[`../assets/australia-find-it-v1/${fileName}`]
  if (!resolved) throw new Error(`Missing Australia Find It artwork: ${sourceKey}`)
  return resolved
}
