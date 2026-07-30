# Truth and Dare / Encounter Cards Product Specification

## Product Promise / 產品承諾

Encounter Cards helps two people turn a simple conversation into a memorable encounter by drawing a question, sharing an answer, and keeping a blessing from the meeting.

相遇卡讓兩個人透過抽一個問題、分享一個答案與留下祝福，把簡單對話變成值得記住的相遇。

## Verified Product Surface / 已驗證的產品介面

Static inspection of the supplied artifact confirms:

- Chinese (`中`), English (`EN`), and bilingual (`中/EN`) presentation controls.
- Player name, other-player name, and optional contact fields.
- Five familiarity levels: first meeting, familiar, friends, close, and intimate 18+.
- Truth, Dare, and Surprise card choices.
- A stated set of 60 levelled prompts.
- Browser-local language and font-scale preferences.
- Embedded PNG creation, Web Share, and download-fallback code.
- No account requirement or product backend. The packaged ViNext runtime contains generic RSC fetch/navigation paths, but the initial v16 experience uses embedded RSC payloads and local module assets.

提供的 v15 產物經靜態檢查確認包含：

- 中文、英文與雙語顯示控制。
- 自己與對方姓名，以及雙方選填聯絡方式。
- 初見、熟悉、朋友、親近、親密 18+ 五個熟識等級。
- 真心話、小挑戰與隨機抽卡。
- 頁面宣告的 60 張分級題目。
- 瀏覽器本機語言與字體比例偏好。
- 內嵌 PNG 生成、Web Share 與下載備援程式。
- 不需帳號或產品後端。封裝 ViNext runtime 含通用 RSC fetch／navigation 路徑，但 v16 初始體驗使用內嵌 RSC payload 與本機 module assets。

## Verified v16 Behavior / 已驗證的 v16 行為

- One-click Windows launcher serves the project at `127.0.0.1:8765`.
- English, Level 2, Truth, and Begin controls changed application state in browser testing.
- Begin entered the card-draw screen without requiring personal data.
- iPhone Pro Max 430 × 932 layout filled the viewport with no horizontal overflow.
- Desktop 1280 × 900 rendered a centered 430 px phone frame.
- Final tested browser console contained zero errors and warnings.

## Primary Flow / 主要流程

1. Choose Chinese, English, or bilingual mode.
2. Enter both names and optional contact information.
3. Select familiarity Level 1–5; Level 5 is marked intimate and 18+.
4. Choose Truth, Dare, or Surprise.
5. Begin the card interaction, draw and reveal a prompt, then answer or complete it.
6. Optionally preview a 63:88 keepsake, choose which participant rows to include, then share or download the PNG.

## Interaction Requirements / 互動需求

- Mobile typography must remain comfortable and use the available screen effectively.
- Bilingual content must not overflow or disappear.
- Drawing requires a deliberate drag and should feel like handling a collectible card.
- Motion follows the finger direction, extends continuously, then flips directly to the front.
- No second tap is required to reveal the front.
- Front artwork and text remain visible after the flip; back content never overlays them.
- Used cards can be dismissed with an intentional swipe.
- PNG export and iPhone sharing provide clear success or fallback behavior.
- v22 keeps the primary draw gesture on the deck, moves the fallback button to the bottom, and lets the card use 402 × 562 pixels of the 430 × 932 canvas.
- v22 editor mode exposes setup, game, and keepsake blocks for drag, resize, numeric adjustment, undo/redo, reset, and privacy-safe JSON exchange.
- v23 keeps the full v22 interaction contract while replacing all 18 deity images with visible-crop-safe artwork and one precise canonical Taiwan reveal shape.
- v29 defaults question and blessing scales to 1.2 and 1.25, exposes independent 0.9–1.8 controls, and synchronizes them across the card, preview, keepsake, and PNG.

## Current v29 readable typography / 目前 v29 易讀字級

v29 preserves the complete v28 artwork, Taiwan-reveal, gesture, layout, device-frame, export, and privacy contracts. Question and blessing text receive independent normalized presentation values. Long on-screen copy wraps and remains accessible inside its panel; the same scales drive commemorative PNG typography. Mobile retains the global accessibility A−/A＋ control.

## Current v30 portrait-safe artwork / 目前 v30 人像安全圖

