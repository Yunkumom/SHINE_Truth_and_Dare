# Development / 開發資料

This directory contains preserved v18–v31 source lines and the current Encounter Cards v32 source line. Historical v17 source, older completed plans, old-version builders, and generated dependencies remain recoverable under `../_pending/`.

此目錄保留 v18–v31 source 與目前作用中的 Encounter Cards v32 source。v17 歷史 source、舊版計畫、builder 與可重建依賴仍可由 `../_pending/` 回復。

## Structure / 結構

```text
Development/
├── README.md
├── Source/Main-App-v18/       # Preserved v18 React/TypeScript application
├── Source/Main-App-v19/       # Preserved first deity-card source line
├── Source/Main-App-v20/       # Preserved v16-inspired deity-card application
├── Source/Main-App-v21/       # Preserved hidden-Taiwan reveal application
├── Source/Main-App-v22/       # Preserved layout-editor and swipe-deck application
├── Source/Main-App-v23/       # Preserved Taiwan-safe artwork application
├── Source/Main-App-v24/       # Current precise coastline-reveal application
├── Source/Main-App-v25/       # Current desktop workspace and portrait-safe application
├── Source/Main-App-v26/       # Current physical-ratio phone frame and card editor application
├── Source/Main-App-v27/       # Preserved entrance-layout refinement
├── Source/Main-App-v28/       # Preserved Baosheng safe-artwork release
├── Source/Main-App-v29/       # Preserved readable adjustable card-text release
├── Source/Main-App-v30/       # Preserved 18-artwork portrait-safe release
├── Source/Main-App-v31/       # Current milk-tea setup release
├── Source/Main-App-v32/       # Current desktop-mode, safe-text, and artwork-choice release
├── Source/Public-Web/v2/      # Preserved Public v2 source recipe
├── Source/Public-Web/v3/      # Preserved Public v3 source recipe
├── Source/Public-Web/v4/      # Preserved Public v4 source recipe
├── Source/Public-Web/v5/      # Preserved Public v5 source recipe
├── Source/Public-Web/v6/      # Preserved Public v6 source recipe
├── Source/Public-Web/v7/      # Current Public v7 source recipe
├── Source/Public-Web/v8/      # Current Public v8 source recipe
├── Source/Public-Web/v10/     # Preserved v27 public recipe
├── Source/Public-Web/v11/     # Preserved v28 public recipe
├── Source/Public-Web/v12/     # Current v29 public recipe
├── Source/Public-Web/v13/     # Preserved v30 public recipe
├── Source/Public-Web/v14/     # Current v31 public recipe
├── Source/Public-Web/v15/     # Current v32 public recipe
├── Automation/Scripts/        # Versioned v18-v32 builders and exporters
├── Automation/Tools/          # Local desktop launcher server
├── Tests/                     # Current structure and release contracts
└── Documentation/             # Current product and interaction contracts
```

## Root and Documentation Files / 根層與規格檔案

