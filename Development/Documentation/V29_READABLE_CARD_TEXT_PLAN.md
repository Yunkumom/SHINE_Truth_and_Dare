# Encounter Cards v29 Readable Card Text Implementation Plan

Date: 2026-07-27

## Constraints

- Preserve immutable v15–v28 source outputs and public releases.
- Create `Development/Source/Main-App-v29/`, standalone v29, and Public Web v12.
- Preserve the 430 × 932 mobile canvas, desktop 445 × 932 physical-ratio frame, gestures, Taiwan reveal, language modes, content modes, and privacy boundary.
- Add no dependency, backend, analytics, account, or personal-data persistence.

## Task 1 — Version boundary and RED tests

Files: v29 package metadata, `src/presentation/presentation-model.test.ts`, `src/components/LayoutEditor.test.tsx`, `src/App.test.tsx`, and a new CSS contract test.

1. Copy the authored v28 line into a new v29 working line without modifying v28.
2. Update test suite names and write assertions for independent `question.fontScale` and `blessing.fontScale`, 1.2/1.25 defaults, 0.9–1.8 clamps, editor number/range inputs, v29 CSS variables, and PNG synchronization.
3. Run focused tests and record RED caused by the missing v29 typography behavior.

Evidence: Vitest reports the new assertions failing for missing question presentation and old defaults.

## Task 2 — Minimal GREEN implementation

Files: `src/presentation/presentation-model.ts`, `src/components/LayoutEditor.tsx`, `src/App.tsx`, `src/styles/v29-layout.css`, `src/styles/v29.css`, and `src/lib/share.ts`.

1. Add a normalized question typography object and increase blessing default scale.
2. Add synchronized numeric and range inputs for both font scales.
3. Feed CSS custom properties into game and keepsake typography, retain normal wrapping, and keep overflow inside the panels.
4. Apply both values to PNG text drawing and use v29 filenames/titles/labels.
5. Run focused tests until GREEN, then run all v29 unit tests.

Evidence: focused and full Vitest suites pass with exact control and rendering assertions.

## Task 3 — Versioned outputs and documentation

Files: v29/v12 build scripts and recipes, `Apps/Standalone/encounter_cards_v29.html`, `Apps/Public-Web/v12/`, launcher/server/workflow, validator, README/GUIDE/AGENTS and current `_meta/`/Development documents.

1. Add v29 build/export/finalization scripts and release validator.
2. Build verified v29 PWA, standalone v29, and Public Web v12.
3. Update the current-version pointers and reconstruction documentation.
4. Move reproducible dependency/cache state to an indexed `_pending/` location after validation.

Evidence: v29 validator and repository validator pass; no active `node_modules` remains under Development.

## Task 4 — Final verification and publication

Commands:

```powershell
Set-Location Development/Source/Main-App-v29
npm ci
npm run typecheck
npm run lint
npm test
npm run build
Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v29.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

Inspect the desktop workspace and exact 430 × 932 phone view in a real browser. Confirm enlarged readable text, wrapping, synchronized controls, no clipping, and no console errors. Commit all main-program changes, push the approved current tree to GitHub, wait for Pages success, and verify the public URL returns the v29 artifact.
