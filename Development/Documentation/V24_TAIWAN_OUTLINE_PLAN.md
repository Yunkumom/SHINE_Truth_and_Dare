# Encounter Cards v24 Taiwan Outline Implementation Plan

Date: 2026-07-23

## Constraints

- Do not edit v15–v23 source or release outputs.
- Create `Development/Source/Main-App-v24/`, standalone v24, and Public Web v7.
- Preserve privacy, layout, card, sharing, artwork, and gesture contracts.
- Add no package dependency, analytics, backend, account, or persistence.

## Task 1 — Create the v24 source line

Copy v23 into `Development/Source/Main-App-v24/`, update version labels, storage/cache identifiers, scripts, and manifests to v24. Preserve the 18 v23 Taiwan-safe artwork files and hotspot coordinates.

Checkpoint: v23 hash remains unchanged and v24 package metadata identifies 24.0.0.

## Task 2 — RED reveal contract

Update `src/components/TaiwanReveal.test.tsx`, `src/lib/taiwan-shape.test.ts`, and `tests/taiwan-reveal-css.test.ts` to require:

- two SVG coastline paths with `data-canonical-shape="taiwan-v24"`;
- no `.taiwan-locator-dot` or `.taiwan-locator-halo` nodes;
- transparent fill, crisp/glow outline classes, minimum 34 × 68 px geometry;
- no radial gradient, oval border, or solid island fill;
- reduced-motion steady outline.

Command: `npm test -- --run src/components/TaiwanReveal.test.tsx src/lib/taiwan-shape.test.ts tests/taiwan-reveal-css.test.ts`

Expected RED: assertions fail against copied v23 implementation.

## Task 3 — GREEN precise outline

Update `src/lib/taiwan-shape.ts`, `src/components/TaiwanReveal.tsx`, and `src/styles/taiwan-reveal.css`. Use a more detailed normalized main-island path, two coincident outline paths, transparent fill, and coastline-only pulse. Remove dot and halo markup/styles.

Checkpoint: focused tests, `npm run typecheck`, `npm run lint`, and full `npm test` pass.

## Task 4 — Release and browser verification

Add v24/v7 automation, build `dist/`, export immutable `Apps/Standalone/encounter_cards_v24.html`, generate `Apps/Public-Web/v7/`, and update launcher/Pages targets. Verify at 430 × 932 in the browser with a revealed card screenshot and computed-style evidence.

Checkpoint: rendered SVG has two paths, transparent fill, at least 34 × 68 CSS px before per-artwork scale, and no halo/dot elements.

## Task 5 — Governance and final verification

Add `Development/Tests/validate_v24.ps1`; update repository/structure validation and current documentation (`README.md`, `GUIDE.md`, `AGENTS.md`, Development docs, `_meta` handoff/roadmap/changelog/public blueprint). Run v24 validation and `Development/Tests/validate_repository.ps1`, inspect the diff, commit all main-program changes, and report any physical-iPhone limitation.