| File | Meaning / 意義 |
| --- | --- |
| `README.md` | This canonical inventory and the normal development commands. / 本檔：Development 的正式清單與常用命令。 |
| `Documentation/README.md` | Defines which documents remain active and where history is archived. / 說明目前文件範圍與歷史封存位置。 |
| `Documentation/PRODUCT_SPEC.md` | Product surface, flow, privacy boundary, and verified-version distinctions. / 產品介面、流程、隱私邊界及版本驗證差異。 |
| `Documentation/ARCHITECTURE.md` | Runtime, state, source modules, build outputs, and privacy architecture. / Runtime、狀態、source 模組、build 輸出與隱私架構。 |
| `Documentation/ANIMATION_SPEC.md` | Drag, flip, discard, reduced-motion, and accessibility interaction contract. / 拖曳、翻牌、丟棄、減少動態與無障礙互動合約。 |
| `Documentation/CARD_CONTENT.md` | Card schema, level boundaries, safety rules, and bilingual content guidance. / 卡牌 schema、分級邊界、安全規則與雙語內容指引。 |
| `Documentation/pwa-offline-strategy.md` | PWA precache, offline readiness, update, and fallback policy. / PWA 預快取、離線狀態、更新與備援政策。 |
| `Documentation/V20_VISUAL_DESIGN.md` | Approved v16-inspired entrance, card, artwork, and centering design contract. / 已核准的 v20 視覺合約。 |
| `Documentation/V20_IMPLEMENTATION_PLAN.md` | Testable v20 source, asset, release, and validation plan. / 可驗證的 v20 實作計畫。 |
| `Documentation/V21_TAIWAN_REVEAL_DESIGN.md` | Approved long-press timing, locator, hotspot, motion, and accessibility contract. / 已核准的 v21 長按、定位、動畫與無障礙合約。 |
| `Documentation/V21_TAIWAN_REVEAL_PLAN.md` | Test-first v21 source, release, documentation, and regression plan. / 測試優先的 v21 實作與驗證計畫。 |
| `Documentation/V22_LAYOUT_EDITOR_DESIGN.md` | Approved v22 layout-editor, swipe/flip, enlarged-card, and keepsake contract. / 已核准的 v22 版面編輯、滑動翻牌、放大卡片及紀念卡合約。 |
| `Documentation/V22_LAYOUT_EDITOR_PLAN.md` | Test-first v22 implementation and release plan. / 測試優先的 v22 實作與發行計畫。 |
| `Documentation/V23_TAIWAN_ARTWORK_DESIGN.md` | Approved v23 Taiwan-safe artwork and reveal contract. / 已核准的 v23 台灣安全圖與揭示合約。 |
| `Documentation/V23_TAIWAN_ARTWORK_PLAN.md` | Test-first v23 implementation and release plan. / 測試優先的 v23 實作與發行計畫。 |
| `Documentation/V24_TAIWAN_OUTLINE_DESIGN.md` | Approved v24 coastline-only glow contract. / 已核准的 v24 台灣海岸線發光合約。 |
| `Documentation/V24_TAIWAN_OUTLINE_PLAN.md` | Test-first v24 implementation and release plan. / 測試優先的 v24 實作與發行計畫。 |
| `Documentation/V25_DESKTOP_WORKSPACE_DESIGN.md` | Approved v25 desktop/mobile and portrait-safe design. / 已核准 v25 桌機／手機與人像安全設計。 |
| `Documentation/V25_DESKTOP_WORKSPACE_PLAN.md` | Test-first v25 release plan. / 測試優先 v25 發行計畫。 |
| `Documentation/V28_BAOSHENG_SAFE_ARTWORK_DESIGN.md` | Approved wide, crown-safe Baosheng artwork contract. / 已核准保生大帝寬構圖安全合約。 |
| `Documentation/V28_BAOSHENG_SAFE_ARTWORK_PLAN.md` | Test-first v28 release plan. / 測試優先 v28 發行計畫。 |
| `Documentation/V29_READABLE_CARD_TEXT_DESIGN.md` | Approved readable question/blessing typography contract. / 已核准的問題／祝福易讀字級合約。 |
| `Documentation/V29_READABLE_CARD_TEXT_PLAN.md` | Test-first v29 release plan. / 測試優先 v29 發行計畫。 |
| `Documentation/V30_PORTRAIT_SAFE_ARTWORK_DESIGN.md` | Approved 18-artwork expanded-scene and crop-safety contract. / 已核准的 18 張擴充場景與裁切安全合約。 |
| `Documentation/V30_PORTRAIT_SAFE_ARTWORK_PLAN.md` | v30 generation, rejection, integration, and verification plan. / v30 生成、淘汰、整合與驗證計畫。 |

## Automation and Validation / 自動化與驗證

