# Australia Find It Hybrid Game / 澳洲大家來找碴混合遊戲

Date: 2026-08-26
Status: owner-approved for direct implementation

## Outcome / 成果

Add a fifth V47 phone-first experience named `大家來找碴 · AUSTRALIA FIND IT` for in-person play in Australia, with 50 bilingual cards and no account, backend, analytics, telemetry, or persistent personal data.

新增第五個 V47 手機優先體驗 `大家來找碴 · AUSTRALIA FIND IT`，供在澳洲與他人面對面遊玩，包含 50 張中英雙語卡牌，且不加入帳號、backend、analytics、telemetry 或持久個人資料。

## Card structure / 卡牌結構

- Cards 01–25 are `hidden-map` cards and reuse the 25 governed masters in `Library/Images/Species/Australia/field-journal-embedded-map-v2/`; every scene contains a recognisable Australia mainland silhouette plus Tasmania organically embedded in the subject or habitat.
- Cards 26–50 are `spot-difference` cards and use 25 new self-contained two-panel masters in `Library/Images/Games/Australia/find-it-v1/difference/`; every card depicts one Australia-recognisable place or everyday scene twice with exactly five discoverable differences.
- Runtime WebP derivatives live in `Versions/v47/app/encounter/assets/australia-find-it-v1/` and retain a manifest link back to their Library masters.
- The card book, exact prompts, bilingual titles, bilingual instructions, answer keys, visual limitations, and provenance live in `Library/Games/Australia/`.
- `Library/index.html` exposes both the hidden-map and spot-difference collections as clickable full-size masters.

## Interaction / 互動

- Entry label: `大家來找碴` with English `AUSTRALIA FIND IT`.
- Filters: `混合 · MIXED`, `找地圖 · HIDDEN MAP`, and `找不同 · DIFFERENCES`.
- Mixed mode draws all 50 cards without repetition until the eligible deck cycles; the two focused modes draw only their 25 cards.
- Each round shows the bilingual title, instruction, artwork, card number, and an optional 60-second timer.
- `揭曉答案 · REVEAL ANSWER` displays a bilingual answer description; difference cards list exactly five differences, while hidden-map cards describe the physical material and location of the Australia-and-Tasmania silhouette.
- `找到了 · FOUND IT` advances to a new eligible card; all state remains in memory and resets on reload.
- The image is the authored game surface; HTML supplies only controls, copy, and the answer panel.

## Visual contract / 視覺合約

- Every master is text-free, 1024 × 1536, RGB PNG, centered 63:88 crop-safe, and suitable for the existing 430 × 932 phone shell.
- Difference masters are vertically composed paired scenes on one portrait canvas so the comparison remains legible on a phone.
- Maps must be geographically recognisable and include Tasmania; vague blobs are rejected.
- Avoid flags as decoration, franchise trade dress, logos, watermarks, pseudo-writing, and imitation of Aboriginal or Torres Strait Islander cultural art, protected motifs, sacred sites, or living artists.
- Australia cues are environmental and everyday: native species, coast, cities, transport, sport, food, gardens, farms, and public landscapes.

## Verification / 驗證

- Deterministic contract proves 50 records, a 25/25 mode split, complete bilingual fields, five answers for every difference card, and unique Library/runtime paths.
- Mechanical image validation proves all 50 governed masters and 50 runtime derivatives exist with expected dimensions and formats.
- Focused UI contract proves the fifth entry, menu destination, three filters, timer, answer reveal, no-repeat draw helper, and offline-local behavior.
- Visual review checks all 25 difference masters for paired-scene coherence, exactly five intended differences, no accidental text, no map distortion where a map is present, and safe phone cropping.
- Run focused tests, `npm run test:v47`, `npm run lint`, `npm run build:encounter`, `node Versions/validate-repository.mjs`, and a 430 × 932 browser check before completion or deployment.
