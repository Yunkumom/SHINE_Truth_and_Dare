import type { Language } from '../types'

interface ModeHomeProps {
  language: Language
  onChooseEncounter: () => void
  onChooseKeepsake: () => void
  onChooseTruthOrDare: () => void
}

const labels = {
  zh: {
    eyebrow: '選擇這次想留下的方式',
    title: '今天，想創造哪一種相遇？',
    description: '抽一張卡開始對話，或直接做一張可以送人的紀念卡。',
  },
  en: {
    eyebrow: 'CHOOSE YOUR EXPERIENCE',
    title: 'How would you like to connect today?',
    description: 'Start a conversation with a card, or create a keepsake to send directly.',
  },
}

export default function ModeHome({ language, onChooseEncounter, onChooseKeepsake, onChooseTruthOrDare }: ModeHomeProps) {
  const text = language === 'en' ? labels.en : labels.zh
  return <section className="mode-home-canvas" aria-label="選擇模式 · Choose an experience">
    <header className="mode-home-header">
      <div className="mode-home-brand"><span aria-hidden="true">✦</span><b>相遇卡<small>ENCOUNTER CARDS · V39</small></b></div>
      <span className="mode-home-step">01 / 03</span>
    </header>
    <div className="mode-home-intro">
      <small>{text.eyebrow}</small>
      <h1>{text.title}</h1>
      <p>{text.description}</p>
    </div>
    <div className="experience-grid">
      <button type="button" className="experience-card is-primary" onClick={onChooseEncounter}>
        <span className="experience-number">01</span>
        <span className="experience-icon" aria-hidden="true">✦</span>
        <span><b>相遇卡</b><small>ENCOUNTER CARD</small></span>
        <i aria-hidden="true">→</i>
      </button>
      <button type="button" className="experience-card" onClick={onChooseKeepsake}>
        <span className="experience-number">02</span>
        <span className="experience-icon keepsake-icon" aria-hidden="true">▣</span>
        <span><b>直接製作紀念卡</b><small>CREATE A KEEPSAKE</small></span>
        <i aria-hidden="true">→</i>
      </button>
      <button type="button" className="experience-card" onClick={onChooseTruthOrDare}>
        <span className="experience-number">03</span>
        <span className="experience-icon truth-icon" aria-hidden="true">○△</span>
        <span><b>真心話大冒險</b><small>TRUTH OR DARE</small></span>
        <i aria-hidden="true">→</i>
      </button>
    </div>
    <p className="mode-home-privacy">所有內容只留在你的裝置 · Everything stays on your device</p>
  </section>
}