| File | Meaning / 意義 |
| --- | --- |
| `Automation/Scripts/finalize-pwa-v18.mjs` | Finalizes the v18 PWA manifest/service-worker cache from the generated `dist/`. / 依生成的 `dist/` 完成 v18 PWA manifest 與 service-worker cache。 |
| `Automation/Scripts/export-standalone-v18.mjs` | Produces the self-contained `Apps/Standalone/encounter_cards_v18.html` from the v18 build. / 從 v18 build 產生獨立單檔 release。 |
| `Automation/Scripts/export-standalone-v19.mjs` | Produces the artwork-embedded v19 standalone without overwriting an existing release. / 產生內嵌神祇圖的 v19 單檔版。 |
| `Automation/Scripts/finalize-pwa-v19.mjs` | Finalizes the v19 offline precache. / 完成 v19 離線快取。 |
| `Automation/Scripts/finalize-public-v2.mjs` | Creates the immutable Public Web v2 artifact from the verified v19 build. / 從 v19 建立不可變 Public Web v2。 |
| `Automation/Scripts/export-standalone-v20.mjs` | Produces the artwork-embedded v20 standalone without overwriting an existing release. / 產生內嵌 18 張神祇圖的 v20 單檔版。 |
| `Automation/Scripts/finalize-pwa-v20.mjs` | Finalizes the v20 offline precache. / 完成 v20 離線快取。 |
| `Automation/Scripts/finalize-public-v3.mjs` | Creates immutable Public Web v3 from the verified v20 build. / 從 v20 建立不可變 Public Web v3。 |
| `Automation/Scripts/export-standalone-v21.mjs` | Produces immutable standalone v21 with artwork and reveal runtime embedded. / 產生內嵌圖像與揭示互動的 v21 單檔版。 |
| `Automation/Scripts/finalize-pwa-v21.mjs` | Finalizes the v21 offline precache. / 完成 v21 離線快取。 |
| `Automation/Scripts/finalize-public-v4.mjs` | Creates immutable Public Web v4 from the verified v21 build. / 從 v21 建立不可變 Public Web v4。 |
| `Automation/Scripts/export-standalone-v22.mjs` | Produces immutable standalone v22 with editor, swipe deck, and keepsake runtime embedded. / 產生內嵌編輯器、牌堆及紀念卡的 v22 單檔版。 |
| `Automation/Scripts/finalize-pwa-v22.mjs` | Finalizes the v22 offline precache. / 完成 v22 離線快取。 |
| `Automation/Scripts/finalize-public-v5.mjs` | Creates immutable Public Web v5 from the verified v22 build. / 從 v22 建立不可變 Public Web v5。 |
| `Automation/Scripts/export-standalone-v23.mjs` | Produces immutable standalone v23 with Taiwan-safe artwork embedded. / 產生內嵌台灣安全圖的 v23 單檔版。 |
| `Automation/Scripts/finalize-pwa-v23.mjs` | Finalizes the v23 offline precache. / 完成 v23 離線快取。 |
| `Automation/Scripts/finalize-public-v6.mjs` | Creates immutable Public Web v6 from the verified v23 build. / 從 v23 建立不可變 Public Web v6。 |
| `Automation/Scripts/export-standalone-v24.mjs` | Produces immutable standalone v24 with the coastline reveal embedded. / 產生內嵌海岸線揭示的 v24 單檔版。 |
| `Automation/Scripts/finalize-pwa-v24.mjs` | Finalizes the v24 offline precache. / 完成 v24 離線快取。 |
| `Automation/Scripts/finalize-public-v7.mjs` | Creates immutable Public Web v7 from the verified v24 build. / 從 v24 建立不可變 Public Web v7。 |
| `Automation/Tools/serve_truth_and_dare.ps1` | Starts a loopback-only HTTP server and opens current v26. / 啟動僅限本機的 HTTP server 並開啟目前 v26。 |
| `Tests/validate_v18.ps1` | Verifies preserved v18 contracts and release hashes. / 驗證保留的 v18 合約與 release 雜湊。 |
| `Tests/validate_v19.ps1` | Verifies preserved v19 artwork, standalone embedding, hash, and Public Web v2 output. / 驗證保留的 v19 圖像、單檔、雜湊與公開 v2。 |
| `Tests/validate_v20.ps1` | Verifies v20 visual markers, 18 artworks, blessing/download contracts, hashes, public output, and launcher target. / 驗證 v20 視覺、18 張圖、祝福／下載、雜湊、公開輸出與啟動器。 |
| `Tests/validate_v21.ps1` | Verifies all 18 hotspots, long-press timing, animation, keyboard parity, release hash, and preserved Public Web v4. / 驗證 18 個熱點、長按時序、動畫、鍵盤、雜湊與保留的公開 v4。 |
| `Tests/validate_v22.ps1` | Verifies editor, swipe threshold, enlarged card, contact-selectable 63:88 keepsake, release hash, Public Web v5, and launcher. / 驗證編輯器、滑動門檻、放大卡片、聯絡資訊紀念卡、雜湊、公開 v5 與啟動器。 |
| `Tests/validate_v23.ps1` | Verifies 18 Taiwan-safe sources, canonical coloured reveal, centred crop, hashes, Public Web v6, and launcher. / 驗證 18 張安全圖、統一彩色揭示、置中裁切、雜湊、公開 v6 與啟動器。 |
| `Tests/validate_v24.ps1` | Verifies coastline geometry, transparent dual strokes, release hashes, Public Web v7, and launcher. / 驗證海岸線、透明雙線、雜湊、公開 v7 與啟動器。 |
| `Source/Main-App-v25/` | Preserved v25 source and verified `dist/`. / 保留的 v25 source 與已驗證 `dist/`。 |
| `Source/Main-App-v25/src/` | Authored desktop workspace, responsive phone UI, and focal crop implementation. / 桌面工作區、手機響應與焦點裁切原始碼。 |
| `Source/Main-App-v25/src/lib/portrait-focus.ts` | Shared browser/PNG portrait-safe cover geometry. / 瀏覽器與 PNG 共用的人像安全裁切。 |
| `Source/Main-App-v25/src/styles/v25-layout.css` | Desktop two-column and narrow card-header layout. / 桌面雙欄與窄卡名區版面。 |
| `Source/Public-Web/v8/` | Public Web v8 recipe. / 公開 v8 產製說明。 |
| `Automation/Scripts/export-standalone-v25.mjs` | Creates immutable standalone v25. / 產生不可變 standalone v25。 |
| `Automation/Scripts/finalize-pwa-v25.mjs` | Finalizes v25 offline precache. / 完成 v25 離線快取。 |
| `Automation/Scripts/finalize-public-v8.mjs` | Creates Public Web v8. / 產生公開 v8。 |
| `Tests/validate_v25.ps1` | Verifies v25 workspace, focal crop, release, launcher, and Pages targets. / 驗證 v25 工作區、裁切、發行與 Pages。 |
| `Tests/validate_clean_structure.ps1` | Verifies the simplified directory contract. / 驗證精簡後的目錄合約。 |
| `Tests/validate_repository.ps1` | Runs the complete v18–v24 and structure contract. / 執行完整 v18–v24 與結構驗證。 |

