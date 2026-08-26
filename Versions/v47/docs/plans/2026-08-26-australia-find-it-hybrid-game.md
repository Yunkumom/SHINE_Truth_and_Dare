# Australia Find It Hybrid Game Implementation Plan / 澳洲大家來找碴混合遊戲實作計畫

Date: 2026-08-26
Design: `Versions/v47/docs/designs/2026-08-26-australia-find-it-hybrid-game.md`

## Constraints / 限制

- Writable scope: new `Library/Games/Australia/` content, new `Library/Images/Games/Australia/find-it-v1/` assets, `Library/index.html`, the V47 encounter source/tests/assets, the approved design/plan, and consolidated `HANDOFF.md` evidence.
- Preserve v39, v46, release state, existing Library masters, `_pending/`, `_trash/`, external accounts, and unrelated working-tree changes.
- Use built-in `image_gen` once per new difference master; do not substitute HTML or CSS artwork.
- Keep runtime play offline and memory-only.

## Task 1 — RED contract / 紅燈合約

Add `Versions/v47/tests/australia-find-it-contract.test.mjs` to require the new destination, fifth home entry, 50-card registry, 25/25 mode split, bilingual copy, five answers per difference card, timer, reveal control, and Library/runtime provenance; run it before production code and record the intended missing-feature failure.

Evidence: `node --test tests/australia-find-it-contract.test.mjs` fails only because the new feature files and wiring do not yet exist.

## Task 2 — Library specification / 素材庫規格

Create `Library/Games/Australia/AUSTRALIA_FIND_IT_CARD_BOOK.md`, `PROMPTS.md`, and `README.md` with 50 stable IDs, bilingual names and instructions, 25 hidden-map locations, 25 five-item difference keys, exact source paths, and cultural/visual boundaries.

Evidence: registry generation or validation finds 50 complete unique entries and no placeholders.

## Task 3 — Difference masters / 找不同主圖

Generate exactly 25 text-free 1024 × 1536 RGB PNG paired-scene masters with one built-in `image_gen` call per card, inspect every result, regenerate failures non-destructively, and write `MANIFEST.sha256` plus five review contact sheets.

Evidence: 25/25 difference masters pass mechanical checks and visual review; existing 25 hidden-map masters remain unchanged.

## Task 4 — Runtime derivatives and data / Runtime 副本與資料

Create optimized WebP derivatives for all 50 cards under `Versions/v47/app/encounter/assets/australia-find-it-v1/`; add `australia-find-it.ts` for stable card metadata and `australia-find-it-game.ts` for mode filtering and no-repeat draws.

Evidence: focused data tests pass, every runtime path resolves, and the runtime manifest maps each derivative to one Library master.

## Task 5 — UI integration / 介面整合

Add `AustraliaFindIt.tsx` and `australia-find-it.css`; wire the fifth destination through `App.tsx`, `ModeHome.tsx`, and `SurfaceMenu.tsx`; implement bilingual mode filters, optional 60-second timer, answer reveal, found/next action, and phone/showcase navigation.

Evidence: focused contract becomes GREEN and keyboard-accessible buttons expose correct labels and states.

## Task 6 — Gallery, verification, and delivery / 圖庫、驗證與交付

Expose both collections in `Library/index.html`, update `HANDOFF.md`, run focused and full checks, inspect at 430 × 932 in day/night and all three languages, rebuild, deploy to the already configured V47 Firebase preview target after verification, verify the public URL, and commit/push only scoped changes when repository state safely permits.

Evidence: exact command results, public build asset names and URL, known unrelated failures, unavailable physical-device/PowerShell checks, and no release promotion are recorded.
