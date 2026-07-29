# V34 Modern Taiwan Zodiac Implementation Plan

## Boundaries

- Write only new v34 source/release paths, the new modern asset hierarchy, versioned automation/tests, and affected public governance files.
- Never modify or remove v15–v33 standalone releases, Public Web v2–v16, v33 source, or `Assets/Zodiac/Taiwan/v33-masters/`.
- Preserve privacy: no persistence of personal input, analytics, backend, or network transmission.

## Task 1 — Govern the new assets

1. Create `Assets/Zodiac/Taiwan/v34-local-stories-masters/` with annotated README and manifest.
2. Generate one 1024 × 1536 project-owned master per sign using the approved original-form/local-story table.
3. Inspect all outputs for faithful zodiac identity, contemporary clothing when humans appear, expanded scene, complete Taiwan silhouette and prohibited cultural material.
4. Create a contact sheet and runtime WebP derivatives.

Evidence: twelve masters, twelve runtime files, manifest and contact sheet.

## Task 2 — RED: describe the collection and label contract

1. Copy authored v33 into a new `Development/Source/Main-App-v34/` line without generated dependencies or build output.
2. Add focused tests requiring both classic and local-story Taiwan zodiac collections, 42 total faces, preserved v33 IDs, twelve new IDs, and bilingual feature metadata.
3. Add UI tests requiring the explicit series-version selector, detailed Taiwanese feature text in the picker, and compact feature text on the revealed card.
4. Run focused tests and confirm RED because v34 metadata and modern collection do not exist.

## Task 3 — GREEN: implement minimal v34 behavior

1. Add feature metadata to the artwork interface.
2. Keep v33 art as `TAIWAN_ZODIAC_CLASSIC_ART`; add `TAIWAN_ZODIAC_MODERN_ART`; combine them only through the catalog.
3. Publish separate available collection entries and render compact feature labels in picker and card text.
4. Keep random defaults and all v33 interaction/privacy behavior unchanged.
5. Run focused tests, then complete typecheck, lint and full tests.

## Task 4 — Release and governance

1. Add v34 PWA/standalone and Public Web v17 builders without overwriting prior outputs.
2. Generate `Apps/Standalone/encounter_cards_v34.html` and `Apps/Public-Web/v17/`.
3. Add deterministic `validate_v34.ps1`, update launcher/workflow/current-version validators, and verify v33 hashes remain unchanged.
4. Update README, GUIDE, Development README, handoff, changelog, roadmap and public blueprint.
5. Move generated dependencies and caches to an indexed v34 pending archive.

## Final verification

Run typecheck, lint, all tests, `validate_v34.ps1`, `validate_clean_structure.ps1`, and `validate_repository.ps1`. Inspect the modern contact sheet and at least three high-risk crops. Commit the complete working tree; do not push or deploy without separate explicit approval.
