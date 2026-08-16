# Encounter Cards Architecture

## v46 Sites/Vinext Architecture / v46 Sites／Vinext 架構

- `Development/Source/Main-App-v46/app/page.tsx`, `app/mobile/page.tsx`, and `app/studio/page.tsx` provide the entry, mobile, and desktop-studio routes.
- `app/encounter/` is the authored React encounter application. `vite.encounter.config.ts` builds it to the versioned `public/v46/` surface before every Sites build.
- `scripts/finalize-encounter.mjs` inventories all generated browser files and replaces the service-worker marker with a complete, deterministic precache list.
- Vinext builds the route wrapper and Cloudflare-compatible Worker to `dist/`; `.openai/hosting.json` keeps D1 and R2 disabled.
- Persistent storage is limited to `encounter-language`, `encounter-font-scale`, `encounter-layout-v46`, and `encounter-presentation-v46`. The layout and presentation documents reject personal-field keys.
- Uploaded photos, names, contacts, birthdays, answers, custom questions, disabled states, exact choices, and adult-content choices remain session memory only.
- The active line contains no authentication helper, database schema, D1 example, Drizzle dependency, analytics, or telemetry.

- `Development/Source/Main-App-v46/app/page.tsx`、`app/mobile/page.tsx` 與 `app/studio/page.tsx` 提供入口、手機及電腦工作室 routes。
- `app/encounter/` 是人工維護的 React encounter 應用；`vite.encounter.config.ts` 會在每次 Sites build 前將它建置至版本化 `public/v46/` 介面。
- `scripts/finalize-encounter.mjs` 會列出所有生成瀏覽器檔案，並以完整、deterministic precache 清單取代 service-worker marker。
- Vinext 將 route wrapper 與 Cloudflare-compatible Worker 建置至 `dist/`；`.openai/hosting.json` 維持 D1 與 R2 停用。
- 持久化僅限 `encounter-language`、`encounter-font-scale`、`encounter-layout-v46` 與 `encounter-presentation-v46`；layout／presentation document 會拒絕個人欄位 keys。
- 上傳照片、姓名、聯絡方式、生日、答案、自訂問題、停用狀態、指定選擇與成人內容選擇只存在 session 記憶體。
- 作用中版本不含 authentication helper、database schema、D1 example、Drizzle dependency、analytics 或 telemetry。

Current desktop data flow:

```text
Open Truth and Dare.cmd
  -> npm ci when dependencies are absent
  -> npm run build:encounter
  -> Vite/Vinext on 127.0.0.1:8765
  -> /, /mobile, /studio
  -> /v46/index.html
```

## v37 Compact Desktop Studio Architecture / v37 精簡桌面工作室架構

- `App.tsx` composes explicit `desktop-editor-rail`, `desktop-center-column`, and `desktop-phone-preview` regions in Settings mode; the compact mode tabs live inside the centre column rather than above or inside the editor.
- `LayoutEditor.tsx` owns memory-only `layout | card | history | data` category state and renders only one panel at a time.
- `styles/v37.css` overrides the inherited desktop arrangement with fixed 270px and 310px outer columns, a flexible centre column, scroll containment, compact bookmark tabs, and separate centre/right scale policies.
- Test mode removes the editor and inert preview, then renders one interactive phone while preserving React session state.
- The v37 source, PWA dist, standalone v37, and Public Web v20 are generated from one tested line. Persistence remains limited to language, font scale, `encounter-layout-v37`, and `encounter-presentation-v37`.

## v36 Mobile Work Integration Architecture / v36 手機 Work 整合架構

- `components/MobileSettings.tsx` owns the accessible five-tab settings surface; `ArtworkPicker.tsx` and `ArtworkAdjuster.tsx` own exact artwork choice and bounded focus/zoom controls.
- `lib/question-manager.ts` resolves governed and session-authored questions, disabled items, exact selection, and safe built-in fallback without persistent storage.
- `App.tsx` keeps question-manager state in React memory, applies v36-only layout/presentation keys, and always renders `BlessingText` on the card and keepsake.
- `styles/v36.css` contains the adapted mobile ChatGPT Work visual layer. Temporary Work version labels were normalized to v36 and blessing-hiding behavior was removed.
- One tested source produces `Main-App-v36/dist/`, immutable standalone v36, and Public Web v19. Allowed local keys are `encounter-language`, `encounter-font-scale`, `encounter-layout-v36`, and `encounter-presentation-v36`.

