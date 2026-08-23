import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Language } from '../types'

export type SurfaceMode = 'phone' | 'showcase' | 'studio'
export type AppearanceMode = 'day' | 'night'
export type SurfaceDestination = 'home' | 'keepsake-maker' | 'setup' | 'food-journey'

export interface SurfaceMenuNavigationProps {
  surfaceMode: SurfaceMode
  onSurfaceModeChange: (mode: SurfaceMode) => void
  activeDestination: SurfaceDestination
  language: Language
  onLanguageChange: (language: Language) => void
  appearanceMode: AppearanceMode
  onAppearanceModeChange: (mode: AppearanceMode) => void
  onHome: () => void
  onChooseKeepsake: () => void
  onChooseTruthOrDare: () => void
  onChooseFoodJourney: () => void
}

interface SurfaceMenuProps extends SurfaceMenuNavigationProps {
  children?: ReactNode
}

const destinationLabels: Record<SurfaceDestination, string> = {
  home: '選擇首頁 · HOME',
  'keepsake-maker': '直接製作紀念卡 · KEEPSAKE',
  setup: '真心話大冒險 · PLAY',
  'food-journey': '台灣美食旅行 · FOOD',
}

export default function SurfaceMenu({ surfaceMode, onSurfaceModeChange, activeDestination, language, onLanguageChange, appearanceMode, onAppearanceModeChange, onHome, onChooseKeepsake, onChooseTruthOrDare, onChooseFoodJourney, children }: SurfaceMenuProps) {
  const [open, setOpen] = useState(false)

  function choose(action: () => void) {
    setOpen(false)
    action()
  }

  return <div className="surface-menu">
    <button type="button" className="surface-menu-toggle" aria-label="開啟選單 · Open menu" aria-expanded={open} onClick={() => setOpen(value => !value)}>
      <span aria-hidden="true"><i /><i /><i /></span>
    </button>
    {open && <div className="surface-menu-panel" role="menu" aria-label="TRUTH OR DARE · V47">
      <header><b>TRUTH OR DARE</b><small>V47 · DISPLAY &amp; TOOLS</small></header>
      <section className="surface-menu-section surface-menu-display" aria-label="顯示模式 · Display mode">
        <strong>顯示模式 · DISPLAY</strong>
        <div className="surface-menu-rail surface-menu-display-rail" role="radiogroup" aria-label="顯示模式">
          <button type="button" role="radio" aria-checked={surfaceMode === 'phone'} onClick={() => choose(() => onSurfaceModeChange('phone'))}>iPhone 17 Pro Max<small>DEFAULT</small></button>
          <button type="button" role="radio" aria-checked={surfaceMode === 'showcase'} onClick={() => choose(() => onSurfaceModeChange('showcase'))}>桌面展示<small>SHOWCASE</small></button>
          <button type="button" role="radio" aria-checked={surfaceMode === 'studio'} onClick={() => choose(() => onSurfaceModeChange('studio'))}>進階功能<small>ADVANCED</small></button>
        </div>
      </section>
      <details className="surface-menu-destinations">
        <summary><span>前往 · GO TO</span><b>{destinationLabels[activeDestination]}</b></summary>
        <div className="surface-menu-rail surface-menu-destination-rail" aria-label="前往 · Experiences">
          <button type="button" aria-current={activeDestination === 'home' ? 'page' : undefined} onClick={() => choose(onHome)}>選擇首頁<small>HOME</small></button>
          <button type="button" aria-current={activeDestination === 'keepsake-maker' ? 'page' : undefined} onClick={() => choose(onChooseKeepsake)}>直接製作紀念卡<small>KEEPSAKE</small></button>
          <button type="button" aria-current={activeDestination === 'setup' ? 'page' : undefined} onClick={() => choose(onChooseTruthOrDare)}>真心話大冒險<small>PLAY</small></button>
          <button type="button" aria-current={activeDestination === 'food-journey' ? 'page' : undefined} onClick={() => choose(onChooseFoodJourney)}>台灣美食旅行<small>FOOD</small></button>
        </div>
      </details>
      <section className="surface-menu-preferences" aria-label="閱讀偏好 · Reading preferences">
        <div className="surface-theme-switch" role="radiogroup" aria-label="護眼模式 · Appearance">
          <button type="button" role="radio" aria-checked={appearanceMode === 'day'} onClick={() => onAppearanceModeChange('day')}>白天 · DAY</button>
          <button type="button" role="radio" aria-checked={appearanceMode === 'night'} onClick={() => onAppearanceModeChange('night')}>夜間 · NIGHT</button>
        </div>
        <label>語言 · LANGUAGE<select value={language} onChange={event => onLanguageChange(event.target.value as Language)}><option value="en">English</option><option value="zh">台灣繁中</option><option value="bilingual">中英雙語 · Bilingual</option></select></label>
      </section>
      {children && <section className="surface-menu-section surface-menu-context" aria-label="目前畫面工具 · Current tools" onClick={event => { if (!(event.target as HTMLElement).closest('.surface-menu-upload')) setOpen(false) }}><strong>目前畫面 · TOOLS</strong>{children}</section>}
    </div>}
  </div>
}
