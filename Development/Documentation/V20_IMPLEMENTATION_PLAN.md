# Encounter Cards v20 — Implementation Plan

## Scope and Boundaries

- Create `Development/Source/Main-App-v20/`, versioned v20 automation, validators, `Apps/Standalone/encounter_cards_v20.html`, and `Apps/Public-Web/v3/`.
- Add new artwork under `Assets/Deities/v20-variants/` and optimized copies under the v20 source.
- Do not edit v15–v19 release HTML, v18/v19 dist, or owner-private files.
- Preserve at least the three working releases v17, v18, and v19 throughout implementation.

## Task 1 — Versioned v20 baseline

1. Copy the maintained v19 authored project to `Main-App-v20` without generated dependencies.
2. Add failing v20 repository/version contract checks (RED).
3. Update package, PWA, service-worker, HTML, builders, launcher, and validators to v20/v3 (GREEN).
4. Evidence: version validators identify v20 while v15–v19 hashes remain unchanged.

## Task 2 — Independent encounter composition

1. Add failing tests for independent artwork selection, immediate-repeat avoidance, stable revealed composition, and mandatory bilingual blessings (RED).
2. Introduce `ArtworkVariant`, `Blessing`, and `EncounterComposition` interfaces plus deterministic injectable selection helpers.
3. Store the selected artwork and blessing with the current card; pass the exact composition to PNG export (GREEN).
4. Evidence: focused Vitest suite proves question/art/blessing independence and stability.

## Task 3 — v16 entrance and card restoration

1. Add deterministic DOM/CSS contract tests for v16 entrance sections, mythic-card structure, separate art/text regions, and v20 labels (RED).
2. Rebuild `App.tsx` structure and v20 styles using the approved v16 hierarchy (GREEN).
3. Add geometry tests for centered scaled wrappers at 1920×826, 1440×900, 1280×720, and 1024×768.
4. Evidence: browser screenshots and computed bounding boxes show no clipping and centered placement.

## Task 4 — Artwork variants

1. Inspect each existing deity source as identity/style reference.
2. Generate one respectful action/pose variant per deity with a different hidden Taiwan motif.
3. Save full-resolution PNGs, produce optimized WebP copies, record prompts/provenance, and validate dimensions/files.
4. Evidence: 18 registered local assets, no missing imports, and visual inspection of all nine new variants.

## Task 5 — Export, build, and publication artifacts

1. Add export tests proving the question panel cannot overlap artwork and a blessing is always drawn (RED).
2. Implement v16-style 1080 × 1620 keepsake export using the stored composition (GREEN).
3. Build PWA, standalone, and Public Web v3; verify embedded/local assets and release hashes.
4. Evidence: npm test, typecheck, lint, build, v20 validator, repository validator, desktop browser regression, and public artifact checks all pass.

## Task 6 — Documentation and handoff

Update README, GUIDE, AGENTS, Development README/documentation, roadmap, handoff, changelog, public blueprint, asset catalogue, and pending index where affected. Final review covers privacy, immutable releases, source provenance, desktop geometry, and remaining physical-iPhone limitations.