## Main-App-v26 additions / v26 新增內容

`Source/Main-App-v26/` is the current authored application and `Source/Main-App-v26/src/` contains its source. `Source/Main-App-v26/src/lib/device-frame.ts` defines the supplied 78.0 × 163.4 mm desktop simulation as a 445 × 932 outer frame around the unchanged 430 × 932 app canvas. `Source/Main-App-v26/src/presentation/presentation-model.ts` owns privacy-safe per-artwork crop/zoom and blessing presentation settings. `Source/Main-App-v26/src/styles/v26-layout.css` owns the synchronized desktop frame and card styles.

`Source/Public-Web/v9/` records the public recipe. `Automation/Scripts/export-standalone-v26.mjs`, `Automation/Scripts/finalize-pwa-v26.mjs`, `Automation/Scripts/finalize-public-v9.mjs`, and `Tests/validate_v26.ps1` form the release boundary.

`Documentation/V26_IPHONE_FRAME_CARD_EDITOR_DESIGN.md` records the approved interaction and privacy design. `Documentation/V26_IPHONE_FRAME_CARD_EDITOR_PLAN.md` records the test-first release plan.

## Main-App-v24 additions / v24 新增內容

`Source/Main-App-v24/` is a preserved authored application, with code under `Source/Main-App-v24/src/`. `Source/Main-App-v24/src/components/TaiwanReveal.tsx` renders two coincident paths from `Source/Main-App-v24/src/lib/taiwan-shape.ts`; `Source/Main-App-v24/src/styles/taiwan-reveal.css` keeps both interiors transparent and applies a broad glow beneath a crisp coastline. The path is normalized from Natural Earth 1:10m map-unit geometry. `Source/Public-Web/v7/` documents the public recipe; `Automation/Scripts/export-standalone-v24.mjs`, `Automation/Scripts/finalize-pwa-v24.mjs`, `Automation/Scripts/finalize-public-v7.mjs`, and `Tests/validate_v24.ps1` own the v24 release boundary.

## Main-App-v23 additions / v23 新增內容

`Source/Main-App-v23/` is a preserved authored application, with code under `Source/Main-App-v23/src/`, and preserves v22 layout, deck, privacy, and export behavior. `Source/Main-App-v23/src/assets/deities/` contains 18 version-bound Taiwan-safe WebP files. `Source/Main-App-v23/src/lib/deity-art.ts` registers their visible-crop coordinates and distinct colours; `Source/Main-App-v23/src/lib/taiwan-shape.ts` owns one detailed geographic silhouette shared by every reveal; and `Source/Main-App-v23/src/components/TaiwanReveal.tsx` renders that outline with artwork-specific colour and accessible motion. `Source/Main-App-v23/src/styles/taiwan-reveal.css`, `Source/Main-App-v23/src/styles/v23.css`, and `Source/Main-App-v23/src/styles/v23-layout.css` keep the baked motif visible and the locator aligned in both the game card and keepsake.

`Source/Main-App-v23/dist/`, `Apps/Standalone/encounter_cards_v23.html`, and `Apps/Public-Web/v6/` are generated verified release outputs; never hand-edit them. `Source/Public-Web/v6/README.md` records the public recipe and `Tests/validate_v23.ps1` verifies the release contract.

## Main-App-v22 additions / v22 新增內容

`Source/Main-App-v22/` preserves the layout editor, swipe deck, privacy-safe layout JSON, and 63:88 keepsake baseline inherited by v23. Its verified outputs remain immutable.

The preserved authored paths are `Source/Main-App-v22/src/`, `Source/Main-App-v22/src/layout/layout-model.ts`, `Source/Main-App-v22/src/components/LayoutEditor.tsx`, `Source/Main-App-v22/src/components/EditableBlock.tsx`, `Source/Main-App-v22/src/components/SwipeDeck.tsx`, `Source/Main-App-v22/src/lib/swipe-deck.ts`, `Source/Main-App-v22/src/lib/share.ts`, and `Source/Main-App-v22/src/styles/v22-layout.css`.

## Main-App-v21 additions / v21 新增內容