## Preserved v35 Entrance Card-Library Architecture / 保留的 v35 入口卡庫架構

- `components/CardLibrary.tsx` owns the modal surface, collection filters, focus/keyboard behavior, pointer tracking, and the three-card virtual window.
- `lib/card-library.ts` contains pure wrapping, filtering, and swipe-decision policies with unit tests.
- `App.tsx` derives deterministic preview question/blessing content from the artwork index and applies only the selected artwork ID to the session preference. It does not mutate the live draw while browsing.
- `styles/v35.css` owns the 430 × 932 library grid, 360 × 503 preview-card proportions, touch behavior, side-card transitions, and reduced-motion path.
- Source, verified PWA dist, standalone v35, and Public Web v18 are generated from one tested v35 line. Allowed persistence keys are versioned `encounter-layout-v35` and `encounter-presentation-v35` plus language/font settings; library position and filters remain session-only.

## Current v15 Package / 目前 v15 封裝

The baseline is one approximately 11.7 MB HTML document. It contains:

- compiled Tailwind CSS and product styling;
- a ViNext import map with five embedded `data:text/javascript` modules;
- embedded React and React DOM runtime code;
- an approximately 8.2 MB page module containing application logic, card data, and image payloads;
- React Server Component payload scripts;
- embedded favicon and product images;
- no external JavaScript module and no detected `fetch()` request.

目前基準是一份約 11.7 MB 的 HTML，內含編譯 CSS、五個 import-map JavaScript module、React runtime、卡牌邏輯與資料、圖片，以及 React Server Component payload。未發現外部 JavaScript 或 `fetch()` 呼叫。

## Runtime Data Flow / 執行資料流

1. The browser parses the standalone HTML and compiled CSS.
2. The import map maps virtual `/assets/*.js` paths to embedded data URLs.
3. The module entry imports the embedded application bundle.
4. React reconstructs the interactive Encounter Cards interface from the embedded payload.
5. Card state, gestures, and selected prompts run in the browser.
6. Language and font scale may be persisted through `encounter-language` and `encounter-font-scale`.
7. PNG export renders a card to canvas, creates a PNG file, attempts `navigator.share`, and falls back to an anchor download.

## v16 Runtime Correction / v16 Runtime 修正

The original `data:text/javascript` modules had a non-hierarchical base URL, so nested `/assets/` imports could not resolve and React did not hydrate. v16 extracts all five modules to `Apps/Standalone/v16-assets/` and maps the original specifiers to normal HTTP-relative files. The preserved v16 artifact still requires a hierarchical HTTP origin, but the current launcher opens v19. Legacy v16 reconstruction tooling is archived under `_pending/Development-simplification_2026-07-19/`.

React hydrates the entire document. For compatibility, v16 does not add pre-hydration head/body nodes; it appends layout rules inside the existing style node and updates both visible HTML and embedded RSC viewport metadata.

Legacy preserved standalone data flow:

```text
Open Truth and Dare.cmd
  -> Development/Automation/Tools/serve_truth_and_dare.ps1
  -> python http.server on 127.0.0.1:8765
  -> Apps/Standalone/encounter_cards_v24.html
  -> embedded React/CSS runtime
  -> interactive game
```

## Security and Privacy Surface / 安全與隱私面

- No environment variables, API credentials, backend, or account session are required.
- Verified persistent keys are language, font scale, and the non-personal v24 layout document.

## v29 Typography Presentation Architecture / v29 字級呈現架構

