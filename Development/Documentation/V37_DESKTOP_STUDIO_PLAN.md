# Encounter Cards v37 Desktop Studio Implementation Plan

Date: 2026-07-30
Status: Approved for execution

## Constraints

- Create a new `Development/Source/Main-App-v37/` line from v36; never edit v15–v36 source or outputs.
- Preserve the mobile 430 × 932, language, level, mode, card, privacy, export, sharing, and offline contracts.
- Write deterministic contract/component tests before production changes and observe the intended RED result.
- Publish only after typecheck, lint, unit tests, build, visual inspection, v37 validation, and repository validation pass.

## Task 1 — Establish the v37 line

- Copy the v36 authored line to `Development/Source/Main-App-v37/`, excluding generated dependencies.
- Rename versioned package metadata, storage keys, PWA metadata, and visible version labels to v37.
- Add v37/v20 automation and validation files derived from the corresponding v36/v19 tooling.

Evidence: repository search finds no v36 release identity in v37 version-owned files except intentional historical references.

## Task 2 — RED desktop studio contracts

- Extend `src/App.test.tsx` to require the three Settings columns, reserved mode-tabs region, editor category tabs, inert phone preview, and interactive Test phone.
- Extend `tests/desktop-workspace-css.test.ts` to require the 1366 × 768 breakpoint, fixed left/editor and right/phone tracks, contained overflow, compact mode tabs, and distinct centre/right scale policies.
- Extend `src/components/LayoutEditor.test.tsx` for section switching and single-section rendering.

Evidence: focused tests fail because the v37 structure and section tabs do not yet exist.

## Task 3 — GREEN compact editor

- Update `src/components/LayoutEditor.tsx` with `layout`, `card`, `history`, and `data` category tabs.
- Render only the selected category and preserve existing actions and input semantics.
- Update `src/styles/layout-editor.css` so the docked editor uses its full column without scrolling.

Evidence: LayoutEditor tests pass; typecheck and accessibility-oriented component tests pass.

## Task 4 — GREEN three-column desktop studio

- Update `src/App.tsx` with explicit editor, centre-stage, mode-tabs, and phone-preview regions.
- Add `src/styles/v37.css` to define a contained 1366 × 768 three-column Settings grid, compact bookmark tabs, larger centre fit, smaller right-phone fit, and a clean Test stage.
- Keep mobile rendering unchanged.

Evidence: App and CSS contract tests pass; all source tests remain green.

## Task 5 — Build, inspect, and publish

- Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` in Main-App-v37.
- Inspect Settings and Test modes at 1366 × 768 and at a larger desktop viewport. Confirm bounding boxes, zero document/editor overflow, category switching, inert Settings phone, and interactive Test phone.
- Generate standalone v37 and Public Web v20, then update the launcher, Pages workflow, current-version docs, changelog, handoff, roadmap, public blueprint, Development guide, and pending index as required.
- Run `Development/Tests/validate_v37.ps1` and `Development/Tests/validate_repository.ps1`.
- Review the final diff against the approved design and privacy boundary, then commit all v37 changes.

Evidence: fresh command output, browser measurements/screenshots, release hashes, validators, clean Git status after commit.
