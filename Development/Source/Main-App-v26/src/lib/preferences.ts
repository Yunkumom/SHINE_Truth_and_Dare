import type { Language } from '../types'

const LANGUAGE_KEY = 'encounter-language'
const FONT_KEY = 'encounter-font-scale'

export function loadLanguage(): Language {
  const value = localStorage.getItem(LANGUAGE_KEY)
  return value === 'en' || value === 'bilingual' ? value : 'zh'
}
export function saveLanguage(value: Language) { localStorage.setItem(LANGUAGE_KEY, value) }
export function loadFontScale() { return Number(localStorage.getItem(FONT_KEY)) || 1 }
export function saveFontScale(value: number) { localStorage.setItem(FONT_KEY, String(value)) }