`Source/Main-App-v21/` is the preserved hidden-Taiwan source line, with its authored code under `Source/Main-App-v21/src/`. `Source/Main-App-v21/src/components/TaiwanReveal.tsx` owns the 600 ms press-and-hold controller, 3-second post-release timer, movement cancellation, gesture isolation, and Enter/Space parity. `Source/Main-App-v21/src/lib/deity-art.ts` maps all 18 artworks to independent percentage-based hotspots, and `Source/Main-App-v21/src/styles/taiwan-reveal.css` owns the gold Taiwan outline, blinking halo, focus treatment, and reduced-motion fallback. The overlay remains runtime-only and is not part of `Source/Main-App-v21/src/lib/share.ts` PNG export.

`Source/Main-App-v21/dist/`, `Apps/Standalone/encounter_cards_v21.html`, and `Apps/Public-Web/v4/` are generated verified release outputs; never hand-edit them. `Tests/validate_v21.ps1` verifies the release contract.

## Main-App-v20 additions / v20 新增內容

`Source/Main-App-v20/` is the preserved visual baseline. `Source/Main-App-v20/src/` restores the v16 entrance hierarchy, keeps the 430 × 932 mobile contract, anchors the scaled shell to the exact desktop center, independently composes question/artwork/blessing, and exports a separate-panel 1080 × 1620 PNG. `Source/Main-App-v20/src/assets/deities/` contains 18 optimized local artworks. `Source/Main-App-v20/src/styles/v20.css` owns the v16-inspired presentation, `src/lib/encounter.ts` owns independent selection, `src/data/blessings.ts` owns bilingual blessings, and `src/lib/share.ts` owns PNG, Web Share, and desktop download fallback. `Source/Public-Web/v3/README.md` documents the matching preserved public recipe.

`Source/Main-App-v20/dist/` and `Apps/Standalone/encounter_cards_v20.html` are generated verified release outputs; never hand-edit them. `Tests/validate_v20.ps1` verifies the release contract.

## Main-App-v19 additions / v19 新增內容

`Source/Main-App-v19/` is the preserved first deity-card application. `Source/Main-App-v19/src/` contains its authored UI and policies, and `Source/Main-App-v19/src/assets/deities/` contains its optimized artwork. Its `README.md`, package/config files, `public/`, and generated `dist/` remain one immutable versioned line. `Source/Public-Web/v2/README.md` documents the matching preserved public recipe.

`Tests/validate_v19.ps1` verifies v19 artwork count, embedded standalone artwork, immutable hash, and preserved public output.

## Main-App-v18 Project Files / v18 專案設定

| File | Meaning / 意義 |
| --- | --- |
| `Source/Main-App-v18/README.md` | App-specific run, build, and privacy notes. / v18 專用執行、建置與隱私說明。 |
| `Source/Main-App-v18/package.json` | npm scripts plus exact runtime/development dependency declarations. / npm 指令與依賴宣告。 |
| `Source/Main-App-v18/package-lock.json` | Reproducible dependency lock; use `npm ci` to restore `node_modules`. / 可重現依賴鎖；用 `npm ci` 還原依賴。 |
| `Source/Main-App-v18/index.html` | Vite HTML entry that mounts the React application. / 掛載 React app 的 Vite HTML 入口。 |
| `Source/Main-App-v18/vite.config.ts` | Vite and React plugin configuration. / Vite 與 React plugin 設定。 |
| `Source/Main-App-v18/eslint.config.js` | Source linting rules. / 原始碼 lint 規則。 |
| `Source/Main-App-v18/tsconfig.json` | TypeScript project-reference root. / TypeScript project reference 根設定。 |
| `Source/Main-App-v18/tsconfig.app.json` | Browser application TypeScript rules. / 瀏覽器 app 的 TypeScript 規則。 |
| `Source/Main-App-v18/tsconfig.node.json` | Vite/config-side TypeScript rules. / Vite 與設定檔端的 TypeScript 規則。 |

## Authored Application Files / 人工維護的 App 檔案

