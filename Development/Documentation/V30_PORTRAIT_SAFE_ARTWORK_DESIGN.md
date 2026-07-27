# v30 Portrait-safe Artwork Design / v30 人像安全圖設計

## Goal / 目標

Regenerate all 18 deity artworks so the reusable master retains substantially more surrounding scenery than the card displays. Every card crop must preserve the complete face, hair, crown and head ornaments, while the embedded Taiwan remains complete and revealable inside the visible artwork frame.

重新生成全部 18 張神祇圖；可重用 master 必須保留比卡片更多的周圍場景。所有卡片裁切都要保留完整臉、頭髮、頭冠與垂飾，藏入的台灣也必須完整留在可見畫框並可準確揭示。

## Master contract / Master 合約

- 1024 × 1536 PNG, vertical 2:3, no card frame or text.
- Subject centered with generous scene above and beside the complete crown.
- One complete, contrasting Taiwan main-island silhouette embedded in a central garment, book, scroll, lamp, basket, armor, pendant, tablet, ingot, vase, lantern, or mortar.
- Important content designed for the app's near-square `object-fit: cover` center crop.
- Project-owned v28 Baosheng Dadi rainy-apothecary artwork is the shared style and safe-framing reference.
- Runtime uses high-quality WebP derivatives; PNG masters remain under `Assets/Deities/v30-safe-masters/`.

## Runtime mapping / Runtime 對應

`DEITY_ART` keeps two variants for each of nine deities. Each variant owns a bounded `portraitFocus` and a locator aligned to the embedded Taiwan. v29 interaction, typography, privacy, keepsake and PNG behavior remain unchanged.

`DEITY_ART` 為九位神祇各保留兩張變體；每張具有受限的 `portraitFocus` 與對準畫中台灣的 locator。v29 互動、字級、隱私、紀念卡與 PNG 行為不變。

## Acceptance / 驗收

- All 18 runtime assets are unique `*-safe-v30.webp` files and all 18 PNG masters exist.
- Automated tests confirm two variants per deity, bounded focal points and central locator metadata.
- Browser rotation reaches all 18 assets; the three highest-risk crops—seated Guanyin, tall-crown Zhusheng Niangniang and reading Guan Sheng Dijun—retain crown and Taiwan.
- Keyboard/long-press reveal aligns the canonical glowing Taiwan coastline with the embedded island.