v30 preserves the complete v29 interaction, typography, layout, export, and privacy contracts. All 18 deity variants use new 1024 × 1536 masters with expanded surroundings. Complete faces and crowns remain inside the near-square runtime crop; the coloured Taiwan motif and its canonical glowing coastline locator remain inside the visible central artwork area. Two variants remain available for each of nine deities.

v30 完整保留 v29 的互動、字級、版面、輸出與隱私合約。18 張神祇變體全部使用新的 1024 × 1536 擴景 master；完整臉與頭冠留在近方形 runtime 裁切內，彩色台灣圖形及其精準發光輪廓定位均位於中央可見畫面。九位神祇各保留兩張變體。

## Current v31 milk-tea setup / 目前 v31 淡奶茶入口

v31 preserves every v30 game, artwork, typography, export, and privacy contract. The setup canvas, desktop workbench, editor, device frame, fields, selectors, and Begin control use a unified pale milk-tea family rather than black or navy setup surfaces. Every bilingual setup heading owns an in-flow title row and must fit within its block at 430 × 932 without overlap, clipping, or ellipsis.

v31 完整保留 v30 遊戲、圖像、字級、輸出與隱私合約。入口、桌面工作區、編輯器、手機框、欄位、選擇器與開始按鈕統一使用淡奶茶色系，不再使用黑色或深藍入口背景；所有雙語標題都有獨立正常流標題列，於 430 × 932 內不得重疊、裁切或省略。

## Current v32 desktop modes and deck choice / 目前 v32 桌面模式與選牌

v32 preserves every v31 game, artwork, typography, export, offline, and privacy contract. Desktop starts in Settings mode with an enlarged workbench, docked numeric controls, an inert phone preview, and direct manipulation disabled until explicitly enabled. Test mode provides one fully interactive centered 430 × 932 phone and retains session state when modes change. Mobile never renders desktop editing controls.

The collapsed advanced entry control supports all-random play or one approved artwork. Choosing a specific artwork locks only the artwork; the prompt and mandatory blessing remain independent and random. Before reveal, another participant may choose one of three favorite faces. Taiwan astral, world deity, and world zodiac families are registered as planned but cannot be selected until governed assets and content are approved. All visible headings and controls must reserve adequate line height and must not use clipping or ellipsis as a layout substitute.

v32 完整保留 v31 的遊戲、圖像、字級、輸出、離線與隱私合約。桌面預設為設定模式，提供放大工作區、固定數值控制、不可互動手機預覽，且拖拉須明確開啟；測試模式只呈現一支完整可互動且置中的 430 × 932 手機，切換模式會保留遊戲狀態。手機不會顯示桌面編輯工具。進階選牌可全部隨機或鎖定一張已核准卡面；鎖定僅影響圖像，題目與必備祝福仍獨立隨機。翻牌前可讓另一位參與者從三張卡面中挑選。台灣星座、不同國家神明與不同國家星座先登錄為規劃中，素材及內容完成治理前不可選用。所有可見標題與控制文字必須保留足夠行高，不得用裁切或省略號掩蓋版面問題。

Detailed gesture behavior is defined in `ANIMATION_SPEC.md`.

## Privacy Boundary / 隱私邊界

- Names, contacts, birthdays, notes, answers, and adult-content choices are private user input.
- v15 contains no backend or account integration.
- Persistent state is limited to language, font scale, and v22 layout numbers. Layout JSON must reject personal-field keys.
- Future versions must not introduce telemetry or personal-data transmission without explicit approval, disclosure, and review.

## v22 Editable Layout and Keepsake / v22 可編輯版面與紀念卡

v22 preserves all v21 card content and hidden-Taiwan behavior while adding three editable 430 × 932 screen documents. Setup places Begin at the bottom independently of mode selection. Game uses a 402 × 562 layered deck with a 22% upward commitment threshold, automatic flip, and a bottom fallback control. Keepsake preview and 1260 × 1760 PNG export follow the 63:88 reference, always include a blessing, and include each participant row only when explicitly selected.

## Current v23 Taiwan-safe Artwork / 目前 v23 台灣安全圖

v23 preserves the v22 layout editor, swipe deck, privacy boundary, independent question/artwork/blessing selection, and commemorative-card export. All 18 deity images now contain a recognizable Taiwan silhouette inside the centred visible crop. Motifs use different high-contrast colour pairs and appear in garments, weapons, accessories, or props. Every 600 ms long-press reveal uses the same detailed geographic path and the matching artwork colour; reduced-motion users receive a steady outline. The reveal remains runtime-only and is never baked into the keepsake PNG.

