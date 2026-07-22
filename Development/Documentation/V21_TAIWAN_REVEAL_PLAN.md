# Encounter Cards v21 — Implementation Plan

## Scope and Boundaries

- Create `Development/Source/Main-App-v21/`, v21 automation and validators, `Apps/Standalone/encounter_cards_v21.html`, and `Apps/Public-Web/v4/`.
- Treat v15–v20 standalone releases, v19/v20 authored `dist/`, and v20 source as immutable baselines; copy rather than modify them.
- Reuse the existing 18 artwork files. Do not regenerate, repaint, or overlay the exported commemorative PNG.
- Do not read or change owner-private files, add telemetry, transmit sensitive input, or persist reveal state.

## Task 1 — Versioned v21 Baseline

1. Copy the maintained v20 authored project to `Main-App-v21` without `dist` or generated dependencies.
2. Add failing v21 version and repository contract checks (RED).
3. Update package, PWA, service worker, HTML, builders, launcher, and validators to v21/Public Web v4 (GREEN).
4. Evidence: version validators identify v21 while v15–v20 release files remain present and unchanged.

## Task 2 — Complete Hotspot Metadata

1. Extend the artwork tests to require a valid `taiwanHotspot` on all 18 variants and run the focused test to observe RED.
2. Add a `TaiwanHotspot` interface with percentage `x`/`y`, positive `scale`, and degree `rotation`.
3. Inspect each artwork and register an independent hotspot matching its documented hidden motif.
4. Evidence: `npm test -- src/lib/deity-art.test.ts` passes with 18 unique, bounded hotspot records.

## Task 3 — Long-Press Reveal Behavior

1. Add component tests proving: release before 600 ms does nothing; holding for 600 ms reveals; the locator hides after 3 seconds; Enter and Space reveal; and reveal interaction does not draw the next card (RED).
2. Add a focused long-press controller or hook with pointer-movement cancellation and deterministic timers.
3. Render an inline Taiwan-outline SVG at the current artwork hotspot with bilingual labels and state announcements (GREEN).
4. Evidence: focused Vitest tests pass using fake timers and accessible queries.

## Task 4 — Visual Motion and Interaction Safety

1. Add a deterministic CSS contract test for the gold locator, pulse keyframes, reduced-motion fallback, and artwork-only interaction protections (RED).
2. Implement absolute hotspot positioning, restrained blink/halo animation, fade-out behavior, focus styles, and long-press-safe touch properties (GREEN).
3. Confirm the reveal layer remains visually separate from the question and blessing panels and is not passed to PNG export.
4. Evidence: CSS contract passes and browser inspection confirms alignment, visibility, and no card gesture regression.

## Task 5 — Build, Documentation, and Regression

1. Build v21 PWA, standalone HTML, and Public Web v4 with versioned automation.
2. Update README, GUIDE, AGENTS, Development README/documentation index, product specs, roadmap, handoff, changelog, public blueprint, launcher, and release validators.
3. Run `npm test`, typecheck, lint, build, v21 validation, and `Development/Tests/validate_repository.ps1`.
4. Verify at 430 × 932 and representative desktop viewports that the phone remains fully centered and the locator stays aligned.
5. Evidence: all automated checks pass; browser interaction verifies 600 ms reveal, 3-second auto-hide, keyboard alternative, reduced-motion contract, and unchanged card export structure.

