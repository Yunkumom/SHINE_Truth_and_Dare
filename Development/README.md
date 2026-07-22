# Development / 開發資料

This directory contains preserved v18–v21 source lines and the current Encounter Cards v22 source line. Historical v17 source, older completed plans, old-version builders, and generated dependencies remain recoverable under `../_pending/`.

此目錄保留 v18–v21 source 與目前作用中的 Encounter Cards v22 source。v17 歷史 source、舊版計畫、builder 與可重建依賴仍可由 `../_pending/` 回復。

## Structure / 結構

```text
Development/
├── README.md
├── Source/Main-App-v18/       # Preserved v18 React/TypeScript application
├── Source/Main-App-v19/       # Preserved first deity-card source line
├── Source/Main-App-v20/       # Preserved v16-inspired deity-card application
├── Source/Main-App-v21/       # Preserved hidden-Taiwan reveal application
├── Source/Main-App-v22/       # Current layout-editor and swipe-deck application
├── Source/Public-Web/v2/      # Preserved Public v2 source recipe
├── Source/Public-Web/v3/      # Preserved Public v3 source recipe
├── Source/Public-Web/v4/      # Preserved Public v4 source recipe
├── Source/Public-Web/v5/      # Current Public v5 source recipe
├── Automation/Scripts/        # Versioned v18-v22 builders and exporters
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
| `Automation/Tools/serve_truth_and_dare.ps1` | Starts a loopback-only HTTP server and opens current v22. / 啟動僅限本機的 HTTP server 並開啟目前 v22。 |
| `Tests/validate_v18.ps1` | Verifies preserved v18 contracts and release hashes. / 驗證保留的 v18 合約與 release 雜湊。 |
| `Tests/validate_v19.ps1` | Verifies preserved v19 artwork, standalone embedding, hash, and Public Web v2 output. / 驗證保留的 v19 圖像、單檔、雜湊與公開 v2。 |
| `Tests/validate_v20.ps1` | Verifies v20 visual markers, 18 artworks, blessing/download contracts, hashes, public output, and launcher target. / 驗證 v20 視覺、18 張圖、祝福／下載、雜湊、公開輸出與啟動器。 |
| `Tests/validate_v21.ps1` | Verifies all 18 hotspots, long-press timing, animation, keyboard parity, release hash, and preserved Public Web v4. / 驗證 18 個熱點、長按時序、動畫、鍵盤、雜湊與保留的公開 v4。 |
| `Tests/validate_v22.ps1` | Verifies editor, swipe threshold, enlarged card, contact-selectable 63:88 keepsake, release hash, Public Web v5, and launcher. / 驗證編輯器、滑動門檻、放大卡片、聯絡資訊紀念卡、雜湊、公開 v5 與啟動器。 |
| `Tests/validate_clean_structure.ps1` | Verifies the simplified directory contract. / 驗證精簡後的目錄合約。 |
| `Tests/validate_repository.ps1` | Runs the complete v18–v22 and structure contract. / 執行完整 v18–v22 與結構驗證。 |

## Main-App-v22 additions / v22 新增內容

`Source/Main-App-v22/` is the current authored application, with code under `Source/Main-App-v22/src/`. `Source/Main-App-v22/src/layout/layout-model.ts` owns the versioned 430 × 932 layout document, bounds, twenty-step history, reset, privacy-safe import/export, and non-personal browser persistence. `Source/Main-App-v22/src/components/LayoutEditor.tsx` and `Source/Main-App-v22/src/components/EditableBlock.tsx` provide screen switching, numeric controls, direct drag/resize, grid snapping, and JSON exchange. `Source/Main-App-v22/src/components/SwipeDeck.tsx` and `Source/Main-App-v22/src/lib/swipe-deck.ts` own one-to-one pointer movement, 22% commitment, spring return, duplicate prevention, and artwork gesture isolation. `Source/Main-App-v22/src/lib/share.ts` creates the 1260 × 1760 (63:88) blessing-bearing PNG with independently optional participant rows. `Source/Main-App-v22/src/styles/v22-layout.css` owns the enlarged card, editor, deck, and keepsake presentation.

`Source/Main-App-v22/dist/`, `Apps/Standalone/encounter_cards_v22.html`, and `Apps/Public-Web/v5/` are generated verified release outputs; never hand-edit them. `Source/Public-Web/v5/README.md` records the public recipe and `Tests/validate_v22.ps1` verifies the release contract.

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
Set-Location "Development/Source/Main-App-v22"
npm ci
```

## Normal Commands / 常用命令

```powershell
# Restore dependencies, then develop and verify source
Set-Location "Development/Source/Main-App-v22"
npm ci
npm run dev
npm run typecheck
npm run lint
npm test

# Released v22 outputs are immutable; use these checks for maintenance
npm run build

# Repository validation from the project root
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

Existing v15–v22 generated outputs are preserved. Do not rerun an exporter to overwrite v22; create v23 source/output artifacts for new behavior. Direct `file://` execution is unsupported for the complete contract; use `Open Truth and Dare.cmd`.

既有 v15–v22 生成成品已保存。不得覆寫 v22；新行為必須建立 v23 source/output。完整合約不支援直接使用 `file://`，請使用根目錄的 `Open Truth and Dare.cmd`。
