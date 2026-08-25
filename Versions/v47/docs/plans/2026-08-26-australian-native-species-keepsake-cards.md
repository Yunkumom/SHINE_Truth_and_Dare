# Australian Native Species Keepsake Cards Implementation Plan / 澳洲原生物種紀念卡實作計畫

Date: 2026-08-26
Design: `Versions/v47/docs/designs/2026-08-26-australian-native-species-keepsake-cards.md`

## Scope and boundaries / 範圍與邊界

- Writable scope: the design and plan, `Library/Species/Australia/`, `Library/Images/Species/Australia/`, the Australian-species section of `HANDOFF.md`, and the Library gallery only if all 25 masters pass review.
- Preserve all unrelated working-tree changes.
- Do not modify v46, runtime code, questions, Firebase, release records, external accounts, or `_pending/`.
- Do not claim scientific-illustration accuracy or fresh conservation status without specialist review.

## Task 1 — Canonical inventory and prompts / 標準清單與提示詞

Create the 25-entry bilingual card book and a prompt manifest with exactly 15 vertebrates, 5 plants, and 5 invertebrates; each prompt names the protected map coordinates, central crop, lower caption area, habitat, and cultural-style exclusions.

Evidence:

```bash
rg -n '^## [0-9]{2} ' Library/Species/Australia/AUSTRALIAN_SPECIES_KEEPSAKE_CARD_BOOK.md
rg -n '^## [0-9]{2} ' Library/Images/Species/Australia/field-journal-map-v1/PROMPTS.md
```

Expected: 25 entries in each file with no duplicate numbered ID.

## Task 2 — Generate independent masters / 產生獨立主圖

Use built-in `image_gen`, one call per species, and save each selected project-bound output under `Library/Images/Species/Australia/field-journal-map-v1/` without overwriting governed assets.

Evidence: each requested filename exists and is a PNG.

## Task 3 — Mechanical and visual QA / 機械與視覺品質檢查

Inspect dimensions and colour mode, generate centered 63:88 contact sheets for review, and reject or regenerate any image with a clipped/distorted map, missing Tasmania, accidental text, multiple principal subjects, implausible anatomy, or unsafe subject crop.

Evidence:

```bash
python3 Library/Images/Species/Australia/validate_masters.py
(cd Library/Images/Species/Australia/field-journal-map-v1 && shasum -a 256 -c manifest.sha256)
```

Expected: 25/25 files pass 1024 × 1536 RGB PNG and safe-map review is recorded.

## Task 4 — Provenance and repository evidence / 來源追溯與 repository 證據

Record the generator, final prompt set, dimensions, design link, runtime boundary, visual-review outcome, and SHA-256 manifest; update `HANDOFF.md` only after the collection passes.

Evidence:

```bash
git diff --check -- Versions/v47/docs/designs/2026-08-26-australian-native-species-keepsake-cards.md Versions/v47/docs/plans/2026-08-26-australian-native-species-keepsake-cards.md Library/Species/Australia Library/Images/Species/Australia HANDOFF.md
node Versions/validate-repository.mjs
```

Expected: scoped diff check passes; any unrelated existing repository-validator failure is reported exactly.

## Final security and delivery checkpoint / 最終安全與交付檢查點

Confirm no runtime code, dependency, network behavior, analytics, account, telemetry, persistent personal data, deployment, release record, or verified release was changed; commit only the new Australian species collection and its approved documentation locally.
