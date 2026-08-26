# Australian Species Embedded-Map V2 Implementation Plan / 澳洲物種情境融合地圖 V2 實作計畫

Date: 2026-08-26
Design: `Versions/v47/docs/designs/2026-08-26-australian-species-embedded-map-v2.md`

## Scope / 範圍

- Add one non-overwriting V2 master collection, its prompt record, integrity manifest, review sheets, validator, README/HANDOFF revision evidence, and recoverable rejected drafts if needed.
- Preserve V1, canonical bilingual copy, runtime code, v46, release records, deployments, external accounts, and all unrelated staged or working-tree changes.

## Task 1 — Prompt contract / 提示詞規格

Write exactly 25 subject prompts, each naming one unique physical map-integration mechanism and prohibiting corner insets, floating diagrams, and detached overlays.

Evidence: `rg -n '^## [0-9]{2} ' Library/Images/Species/Australia/field-journal-embedded-map-v2/PROMPTS.md` returns 25 entries.

## Task 2 — Representative samples / 代表樣張

Generate red kangaroo with trampled earth, koala with food leaves, and Tasmanian devil with a plausible white chest marking; visually reject any result that reads as a separate map graphic.

Evidence: three 1024 × 1536 RGB PNG samples pass centered 63:88 review before continuing.

## Task 3 — Remaining masters / 其餘主圖

Generate one built-in `image_gen` call per remaining species, using the Taiwan field-journal master only as a style/layout reference and the V2 prompt as the content authority.

Evidence: exactly 25 V2 filenames exist with no V1 overwrite.

## Task 4 — Crop and integration review / 裁切與融合檢查

Run `Library/Images/Species/Australia/validate_embedded_map_v2.py`, inspect five V2 contact sheets, and regenerate any clipped, cornered, floating, distorted, culturally unsafe, or biologically misleading result.

Evidence: 25/25 mechanical pass plus documented visual review of every card.

## Task 5 — Provenance and commit / 來源追溯與提交

Create the SHA-256 manifest, update V2 provenance in `Library/Images/Species/Australia/README.md` and `HANDOFF.md`, run scoped diff checks and `node Versions/validate-repository.mjs`, then commit only the V2 paths and documentation locally.

Expected limitation: report the known unrelated missing `_pending/repository-simplification_2026-08-18/inventory.sha256` validator failure if unchanged.
