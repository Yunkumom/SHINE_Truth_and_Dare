# Encounter Cards v22 Layout Editor Implementation Plan

## Boundaries

- Create `Development/Source/Main-App-v22/` from the verified v21 source; never modify v15–v21 generated releases.
- Use existing React, TypeScript, CSS, Vitest, and browser tooling; add no runtime dependency, analytics, backend, account, or personal-data persistence.
- Write only v22 source/output/automation/validation plus affected current governance and launcher files.
- Preserve the 430 × 932 phone contract, v21 Taiwan reveal, bilingual modes, Levels 1–5, Truth/Dare/Surprise, mandatory blessings, and independent question/art/blessing selection.

## Task 1 — Versioned source and RED layout model tests

Files: `src/layout/layout-model.ts`, `src/layout/layout-model.test.ts`, `src/types.ts`.

1. Copy v21 to v22 and update source-only version markers.
2. Add failing tests for schema validation, bounds/minimum normalization, twenty-step history, reset, JSON round trip, and rejection of personal-field keys.
3. Run the focused test and record RED for the missing layout module.
4. Implement `LayoutDocument`, `LayoutBlock`, defaults, normalization, history, serialization, and safe import.
5. Run focused tests GREEN.

Evidence: layout tests pass and serialized JSON contains no personal data.

## Task 2 — RED/GREEN swipe deck controller

Files: `src/lib/swipe-deck.ts`, `src/lib/swipe-deck.test.ts`, `src/components/SwipeDeck.tsx`.

1. Add failing tests for 22% commitment, sub-threshold return, horizontal tilt, cancellation, and one draw per gesture.
2. Confirm RED for missing controller behavior.
3. Implement the pure decision/controller helpers and the pointer-driven deck component.
4. Preserve the artwork long-press target by starting discard gestures only outside the artwork.
5. Run focused and related card tests GREEN.

Evidence: deterministic threshold and duplicate-prevention tests pass.

## Task 3 — RED/GREEN layout editor UI

Files: `src/components/LayoutEditor.tsx`, `src/components/EditableBlock.tsx`, component tests, `src/styles/layout-editor.css`.

1. Add failing component tests for editor visibility, screen switching, selection, drag, resize, numeric edits, undo/redo, reset, export, and invalid import.
2. Confirm RED for the missing UI.
3. Implement direct manipulation, property controls, grid snapping, history, and JSON exchange.
4. Keep all personal state outside the layout document.
5. Run component tests GREEN and add CSS contract checks.

Evidence: editor round-trip and privacy-boundary tests pass.

## Task 4 — Integrate the three v22 screens

Files: `src/App.tsx`, `src/styles/app.css`, `src/styles/v22.css`, relevant tests.

1. Add failing integration tests proving Begin is below the mode grid, the mobile card is larger than v21, the bottom button is fallback-only, and editing chrome is absent in player mode.
2. Refactor setup into registered layout blocks, integrate `SwipeDeck`, and add editor screen previews.
3. Use a near-full-width 63:88 card within remaining mobile height and preserve exact desktop centering.
4. Keep v21 TaiwanReveal behavior and verify it does not trigger deck discard.
5. Run integration tests GREEN.

Evidence: component geometry contracts and gesture isolation pass.

## Task 5 — Keepsake contact controls and 63:88 export

Files: `src/lib/share.ts`, `src/lib/share.test.ts`, `src/components/KeepsakePreview.tsx`, related styles.

1. Add failing tests for mandatory blessing, per-person contact inclusion, exclusion of hidden contacts, 63:88 canvas geometry, and absence of editor/Taiwan overlays.
2. Implement preview controls and canvas export using the same versioned keepsake layout blocks.
3. Keep personal fields memory-only and preserve Web Share plus desktop download fallback.
4. Run focused tests GREEN.

Evidence: canvas call contract proves 63:88, blessing, and contact-selection behavior.

## Task 6 — Build v22 release artifacts and update contracts

Files: versioned v22 finalizers/exporter, `Apps/Standalone/encounter_cards_v22.html`, `Apps/Public-Web/v5/`, `Development/Source/Public-Web/v5/`, `Development/Tests/validate_v22.ps1`, launcher, Pages workflow, current documentation and governance.

1. Run typecheck, lint, and the complete source suite.
2. Build v22, finalize PWA, export standalone v22, and create Public Web v5 without overwriting existing artifacts.
3. Update launcher and Pages workflow to v22/v5.
4. Update README/GUIDE/Development inventory, product/architecture/animation/content/PWA contracts, handoff/changelog/roadmap/public blueprint, clean-structure and repository validators.
5. Move generated dependencies and TypeScript caches to an indexed v22 `_pending` generated-state directory.

Evidence: exact v22 release hash, immutable earlier hashes, clean structure, and full repository validator pass.

## Task 7 — Browser verification, review, and commit

1. At 430 × 932 verify setup spacing, bottom Begin, editor drag/resize and JSON round trip, swipe return/commit/flip, enlarged card, Taiwan long press, keepsake contacts, and PNG fallback.
2. At desktop sizes verify exact centering, no clipping, and no page overflow.
3. Verify no console errors and reduced-motion fallback.
4. Review the implementation against the approved design, run final fresh verification, and commit the complete v22 change locally.
5. Do not push or deploy without a new explicit publication request.

Evidence: browser geometry/interaction records, clean Git status after commit, and documented physical-device residual risk.
