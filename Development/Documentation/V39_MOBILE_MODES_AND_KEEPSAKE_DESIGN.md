# V39 Mobile Modes and Keepsake Design / V39 手機模式與紀念卡設計

## Outcome / 成果

Encounter Cards v39 replaces mobile canvas shrinking with a full-width live-viewport layout. It adds a three-choice mobile home, an icon-only menu entry, and a privacy-safe direct keepsake maker.

v39 不再縮小整個手機畫布，而是以瀏覽器實際寬度重新排版；並新增三模式入口、純圖示設定鍵，以及不傳輸個資的直接紀念卡製作器。

## Mobile layout contract / 手機版面合約

- The app fills `100%` of the mobile viewport width and `100dvh` height without horizontal overflow.
- Setup, game, post-draw controls, and primary actions reflow between equal 12 px side insets.
- The desktop 430 × 932 authoring studio remains unchanged.
- Short and narrow viewports receive compact spacing and card heights rather than global canvas scaling.

## Experience modes / 體驗模式

1. Encounter Card opens the existing encounter setup and draw flow.
2. Create a Keepsake opens a direct creator without requiring a question draw.
3. Truth or Dare opens the existing governed Truth/Dare/Random draw engine.

Every mobile experience can return to the mode home. The setup menu uses three horizontal lines, no visible settings text, and retains an accessible bilingual label.

## Direct keepsake / 直接紀念卡

- Choose any governed artwork or upload a local image.
- Choose a governed blessing or write up to 120 characters.
- Preview the complete image with `object-fit: contain` so source edges are not silently cropped.
- Download or share a 1260 × 1760 PNG using the existing safe delivery path.
- Uploaded image data, custom blessing text, and mode choice remain memory-only and are never sent to a backend or written to persistent storage.