- `src/presentation/presentation-model.ts` owns versioned, privacy-safe question and blessing font scales normalized to 0.9–1.8.
- `LayoutEditor.tsx` exposes synchronized numeric and range controls on the desktop workbench.
- `App.tsx` maps the values to CSS custom properties shared by the interactive card, inert phone preview, and keepsake preview.
- `lib/share.ts` applies the same values to canvas question and blessing typography; no personal content enters presentation persistence.

## v24 Taiwan Coastline Architecture / v24 台灣海岸線架構

- `Development/Source/Main-App-v24/src/lib/taiwan-shape.ts` owns one simplified, normalized main-island coastline derived from Natural Earth 1:10m map-unit geometry.
- `TaiwanReveal.tsx` renders the same path twice: a broad low-opacity glow beneath a crisp coastline. Neither path has a fill.
- The overlay remains runtime-only and excluded from commemorative-card PNG export; gesture timing, keyboard parity, hotspots, and privacy boundaries are unchanged from v23.
- User-entered names, contacts, birthdays, notes, and responses must remain client-side unless a future design explicitly changes the boundary.

## v22 Layout and Gesture Architecture / v22 版面與手勢架構

- `src/layout/layout-model.ts` owns a schema-versioned 430 × 932 document, normalization, twenty-step history, reset, local persistence, and privacy-safe JSON exchange.
- `src/components/EditableBlock.tsx` applies block geometry in player and editor modes; editing adds bounded drag and corner resize.
- `src/components/LayoutEditor.tsx` owns setup/game/keepsake preview selection, precise fields, undo/redo, reset, and JSON UI.
- `src/lib/swipe-deck.ts` owns pure 22% threshold, pose, tilt, and duplicate-commit decisions; `src/components/SwipeDeck.tsx` owns pointer capture and card presentation.
- Artwork uses `data-card-artwork` as a gesture boundary so the v21 600 ms Taiwan hold remains isolated from deck motion.
- `src/lib/share.ts` maps editable keepsake blocks into a 1260 × 1760 canvas, filters participant rows by in-memory opt-in, draws a mandatory blessing, and invokes share/download fallback.
- The large packaged module must be treated as generated code; direct edits are fragile and difficult to review.

## v23 Taiwan Artwork Architecture / v23 台灣圖像架構

- `Development/Source/Main-App-v23/src/assets/deities/` contains 18 version-bound WebP copies derived from the governed PNG sources in `Assets/Deities/v23-taiwan-safe/`.
- `src/lib/deity-art.ts` maps every image to a safe percentage hotspot, rotation, scale, colour, and accent. Hotspots are constrained to the centred card crop.
- `src/lib/taiwan-shape.ts` owns the single detailed 120 × 240 canonical geographic path. `TaiwanReveal.tsx` reuses it for all pointer and keyboard reveals instead of drawing per-image arcs or blobs.
- `styles/taiwan-reveal.css` provides per-artwork fill/stroke, pulsing halo, focus treatment, and reduced-motion fallback. Game and keepsake image CSS use centred `object-position`.
- Export continues to draw only the source artwork, question, selected participant rows, and required blessing; locator chrome remains excluded.

## Source Boundary / 原始碼邊界

The package supports preservation, execution, comparison, and bounded static inspection. It is not suitable for normal component-level maintenance because original file boundaries, TypeScript types, meaningful symbols, tests, and asset provenance are absent.

A future v16 extraction should create explicit modules for:

- application shell and screens;
- language and typography preferences;
- player and session state;
- level selection and age gate;
- card data and content validation;
- drag, flip, and discard state machine;
- card rendering and PNG export;
- image assets, licensing, and attribution;
- unit, interaction, responsive, accessibility, and export tests.

v15 must remain unchanged as the regression oracle during extraction.

## v17 Modular Architecture / v17 模組化架構

v17 implemented the first modular extraction with React, TypeScript, and Vite. Its source and build pipeline are now inactive history under `_pending/Development-simplification_2026-07-19/Development/Source/Main-App/`; the immutable v17 standalone remains under `Apps/Standalone/`.

