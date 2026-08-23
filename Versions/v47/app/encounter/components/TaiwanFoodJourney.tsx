import { useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { TAIWAN_FOOD_COMPOSITIONS } from '../data/taiwan-food-compositions'
import { TAIWAN_FOOD_PROMPTS } from '../data/taiwan-food-questions'
import { TAIWAN_FOOD_REGIONS } from '../data/taiwan-food-subjects'
import type { Language, LocalizedFoodText, TaiwanFoodCardComposition, TaiwanFoodRegion } from '../types'
import SurfaceMenu from './SurfaceMenu'
import type { SurfaceMenuNavigationProps } from './SurfaceMenu'

interface TaiwanFoodJourneyProps extends SurfaceMenuNavigationProps {
  language: Language
  onBack: () => void
}

type RegionChoice = TaiwanFoodRegion | 'all'
type FoodCardStage = 'back' | 'front' | 'open'

const regionOrder: TaiwanFoodRegion[] = ['north', 'central', 'south', 'east', 'offshore']
const nextCardStage: Record<FoodCardStage, FoodCardStage> = {
  back: 'front',
  front: 'open',
  open: 'back',
}
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

function allergenText(id: string, language: Language) {
  const value = allergenLabels[id] ?? { zh: id, en: id }
  return localize(value, language)
}

function stageLabel(card: TaiwanFoodCardComposition, stage: FoodCardStage, language: Language) {
  if (language === 'en') {
    if (stage === 'back') return `Utensil back of ${card.subject.name.en} card; reveal the dish`
    if (stage === 'front') return `Dish front of ${card.subject.name.en}; lift for its story and prompt`
    return `Open ${card.subject.name.en} card; close to the utensil back`
  }
  if (stage === 'back') return `${card.subject.name.zh}卡片餐具背面；翻開料理正面`
  if (stage === 'front') return `${card.subject.name.zh}料理正面；掀開美食介紹與題目`
  return `${card.subject.name.zh}介紹與題目已展開；收回餐具背面`
}

function artworkAlt(card: TaiwanFoodCardComposition, language: Language) {
  if (language === 'en') return `Watercolor travel-journal illustration of ${card.subject.name.en}`
  if (language === 'zh') return `${card.subject.name.zh}水彩旅行誌插畫`
  return `${card.subject.name.zh}水彩旅行誌插畫 · Watercolor travel-journal illustration of ${card.subject.name.en}`
}

function artworkPosition(card: TaiwanFoodCardComposition, placement: 'focus' | 'top' = 'focus') {
  if (placement === 'top') return { objectPosition: '50% 0%' }
  return { objectPosition: `${card.artwork.focus.x}% ${card.artwork.focus.y}%` }
}

export default function TaiwanFoodJourney({ language, onBack, ...navigation }: TaiwanFoodJourneyProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionChoice>('all')
  const [drawnIds, setDrawnIds] = useState<string[]>([TAIWAN_FOOD_COMPOSITIONS[0].id])
  const [currentId, setCurrentId] = useState(TAIWAN_FOOD_COMPOSITIONS[0].id)
  const [cardStage, setCardStage] = useState<FoodCardStage>('back')
  const [spicyEnabled, setSpicyEnabled] = useState(false)

  const eligibleCards = useMemo(() => selectedRegion === 'all'
    ? TAIWAN_FOOD_COMPOSITIONS
    : TAIWAN_FOOD_COMPOSITIONS.filter(card => card.subject.region === selectedRegion), [selectedRegion])
  const current = TAIWAN_FOOD_COMPOSITIONS.find(card => card.id === currentId) ?? eligibleCards[0]
  const prompt = TAIWAN_FOOD_PROMPTS[current.question.promptType]
  const region = TAIWAN_FOOD_REGIONS[current.subject.region]

  function chooseRegion(nextRegion: RegionChoice) {
    const nextCards = nextRegion === 'all' ? TAIWAN_FOOD_COMPOSITIONS : TAIWAN_FOOD_COMPOSITIONS.filter(card => card.subject.region === nextRegion)
    setSelectedRegion(nextRegion)
    setCurrentId(nextCards[0].id)
    setDrawnIds([nextCards[0].id])
    setCardStage('back')
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
    setCardStage('back')
  }

  function advanceCardStage() { setCardStage(value => nextCardStage[value]) }
  function handleCardKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    advanceCardStage()
  }

  const title = language === 'en' ? 'Taiwan Food Journey' : language === 'zh' ? '台灣美食旅行' : '台灣美食旅行 · Taiwan Food Journey'
  const allRegions = language === 'en' ? 'All regions' : language === 'zh' ? '全部地區' : '全部地區 · All regions'
  const stageAction = cardStage === 'back'
    ? (language === 'en' ? 'Reveal the dish' : '翻開料理')
    : cardStage === 'front'
      ? (language === 'en' ? 'Lift for the story' : '掀開介紹')
      : (language === 'en' ? 'Close the card' : '收回卡片')

  return <section className="food-journey-canvas" aria-label={title}>
    <header className="food-journey-header">
      <button type="button" className="food-journey-back" onClick={onBack} aria-label="返回模式選擇 · Back to modes">←</button>
      <div><small>TAIWAN TABLE ATLAS · 01</small><h1>{title}</h1></div>
      <SurfaceMenu {...navigation}>
        <button type="button" role="menuitem" onClick={() => window.print()}>列印 25 張卡<small>PRINT 25 CARDS</small></button>
      </SurfaceMenu>
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

    <div className="food-card-stage" data-region={current.subject.region} data-card-design={current.cardDesign.id}>
      <div className="food-card-shell" data-stage={cardStage}>
        <div role="button" tabIndex={0} className="food-card-interaction" aria-label={stageLabel(current, cardStage, language)} aria-pressed={cardStage !== 'back'} aria-expanded={cardStage === 'open'} onClick={advanceCardStage} onKeyDown={handleCardKeyDown}>
          <article className="food-card-layer food-card-information" aria-hidden={cardStage !== 'open'}>
            <div className="food-card-back-heading"><span>{region.stamp}-{String(current.subject.number).padStart(2, '0')}</span><div><small>{localize(current.subject.place, language)}</small><h2>{localize(current.subject.name, language)}</h2></div></div>
            <p className="food-card-note">{localize(current.story.text, language)}</p>
            <div className="food-prompt-panel">
              <span className="food-prompt-type" data-prompt={current.question.promptType}><i aria-hidden="true">{prompt.icon}</i>{language === 'en' ? prompt.en : language === 'zh' ? prompt.zh : `${prompt.zh} · ${prompt.en}`}</span>
              <p>{localize(current.question.text, language)}</p>
            </div>
            {spicyEnabled && <div className="food-spicy-panel"><b>🌶 {language === 'en' ? 'Optional spicy' : '可選辛辣題'}</b><p>{localize(current.spicyQuestion.text, language)}</p></div>}
            <div className="food-allergen-line"><b>{language === 'en' ? 'Check ingredients' : '成分提醒'}</b><span>{current.subject.allergens.length ? current.subject.allergens.map(id => allergenText(id, language)).join(' · ') : language === 'en' ? 'No common allergen listed; verify the recipe.' : '未列常見過敏原，仍請確認實際配方。'}</span></div>
            <p className="food-skip-note">✓ {language === 'en' ? 'Skip without penalty · Tap to close' : '跳過不受罰 · 點擊收回卡片'}</p>
          </article>

          <article className="food-card-layer food-card-dish-cover" aria-hidden={cardStage === 'back'}>
            <img src={current.artwork.src} alt={artworkAlt(current, language)} style={artworkPosition(current, 'top')} draggable="false" />
            <span className="food-region-ribbon">{region.zh} · {region.en}</span>
            <footer className="food-card-caption-rail">
              <div><small>{String(current.subject.number).padStart(2, '0')} / 25 · {localize(current.subject.place, language)}</small><h2>{localize(current.subject.name, language)}</h2></div>
              <span>{language === 'en' ? 'Lift' : '掀開'} <b aria-hidden="true">⌃</b></span>
            </footer>
          </article>

          <article className="food-card-layer food-card-utensil-back" aria-hidden={cardStage !== 'back'}>
            <svg viewBox="0 0 180 180" aria-hidden="true" focusable="false">
              <g className="food-card-fork">
                <path d="M58 30v38M68 30v38M78 30v38M53 30v36c0 16 30 16 30 0V30M68 79v72" />
              </g>
              <g className="food-card-spoon">
                <ellipse cx="118" cy="57" rx="18" ry="27" />
                <path d="M118 84v67" />
              </g>
            </svg>
            <p><span>TAIWAN TABLE</span><small>FOOD JOURNEY · V47</small></p>
          </article>
        </div>
      </div>
    </div>

    <footer className="food-journey-actions">
      <button type="button" className="food-flip-control" aria-pressed={cardStage !== 'back'} aria-expanded={cardStage === 'open'} onClick={advanceCardStage}>{stageAction}<span aria-hidden="true">{cardStage === 'front' ? '⌃' : cardStage === 'open' ? '⌄' : '↻'}</span></button>
      <button type="button" className="food-next-control" onClick={drawNext}>{language === 'en' ? 'Next food' : '下一道美食'}<span aria-hidden="true">→</span></button>
    </footer>

    <section className="print-only-food-deck" aria-hidden="true">
      {TAIWAN_FOOD_COMPOSITIONS.map(card => <div className="food-print-pair" data-region={card.subject.region} key={card.id}>
        <article className="food-print-card food-print-front">
          <img src={card.artwork.src} alt="" style={artworkPosition(card)} />
          <span>{TAIWAN_FOOD_REGIONS[card.subject.region].zh} · {TAIWAN_FOOD_REGIONS[card.subject.region].en}</span>
          <h2>{card.subject.name.zh}</h2><h3>{card.subject.name.en}</h3><p>{card.subject.place.zh} · {card.subject.place.en}</p><small>{String(card.subject.number).padStart(2, '0')} / 25</small>
        </article>
        <article className="food-print-card food-print-back">
          <header><span>{TAIWAN_FOOD_PROMPTS[card.question.promptType].icon}</span><b>{TAIWAN_FOOD_PROMPTS[card.question.promptType].zh} · {TAIWAN_FOOD_PROMPTS[card.question.promptType].en}</b></header>
          <h2>{card.subject.name.zh} · {card.subject.name.en}</h2><p>{card.story.text.zh}</p><p lang="en">{card.story.text.en}</p>
          <blockquote>{card.question.text.zh}<br /><span lang="en">{card.question.text.en}</span></blockquote>
          <aside><b>🌶 OPTIONAL</b> {card.spicyQuestion.text.zh} <span lang="en">{card.spicyQuestion.text.en}</span></aside>
          <small>✓ 可跳過 · SKIP WITHOUT PENALTY</small>
        </article>
      </div>)}
    </section>
  </section>
}
