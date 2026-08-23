# Direct Keepsake Export Parity Plan

## Implementation sequence

1. Add a focused source contract that requires a 76 px preview blessing row, a proportional 230 px PNG blessing panel, the creation-stage panel order, and removal of the unrelated poster branding.
2. Confirm RED against the old automatic 52 px preview blessing and legacy poster-style PNG.
3. Update `app/encounter/styles/v47-ux.css` with the enlarged fixed blessing row.
4. Update `app/encounter/lib/direct-keepsake.ts` to render rounded title, artwork, and blessing panels using geometry proportional to the preview while preserving `calculateZoomedCoverPlacement`.
5. Add the long-blessing fallback and confirm the focused contracts are GREEN.
6. Verify at 430 × 932, render the actual PNG, run `npm run test:v47`, `npm run lint`, `npm run build:encounter`, and root `node Versions/validate-repository.mjs`, then record exact limitations.

## 實作順序

1. 新增聚焦 source contract，要求預覽使用 76 px 祝福列、PNG 使用同比例 230 px 祝福面板、採製作階段面板順序，並移除不相干的海報品牌內容。
2. 確認舊有自動 52 px 預覽祝福區與舊海報式 PNG 會產生 RED。
3. 修改 `app/encounter/styles/v47-ux.css`，加入加大的固定祝福列。
4. 修改 `app/encounter/lib/direct-keepsake.ts`，依預覽比例繪製圓角標題、圖片與祝福面板，同時保留 `calculateZoomedCoverPlacement`。
5. 加入長祝福備援排版並確認聚焦合約達成 GREEN。
6. 以 430 × 932 驗證、實際渲染 PNG、執行 `npm run test:v47`、`npm run lint`、`npm run build:encounter` 與根目錄 `node Versions/validate-repository.mjs`，再精確記錄限制。
