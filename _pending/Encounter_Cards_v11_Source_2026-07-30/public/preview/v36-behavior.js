(() => {
  const SELECTOR_ID = 'v36-independent-choice'
  const MANAGER_ID = 'v37-library-manager'
  const SETTINGS_KEY = 'encounter-manager-v37'
  const DEFAULT_SETTINGS = {
    showRealYou: true,
    showQuestion: true,
    showBlessing: true,
    disabledQuestionIds: [],
    customQuestions: [],
    selectedQuestionId: null,
    selectedArtworkTitle: null,
    selectedArtworkCollection: null,
    fontScale: 1,
    artworkPositions: {}
  }
  let baseQuestions = []
  const artworkEnglishNames = new Map()
  const artworkLibrary = new Map()
  let artworkHarvesting = false
  let artworkLibraryReady = false
  let activeArtworkOverride = null
  let settings = loadSettings()
  let allowNativeCardLibrary = false
  const TAIWAN_LOCAL_STORY_TITLES = new Set([
    '牡羊座・合歡山晨行',
    '金牛座・阿里山茶作',
    '雙子座・西門雙城',
    '巨蟹座・澎湖潮間',
    '獅子座・廟埕熱場',
    '處女座・池上稻日',
    '天秤座・大稻埕暮光',
    '天蠍座・太魯閣雨行',
    '射手座・玉山追光',
    '摩羯座・清水斷崖',
    '水瓶座・九份雨夜',
    '雙魚座・東岸月浪'
  ])

  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')
      return {
        ...DEFAULT_SETTINGS,
        ...saved,
        disabledQuestionIds: Array.isArray(saved.disabledQuestionIds)
          ? saved.disabledQuestionIds
          : [],
        customQuestions: Array.isArray(saved.customQuestions)
          ? saved.customQuestions
          : [],
        fontScale: Math.max(
          .8,
          Math.min(1.4, Number(saved.fontScale) || 1)
        ),
        artworkPositions: saved.artworkPositions &&
          typeof saved.artworkPositions === 'object'
          ? saved.artworkPositions
          : {}
      }
    } catch {
      return { ...DEFAULT_SETTINGS }
    }
  }

  const saveSettings = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  }

  const allQuestions = () => [
    ...baseQuestions,
    ...settings.customQuestions
  ]

  const getSelectedLevel = () => {
    const gameLevel = document.querySelector('.game-meta span')?.textContent
      ?.match(/LEVEL\s+([1-5])/i)?.[1]
    if (gameLevel) return Number(gameLevel)

    const activeLevel = document.querySelector(
      '.level-grid button[aria-pressed="true"]'
    )
    const setupLevel = activeLevel?.getAttribute('aria-label')
      ?.match(/Level\s+([1-5])/i)?.[1]
    return Number(setupLevel || 1)
  }

  const getSelectedMode = () => {
    const gameMode = document.querySelectorAll('.game-meta span')[1]
      ?.textContent?.trim().toLowerCase()
    if (gameMode) return gameMode

    const activeMode = document.querySelector(
      '.mode-grid button[aria-pressed="true"]'
    )
    return activeMode?.getAttribute('aria-label')?.toLowerCase() || 'random'
  }

  const loadBaseQuestions = async () => {
    try {
      const response = await fetch('./assets/index-B1YPH5Ge.js')
      const source = await response.text()
      const pattern = /\{id:`(card-\d+)`,level:(\d),mode:`(truth|dare)`,zh:`([^`]*)`,en:`([^`]*)`\}/g
      baseQuestions = [...source.matchAll(pattern)].map(match => ({
        id: match[1],
        level: Number(match[2]),
        mode: match[3],
        zh: match[4],
        en: match[5],
        custom: false
      }))
      const artworkNamePattern = /zhName:`([^`]*)`,enName:`([^`]*)`/g
      ;[...source.matchAll(artworkNamePattern)].forEach(match => {
        artworkEnglishNames.set(match[1], match[2])
      })
      renderQuestionManager()
      scheduleEnhancement()
    } catch {
      baseQuestions = []
    }
  }

  const clickWhenReady = (selector, afterClick) => {
    const target = document.querySelector(selector)
    if (!target) return false
    target.click()
    if (afterClick) window.setTimeout(afterClick, 80)
    return true
  }

  const openNativeCardLibrary = () => {
    const trigger = document.querySelector('.card-library-trigger')
    if (!trigger) return false
    allowNativeCardLibrary = true
    trigger.click()
    allowNativeCardLibrary = false
    return true
  }

  const ensureAdvancedPanel = (afterOpen) => {
    const panel = document.querySelector('#advanced-deck-panel')
    if (panel) {
      afterOpen(panel)
      return
    }

    const disclosure = document.querySelector('.advanced-deck-disclosure')
    if (!disclosure) return
    disclosure.click()
    window.setTimeout(() => {
      const openedPanel = document.querySelector('#advanced-deck-panel')
      if (openedPanel) afterOpen(openedPanel)
    }, 90)
  }

  const resetArtworkToRandom = () => {
    settings.selectedArtworkTitle = null
    settings.selectedArtworkCollection = null
    saveSettings()
    ensureAdvancedPanel(panel => {
      const button = panel.querySelector(
        'section[aria-label="Artwork exact choice"] .exact-choice-heading button'
      )
      if (button) button.click()
    })
  }

  const resetQuestionToRandom = () => {
    settings.selectedQuestionId = null
    saveSettings()
    ensureAdvancedPanel(panel => {
      const button = panel.querySelector(
        'section[aria-label="Question exact choice"] .exact-choice-heading button'
      )
      if (button) button.click()
    })
  }

  const openQuestionPicker = () => {
    openManager('questions')
  }

  const setManagerTab = (tabName) => {
    const manager = document.querySelector(`#${MANAGER_ID}`)
    if (!manager) return
    manager.querySelectorAll('[data-manager-tab]').forEach(button => {
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.managerTab === tabName)
      )
    })
    manager.querySelectorAll('[data-manager-panel]').forEach(panel => {
      panel.hidden = panel.dataset.managerPanel !== tabName
    })
    if (tabName === 'questions') {
      const level = getSelectedLevel()
      manager.dataset.questionLevel = String(level)
      renderQuestionManager()
    }
    if (tabName === 'general') syncGeneralSettings()
    if (tabName === 'content') syncContentSettings()
    if (tabName === 'positions') renderSavedPositions()
  }

  const openManager = (tabName = 'general') => {
    let manager = document.querySelector(`#${MANAGER_ID}`)
    if (!manager) {
      manager = buildManager()
      document.body.appendChild(manager)
    }
    manager.hidden = false
    setManagerTab(tabName)
  }

  const closeManager = () => {
    const manager = document.querySelector(`#${MANAGER_ID}`)
    if (manager) manager.hidden = true
  }

  const buildManager = () => {
    const manager = document.createElement('section')
    manager.id = MANAGER_ID
    manager.className = 'library-manager'
    manager.hidden = true
    manager.dataset.questionLevel = String(getSelectedLevel())
    manager.setAttribute('role', 'dialog')
    manager.setAttribute('aria-label', 'Hidden library management')
    manager.innerHTML = `
      <header class="library-manager-header">
        <div>
          <small>HIDDEN MANAGEMENT</small>
          <b>隱藏管理區</b>
        </div>
        <button type="button" data-manager-close aria-label="關閉管理區">×</button>
      </header>
      <nav class="library-manager-tabs" aria-label="Management sections">
        <button type="button" data-manager-tab="general">基本設定</button>
        <button type="button" data-manager-tab="cards">卡庫</button>
        <button type="button" data-manager-tab="questions">問題庫</button>
        <button type="button" data-manager-tab="content">卡片內容</button>
        <button type="button" data-manager-tab="positions">照片位置</button>
      </nav>
      <section data-manager-panel="general" class="library-manager-panel">
        <h3>抽卡設定 · Draw Settings</h3>
        <p>所有抽卡設定都集中在這裡，主畫面只保留開始按鈕。</p>
        <div class="settings-group">
          <b>熟識程度 · Level</b>
          <div class="settings-choice-grid level-setting-proxy" role="group" aria-label="Settings level">
            ${[1, 2, 3, 4, 5].map(level => `
              <button type="button" data-proxy-level="${level}">L${level}</button>
            `).join('')}
          </div>
        </div>
        <div class="settings-group">
          <b>卡片類型 · Card Type</b>
          <div class="settings-choice-grid mode-setting-proxy" role="group" aria-label="Settings card type">
            <button type="button" data-proxy-mode="truth">真心話</button>
            <button type="button" data-proxy-mode="dare">小挑戰</button>
            <button type="button" data-proxy-mode="random">隨機</button>
          </div>
        </div>
        <div class="settings-summary-grid">
          <article>
            <small>CARD</small>
            <b data-card-selection-summary>隨機卡面</b>
            <button type="button" data-open-photo-picker>選擇指定卡片</button>
            <button type="button" data-random-card>改為隨機卡面</button>
          </article>
          <article>
            <small>QUESTION</small>
            <b data-question-selection-summary>隨機抽題</b>
            <button type="button" data-open-question-settings>選擇指定問題</button>
            <button type="button" data-random-question>改為隨機抽題</button>
          </article>
        </div>
      </section>
      <section data-manager-panel="cards" class="library-manager-panel">
        <h3>卡庫 · Card Library</h3>
        <p>使用像 iPhone 照片一樣的縮圖格，點一下卡片即可勾選。</p>
        <button type="button" class="manager-primary" data-open-photo-picker>
          選擇指定卡片 · Choose Card
        </button>
        <button type="button" data-random-card>
          使用隨機卡面
        </button>
      </section>
      <section data-manager-panel="questions" class="library-manager-panel">
        <div class="manager-section-heading">
          <div>
            <h3>問題庫 · Question Library</h3>
            <p>依 Level 啟用、停用、指定或新增問題。</p>
          </div>
          <button type="button" data-random-question>恢復隨機</button>
        </div>
        <div class="question-level-tabs" role="group" aria-label="Question level">
          ${[1, 2, 3, 4, 5].map(level => `
            <button type="button" data-question-level="${level}">L${level}</button>
          `).join('')}
        </div>
        <div class="question-manager-status" aria-live="polite"></div>
        <div class="question-manager-list"></div>
        <form class="question-add-form">
          <b>新增目前 Level 的問題</b>
          <textarea name="questionZh" required placeholder="輸入中文問題"></textarea>
          <input name="questionEn" placeholder="English translation（選填）">
          <select name="questionMode" aria-label="Question type">
            <option value="truth">真心話 · Truth</option>
            <option value="dare">小挑戰 · Dare</option>
          </select>
          <button type="submit" class="manager-primary">＋ 新增問題</button>
        </form>
      </section>
      <section data-manager-panel="content" class="library-manager-panel">
        <h3>卡片內容 · Card Content</h3>
        <p>取消勾選即可隱藏卡片下方的對應內容。</p>
        <div class="content-toggle-list">
          <label>
            <input type="checkbox" data-content-setting="showRealYou">
            <span><b>真正的你</b><small>THE REAL YOU</small></span>
          </label>
          <label>
            <input type="checkbox" data-content-setting="showQuestion">
            <span><b>問題</b><small>QUESTION</small></span>
          </label>
          <label>
            <input type="checkbox" data-content-setting="showBlessing">
            <span><b>祝福語</b><small>BLESSING</small></span>
          </label>
        </div>
        <p class="content-combination-note">
          可設定只顯示問題、只顯示祝福語，或同時顯示兩者。
        </p>
      </section>
      <section data-manager-panel="positions" class="library-manager-panel">
        <h3>照片位置 · Saved Artwork Positions</h3>
        <p>抽到卡片後可直接調整照片。每張卡會保存自己的位置與大小。</p>
        <div class="saved-position-list"></div>
      </section>
    `

    manager.addEventListener('click', event => {
      const target = event.target.closest('button')
      if (!target) return
      if (target.hasAttribute('data-manager-close')) closeManager()
      if (target.dataset.managerTab) setManagerTab(target.dataset.managerTab)
      if (target.hasAttribute('data-open-card-library')) {
        closeManager()
        openNativeCardLibrary()
      }
      if (target.hasAttribute('data-open-photo-picker')) {
        openPhotoPicker()
      }
      if (target.hasAttribute('data-random-card')) {
        resetArtworkToRandom()
        syncGeneralSettings()
      }
      if (target.hasAttribute('data-open-question-settings')) {
        setManagerTab('questions')
      }
      if (target.dataset.proxyLevel) {
        const levelButton = document.querySelector(
          `.level-grid button[aria-label^="Level ${target.dataset.proxyLevel}"]`
        )
        if (levelButton) levelButton.click()
        window.setTimeout(syncGeneralSettings, 60)
      }
      if (target.dataset.proxyMode) {
        const modeName = target.dataset.proxyMode === 'truth'
          ? 'Truth'
          : target.dataset.proxyMode === 'dare'
            ? 'Dare'
            : 'Random'
        const modeButton = document.querySelector(
          `.mode-grid button[aria-label="${modeName}"]`
        )
        if (modeButton) modeButton.click()
        window.setTimeout(syncGeneralSettings, 60)
      }
      if (target.dataset.questionLevel) {
        manager.dataset.questionLevel = target.dataset.questionLevel
        renderQuestionManager()
      }
      if (target.hasAttribute('data-random-question')) {
        settings.selectedQuestionId = null
        saveSettings()
        renderQuestionManager()
        syncGeneralSettings()
      }
      if (target.dataset.questionAction === 'select') {
        settings.selectedQuestionId = target.dataset.questionId
        saveSettings()
        renderQuestionManager()
        syncGeneralSettings()
      }
      if (target.dataset.questionAction === 'delete') {
        settings.customQuestions = settings.customQuestions.filter(
          question => question.id !== target.dataset.questionId
        )
        if (settings.selectedQuestionId === target.dataset.questionId) {
          settings.selectedQuestionId = null
        }
        saveSettings()
        renderQuestionManager()
      }
    })

    manager.addEventListener('change', event => {
      const contentKey = event.target.dataset.contentSetting
      if (contentKey) {
        settings[contentKey] = event.target.checked
        saveSettings()
        applyContentSettings()
      }

      const questionId = event.target.dataset.questionEnabled
      if (questionId) {
        const disabled = new Set(settings.disabledQuestionIds)
        if (event.target.checked) disabled.delete(questionId)
        else disabled.add(questionId)
        settings.disabledQuestionIds = [...disabled]
        if (!event.target.checked && settings.selectedQuestionId === questionId) {
          settings.selectedQuestionId = null
        }
        saveSettings()
        renderQuestionManager()
      }
    })

    manager.querySelector('.question-add-form').addEventListener(
      'submit',
      event => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const zh = String(form.get('questionZh') || '').trim()
        if (!zh) return
        const level = Number(manager.dataset.questionLevel || 1)
        settings.customQuestions.push({
          id: `custom-${Date.now()}`,
          level,
          mode: String(form.get('questionMode') || 'truth'),
          zh,
          en: String(form.get('questionEn') || '').trim(),
          custom: true
        })
        saveSettings()
        event.currentTarget.reset()
        renderQuestionManager()
      }
    )

    return manager
  }

  const renderQuestionManager = () => {
    const manager = document.querySelector(`#${MANAGER_ID}`)
    if (!manager || manager.hidden) return
    const level = Number(manager.dataset.questionLevel || getSelectedLevel())
    const disabled = new Set(settings.disabledQuestionIds)
    const questions = allQuestions().filter(question => question.level === level)
    const list = manager.querySelector('.question-manager-list')
    const status = manager.querySelector('.question-manager-status')

    manager.querySelectorAll('[data-question-level]').forEach(button => {
      button.setAttribute(
        'aria-pressed',
        String(Number(button.dataset.questionLevel) === level)
      )
    })
    manager.querySelectorAll('[data-content-setting]').forEach(input => {
      input.checked = Boolean(settings[input.dataset.contentSetting])
    })

    const enabledCount = questions.filter(
      question => !disabled.has(question.id)
    ).length
    status.textContent = `L${level}：${enabledCount} / ${questions.length} 題啟用`
    list.replaceChildren()

    questions.forEach(question => {
      const row = document.createElement('article')
      row.className = 'question-manager-item'
      const enabled = !disabled.has(question.id)
      const selected = settings.selectedQuestionId === question.id
      row.innerHTML = `
        <label class="question-enable">
          <input type="checkbox" data-question-enabled="${question.id}" ${enabled ? 'checked' : ''}>
          <span>啟用</span>
        </label>
        <div class="question-manager-copy">
          <small>${question.mode.toUpperCase()}${question.custom ? ' · CUSTOM' : ''}</small>
          <b></b>
          <span></span>
        </div>
        <div class="question-manager-actions">
          <button type="button" data-question-action="select" data-question-id="${question.id}" aria-pressed="${selected}">
            ${selected ? '已指定' : '指定'}
          </button>
          ${question.custom ? `
            <button type="button" data-question-action="delete" data-question-id="${question.id}">刪除</button>
          ` : ''}
        </div>
      `
      row.querySelector('.question-manager-copy b').textContent = question.zh
      row.querySelector('.question-manager-copy span').textContent = question.en
      list.appendChild(row)
    })

    if (!questions.length) {
      const empty = document.createElement('p')
      empty.className = 'question-manager-empty'
      empty.textContent = '這個 Level 尚未有問題，可以在下方新增。'
      list.appendChild(empty)
    }
  }

  const syncContentSettings = () => {
    const manager = document.querySelector(`#${MANAGER_ID}`)
    if (!manager) return
    manager.querySelectorAll('[data-content-setting]').forEach(input => {
      input.checked = Boolean(settings[input.dataset.contentSetting])
    })
  }

  const syncGeneralSettings = () => {
    const manager = document.querySelector(`#${MANAGER_ID}`)
    if (!manager) return
    const level = getSelectedLevel()
    const mode = getSelectedMode()
    manager.querySelectorAll('[data-proxy-level]').forEach(button => {
      button.setAttribute(
        'aria-pressed',
        String(Number(button.dataset.proxyLevel) === level)
      )
    })
    manager.querySelectorAll('[data-proxy-mode]').forEach(button => {
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.proxyMode === mode)
      )
    })
    manager.querySelectorAll('[data-card-selection-summary]').forEach(label => {
      const next = settings.selectedArtworkTitle || '隨機卡面'
      if (label.textContent !== next) label.textContent = next
    })
    const selectedQuestion = allQuestions().find(
      question => question.id === settings.selectedQuestionId
    )
    manager.querySelectorAll('[data-question-selection-summary]').forEach(label => {
      const next = selectedQuestion?.zh || `L${level} 隨機抽題`
      if (label.textContent !== next) label.textContent = next
    })
  }

  const buildPhotoPicker = panel => {
    document.querySelector('#v38-photo-picker')?.remove()
    const picker = document.createElement('section')
    picker.id = 'v38-photo-picker'
    picker.className = 'photo-card-picker'
    picker.setAttribute('role', 'dialog')
    picker.setAttribute('aria-label', 'Choose a specific card')
    picker.innerHTML = `
      <header>
        <button type="button" data-photo-cancel>取消</button>
        <div>
          <b>選擇卡片</b>
          <small>SELECT ONE CARD</small>
        </div>
        <button type="button" data-photo-done disabled>完成</button>
      </header>
      <nav class="photo-picker-albums" aria-label="Card collections"></nav>
      <div class="photo-picker-summary">點一下卡片即可勾選</div>
      <div class="photo-picker-grid"></div>
    `

    const renderGrid = () => {
      const albumNav = picker.querySelector('.photo-picker-albums')
      const grid = picker.querySelector('.photo-picker-grid')
      const collectionButtons = [
        ...panel.querySelectorAll('.collection-roadmap button')
      ]
      const activeCollection = collectionButtons.find(
        button => button.getAttribute('aria-pressed') === 'true'
      ) || collectionButtons[0]
      const activeCollectionName =
        activeCollection?.querySelector('b')?.textContent?.trim() ||
        activeCollection?.textContent?.trim() ||
        ''

      albumNav.replaceChildren()
      collectionButtons.forEach((button, index) => {
        const albumButton = document.createElement('button')
        albumButton.type = 'button'
        albumButton.textContent = button.querySelector('b')?.textContent ||
          button.textContent.trim()
        albumButton.setAttribute(
          'aria-pressed',
          String(button === activeCollection)
        )
        albumButton.addEventListener('click', () => {
          button.click()
          window.setTimeout(renderGrid, 90)
        })
        albumNav.appendChild(albumButton)
      })

      grid.replaceChildren()
      const renderedTitles = new Set()
      panel.querySelectorAll('.artwork-picker button').forEach(button => {
        const title = button.querySelector('span')?.textContent?.trim() || ''
        const image = button.querySelector('img')
        if (!title || !image || renderedTitles.has(title)) return
        renderedTitles.add(title)
        const tile = document.createElement('button')
        tile.type = 'button'
        tile.className = 'photo-picker-tile'
        tile.dataset.artworkLabel = button.getAttribute('aria-label') || ''
        tile.dataset.collectionName = activeCollectionName
        tile.innerHTML = `
          <img alt="">
          <span></span>
          <i aria-hidden="true">✓</i>
        `
        tile.querySelector('img').src = image.src
        tile.querySelector('img').alt = title
        tile.querySelector('span').textContent = title
        const isSelected = picker.dataset.pendingArtworkTitle
          ? picker.dataset.pendingArtworkTitle === title
          : button.getAttribute('aria-pressed') === 'true'
        tile.setAttribute('aria-pressed', String(isSelected))
        tile.addEventListener('click', () => {
          picker.dataset.pendingArtworkTitle = title
          picker.dataset.pendingArtworkLabel = tile.dataset.artworkLabel
          picker.dataset.pendingCollectionName = activeCollectionName
          picker.querySelector('[data-photo-done]').disabled = false
          picker.querySelector('.photo-picker-summary').textContent =
            `已選擇：${title}`
          picker.querySelectorAll('.photo-picker-tile').forEach(other => {
            other.setAttribute(
              'aria-pressed',
              String(other === tile)
            )
          })
        })
        grid.appendChild(tile)
      })
    }

    const applyPendingArtwork = () => {
      const collectionName = picker.dataset.pendingCollectionName
      const collection = [...panel.querySelectorAll('.collection-roadmap button')]
        .find(button => (
          button.querySelector('b')?.textContent?.trim() ||
          button.textContent.trim()
        ) === collectionName)
      if (collection && collection.getAttribute('aria-pressed') !== 'true') {
        collection.click()
      }
      window.setTimeout(() => {
        const artwork = [...panel.querySelectorAll('.artwork-picker button')]
          .find(button => (
            button.getAttribute('aria-label') ===
            picker.dataset.pendingArtworkLabel
          ))
        if (artwork) artwork.click()
        settings.selectedArtworkTitle =
          picker.dataset.pendingArtworkTitle || null
        settings.selectedArtworkCollection = collectionName || null
        saveSettings()
        picker.remove()
        syncGeneralSettings()
      }, 100)
    }

    picker.addEventListener('click', event => {
      const button = event.target.closest('button')
      if (!button) return
      if (button.hasAttribute('data-photo-cancel')) picker.remove()
      if (button.hasAttribute('data-photo-done')) applyPendingArtwork()
    })
    document.body.appendChild(picker)
    renderGrid()
  }

  const openPhotoPicker = () => {
    ensureAdvancedPanel(panel => {
      buildPhotoPicker(panel)
    })
  }

  const getCollectionName = button => (
    button?.querySelector('b')?.textContent?.trim() ||
    button?.textContent?.trim() ||
    '全部卡片'
  )

  const rememberArtwork = ({
    title,
    src,
    collection = '全部卡片',
    enName = ''
  }) => {
    if (!title || !src) return
    const key = `${title}::${src.slice(-64)}`
    const previous = artworkLibrary.get(key)
    artworkLibrary.set(key, {
      title,
      src,
      collection: collection || previous?.collection || '全部卡片',
      enName: enName || artworkEnglishNames.get(title) ||
        previous?.enName || ''
    })
  }

  const cacheArtworkPanel = panel => {
    const activeCollection = [
      ...panel.querySelectorAll('.collection-roadmap button')
    ].find(button => button.getAttribute('aria-pressed') === 'true')
    const collection = getCollectionName(activeCollection)
    panel.querySelectorAll('.artwork-picker button').forEach(button => {
      const title = button.querySelector('span')?.textContent?.trim() || ''
      const image = button.querySelector('img')
      rememberArtwork({
        title,
        src: image?.src || '',
        collection
      })
    })
  }

  const cacheVisibleArtwork = () => {
    document.querySelectorAll('.artwork-candidate-fan button').forEach(button => {
      const image = button.querySelector('img')
      const title = button.querySelector('span')?.textContent?.trim() ||
        image?.alt?.trim() || ''
      rememberArtwork({ title, src: image?.src || '', collection: '本次卡面' })
    })
    document.querySelectorAll('.game-card-block .mythic-card').forEach(card => {
      const title = getArtworkTitle(card)
      const image = card.querySelector('.mythic-art-frame img')
      rememberArtwork({ title, src: image?.src || '', collection: '本次卡面' })
    })
  }

  const harvestArtworkLibrary = () => {
    if (
      artworkHarvesting ||
      artworkLibraryReady ||
      !document.querySelector('.setup-shell') ||
      document.querySelector('.game-card-block .mythic-card')
    ) return
    const availablePanel = document.querySelector('#advanced-deck-panel')
    if (!availablePanel) {
      const disclosure = document.querySelector('.advanced-deck-disclosure')
      if (!disclosure) return
      artworkHarvesting = true
      disclosure.click()
      window.setTimeout(() => {
        artworkHarvesting = false
        harvestArtworkLibrary()
      }, 180)
      return
    }
    artworkHarvesting = true
    const beginHarvest = panel => {
      const initialCollections = [
        ...panel.querySelectorAll('.collection-roadmap button')
      ]
      if (!initialCollections.length) {
        artworkHarvesting = false
        return
      }
      const original = initialCollections.find(
        button => button.getAttribute('aria-pressed') === 'true'
      ) || initialCollections[0]
      const collectionNames = initialCollections.map(getCollectionName)
      const originalName = getCollectionName(original)
      let index = 0
      const collectNext = () => {
        const currentPanel = document.querySelector('#advanced-deck-panel')
        if (!currentPanel) {
          artworkHarvesting = false
          return
        }
        const currentCollections = [
          ...currentPanel.querySelectorAll('.collection-roadmap button')
        ]
        if (index >= collectionNames.length) {
          const originalButton = currentCollections.find(
            button => getCollectionName(button) === originalName
          )
          if (
            originalButton &&
            originalButton.getAttribute('aria-pressed') !== 'true'
          ) originalButton.click()
          window.setTimeout(() => {
            const restoredPanel = document.querySelector('#advanced-deck-panel')
            if (restoredPanel) cacheArtworkPanel(restoredPanel)
            artworkHarvesting = false
            artworkLibraryReady = artworkLibrary.size > 1
          }, 110)
          return
        }
        const collectionName = collectionNames[index]
        index += 1
        const collection = currentCollections.find(
          button => getCollectionName(button) === collectionName
        )
        if (!collection) {
          collectNext()
          return
        }
        if (collection.getAttribute('aria-pressed') !== 'true') {
          collection.click()
        }
        window.setTimeout(() => {
          const refreshedPanel = document.querySelector('#advanced-deck-panel')
          if (refreshedPanel) cacheArtworkPanel(refreshedPanel)
          collectNext()
        }, 110)
      }
      collectNext()
    }
    beginHarvest(availablePanel)
  }

  const getArtworkTitle = container => (
    container?.querySelector('.mythic-card-header h2')?.textContent?.trim() ||
    container?.closest('.keepsake-canvas')
      ?.querySelector('.keepsake-header h2')?.textContent?.trim() ||
    ''
  )

  const clampPosition = (value, fallback = 50) => {
    const number = Number(value)
    if (!Number.isFinite(number)) return fallback
    return Math.max(0, Math.min(100, number))
  }

  const clampOffset = (value, fallback = 0) => {
    const number = Number(value)
    if (!Number.isFinite(number)) return fallback
    return Math.max(-100, Math.min(100, number))
  }

  const clampScale = value => {
    const number = Number(value)
    if (!Number.isFinite(number)) return 1
    return Math.max(.7, Math.min(2, number))
  }

  const getArtworkTransform = saved => {
    const x = clampPosition(saved?.x)
    const yOffset = saved?.yOffset == null
      ? clampOffset((clampPosition(saved?.y) - 50) * 2)
      : clampOffset(saved.yOffset)
    return {
      x,
      xOffset: clampOffset((x - 50) * 2),
      yOffset,
      scale: clampScale(saved?.scale)
    }
  }

  const applySavedArtworkPositions = () => {
    const targets = [
      ...document.querySelectorAll('.mythic-card'),
      ...document.querySelectorAll('.keepsake-art')
    ]
    targets.forEach(container => {
      const card = container.classList.contains('mythic-card')
        ? container
        : container.closest('.keepsake-canvas')
      const title = getArtworkTitle(card)
      const image = container.classList.contains('keepsake-art')
        ? container.querySelector('img')
        : container.querySelector('.mythic-art-frame img')
      if (!image || !title) return
      const saved = getArtworkTransform(settings.artworkPositions[title] || {
        x: 50,
        yOffset: 0,
        scale: 1
      })
      image.style.setProperty('--saved-artwork-shift-x', `${saved.xOffset}%`)
      image.style.setProperty('--saved-artwork-shift-y', `${saved.yOffset}%`)
      image.style.setProperty('--saved-artwork-scale', saved.scale)
      image.dataset.artworkTitle = title
    })
  }

  let artworkRestorePending = false
  const restoreSelectedArtwork = () => {
    if (
      !settings.selectedArtworkTitle ||
      artworkRestorePending ||
      artworkHarvesting
    ) return
    const panel = document.querySelector('#advanced-deck-panel')
    if (!panel) {
      const disclosure = document.querySelector('.advanced-deck-disclosure')
      if (!disclosure) return
      artworkRestorePending = true
      disclosure.click()
      window.setTimeout(() => {
        artworkRestorePending = false
        restoreSelectedArtwork()
      }, 100)
      return
    }

    const selected = [...panel.querySelectorAll('.artwork-picker button')]
      .find(button => (
        button.querySelector('span')?.textContent?.trim() ===
        settings.selectedArtworkTitle
      ))
    if (selected) {
      if (selected.getAttribute('aria-pressed') !== 'true') selected.click()
      return
    }

    const collection = [...panel.querySelectorAll('.collection-roadmap button')]
      .find(button => (
        button.querySelector('b')?.textContent?.trim() ||
        button.textContent.trim()
      ) === settings.selectedArtworkCollection)
    if (collection && collection.getAttribute('aria-pressed') !== 'true') {
      artworkRestorePending = true
      collection.click()
      window.setTimeout(() => {
        artworkRestorePending = false
        restoreSelectedArtwork()
      }, 100)
    }
  }

  const buildArtworkEditor = card => {
    const title = getArtworkTitle(card)
    const sourceImage = card.querySelector('.mythic-art-frame img')
    if (!title || !sourceImage) return
    const current = getArtworkTransform(settings.artworkPositions[title] || {
      x: 50,
      yOffset: 0,
      scale: 1
    })
    const editor = document.createElement('section')
    editor.id = 'v38-artwork-editor'
    editor.className = 'artwork-position-editor'
    editor.dataset.artworkTitle = title
    editor.setAttribute('role', 'dialog')
    editor.setAttribute('aria-label', 'Adjust card artwork')
    editor.innerHTML = `
      <header>
        <button type="button" data-editor-cancel>取消</button>
        <div><b>調整照片</b><small>${title}</small></div>
        <button type="button" data-editor-save>儲存</button>
      </header>
      <div class="artwork-editor-preview">
        <img alt="">
        <div class="composition-grid" aria-hidden="true"></div>
        <button type="button" class="composition-grid-toggle" data-grid-toggle aria-pressed="true">
          九宮格
        </button>
      </div>
      <div class="artwork-editor-controls">
        <label>水平位置 <output data-output-x></output>
          <input type="range" min="0" max="100" step="1" name="x">
        </label>
        <label>垂直位移 <output data-output-y></output>
          <input type="range" min="-100" max="100" step="1" name="y">
        </label>
        <label>照片大小 <output data-output-scale></output>
          <input type="range" min="70" max="200" step="1" name="scale">
        </label>
      </div>
      <p>垂直位移：負值向上、正值向下，可調 −100%～+100%。照片 100% 會保留完整圖片；放大可能裁切上下緣或台灣圖案，請搭配位置調整。</p>
      <button type="button" class="editor-reset" data-editor-reset>回復完整置中</button>
    `
    const preview = editor.querySelector('.artwork-editor-preview img')
    preview.src = sourceImage.src
    preview.alt = title
    const xInput = editor.querySelector('[name="x"]')
    const yInput = editor.querySelector('[name="y"]')
    const scaleInput = editor.querySelector('[name="scale"]')
    xInput.value = String(clampPosition(current.x))
    yInput.value = String(clampOffset(current.yOffset))
    scaleInput.value = String(Math.round(clampScale(current.scale) * 100))

    const updatePreview = () => {
      const x = clampPosition(xInput.value)
      const xOffset = clampOffset((x - 50) * 2)
      const yOffset = clampOffset(yInput.value)
      const scale = clampScale(Number(scaleInput.value) / 100)
      preview.style.objectPosition = '50% 50%'
      preview.style.transformOrigin = '50% 50%'
      preview.style.transform =
        `translate3d(${xOffset}%, ${yOffset}%, 0) scale(${scale})`
      editor.querySelector('[data-output-x]').textContent = `${x}%`
      editor.querySelector('[data-output-y]').textContent =
        `${yOffset > 0 ? '+' : ''}${yOffset}%`
      editor.querySelector('[data-output-scale]').textContent =
        `${Math.round(scale * 100)}%`
    }
    editor.addEventListener('input', updatePreview)
    editor.addEventListener('click', event => {
      const button = event.target.closest('button')
      if (!button) return
      if (button.hasAttribute('data-editor-cancel')) editor.remove()
      if (button.hasAttribute('data-grid-toggle')) {
        const grid = editor.querySelector('.composition-grid')
        const visible = button.getAttribute('aria-pressed') === 'true'
        button.setAttribute('aria-pressed', String(!visible))
        grid.hidden = visible
      }
      if (button.hasAttribute('data-editor-reset')) {
        xInput.value = '50'
        yInput.value = '0'
        scaleInput.value = '100'
        updatePreview()
      }
      if (button.hasAttribute('data-editor-save')) {
        settings.artworkPositions[title] = {
          x: clampPosition(xInput.value),
          yOffset: clampOffset(yInput.value),
          scale: clampScale(Number(scaleInput.value) / 100)
        }
        saveSettings()
        applySavedArtworkPositions()
        renderSavedPositions()
        editor.remove()
      }
    })
    document.body.appendChild(editor)
    updatePreview()
  }

  const openCurrentArtworkEditor = () => {
    const currentCard = document.querySelector(
      '.game-card-block .mythic-card'
    )
    if (!currentCard) return
    document.querySelector('#v38-artwork-editor')?.remove()
    buildArtworkEditor(currentCard)
  }

  const applyFontScale = () => {
    const scale = Math.max(.8, Math.min(1.4, Number(settings.fontScale) || 1))
    settings.fontScale = scale
    document.querySelectorAll('.v35-shell').forEach(shell => {
      shell.style.setProperty('--reader-font-scale', scale)
      shell.style.setProperty('--question-font-scale', 1.2 * scale)
      shell.style.setProperty('--blessing-font-scale', 1.25 * scale)
    })
    document.querySelectorAll('.mythic-card, .keepsake-canvas').forEach(card => {
      card.style.setProperty('--reader-font-scale', scale)
      card.style.setProperty('--question-font-scale', 1.2 * scale)
      card.style.setProperty('--blessing-font-scale', 1.25 * scale)
    })
    document.querySelectorAll('.font-size-control').forEach(control => {
      control.dataset.fontPercent = String(Math.round(scale * 100))
      control.setAttribute(
        'aria-label',
        `Font size ${Math.round(scale * 100)}%`
      )
      control.querySelectorAll('button').forEach(button => {
        button.setAttribute(
          'aria-label',
          button.textContent?.includes('−')
            ? `縮小字體，目前 ${Math.round(scale * 100)}%`
            : `放大字體，目前 ${Math.round(scale * 100)}%`
        )
      })
    })
  }

  const changeFontScale = delta => {
    settings.fontScale = Math.max(
      .8,
      Math.min(1.4, Number((settings.fontScale + delta).toFixed(1)))
    )
    saveSettings()
    applyFontScale()
  }

  const applyArtworkOverride = () => {
    if (!activeArtworkOverride) return
    const updateCard = card => {
      const image = card.querySelector('.mythic-art-frame img')
      const title = card.querySelector('.mythic-card-header h2')
      const english = card.querySelector('.mythic-card-header h2 + small')
      if (image) {
        image.src = activeArtworkOverride.src
        image.alt = activeArtworkOverride.title
      }
      if (title) title.textContent = activeArtworkOverride.title
      if (english && activeArtworkOverride.enName) {
        english.textContent = activeArtworkOverride.enName
      }
      card.dataset.artworkOverride = activeArtworkOverride.title
    }
    document.querySelectorAll('.game-card-block .mythic-card').forEach(updateCard)
    document.querySelectorAll('.keepsake-canvas').forEach(canvas => {
      const image = canvas.querySelector('.keepsake-art img')
      const title = canvas.querySelector('.keepsake-header h2')
      const english = canvas.querySelector('.keepsake-header h2 + small')
      if (image) {
        image.src = activeArtworkOverride.src
        image.alt = activeArtworkOverride.title
      }
      if (title) title.textContent = activeArtworkOverride.title
      if (english && activeArtworkOverride.enName) {
        english.textContent = activeArtworkOverride.enName
      }
      canvas.dataset.artworkOverride = activeArtworkOverride.title
    })
  }

  const buildReselectArtworkPicker = () => {
    cacheVisibleArtwork()
    const artworks = [...artworkLibrary.values()]
    if (!artworks.length) return
    document.querySelector('#v38-photo-picker')?.remove()
    const picker = document.createElement('section')
    picker.id = 'v38-photo-picker'
    picker.className = 'photo-card-picker'
    picker.setAttribute('role', 'dialog')
    picker.setAttribute('aria-label', 'Choose another card')
    picker.innerHTML = `
      <header>
        <button type="button" data-photo-cancel>取消</button>
        <div><b>重新選擇卡片</b><small>CHOOSE ANOTHER CARD</small></div>
        <button type="button" data-photo-done disabled>完成</button>
      </header>
      <nav class="photo-picker-albums" aria-label="Card collections"></nav>
      <div class="photo-picker-summary">只更換卡面，問題與祝福語會保留</div>
      <div class="photo-picker-grid"></div>
    `
    const collections = [...new Set(artworks.map(item => item.collection))]
    let activeCollection = collections[0]
    let selected = null
    const render = () => {
      const nav = picker.querySelector('.photo-picker-albums')
      const grid = picker.querySelector('.photo-picker-grid')
      nav.replaceChildren()
      collections.forEach(collection => {
        const button = document.createElement('button')
        button.type = 'button'
        button.textContent = collection
        button.setAttribute(
          'aria-pressed',
          String(collection === activeCollection)
        )
        button.addEventListener('click', () => {
          activeCollection = collection
          render()
        })
        nav.appendChild(button)
      })
      grid.replaceChildren()
      artworks
        .filter(item => item.collection === activeCollection)
        .forEach(item => {
          const tile = document.createElement('button')
          tile.type = 'button'
          tile.className = 'photo-picker-tile'
          tile.setAttribute(
            'aria-pressed',
            String(
              selected?.title === item.title &&
              selected?.src === item.src
            )
          )
          tile.innerHTML = `
            <img alt="">
            <span></span>
            <i aria-hidden="true">✓</i>
          `
          tile.querySelector('img').src = item.src
          tile.querySelector('img').alt = item.title
          tile.querySelector('span').textContent = item.title
          tile.addEventListener('click', () => {
            selected = item
            picker.querySelector('[data-photo-done]').disabled = false
            picker.querySelector('.photo-picker-summary').textContent =
              `已選擇：${item.title}（問題與祝福語不變）`
            render()
          })
          grid.appendChild(tile)
        })
    }
    picker.addEventListener('click', event => {
      const button = event.target.closest('button')
      if (!button) return
      if (button.hasAttribute('data-photo-cancel')) picker.remove()
      if (button.hasAttribute('data-photo-done') && selected) {
        activeArtworkOverride = selected
        settings.selectedArtworkTitle = selected.title
        settings.selectedArtworkCollection = selected.collection
        saveSettings()
        applyArtworkOverride()
        applySavedArtworkPositions()
        picker.remove()
        document.querySelector('#v40-artwork-tools')?.remove()
        ensureCombinedArtworkTools()
      }
    })
    document.body.appendChild(picker)
    render()
  }

  const ensureCombinedArtworkTools = () => {
    document.querySelectorAll('.artwork-adjust-button').forEach(button => {
      button.remove()
    })
    const card = document.querySelector('.game-card-block .mythic-card')
    const candidateFan = document.querySelector('.artwork-candidate-fan')
    const existingPanel = document.querySelector('#v40-artwork-tools')

    if (candidateFan && !card) {
      existingPanel?.remove()
      candidateFan.classList.remove('artwork-tools-combined')
      candidateFan.classList.add('compact-draw-settings')
      if (!candidateFan.querySelector('[data-draw-settings]')) {
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'compact-draw-settings-button'
        button.setAttribute('data-draw-settings', '')
        button.innerHTML = `
          <span><b>抽卡設定</b><small>指定卡片・指定問題・Level</small></span>
          <i aria-hidden="true">⚙</i>
        `
        candidateFan.appendChild(button)
      }
      return
    }

    if (!card) {
      activeArtworkOverride = null
      existingPanel?.remove()
      document.querySelector('#v38-artwork-editor')?.remove()
      return
    }

    if (candidateFan) {
      existingPanel?.remove()
      candidateFan.classList.remove('compact-draw-settings')
      candidateFan.querySelector('[data-draw-settings]')?.remove()
      candidateFan.classList.add('artwork-tools-combined')
      const heading = candidateFan.querySelector(':scope > div:first-child')
      if (heading && !heading.querySelector('[data-inline-adjust]')) {
        const title = heading.querySelector('b')
        const copy = heading.querySelector('small')
        if (title) title.textContent = '挑一張喜歡的卡面・調整照片'
        if (copy) copy.textContent = 'CHOOSE & ADJUST'
        const button = document.createElement('button')
        const chooseButton = document.createElement('button')
        chooseButton.type = 'button'
        chooseButton.className = 'inline-artwork-reselect'
        chooseButton.setAttribute('data-reselect-artwork', '')
        chooseButton.textContent = '重新選擇卡片'
        heading.appendChild(chooseButton)
        button.type = 'button'
        button.className = 'inline-artwork-adjust'
        button.setAttribute('data-inline-adjust', '')
        button.textContent = '調整目前卡面'
        heading.appendChild(button)
      }
      return
    }

    if (existingPanel) return
    const image = card.querySelector('.mythic-art-frame img')
    const title = getArtworkTitle(card)
    if (!image || !title) return
    const panel = document.createElement('section')
    panel.id = 'v40-artwork-tools'
    panel.className = 'artwork-control-panel'
    panel.setAttribute('aria-label', 'Choose and adjust card artwork')
    panel.innerHTML = `
      <div class="artwork-control-copy">
        <img alt="">
        <span><b>挑一張喜歡的卡面・調整照片</b><small></small></span>
      </div>
      <button type="button" data-reselect-artwork>重新選擇</button>
      <button type="button" data-inline-adjust>調整照片</button>
    `
    panel.querySelector('img').src = image.src
    panel.querySelector('img').alt = title
    panel.querySelector('small').textContent = title
    document.querySelector('.game-canvas')?.appendChild(panel)
  }

  const enhanceLanguageMenus = () => {
    document.querySelectorAll('.language-switch').forEach(switcher => {
      const buttons = [...switcher.querySelectorAll(':scope > button')]
      if (!buttons.length) return
      const active = buttons.find(button => (
        button.getAttribute('aria-pressed') === 'true' ||
        button.classList.contains('active')
      ))
      const activeLabel = active?.getAttribute('aria-label') || '中文'
      const activeValue = activeLabel.includes('English')
        ? 'en'
        : activeLabel.includes('雙語')
          ? 'bilingual'
          : 'zh'
      let select = switcher.querySelector('.language-select')
      if (!select) {
        select = document.createElement('select')
        select.className = 'language-select'
        select.setAttribute('aria-label', '選擇語言 · Choose language')
        select.innerHTML = `
          <option value="zh">中文</option>
          <option value="en">English</option>
          <option value="bilingual">中文／English</option>
        `
        select.addEventListener('change', () => {
          const label = select.value === 'en'
            ? 'English'
            : select.value === 'bilingual'
              ? '雙語 Bilingual'
              : '中文'
          const target = buttons.find(button => (
            button.getAttribute('aria-label') === label
          ))
          target?.click()
        })
        switcher.appendChild(select)
      }
      if (select.value !== activeValue) select.value = activeValue
    })
  }

  const renderSavedPositions = () => {
    const manager = document.querySelector(`#${MANAGER_ID}`)
    const list = manager?.querySelector('.saved-position-list')
    if (!list) return
    list.replaceChildren()
    const entries = Object.entries(settings.artworkPositions)
    if (!entries.length) {
      const empty = document.createElement('p')
      empty.textContent = '尚未儲存任何照片位置。'
      list.appendChild(empty)
      return
    }
    entries.forEach(([title, position]) => {
      const item = document.createElement('article')
      item.innerHTML = `
        <div><b></b><small></small></div>
        <button type="button">清除</button>
      `
      item.querySelector('b').textContent = title
      item.querySelector('small').textContent =
        `X ${position.x}% · Y ${position.y}% · SIZE ${Math.round(position.scale * 100)}%`
      item.querySelector('button').addEventListener('click', () => {
        delete settings.artworkPositions[title]
        saveSettings()
        applySavedArtworkPositions()
        renderSavedPositions()
      })
      list.appendChild(item)
    })
  }

  const buildGuide = () => {
    const guide = document.createElement('section')
    guide.id = SELECTOR_ID
    guide.className = 'selection-guide'
    guide.setAttribute('aria-label', 'Independent card face and question choices')
    guide.innerHTML = `
      <div class="selection-guide-heading">
        <b>卡面與問題分開選擇</b>
        <button type="button" data-choice="manage">管理卡庫／問題庫 ⚙</button>
      </div>
      <div class="selection-guide-row">
        <span class="selection-guide-copy">
          <b>① 卡片封面 · Card face</b>
          <small>指定卡面後，問題仍可另外隨機抽出。</small>
        </span>
        <button type="button" data-choice="random-face">隨機卡面</button>
        <button type="button" class="is-primary" data-choice="choose-face">從卡庫選擇</button>
      </div>
      <div class="selection-guide-row">
        <span class="selection-guide-copy">
          <b>② 問題 · Question</b>
          <small>預設每次隨機抽題，也可以指定其中一題。</small>
        </span>
        <button type="button" data-choice="random-question">隨機抽題</button>
        <button type="button" class="is-primary" data-choice="choose-question">指定問題</button>
      </div>
    `

    guide.addEventListener('click', event => {
      const button = event.target.closest('button[data-choice]')
      if (!button) return
      const choice = button.dataset.choice
      if (choice === 'random-face') resetArtworkToRandom()
      if (choice === 'choose-face') {
        clickWhenReady('.card-library-trigger')
      }
      if (choice === 'random-question') resetQuestionToRandom()
      if (choice === 'choose-question') openQuestionPicker()
      if (choice === 'manage') openManager('cards')
    })
    return guide
  }

  const enhanceSetup = () => {
    document.querySelectorAll('.card-library-trigger').forEach(trigger => {
      if (trigger.dataset.settingsTrigger === 'true') return
      trigger.dataset.settingsTrigger = 'true'
      trigger.classList.add('settings-trigger')
      trigger.setAttribute('aria-label', '開啟設定 · Open settings')
      trigger.innerHTML = `
        <span aria-hidden="true">⚙</span>
        <small>設定</small>
      `
    })
  }

  const updateVersionLabels = () => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    )
    const nodes = []
    while (walker.nextNode()) nodes.push(walker.currentNode)
    nodes.forEach(node => {
      if (node.nodeValue && node.nodeValue.includes('V35')) {
        node.nodeValue = node.nodeValue.replaceAll('V35', 'V36')
      }
    })
  }

  const protectTaiwanPortraits = () => {
    document.querySelectorAll('.mythic-card').forEach(card => {
      const title = card.querySelector('.mythic-card-header h2')?.textContent?.trim()
      card.classList.toggle(
        'taiwan-portrait-safe',
        TAIWAN_LOCAL_STORY_TITLES.has(title)
      )
    })

    document.querySelectorAll('.artwork-picker button').forEach(button => {
      const title = button.querySelector('span')?.textContent?.trim()
      button.classList.toggle(
        'taiwan-portrait-safe',
        TAIWAN_LOCAL_STORY_TITLES.has(title)
      )
    })

    document.querySelectorAll('.keepsake-canvas').forEach(canvas => {
      const title = canvas.querySelector('.keepsake-header h2')?.textContent?.trim()
      canvas.classList.toggle(
        'taiwan-portrait-safe',
        TAIWAN_LOCAL_STORY_TITLES.has(title)
      )
    })
  }

  const chooseManagedQuestion = (level, mode) => {
    const disabled = new Set(settings.disabledQuestionIds)
    const selected = allQuestions().find(
      question => question.id === settings.selectedQuestionId
    )
    if (
      selected &&
      selected.level === level &&
      !disabled.has(selected.id) &&
      (mode === 'random' || selected.mode === mode)
    ) {
      return selected
    }

    const eligible = allQuestions().filter(question => (
      question.level === level &&
      !disabled.has(question.id) &&
      (mode === 'random' || question.mode === mode)
    ))
    if (!eligible.length) return null
    return eligible[Math.floor(Math.random() * eligible.length)]
  }

  const applyManagedQuestion = () => {
    document.querySelectorAll('.game-card-block .mythic-card').forEach(card => {
      const questionParagraph = card.querySelector('.mythic-question p')
      if (!questionParagraph || !baseQuestions.length) return
      const currentText = questionParagraph.textContent?.trim() || ''
      if (
        card.dataset.managedQuestionZh &&
        currentText === card.dataset.managedQuestionZh
      ) return

      const question = chooseManagedQuestion(
        getSelectedLevel(),
        getSelectedMode()
      )
      if (!question) return
      questionParagraph.textContent = question.zh
      const english = card.querySelector('.mythic-question small')
      if (english) english.textContent = question.en
      card.dataset.managedQuestionZh = question.zh
      card.dataset.managedQuestionId = question.id
      sessionStorage.setItem(
        'encounter-last-managed-question',
        JSON.stringify(question)
      )
    })

    document.querySelectorAll('.keepsake-question').forEach(container => {
      try {
        const question = JSON.parse(
          sessionStorage.getItem('encounter-last-managed-question') || 'null'
        )
        if (!question) return
        const paragraph = container.querySelector('.mythic-question p')
        const english = container.querySelector('.mythic-question small')
        if (paragraph) paragraph.textContent = question.zh
        if (english) english.textContent = question.en
      } catch {
        // Keep the original card copy if session storage is unavailable.
      }
    })
  }

  const applyContentSettings = () => {
    document.querySelectorAll('.mythic-card').forEach(card => {
      card.classList.toggle('hide-real-you', !settings.showRealYou)
      card.classList.toggle('hide-question', !settings.showQuestion)
      card.classList.toggle('hide-blessing', !settings.showBlessing)
    })
    document.querySelectorAll('.keepsake-canvas').forEach(canvas => {
      canvas.classList.toggle('hide-real-you', !settings.showRealYou)
      canvas.classList.toggle('hide-question', !settings.showQuestion)
      canvas.classList.toggle('hide-blessing', !settings.showBlessing)
    })
  }

  const simplifyCardLibrary = () => {
    document.querySelectorAll('.library-mythic-card').forEach(card => {
      card.classList.add('library-card-content-only')
    })
  }

  let scheduled = false
  const scheduleEnhancement = () => {
    if (scheduled) return
    scheduled = true
    window.requestAnimationFrame(() => {
      scheduled = false
      enhanceSetup()
      updateVersionLabels()
      protectTaiwanPortraits()
      simplifyCardLibrary()
      applyManagedQuestion()
      applyContentSettings()
      applyArtworkOverride()
      applySavedArtworkPositions()
      applyFontScale()
      restoreSelectedArtwork()
      cacheVisibleArtwork()
      harvestArtworkLibrary()
      ensureCombinedArtworkTools()
      enhanceLanguageMenus()
      syncGeneralSettings()
    })
  }

  document.addEventListener('click', event => {
    const fontButton = event.target.closest('.font-size-control button')
    if (fontButton) {
      event.preventDefault()
      event.stopImmediatePropagation()
      changeFontScale(fontButton.textContent?.includes('−') ? -.1 : .1)
      return
    }
    const drawSettingsTrigger = event.target.closest('[data-draw-settings]')
    if (drawSettingsTrigger) {
      event.preventDefault()
      event.stopImmediatePropagation()
      openManager('general')
      return
    }
    const reselectTrigger = event.target.closest('[data-reselect-artwork]')
    if (reselectTrigger) {
      event.preventDefault()
      event.stopImmediatePropagation()
      buildReselectArtworkPicker()
      return
    }
    const adjustTrigger = event.target.closest('[data-inline-adjust]')
    if (adjustTrigger) {
      event.preventDefault()
      event.stopImmediatePropagation()
      openCurrentArtworkEditor()
      return
    }
    const trigger = event.target.closest('.card-library-trigger')
    if (!trigger || allowNativeCardLibrary) return
    event.preventDefault()
    event.stopImmediatePropagation()
    openManager('general')
  }, true)

  const observer = new MutationObserver(scheduleEnhancement)
  observer.observe(document.documentElement, {
    childList: true,
    characterData: true,
    subtree: true
  })
  window.addEventListener('DOMContentLoaded', scheduleEnhancement)
  loadBaseQuestions()
  scheduleEnhancement()
})()
