# Truth and Dare / Encounter Cards Product Specification

## Product Promise / 產品承諾

Encounter Cards helps two people turn a simple conversation into a memorable encounter by drawing a question, sharing an answer, and keeping a blessing from the meeting.

相遇卡讓兩個人透過抽一個問題、分享一個答案與留下祝福，把簡單對話變成值得記住的相遇。

## Verified v15 Surface / 已驗證的 v15 介面

Static inspection of the supplied artifact confirms:

- Chinese (`中`), English (`EN`), and bilingual (`中/EN`) presentation controls.
- Player name, other-player name, and optional contact fields.
- Five familiarity levels: first meeting, familiar, friends, close, and intimate 18+.
- Truth, Dare, and Surprise card choices.
- A stated set of 60 levelled prompts.
- Browser-local language and font-scale preferences.
- Embedded PNG creation, Web Share, and download-fallback code.
- No account requirement, external JavaScript, or `fetch()` network call.

提供的 v15 產物經靜態檢查確認包含：

- 中文、英文與雙語顯示控制。
- 自己與對方姓名，以及雙方選填聯絡方式。
- 初見、熟悉、朋友、親近、親密 18+ 五個熟識等級。
- 真心話、小挑戰與隨機抽卡。
- 頁面宣告的 60 張分級題目。
- 瀏覽器本機語言與字體比例偏好。
- 內嵌 PNG 生成、Web Share 與下載備援程式。
- 不需帳號，且未發現外部 JavaScript 或 `fetch()` 網路呼叫。

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

The artifact is accepted as the immutable visual and behavioral reference only after its SHA-256 hash is verified. Static inspection proves package composition and code markers; it does not prove all interactive behavior. Drag, flip, discard, responsive layout, PNG, Web Share, and iPhone behavior require browser regression evidence.

