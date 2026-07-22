# v23 Taiwan-safe deity artwork / v23 台灣安全區神祇素材

These 18 PNG files are the reusable high-resolution sources for Encounter Cards v23. Every image contains one deliberately recognizable Taiwan silhouette in the central card-safe region, with a distinct high-contrast colour pair. The artwork was generated with OpenAI built-in image generation on 2026-07-22 from project-owned v19/v20 deity references.

這 18 張 PNG 是相遇卡 v23 的可重用高解析來源。每張圖都在卡片中央安全區藏入一個刻意可辨識的台灣輪廓，並使用不同的高對比配色。素材於 2026-07-22 使用 OpenAI 內建圖像生成，以專案自有的 v19／v20 神祇圖為參考建立。

| File | Deity / 神祇 | Hidden location / 藏入位置 | Colours / 顏色 |
| --- | --- | --- | --- |
| `mazu-sea-taiwan-safe.png` | 媽祖 | right sleeve embroidery / 右袖刺繡 | turquoise + coral |
| `mazu-lantern-taiwan-safe.png` | 媽祖 | lantern inlay / 燈籠鑲嵌 | jade + cinnabar |
| `guanyin-moon-taiwan-safe.png` | 觀音 | vase enamel / 淨瓶琺瑯 | cobalt + turquoise |
| `guanyin-lotus-taiwan-safe.png` | 觀音 | sash embroidery / 披帛刺繡 | violet + blue |
| `guansheng-guardian-taiwan-safe.png` | 關聖帝君 | shoulder armour / 肩甲 | cinnabar + turquoise |
| `guansheng-courtyard-taiwan-safe.png` | 關聖帝君 | polearm inlay / 兵器鑲嵌 | turquoise + red |
| `xuantian-sea-taiwan-safe.png` | 玄天上帝 | sword enamel / 劍身琺瑯 | blue + gold |
| `xuantian-stair-taiwan-safe.png` | 玄天上帝 | chest armour / 胸甲 | teal + red |
| `baosheng-herbs-taiwan-safe.png` | 保生大帝 | medicine scroll / 藥卷 | emerald + gold |
| `baosheng-apothecary-taiwan-safe.png` | 保生大帝 | mortar / 藥臼 | turquoise + coral |
| `tudigong-throne-taiwan-safe.png` | 土地公 | gold-ingot inlay / 元寶鑲嵌 | ruby + jade |
| `tudigong-harvest-taiwan-safe.png` | 土地公 | basket weaving / 籃編 | blue + red |
| `wenchang-book-taiwan-safe.png` | 文昌帝君 | book inlay / 書冊鑲嵌 | sapphire + gold |
| `wenchang-study-taiwan-safe.png` | 文昌帝君 | illuminated scroll / 發光卷軸 | violet + teal |
| `yuelao-book-taiwan-safe.png` | 月老 | marriage book / 姻緣簿 | rose + turquoise |
| `yuelao-banyan-taiwan-safe.png` | 月老 | waist pendant / 腰墜 | jade + gold |
| `zhusheng-tablet-taiwan-safe.png` | 註生娘娘 | ceremonial tablet / 法牌 | coral + turquoise |
| `zhusheng-lamp-taiwan-safe.png` | 註生娘娘 | lotus lamp / 蓮燈 | ruby + cobalt |

## Generation contract / 生成合約

Each edit preserved the deity's identity, face, pose, hands, scene, painterly realism, framing, resolution, and aspect ratio. The prompt required an elongated north-northeast-to-south-southwest Taiwan silhouette with a broader north, distinct west/east coasts, and pointed southern tip; it explicitly rejected bowls, arcs, leaves, ovals, shields, and generic blobs. Old edge motifs were removed, no text or watermark was added, and the replacement motif was placed inside the v23 visible crop.

每次編修都保留神祇身分、臉部、姿勢、手部、場景、繪畫寫實風格、構圖、解析度與比例。提示明確要求北北東—南南西走向、北部較寬、東西海岸可分辨、南端尖細的台灣輪廓，並排除碗形、弧形、葉片、橢圓、盾牌與一般色塊。舊有靠邊圖案已移除，未加入文字或浮水印，新圖案位於 v23 可見裁切範圍內。

Runtime WebP copies are version-bound under `Development/Source/Main-App-v23/src/assets/deities/`. Long-press reveal coordinates and colours are maintained in `src/lib/deity-art.ts`; the single canonical geographic outline is maintained in `src/lib/taiwan-shape.ts`.

網站用 WebP 副本位於 `Development/Source/Main-App-v23/src/assets/deities/`。長按定位與配色由 `src/lib/deity-art.ts` 管理；全卡共用的精緻台灣地理輪廓由 `src/lib/taiwan-shape.ts` 管理。
