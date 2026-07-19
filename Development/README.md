# Development / 開發資料

This directory now contains one active product line only: Encounter Cards v18. Historical sources, completed plans, publication experiments, old-version builders, and generated dependencies were moved intact to `../_pending/Development-simplification_2026-07-19/` on 2026-07-19.

此目錄現在只保留一條作用中產品線：Encounter Cards v18。歷史 source、已完成計畫、發布實驗、舊版 builder 與可重建依賴已於 2026-07-19 完整移至 `../_pending/Development-simplification_2026-07-19/`。

## Structure / 結構

```text
Development/
├── README.md
├── Source/Main-App-v18/       # Preserved v18 React/TypeScript application
├── Source/Main-App-v19/       # Current deity-card React/TypeScript application
├── Source/Public-Web/v2/      # Public v2 source recipe
├── Automation/Scripts/        # v18 release exporters
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

## Automation and Validation / 自動化與驗證

| File | Meaning / 意義 |
| --- | --- |
| `Automation/Scripts/finalize-pwa-v18.mjs` | Finalizes the v18 PWA manifest/service-worker cache from the generated `dist/`. / 依生成的 `dist/` 完成 v18 PWA manifest 與 service-worker cache。 |
| `Automation/Scripts/export-standalone-v18.mjs` | Produces the self-contained `Apps/Standalone/encounter_cards_v18.html` from the v18 build. / 從 v18 build 產生獨立單檔 release。 |
| `Automation/Scripts/export-standalone-v19.mjs` | Produces the artwork-embedded v19 standalone without overwriting an existing release. / 產生內嵌神祇圖的 v19 單檔版。 |
| `Automation/Scripts/finalize-pwa-v19.mjs` | Finalizes the v19 offline precache. / 完成 v19 離線快取。 |
| `Automation/Scripts/finalize-public-v2.mjs` | Creates the immutable Public Web v2 artifact from the verified v19 build. / 從 v19 建立不可變 Public Web v2。 |

## Main-App-v19 additions / v19 新增內容

`Source/Main-App-v19/` is the current authored application. Its `README.md`, package/config files, `Source/Main-App-v19/src/` UI and policies, `Source/Main-App-v19/src/assets/deities/` optimized artwork, `public/` PWA resources, and generated `dist/` are retained as one versioned release line. `Source/Public-Web/v2/README.md` documents the matching public recipe. The deity mapping and export layout live in `Source/Main-App-v19/src/lib/deity-art.ts`; card generation lives in `Source/Main-App-v19/src/lib/share.ts`; v19 presentation overrides live in `Source/Main-App-v19/src/styles/v19.css`.

`Tests/validate_v19.ps1` verifies v19 artwork count, embedded standalone artwork, immutable hash, public output, and launcher target.
| `Automation/Tools/serve_truth_and_dare.ps1` | Starts a loopback-only HTTP server and opens the current v18 standalone release. / 啟動僅限本機的 HTTP server 並開啟目前 v18。 |
| `Tests/validate_v18.ps1` | Verifies required v18 source, preserved release hashes, desktop-fit policy, standalone embedding, and launcher target. / 驗證 v18 必要 source、舊版雜湊、桌面縮放、單檔封裝及啟動器目標。 |
| `Tests/validate_clean_structure.ps1` | Verifies the simplified root and Development directory contract. / 驗證精簡後的根目錄與 Development 結構。 |
| `Tests/validate_repository.ps1` | Runs the complete repository contract, including v18 and clean-structure checks. / 執行完整 repository 合約，包含 v18 與結構檢查。 |

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
| `Source/Main-App-v18/dist/assets/index-PDPUu7fw.js` | Current generated application JavaScript bundle. / 目前生成的 app JavaScript bundle。 |
| `Source/Main-App-v18/dist/assets/index-DGr9TLCE.css` | Current generated application stylesheet. / 目前生成的 app CSS bundle。 |
| `Source/Main-App-v18/dist/assets/icons/icon-192.svg` | Generated copy of the 192 px icon. / 生成的 192 px icon 副本。 |
| `Source/Main-App-v18/dist/assets/icons/icon-512.svg` | Generated copy of the 512 px icon. / 生成的 512 px icon 副本。 |

`node_modules/` and `*.tsbuildinfo` are intentionally absent from active Development because they are generated. Restore dependencies only when development is needed:

`node_modules/` 與 `*.tsbuildinfo` 是生成內容，因此不留在作用中 Development。需要開發時才還原依賴：

```powershell
Set-Location "Development/Source/Main-App-v18"
npm ci
```

## Normal Commands / 常用命令

```powershell
# Restore dependencies, then develop and verify source
Set-Location "Development/Source/Main-App-v18"
npm ci
npm run dev
npm run typecheck
npm run lint
npm test

# Reproduce v18 output only for an explicitly approved audit/recovery task
npm run build:standalone

# Repository validation from the project root
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

Existing v18 generated outputs are preserved. `npm run build:standalone` still targets v18, so do not run it for later product changes; use it only for an explicitly approved v18 audit/recovery task. Create the next numbered source/output release for new behavior. Direct `file://` execution is unsupported for PWA behavior; use `Open Truth and Dare.cmd` for the current standalone release.

既有 v18 生成成品已保存。`npm run build:standalone` 仍會輸出 v18，只能用於明確核准的 v18 稽核／復原，不得用於後續產品修改；新行為應建立下一個 source/output 版本。PWA 行為不支援直接使用 `file://`；目前 standalone 請使用根目錄的 `Open Truth and Dare.cmd`。
