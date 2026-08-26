import type { Language } from '../types'
import SurfaceMenu from './SurfaceMenu'
import type { SurfaceMenuNavigationProps } from './SurfaceMenu'
import YunkumomMark from './YunkumomMark'

interface ModeHomeProps extends SurfaceMenuNavigationProps {
  language: Language
}

const labels = {
  zh: {
    title: '破冰遊戲選擇',
  },
  en: {
    title: 'CHOOSE AN ICEBREAKER',
  },
}

export default function ModeHome({ language, onChooseKeepsake, onChooseTruthOrDare, onChooseFoodJourney, onChooseUndercover, onChooseAustraliaFindIt, ...navigation }: ModeHomeProps) {
  const text = language === 'en' ? labels.en : labels.zh
  return <section className="mode-home-canvas has-five-experiences" aria-label="選擇模式 · Choose an experience">
    <header className="mode-home-header">
      <div className="mode-home-brand"><span><YunkumomMark /></span><b>Yunkumom</b></div>
      <SurfaceMenu {...navigation} language={language} onChooseKeepsake={onChooseKeepsake} onChooseTruthOrDare={onChooseTruthOrDare} onChooseFoodJourney={onChooseFoodJourney} onChooseUndercover={onChooseUndercover} onChooseAustraliaFindIt={onChooseAustraliaFindIt} />
    </header>
    <div className="mode-home-intro">
      <h1>{text.title} · V47</h1>
    </div>
    <div className="experience-grid">
      <button type="button" className="experience-card is-primary" onClick={onChooseKeepsake}>
        <span className="experience-number">01</span>
        <span className="experience-icon keepsake-icon" aria-hidden="true">▣</span>
        <span><b>直接製作紀念卡</b><small>CREATE A KEEPSAKE</small></span>
        <i aria-hidden="true">→</i>
      </button>
      <button type="button" className="experience-card" onClick={onChooseTruthOrDare}>
        <span className="experience-number">02</span>
        <span className="experience-icon truth-icon" aria-hidden="true">○△</span>
        <span><b>真心話大冒險</b><small>TRUTH OR DARE</small></span>
        <i aria-hidden="true">→</i>
      </button>
      <button type="button" className="experience-card food-journey-entry" onClick={onChooseFoodJourney}>
        <span className="experience-number">03</span>
        <span className="experience-icon food-journey-icon" aria-hidden="true">台味</span>
        <span><b>台灣美食旅行</b><small>TAIWAN FOOD JOURNEY</small></span>
        <i aria-hidden="true">→</i>
      </button>
      <button type="button" className="experience-card undercover-entry-card" onClick={onChooseUndercover}>
        <span className="experience-number">04</span>
        <span className="experience-icon undercover-icon" aria-hidden="true">◐</span>
        <span><b>誰是臥底</b><small>WHO IS THE UNDERCOVER</small></span>
        <i aria-hidden="true">→</i>
      </button>
      <button type="button" className="experience-card australia-find-it-entry-card" onClick={onChooseAustraliaFindIt}>
        <span className="experience-number">05</span>
        <span className="experience-icon australia-find-it-icon" aria-hidden="true">⌕</span>
        <span><b>大家來找碴</b><small>AUSTRALIA FIND IT</small></span>
        <i aria-hidden="true">→</i>
      </button>
    </div>
    <p className="mode-home-privacy">匿名房間資料兩小時失效 · Anonymous room data expires in two hours</p>
  </section>
}