Personal fields and birthdays are component memory only. Language and font scale retain the existing localStorage keys. No backend, analytics, account, or network data transmission is introduced.

## Preserved v18 Modular Architecture / 保留的 v18 模組化架構

v18 introduced the modular session UI, 60 bilingual cards, policy libraries, PWA resources, and desktop viewport scaling. Its source and generated outputs remain preserved and immutable.

## Preserved v19 Modular Architecture / 保留的 v19 模組化架構

`Development/Source/Main-App-v19/src/` preserves the first deity-card source boundary. Its verified `dist/`, standalone v19, and Public Web v2 remain immutable.

## Preserved v20 Modular Architecture / 保留的 v20 模組化架構

`Development/Source/Main-App-v20/src/` preserves the visual and composition baseline. `App.tsx` owns the v16-inspired setup and session composition; `lib/viewport-scale.ts` owns the 430 × 932 fit; `styles/app.css` anchors the scaled shell at the exact viewport center; `lib/deity-art.ts` registers 18 bundled WebP variants and separate export regions; `lib/encounter.ts` independently selects artwork and blessing; `data/blessings.ts` stores bilingual blessings; and `lib/share.ts` renders and delivers the 1080 × 1620 PNG. Verified `dist/`, standalone v20, and Public Web v3 are immutable.

## Preserved v21 Modular Architecture / 保留的 v21 模組化架構

`Development/Source/Main-App-v21/src/` preserves the first `TaiwanHotspot` and long-press reveal implementation. Verified `dist/`, standalone v21, and Public Web v4 remain immutable.
## v30 Artwork Asset Architecture / v30 圖像素材架構

`Assets/Deities/v30-safe-masters/` owns 18 reusable 1024 × 1536 PNG masters. `Development/Source/Main-App-v30/src/assets/deities/*-safe-v30.webp` contains optimized version-bound derivatives. `src/lib/deity-art.ts` maps every variant to one runtime image, a bounded portrait focal point, and an aligned canonical Taiwan locator. Vite embeds these assets into the immutable standalone build and copies them into Public Web v13.

`Assets/Deities/v30-safe-masters/` 保存 18 張可重用 1024 × 1536 PNG master；v30 source 的 `*-safe-v30.webp` 是版本綁定輕量副本。`deity-art.ts` 將每個變體對應到 runtime 圖、人像焦點與精準台灣 locator；Vite 將素材內嵌至 standalone，並產製 Public Web v13。

## v31 Setup Presentation Architecture / v31 入口呈現架構

v31 copies the governed v30 runtime and artwork into a new immutable line. `src/styles/v31-layout.css` owns root-scoped milk-tea theme tokens shared by the setup shell, desktop workbench, editor, and device frame. `src/layout/layout-model.ts` owns enlarged default heights for the familiarity and card-type blocks, while fieldset legends remain static, wrapping, in-flow title rows. Public Web v14 and standalone v31 are generated from the same verified dist.

## v32 Mode and Collection Architecture / v32 模式與牌組架構

- `App.tsx` owns a desktop-only `settings | test` mode boundary. Settings composes the workbench, editor, and inert phone preview; Test composes one interactive centered phone. The mobile branch bypasses both desktop surfaces.
- `EditableBlock.tsx` receives explicit `directManipulation` and `canvasScale` values. Pointer deltas are converted to logical canvas units, controls are excluded from drag initiation, and direct manipulation defaults off.
- `data/collections.ts` is the governed collection registry. Only `taiwan-deities` is available in v32; planned family records have no runtime assets and cannot enter random selection.
- `lib/artwork-selection.ts` resolves all-random, collection, or specific-artwork preferences and builds three distinct candidate faces. `App.tsx` continues to select prompts and blessings independently.
- `styles/v32-layout.css` separates desktop mode chrome from the 430 × 932 phone canvas and applies non-clipping line-height, overflow, wrapping, and scroll-access rules to setup, card, and keepsake text.
- `dist/`, standalone v32, and Public Web v15 are generated from the same tested source. Personal fields remain in React memory and are never placed in the collection or layout persistence models.
