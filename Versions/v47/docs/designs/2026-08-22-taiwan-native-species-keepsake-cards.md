# Taiwan Native Species Keepsake Cards / 臺灣原生物種紀念卡

Date: 2026-08-22  
Status: artwork and copy foundation implemented; app integration is a later scope

## Purpose / 目的

Create a collectible 25-card Taiwan native-species keepsake set that can later join the v47 card experience without prematurely adding Truth, Dare, or Surprise prompts.

建立 25 張可收藏的臺灣原生物種紀念卡基礎，日後可整合至 v47 卡牌體驗，但此階段不提前加入真心話、小挑戰或隨機題目。

## Composition / 組成

- 15 vertebrates / 15 種脊椎動物
- 5 plants / 5 種植物
- 5 invertebrates / 5 種無脊椎動物
- Mandatory anchor / 必備主角: 臺灣櫻花鉤吻鮭 / Formosan landlocked salmon

## Artwork contract / 圖像規格

- One independent text-free PNG master per species.
- Source dimensions are 1024 × 1536 (2:3), deliberately taller than the final card.
- The central 63:88 composition is crop-safe; the subject and diagnostic silhouette remain away from edges.
- Habitat and warm paper texture extend to all edges as adjustable bleed.
- The lower area remains visually quiet for a very short front caption.
- Style is an elegant natural-history field journal: watercolor, colored pencil, fine indigo ink, warm fibrous paper, restrained accents, and delicate botanical marginalia.
- No generated typography, frame, logo, watermark, game prompt, Japanese motif, or Australian imagery.

## Card content contract / 卡片內容規格

Front:

- artwork
- bilingual common name
- one short memory line

Back:

- scientific name
- one compact factual species story
- one keepsake blessing
- separately maintained habitat, endemic/native, and conservation metadata

Truth, Dare, and Surprise prompts are explicitly deferred until a later owner-approved integration phase.

## Files / 檔案

- Art masters: `Library/Images/Species/Taiwan/field-journal-v1/`
- Canonical copy: `Library/Species/Taiwan/TAIWAN_SPECIES_KEEPSAKE_CARD_BOOK.md`
- Provenance and inventory: `Library/Images/Species/Taiwan/README.md`

## Privacy and runtime boundaries / 隱私與執行邊界

This artwork-and-copy phase adds no analytics, account, storage, backend, telemetry, personal input, network runtime dependency, or persistent play data, and it does not modify or promote `latestVerified`.

本圖像與文案階段不加入 analytics、帳號、storage、backend、telemetry、個人輸入、執行期網路依賴或持久遊玩資料，亦不修改或 promotion `latestVerified`。

## Verification / 驗證

- exactly 25 master PNG files
- every master is 1024 × 1536 RGB PNG
- visual review covers subject count, obvious anatomy, accidental text, style consistency, and crop-safe margins
- copy review checks 25 unique species entries, short front lines, back stories, blessings, scientific names, and direct authoritative source links
- specialist taxonomic review remains required before claiming scientific illustration accuracy

