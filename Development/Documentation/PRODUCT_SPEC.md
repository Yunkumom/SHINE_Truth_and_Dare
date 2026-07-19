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
6. Optionally create and share or download a PNG card.

## Interaction Requirements / 互動需求

- Mobile typography must remain comfortable and use the available screen effectively.
- Bilingual content must not overflow or disappear.
- Drawing requires a deliberate drag and should feel like handling a collectible card.
- Motion follows the finger direction, extends continuously, then flips directly to the front.
- No second tap is required to reveal the front.
- Front artwork and text remain visible after the flip; back content never overlays them.
- Used cards can be dismissed with an intentional swipe.
- PNG export and iPhone sharing provide clear success or fallback behavior.

Detailed gesture behavior is defined in `ANIMATION_SPEC.md`.

## Privacy Boundary / 隱私邊界

- Names, contacts, birthdays, notes, answers, and adult-content choices are private user input.
- v15 contains no backend or account integration.
- Static inspection found persistent preference keys only for language and font scale.
- Future versions must not introduce telemetry or personal-data transmission without explicit approval, disclosure, and review.

## v15 Acceptance Boundary / v15 驗收邊界

v15 remains the immutable source reference after SHA-256 verification. v16 has verified setup-button and responsive-layout evidence, but drag, flip, discard, PNG, Web Share, and physical iPhone Safari behavior still require dedicated regression evidence.

## v17 Modular Release / v17 模組化 Release

v17 reconstructs the governed product as React/TypeScript source with 60 reviewed bilingual prompts, all three modes, five levels, a memory-only birthday gate, accessible draw control, drag threshold, automatic flip, font controls, PNG/Web Share fallback, a complete-build PWA precache, and a generated standalone HTML. Existing v15/v16 artifacts remain unchanged. Physical iPhone installation, gesture feel, offline replay, and Share Sheet verification remain required before public deployment.