## v15 Acceptance Boundary / v15 驗收邊界

v15 remains the immutable source reference after SHA-256 verification. v16 has verified setup-button and responsive-layout evidence, but drag, flip, discard, PNG, Web Share, and physical iPhone Safari behavior still require dedicated regression evidence.

## v17 Modular Release / v17 模組化 Release

v17 reconstructs the governed product as React/TypeScript source with 60 reviewed bilingual prompts, all three modes, five levels, a memory-only birthday gate, accessible draw control, drag threshold, automatic flip, font controls, PNG/Web Share fallback, a complete-build PWA precache, and a generated standalone HTML. Existing v15/v16 artifacts remain unchanged. Physical iPhone installation, gesture feel, offline replay, and Share Sheet verification remain required before public deployment.

The preserved v17 source is inactive history under `_pending/Development-simplification_2026-07-19/`; its standalone release remains immutable under `Apps/Standalone/`.

## Preserved v18 Release / 保留的 v18 Release

v18 introduced whole-shell desktop fitting while preserving the 430 × 932 mobile contract. Its source and outputs remain preserved and immutable; the current launcher now serves v19.

## Preserved v19 Release / 保留的 v19 Release

v19 supersedes v18 without modifying it. It adds nine project-owned Taiwanese deity portraits, a full artwork panel followed by a separate question panel, a 1080 × 1620 keepsake PNG with the same non-overlapping structure, embedded standalone artwork, and Public Web v2. The desktop frame remains centered and shrink-to-fit; personal inputs remain client-side only.

## Preserved v20 Release / 保留的 v20 Release

v20 restores the v16 entrance composition: branded header and language switch, large bilingual invitation, ivory two-column setup sheet, Levels 1–5, three card modes, and bottom Begin action. It adds nine alternate deity poses for 18 total artworks, independently randomizes artwork/question/blessing, requires a blessing on every commemorative card, and keeps artwork separate from both question and blessing panels. The 430 × 932 phone is mathematically centered and shrink-to-fit on desktop without clipping or page scroll.

## Preserved v21 Release / 保留的 v21 Release

v21 preserves the complete v20 visual, language, card, blessing, export, privacy, and 430 × 932 desktop-centering contracts. Every one of the 18 deity artworks has a distinct hidden-Taiwan hotspot. Holding the artwork for 600 ms reveals a blinking gold Taiwan outline at that location; after release it remains for 3 seconds and fades. Pointer movement cancels an uncommitted reveal, artwork events do not bubble into card drawing, Enter and Space provide keyboard parity, and reduced-motion users receive a steady locator. The runtime annotation never enters the commemorative PNG.
## Current v36 mobile Work integration / 目前 v36 手機 Work 整合

- The setup header opens a five-tab settings dialog for general draw settings, the 42-artwork library, question management, card-content controls, and saved artwork positions.
- Exact artwork and exact question choices remain independent. Custom questions, disabled-question state, and exact choices exist only for the current browser session.
- The card and keepsake may hide the decorative “Real You” label or question, but the blessing is mandatory and cannot be disabled.
- Revealed cards expose artwork reselection and bounded per-artwork focus/zoom controls. Only non-personal presentation values use the versioned `encounter-presentation-v36` key.
- The 430 × 932 phone contract, bilingual modes, Levels 1–5, Truth/Dare/Surprise, Taiwan reveal, keepsake PNG, Share Sheet, and offline behavior remain intact.

## Preserved v35 entrance card library / 保留的 v35 入口卡庫

- The setup header exposes one compact list icon; activating it replaces the 430 × 932 setup surface with an accessible full-card library.
- The library can browse all 42 approved artworks and filter them by available collection without loading 42 card DOM trees at once.
- The current full card includes artwork, independently selected preview question, and a mandatory blessing. Side cards show the immediate previous and next faces.
- Horizontal swipe, Previous/Next controls, Left/Right keys, and wrap-around navigation are equivalent. Escape or the back control closes the library.
- “Use this face” changes only the session artwork preference and closes the library. Question choice remains random unless separately changed through the advanced setup panel.
- No library state, personal input, or exact selection is persisted or transmitted.