| File | Meaning / 意義 |
| --- | --- |
| `Source/Main-App-v18/src/main.tsx` | React startup and root mounting. / React 啟動與 root 掛載。 |
| `Source/Main-App-v18/src/App.tsx` | Complete setup, age gate, card session, draw, reveal, export, and responsive-shell UI. / 設定、年齡門檻、卡牌流程、抽卡、翻牌、輸出與響應式外框主介面。 |
| `Source/Main-App-v18/src/App.test.tsx` | Component-level setup and desktop interaction regression tests. / Component 設定與桌面互動回歸測試。 |
| `Source/Main-App-v18/src/types.ts` | Shared application and card TypeScript types. / App 與卡牌共用型別。 |
| `Source/Main-App-v18/src/vite-env.d.ts` | Vite client type declarations. / Vite client 型別宣告。 |
| `Source/Main-App-v18/src/data/cards.ts` | The governed 60-card bilingual Truth/Dare dataset. / 受治理的 60 張雙語真心話／小挑戰資料。 |
| `Source/Main-App-v18/src/lib/age-gate.ts` | Memory-only Level 5 adult-age decision policy. / 僅存於記憶體的 Level 5 成年判斷。 |
| `Source/Main-App-v18/src/lib/age-gate.test.ts` | Age-gate policy tests. / 年齡門檻測試。 |
| `Source/Main-App-v18/src/lib/game.ts` | Mode filtering, card selection, and game-state helpers. / 模式篩選、選卡與遊戲狀態輔助。 |
| `Source/Main-App-v18/src/lib/game.test.ts` | Game-policy tests. / 遊戲邏輯測試。 |
| `Source/Main-App-v18/src/lib/preferences.ts` | Allowed browser-local language and font-scale preferences. / 允許保存在瀏覽器本機的語言與字級偏好。 |
| `Source/Main-App-v18/src/lib/share.ts` | PNG generation, Web Share, and download fallback. / PNG、Web Share 與下載備援。 |
| `Source/Main-App-v18/src/lib/viewport-scale.ts` | 430 × 932 desktop-fit scale calculation. / 430 × 932 桌面適配縮放計算。 |
| `Source/Main-App-v18/src/lib/viewport-scale.test.ts` | Mobile/desktop scale-policy tests. / 行動版與桌面版縮放政策測試。 |
| `Source/Main-App-v18/src/styles/app.css` | Complete visual design, phone shell, responsive layout, motion, and print/export styling. / 完整視覺、手機框、響應式、動態與輸出樣式。 |
| `Source/Main-App-v18/src/test/setup.ts` | Shared Vitest DOM matchers and browser-test setup. / Vitest DOM matcher 與瀏覽器測試共用設定。 |

## PWA Source and Generated Release / PWA 原始檔與生成成品

| File | Meaning / 意義 |
| --- | --- |
| `Source/Main-App-v18/public/manifest.webmanifest` | Install metadata, theme, icons, and standalone display policy. / 安裝 metadata、主題、icon 與 standalone 顯示政策。 |
| `Source/Main-App-v18/public/service-worker.js` | Source service-worker template finalized during build. / 建置時完成內容的 service-worker template。 |
| `Source/Main-App-v18/public/assets/icons/icon-192.svg` | Owned 192 px PWA icon source. / 自有 192 px PWA icon。 |
| `Source/Main-App-v18/public/assets/icons/icon-512.svg` | Owned 512 px PWA icon source. / 自有 512 px PWA icon。 |
| `Source/Main-App-v18/dist/index.html` | Verified generated PWA entry; never hand-edit. / 已驗證的 PWA 入口，不可手改。 |
| `Source/Main-App-v18/dist/manifest.webmanifest` | Generated install manifest; never hand-edit. / 生成的安裝 manifest，不可手改。 |
| `Source/Main-App-v18/dist/service-worker.js` | Finalized offline worker and complete precache; never hand-edit. / 完成的離線 worker 與完整預快取，不可手改。 |
| `Source/Main-App-v18/dist/assets/index-PDPUu7fw.js` | Preserved generated v18 application JavaScript bundle. / 保留的 v18 app JavaScript bundle。 |
| `Source/Main-App-v18/dist/assets/index-DGr9TLCE.css` | Preserved generated v18 application stylesheet. / 保留的 v18 app CSS bundle。 |
| `Source/Main-App-v18/dist/assets/icons/icon-192.svg` | Generated copy of the 192 px icon. / 生成的 192 px icon 副本。 |
| `Source/Main-App-v18/dist/assets/icons/icon-512.svg` | Generated copy of the 512 px icon. / 生成的 512 px icon 副本。 |

`node_modules/` and `*.tsbuildinfo` are intentionally absent from active Development because they are generated. Restore dependencies only when development is needed:

`node_modules/` 與 `*.tsbuildinfo` 是生成內容，因此不留在作用中 Development。需要開發時才還原依賴：

```powershell
Set-Location "Development/Source/Main-App-v26"
npm ci
```

## Normal Commands / 常用命令

```powershell
# Restore dependencies, then develop and verify source
Set-Location "Development/Source/Main-App-v26"
npm ci
npm run dev
npm run typecheck
npm run lint
npm test

# Released v26 outputs are immutable; use these checks for maintenance
npm run build

# Repository validation from the project root
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

Existing v15–v26 generated outputs are preserved. Do not rerun an exporter to overwrite v26; create a new source/output version for new behavior. Direct `file://` execution is unsupported for the complete contract; use `Open Truth and Dare.cmd`.

既有 v15–v26 生成成品已保存。不得覆寫 v26；新行為必須建立新的 source/output 版本。完整合約不支援直接使用 `file://`，請使用根目錄的 `Open Truth and Dare.cmd`。

## Main-App-v27 additions / v27 新增內容

