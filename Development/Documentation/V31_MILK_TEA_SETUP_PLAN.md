# Encounter Cards v31 Milk-Tea Setup Implementation Plan

## Constraints

- Do not modify immutable v15–v30 source outputs.
- Create `Development/Source/Main-App-v31/`, Public Web v14, standalone v31, versioned automation, and validators.
- Preserve all v30 behavior, assets, privacy boundaries, and 430 × 932 / 445 × 932 geometry.
- Change only setup/editor/workbench presentation and the minimum versioned release metadata.

## Task 1 — Establish a failing CSS contract

1. Copy v30 authored source to v31 and update version-bound filenames/keys.
2. Replace the v30 setup CSS test with a v31 contract requiring milk-tea canvas/workbench/editor tokens, explicit legend flow/height, and no dark setup background.
3. Run `npm test -- tests/setup-layout-css.test.ts` and record RED because v31 CSS does not yet satisfy the new palette and title-row contract.

Evidence: failure must point to missing v31 milk-tea tokens or unsafe legend/layout rules.

## Task 2 — Minimal visual implementation

1. Add a v31 palette and update setup canvas, header, cards, controls, Begin dock, editor chrome, device frame, and desktop workbench.
2. Make legends block-level, in-flow title rows with explicit minimum height, wrapping, and clearing before grids.
3. Adjust default setup block geometry only if the 430 × 932 rendered result still overlaps.
4. Run the focused CSS contract until GREEN, then run all v31 tests, typecheck, and lint.

Evidence: focused contract green; all tests and static checks green.

## Task 3 — Rendered browser verification

1. Build v31 and open its dist through the local HTTP server.
2. Inspect the 430 × 932 setup screen and desktop workbench at a desktop viewport.
3. Verify both bilingual legends are fully visible, grids do not overlap, Begin remains bottom-docked, and no black setup/workbench region remains.

Evidence: browser screenshot and DOM/computed-style inspection.

## Task 4 — Release and repository integration

1. Generate `Apps/Standalone/encounter_cards_v31.html` and `Apps/Public-Web/v14/`.
2. Update launcher, Pages workflow, product documentation, GUIDE, handoff, changelog, roadmap, public blueprint, and repository validators.
3. Move generated dependencies/caches to an indexed recoverable `_pending/` location.
4. Run `Development/Tests/validate_v31.ps1` and `Development/Tests/validate_repository.ps1`.

Evidence: both validators pass, generated outputs are byte-verified, and Git diff contains no edits to immutable releases.

## Task 5 — Publication

Commit the approved v31 release, push the already-approved repository remote, wait for the Pages workflow, and verify the public URL returns v31.
