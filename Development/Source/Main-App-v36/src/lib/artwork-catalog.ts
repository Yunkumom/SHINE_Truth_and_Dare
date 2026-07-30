import { DEITY_ART } from './deity-art'
import { TAIWAN_ZODIAC_LOCAL_STORIES_ART } from './local-zodiac-art'
import { TAIWAN_ZODIAC_CLASSIC_ART } from './zodiac-art'

export const ALL_ARTWORKS = [...DEITY_ART, ...TAIWAN_ZODIAC_CLASSIC_ART, ...TAIWAN_ZODIAC_LOCAL_STORIES_ART] as const
