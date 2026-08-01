# V38 Mobile Viewport Fit Design / V38 手機單頁適配設計

## Outcome / 成果

Encounter Cards v38 preserves the immutable v37 desktop studio and makes the mobile setup, draw, and artwork-adjustment experiences fit inside the browser's live visual viewport without document scrolling or horizontal clipping.

v38 保留不可變的 v37 桌面工作室，並讓手機入口、抽卡與照片調整完整縮放至瀏覽器實際可視範圍，不產生頁面捲動或水平裁切。

## Contracts / 合約

- The authored canvas remains exactly 430 × 932 and scales uniformly by the smaller visual-viewport dimension.
- Setup keeps the header, introduction, participant fields, and Begin dock visible at once.
- Game cards and post-draw artwork controls stay inside the 430-pixel canvas.
- Artwork editing uses a nine-square grid, explicit Cancel/Save, X −50…50%, Y −60…60%, and 100…240% zoom.
- Saved artwork offsets visibly affect the drawn card and keepsake while defaults preserve the complete source artwork.
- No personal values, custom questions, exact selections, or adult choices enter persistent storage.

## Accessibility / 無障礙

The fixed canvas is visually scaled but retains semantic controls, native range inputs, keyboard Escape cancellation, accessible button labels, and a non-scrolling top-level document.
