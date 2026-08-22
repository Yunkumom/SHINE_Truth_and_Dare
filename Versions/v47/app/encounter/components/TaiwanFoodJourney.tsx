import { useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { TAIWAN_FOOD_ART } from '../data/taiwan-food-art'
import { TAIWAN_FOOD_CARDS, TAIWAN_FOOD_PROMPTS, TAIWAN_FOOD_REGIONS } from '../data/taiwan-food-cards'
import type { Language, LocalizedFoodText, TaiwanFoodCard, TaiwanFoodRegion } from '../types'

interface TaiwanFoodJourneyProps {
  language: Language
  onBack: () => void
}

type RegionChoice = TaiwanFoodRegion | 'all'

const regionOrder: TaiwanFoodRegion[] = ['north', 'central', 'south', 'east', 'offshore']
const allergenLabels: Record<string, { zh: string, en: string }> = {
  alcohol: { zh: '酒精入菜', en: 'alcohol' },
  beef: { zh: '牛肉', en: 'beef' },
  caffeine: { zh: '咖啡因', en: 'caffeine' },
  duck: { zh: '鴨肉', en: 'duck' },
  egg: { zh: '蛋', en: 'egg' },
  fish: { zh: '魚類', en: 'fish' },
  gluten: { zh: '麩質', en: 'gluten' },
  milk: { zh: '乳製品', en: 'milk' },
  peanut: { zh: '花生', en: 'peanut' },
  pork: { zh: '豬肉', en: 'pork' },
  'possible-shellfish': { zh: '可能含甲殼類', en: 'possible shellfish' },
  sesame: { zh: '芝麻', en: 'sesame' },
  soy: { zh: '大豆', en: 'soy' },
  varies: { zh: '依配方而異', en: 'varies by recipe' },
}

function localize(value: LocalizedFoodText, language: Language) {
  if (language === 'zh') return value.zh
  if (language === 'en') return value.en
  return `${value.zh} · ${value.en}`
}

function localizeList(value: { zh: string[], en: string[] }, language: Language) {
  if (language === 'zh') return value.zh
  if (language === 'en') return value.en
  return value.zh.map((item, index) => `${item} · ${value.en[index]}`)
}

function allergenText(id: string, language: Language) {
  const value = allergenLabels[id] ?? { zh: id, en: id }
  return localize(value, language)
}

function faceLabel(card: TaiwanFoodCard, flipped: boolean, language: Language) {
  if (language === 'en') return `${flipped ? 'Back' : 'Front'} of ${card.name.en}`
  return `${card.name.zh}${flipped ? '背面' : '正面'}`
}

function artworkAlt(card: TaiwanFoodCard, language: Language) {
  if (language === 'en') return `Watercolor travel-journal illustration of ${card.name.en}`
  if (language === 'zh') return `${card.name.zh}水彩旅行誌插畫`
  return `${card.name.zh}水彩旅行誌插畫 · Watercolor travel-journal illustration of ${card.name.en}`
}

export default function TaiwanFoodJourney({ language, onBack }: TaiwanFoodJourneyProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionChoice>('all')
  const [drawnIds, setDrawnIds] = useState<string[]>([TAIWAN_FOOD_CARDS[0].id])
  const [currentId, setCurrentId] = useState(TAIWAN_FOOD_CARDS[0].id)
  const [flipped, setFlipped] = useState(false)
  const [spicyEnabled, setSpicyEnabled] = useState(false)

  const eligibleCards = useMemo(() => selectedRegion === 'all'
    ? TAIWAN_FOOD_CARDS
    : TAIWAN_FOOD_CARDS.filter(card => card.region === selectedRegion), [selectedRegion])
  const current = TAIWAN_FOOD_CARDS.find(card => card.id === currentId) ?? eligibleCards[0]
  const prompt = TAIWAN_FOOD_PROMPTS[current.promptType]
  const region = TAIWAN_FOOD_REGIONS[current.region]

  function chooseRegion(nextRegion: RegionChoice) {
    const nextCards = nextRegion === 'all' ? TAIWAN_FOOD_CARDS : TAIWAN_FOOD_CARDS.filter(card => card.region === nextRegion)
    setSelectedRegion(nextRegion)
    setCurrentId(nextCards[0].id)
    setDrawnIds([nextCards[0].id])
    setFlipped(false)
  }

  function drawNext() {
    let remaining = eligibleCards.filter(card => !drawnIds.includes(card.id))
    let nextCycle = drawnIds
    if (remaining.length === 0) {
      remaining = eligibleCards.filter(card => card.id !== current.id)
      if (remaining.length === 0) remaining = [...eligibleCards]
      nextCycle = []
    }
    const next = remaining[Math.floor(Math.random() * remaining.length)]
    setCurrentId(next.id)
    setDrawnIds([...nextCycle, next.id])
    setFlipped(false)
  }

  function toggleCardFace() { setFlipped(value => !value) }
  function handleCardKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    toggleCardFace()
  }

  const title = language === 'en' ? 'Taiwan Food Journey' : language === 'zh' ? '台灣美食旅行' : '台灣美食旅行 · Taiwan Food Journey'
  const allRegions = language === 'en' ? 'All regions' : language === 'zh' ? '全部地區' : '全部地區 · All regions'

  return <section className="food-journey-canvas" aria-label={title}>
    <header className="food-journey-header">
      <button type="button" className="food-journey-back" onClick={onBack} aria-label="返回模式選擇 · Back to modes">←</button>
      <div><small>TAIWAN TABLE ATLAS · 01</small><h1>{title}</h1></div>
      <button type="button" className="food-print-button" onClick={() => window.print()} aria-label="列印 25 張卡 · Print 25 cards">⌁<span>{language === 'en' ? 'Print' : '列印'}</span></button>
    </header>

    <div className="food-journey-toolbar">
      <div className="food-region-filter" role="group" aria-label="地區篩選 · Region filter">
        <button type="button" aria-pressed={selectedRegion === 'all'} onClick={() => chooseRegion('all')}>{allRegions}</button>
        {regionOrder.map(id => <button type="button" key={id} data-region={id} aria-pressed={selectedRegion === id} onClick={() => chooseRegion(id)}>{language === 'en' ? TAIWAN_FOOD_REGIONS[id].en : TAIWAN_FOOD_REGIONS[id].zh}</button>)}
      </div>
      <label className="food-spicy-consent">
        <input type="checkbox" checked={spicyEnabled} onChange={event => setSpicyEnabled(event.target.checked)} />
        <span aria-hidden="true">🌶</span>
        <b>{language === 'en' ? 'Spicy prompts' : '辛辣題目'}</b>
        <small>{language === 'en' ? 'Enable only with group consent' : '僅在全員同意後啟用'}</small>
      </label>
    </div>

    <div className="food-card-stage" data-region={current.region}>
      <div className={`food-card-shell${flipped ? ' is-flipped' : ''}`}>
        <div role="button" tabIndex={0} className="food-card-flip" aria-label={faceLabel(current, flipped, language)} aria-pressed={flipped} onClick={toggleCardFace} onKeyDown={handleCardKeyDown}>
          <article className="food-card-face food-card-front" aria-hidden={flipped}>
            <div className="food-card-art">
              <img src={TAIWAN_FOOD_ART[current.id]} alt={artworkAlt(current, language)} draggable="false" />
              <span className="food-region-ribbon">{region.zh} · {region.en}</span>
            </div>
            <div className="food-card-front-copy">
              <div className="food-card-kicker"><span>{String(current.number).padStart(2, '0')} / 25</span><span>{current.classic ? '經典 · CLASSIC' : '私房味 · LOCAL FIND'}</span></div>
              <h2 lang={language === 'en' ? 'en' : 'zh-Hant'}>{language === 'en' ? current.name.en : current.name.zh}</h2>
              {language === 'bilingual' && <p lang="en">{current.name.en}</p>}
              <div className="food-place-line"><span aria-hidden="true">⌖</span>{localize(current.place, language)}</div>
              <ul className="food-flavor-list" aria-label="風味 · Flavors">{localizeList(current.flavors, language).map(item => <li key={item}>{item}</li>)}</ul>
              <p className="food-flip-hint">{language === 'en' ? 'Tap to turn over' : '翻到背面 · Tap to turn over'} <span aria-hidden="true">↻</span></p>
            </div>
          </article>

          <article className="food-card-face food-card-back" aria-hidden={!flipped}>
            <div className="food-card-back-heading"><span>{region.stamp}-{String(current.number).padStart(2, '0')}</span><div><small>{localize(current.place, language)}</small><h2>{localize(current.name, language)}</h2></div></div>
            <p className="food-card-note">{localize(current.note, language)}</p>
            <div className="food-prompt-panel">
              <span className="food-prompt-type" data-prompt={current.promptType}><i aria-hidden="true">{prompt.icon}</i>{language === 'en' ? prompt.en : language === 'zh' ? prompt.zh : `${prompt.zh} · ${prompt.en}`}</span>
              <p>{localize(current.prompt, language)}</p>
            </div>
            {spicyEnabled && <div className="food-spicy-panel"><b>🌶 {language === 'en' ? 'Optional spicy' : '可選辛辣題'}</b><p>{localize(current.spicy, language)}</p></div>}
            <div className="food-allergen-line"><b>{language === 'en' ? 'Check ingredients' : '成分提醒'}</b><span>{current.allergens.length ? current.allergens.map(id => allergenText(id, language)).join(' · ') : language === 'en' ? 'No common allergen listed; verify the recipe.' : '未列常見過敏原，仍請確認實際配方。'}</span></div>
            <p className="food-skip-note">✓ {language === 'en' ? 'Skip without penalty · Tap to return' : '跳過不受罰 · 點擊回到正面'}</p>
          </article>
        </div>
      </div>
    </div>

    <footer className="food-journey-actions">
      <button type="button" className="food-flip-control" aria-pressed={flipped} onClick={toggleCardFace}>{flipped ? (language === 'en' ? 'Show front' : '回到正面') : (language === 'en' ? 'Turn card over' : '翻到背面')}<span aria-hidden="true">↻</span></button>
      <button type="button" className="food-next-control" onClick={drawNext}>{language === 'en' ? 'Next food' : '下一道美食'}<span aria-hidden="true">→</span></button>
    </footer>

    <section className="print-only-food-deck" aria-hidden="true">
      {TAIWAN_FOOD_CARDS.map(card => <div className="food-print-pair" data-region={card.region} key={card.id}>
        <article className="food-print-card food-print-front">
          <img src={TAIWAN_FOOD_ART[card.id]} alt="" />
          <span>{TAIWAN_FOOD_REGIONS[card.region].zh} · {TAIWAN_FOOD_REGIONS[card.region].en}</span>
          <h2>{card.name.zh}</h2><h3>{card.name.en}</h3><p>{card.place.zh} · {card.place.en}</p><small>{String(card.number).padStart(2, '0')} / 25</small>
        </article>
        <article className="food-print-card food-print-back">
          <header><span>{TAIWAN_FOOD_PROMPTS[card.promptType].icon}</span><b>{TAIWAN_FOOD_PROMPTS[card.promptType].zh} · {TAIWAN_FOOD_PROMPTS[card.promptType].en}</b></header>
          <h2>{card.name.zh} · {card.name.en}</h2><p>{card.note.zh}</p><p lang="en">{card.note.en}</p>
          <blockquote>{card.prompt.zh}<br /><span lang="en">{card.prompt.en}</span></blockquote>
          <aside><b>🌶 OPTIONAL</b> {card.spicy.zh} <span lang="en">{card.spicy.en}</span></aside>
          <small>✓ 可跳過 · SKIP WITHOUT PENALTY</small>
        </article>
      </div>)}
    </section>
  </section>
}
