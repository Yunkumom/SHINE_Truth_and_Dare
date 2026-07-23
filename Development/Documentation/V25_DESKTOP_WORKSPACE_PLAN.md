# Encounter Cards v25 Desktop Workspace Implementation Plan

Date: 2026-07-24

## Constraints

- Do not modify v15–v24 source or release artifacts.
- Create v25 source, standalone v25, and Public Web v8.
- Preserve privacy, bilingual modes, Levels 1–5, Truth/Dare/Random, swipe/flip/long-press, and 430 × 932 mobile behavior.

## Task 1 — Version and RED contracts

Copy v24 to `Development/Source/Main-App-v25/`, update version/cache identifiers, and add failing tests for desktop studio markup, mobile fallback, narrow title band, portrait focus metadata, and focus-aware PNG cropping.

Checkpoint: focused tests fail for missing v25 behavior while the v24 release hash remains unchanged.

## Task 2 — Portrait-safe rendering

Add normalized focus metadata to all 18 artwork variants and a shared cover-position utility. Apply it to game artwork, keepsake artwork, and canvas export.

Checkpoint: tests prove all focus values are bounded and canvas cropping keeps the focal point inside the output rectangle.

## Task 3 — Desktop studio and card proportions

Add a responsive desktop-workspace component/layout. Render one interactive enlarged canvas with a docked editor on the left and an inert synchronized phone preview on the right. Keep the single fitted phone UI below the breakpoint. Reduce card-header height and transfer the reclaimed area to artwork.

Checkpoint: component/CSS tests, typecheck, lint, and full tests pass.

## Task 4 — Release and Pages

Add v25/v8 build scripts, validator, launcher target, and Pages workflow. Build immutable standalone v25 and Public Web v8.

Checkpoint: browser regression covers desktop two-column, exact right preview, mobile single-column, uncropped head, download PNG, and long-press Taiwan outline.

## Task 5 — Governance and publish

Update repository maps, handoff, changelog, roadmap, public blueprint, structure validator, and pending index for generated dependencies. Run `validate_v25.ps1` and `validate_repository.ps1`, review the diff, commit, fast-forward main, push, wait for Pages, and verify the public URL.