`Source/Main-App-v27/` is the preserved v16-inspired entrance-layout release. Its desktop editor, phone preview, privacy boundary, and gameplay are inherited by v28; `src/styles/v27-layout.css` owns the unified setup palette and safe typography. `Source/Public-Web/v10/` is the preserved public recipe.

## Main-App-v28 additions / v28 新增內容

`Source/Main-App-v28/` is the preserved Baosheng-safe release. It preserves v27 and replaces the Baosheng Dadi apothecary variant with `src/assets/deities/baosheng-apothecary-wide-taiwan-safe-v28.png`. `src/lib/deity-art.ts` owns the crown-safe focus and aligned Taiwan hotspot; `Source/Public-Web/v11/` is its public recipe. Versioned builders are `Automation/Scripts/finalize-pwa-v28.mjs`, `Automation/Scripts/export-standalone-v28.mjs`, and `Automation/Scripts/finalize-public-v11.mjs`; `Tests/validate_v28.ps1` verifies the preserved release boundary.

## Main-App-v29 additions / v29 新增內容

`Source/Main-App-v29/` is a preserved release. It preserves v28 and adds independently adjustable question and blessing font scales through `src/presentation/presentation-model.ts` and `src/components/LayoutEditor.tsx`. `src/App.tsx`, `src/styles/v29-layout.css`, and `src/lib/share.ts` synchronize those values across screen and PNG output. `Source/Public-Web/v12/` is the public recipe. `Automation/Scripts/finalize-pwa-v29.mjs`, `Automation/Scripts/export-standalone-v29.mjs`, and `Automation/Scripts/finalize-public-v12.mjs` generate its outputs; `Tests/validate_v29.ps1` owns the release boundary.

## Main-App-v30 additions / v30 新增內容

`Source/Main-App-v30/` is a preserved release. It preserves v29 behavior and replaces all 18 runtime deity images with high-quality WebP derivatives of the expanded 2:3 masters in `Assets/Deities/v30-safe-masters/`. `src/lib/deity-art.ts` owns the per-artwork portrait focus and aligned Taiwan locator metadata. `Source/Public-Web/v13/` is the public recipe. `Automation/Scripts/finalize-pwa-v30.mjs`, `Automation/Scripts/export-standalone-v30.mjs`, and `Automation/Scripts/finalize-public-v13.mjs` generate the outputs; `Tests/validate_v30.ps1` owns the release boundary.

## Main-App-v31 additions / v31 新增內容

`Source/Main-App-v31/` is the current release. It preserves v30 interaction, artwork, typography, export, and privacy behavior while unifying the setup canvas, editor, desktop workbench, device frame, cards, and controls around a pale milk-tea, cream, caramel, espresso, and muted-gold palette. `src/styles/v31-layout.css` reserves in-flow height for all bilingual setup headings; `src/layout/layout-model.ts` provides safe default heights for familiarity and card-type blocks. `Source/Public-Web/v14/` is the public recipe. `Automation/Scripts/finalize-pwa-v31.mjs`, `Automation/Scripts/export-standalone-v31.mjs`, and `Automation/Scripts/finalize-public-v14.mjs` generate the outputs; `Tests/validate_v31.ps1` owns the release boundary. Design and test-first evidence are documented in `Documentation/V31_MILK_TEA_SETUP_DESIGN.md` and `Documentation/V31_MILK_TEA_SETUP_PLAN.md`.

### v27 retained-file annotations / v27 檔案註記

- `Source/Main-App-v27/eslint.config.js` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/index.html` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/package-lock.json` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/package.json` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/README.md` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/tsconfig.app.json` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/tsconfig.json` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/tsconfig.node.json` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/vite.config.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/manifest.webmanifest` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/service-worker.js` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/baosheng-dadi-taiwan.png` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/baosheng-dadi-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/guansheng-dijun-taiwan.png` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/guansheng-dijun-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/guanyin-taiwan.png` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/guanyin-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/mazu-taiwan.png` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/mazu-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/tudigong-taiwan.png` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/tudigong-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/wenchang-dijun-taiwan.png` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/wenchang-dijun-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/xuantian-shangdi-taiwan.png` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/xuantian-shangdi-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/yue-lao-taiwan.png` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/yue-lao-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/zhusheng-niangniang-taiwan.png` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/deities/zhusheng-niangniang-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/icons/icon-192.svg` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/public/assets/icons/icon-512.svg` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/App.test.tsx` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/App.tsx` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/main.tsx` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/types.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/vite-env.d.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/baosheng-apothecary-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/baosheng-dadi-apothecary-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/baosheng-dadi-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/baosheng-herbs-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/guansheng-courtyard-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/guansheng-dijun-courtyard-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/guansheng-dijun-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/guansheng-guardian-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/guanyin-lotus-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/guanyin-lotus-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/guanyin-moon-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/guanyin-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/mazu-lantern-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/mazu-lantern-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/mazu-sea-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/mazu-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/tudigong-harvest-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/tudigong-harvest-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/tudigong-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/tudigong-throne-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/wenchang-book-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/wenchang-dijun-study-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/wenchang-dijun-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/wenchang-study-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/xuantian-sea-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/xuantian-shangdi-stair-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/xuantian-shangdi-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/xuantian-stair-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/yue-lao-banyan-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/yue-lao-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/yuelao-banyan-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/yuelao-book-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/zhusheng-lamp-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/zhusheng-niangniang-lamp-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/zhusheng-niangniang-taiwan.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/assets/deities/zhusheng-tablet-taiwan-safe.webp` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/components/EditableBlock.tsx` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/components/LayoutEditor.test.tsx` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/components/LayoutEditor.tsx` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/components/SwipeDeck.test.tsx` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/components/SwipeDeck.tsx` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/components/TaiwanReveal.test.tsx` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/components/TaiwanReveal.tsx` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/data/blessings.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/data/cards.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/layout/layout-model.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/layout/layout-model.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/age-gate.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/age-gate.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/deity-art.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/deity-art.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/device-frame.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/device-frame.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/encounter.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/encounter.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/game.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/game.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/portrait-focus.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/portrait-focus.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/preferences.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/share.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/share.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/swipe-deck.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/swipe-deck.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/taiwan-shape.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/taiwan-shape.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/viewport-scale.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/lib/viewport-scale.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/presentation/presentation-model.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/presentation/presentation-model.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/styles/app.css` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/styles/layout-editor.css` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/styles/taiwan-reveal.css` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/styles/v27-layout.css` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/styles/v27.css` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/src/test/setup.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/tests/artwork-crop-css.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/tests/desktop-workspace-css.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/tests/setup-layout-css.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Main-App-v27/tests/taiwan-reveal-css.test.ts` — v27 source, configuration, asset, or deterministic test retained for the current release.
- `Source/Public-Web/v10/README.md` — v27 to Public Web v10 release recipe.
- `Automation/Scripts/export-standalone-v27.mjs` — creates immutable v27 standalone output.
- `Automation/Scripts/finalize-pwa-v27.mjs` — finalizes v27 offline precache.
- `Automation/Scripts/finalize-public-v10.mjs` — creates immutable Public Web v10.
- `Tests/validate_v27.ps1` — verifies the v27 release boundary.
- `Documentation/V27_ENTRANCE_LAYOUT_DESIGN.md` — approved setup visual design.
- `Documentation/V27_ENTRANCE_LAYOUT_PLAN.md` — test-first v27 release plan.

## Current v32 Line / 目前 v32 版本

- `Source/Main-App-v32/` — current authored React/TypeScript product line; `src/` contains UI, data, policies, layout, presentation, assets, styles, and unit tests, while `public/` owns offline metadata and `dist/` is generated immutable output.
- `Source/Main-App-v32/src/App.tsx` — composes separate desktop Settings/Test surfaces, mobile play-only flow, advanced deck choice, favorite-face selection, game, and keepsake.
- `Source/Main-App-v32/src/data/collections.ts` — governed registry for available Taiwan deity art and planned Taiwan astral, world deity, and world zodiac families.
- `Source/Main-App-v32/src/lib/artwork-selection.ts` — deterministic collection filtering, specific-artwork locking, and three-face candidate selection without coupling questions or blessings.
- `Source/Main-App-v32/src/components/EditableBlock.tsx` — bounded scale-aware layout manipulation that is disabled by default and ignores interactive controls.
- `Source/Main-App-v32/src/components/LayoutEditor.tsx` — desktop-only numeric editor with opt-in direct manipulation.
- `Source/Main-App-v32/src/styles/v32.css` — v16-quality product styling and card presentation.
- `Source/Main-App-v32/src/styles/v32-layout.css` — milk-tea desktop modes, 430 × 932 device contract, no-clipping typography, advanced picker, and candidate fan.
- `Source/Public-Web/v15/README.md` — v32 to Public Web v15 release recipe.
- `Automation/Scripts/export-standalone-v32.mjs` — creates immutable v32 standalone output.
- `Automation/Scripts/finalize-pwa-v32.mjs` — finalizes v32 offline precache.
- `Automation/Scripts/finalize-public-v15.mjs` — creates immutable Public Web v15.
- `Tests/validate_v32.ps1` — verifies the v32 product and publication boundary.
- `Documentation/V32_DESKTOP_MODES_AND_TYPE_SAFETY_DESIGN.md` — approved v32 interaction, typography, and collection design.
- `Documentation/V32_DESKTOP_MODES_AND_TYPE_SAFETY_PLAN.md` — test-first v32 implementation and release plan.
