# Encounter Cards v33 Taiwan Zodiac and Exact Choice Plan

## Boundaries

- Create a new v33 line; never modify v32 authored source, dist, standalone, or Public Web v15.
- Generate twelve original project-owned raster masters with the built-in image-generation tool, then copy every accepted output into `Assets/Zodiac/Taiwan/v33-masters/`.
- Do not install packages, read the owner-private blueprint, add telemetry/backend/accounts, or persist personal data.
- Generate standalone v33 and Public Web v16 only through new versioned automation.
- User authorization includes final commit, push to `main`, GitHub Pages update, and public verification.

## Task 1 — Govern and generate the twelve masters

Files:

- `Assets/Zodiac/Taiwan/v33-masters/README.md`
- `Assets/Zodiac/Taiwan/v33-masters/manifest.json`
- twelve `tw-zodiac-*.png` masters
- `Assets/Catalog/content-sources.json`
- `Assets/Catalog/asset-licenses.md`

Steps:

1. Write the shared prompt contract and twelve sign-specific prompts from the approved design.
2. Issue one built-in image-generation call per sign; do not combine distinct signs in one generation.
3. Inspect every output for 2:3 card suitability, complete head/ornament/object clearance, recognizable sign, Taiwan cultural element, complete central Taiwan silhouette, and absence of text/watermark.
4. Make one targeted regeneration for any rejected output.
5. Save accepted masters with stable IDs and record prompt summaries, generation date, model path, Taiwan placement, and cultural exclusions.

Evidence checkpoint: twelve accepted PNG masters exist in the governed folder, their dimensions are recorded, and visual inspection notes have no unresolved crop/Taiwan failure.

## Task 2 — Create v33 and RED contracts

Files:

- `Development/Source/Main-App-v33/`
- `src/lib/question-selection.test.ts`
- `src/lib/artwork-selection.test.ts`
- `src/App.test.tsx`
- `tests/taiwan-zodiac-assets.test.ts`

Steps:

1. Copy the governed v32 source/build baseline to a new v33 line and update versioned names, styles, storage keys, asset suffixes, package metadata, and visible markers.
2. Add failing tests requiring: two available collections and thirty total artworks; random defaults; an exact eligible question; ineligible exact-question fallback; independent image/question pairing; collapsed advanced UI; searchable questions; exact pair draw; and random three-face behavior.
3. Add deterministic asset tests requiring twelve stable zodiac IDs, runtime imports, safe focal points, and bounded Taiwan hotspots.
4. Run focused tests and capture genuine RED failures for missing zodiac registry and question preference behavior.

Evidence checkpoint: failures are caused by missing v33 data/behavior, not syntax, copied-version mistakes, or test setup.

## Task 3 — Optimize and register zodiac artwork

Files:

- `src/assets/zodiac/taiwan/tw-zodiac-*-safe-v33.webp`
- `src/lib/taiwan-zodiac-art.ts`
- `src/lib/artwork-catalog.ts`
- `src/data/collections.ts`
- `src/types.ts`

Steps:

1. Create high-quality WebP runtime derivatives from the accepted masters using the available local image library.
2. Register sign names, collection/country/culture metadata, safe portrait focus, hidden-Taiwan description, and reveal hotspot for each image.
3. Combine deity and zodiac arrays through `ALL_ARTWORKS`; make `taiwan-zodiac` available and preserve future planned collections.
4. Run asset and artwork-selection tests to GREEN.

Evidence checkpoint: thirty artworks are selectable across two available collections, planned collections have no runtime assets, and exact-image locking remains strict.

## Task 4 — Add scalable question packs and exact selection

Files:

- `src/data/question-packs.ts`
- `src/lib/question-selection.ts`
- `src/types.ts`
- related tests

Steps:

1. Register current prompts as `classic-60` without changing their text or IDs.
2. Add `QuestionPreference`, search/filter helpers, eligibility validation, and exact-or-random resolution.
3. Keep Level 5 adult safety and selected Truth/Dare mode authoritative; an invalid exact ID or eligibility conflict returns random and a reason.
4. Run focused and nearby game/content tests to GREEN.

Evidence checkpoint: exact question selection works only within the safe eligible pool and the registry can accept a second pack without UI changes.

## Task 5 — Build the hidden exact-choice interface

Files:

- `src/App.tsx`
- `src/styles/v33-layout.css`
- `src/App.test.tsx`

Steps:

1. Rename the collapsed advanced disclosure to `進階指定 · Exact choice` and show `全部隨機` by default.
2. Add collection selection, independent artwork random/exact controls, question random/exact controls, search, mode/level-aware results, reset, and an accessible selection summary.
3. On Begin, create artwork candidates from the selected collection/preference. On draw, resolve the exact/random question and random blessing independently.
4. Keep exact question text hidden until reveal; preserve random three-face and exact one-face behavior.
5. Preserve mobile play-only and desktop Settings/Test mode separation; add responsive scroll containment without clipping visible controls.
6. Run component and CSS tests to GREEN.

Evidence checkpoint: automated interaction tests prove default random, exact image+question, reset, search, and eligibility fallback.

## Task 6 — Release and verify

Files:

- v33/v16 build scripts and validators
- launcher, Pages workflow, repository structure checks
- `README.md`, `GUIDE.md`, `AGENTS.md`, Development docs, handoff, roadmap, changelog, public blueprint, pending index

Steps:

1. Run full v33 tests, typecheck, lint, and build.
2. Generate immutable standalone v33 and Public Web v16; archive only superseded generated state under indexed `_pending/` paths.
3. Browser-check desktop Settings/Test and 430 × 932 mobile: default random, advanced closed/open, both collections, question search, exact pair, random candidates, card text fit, and console errors.
4. Add `validate_v33.ps1`; extend repository and structure validation without weakening v32 hash checks.
5. Run `validate_v33.ps1`, `validate_repository.ps1`, `git diff --check`, protected-path, dependency-clutter, secrets, and privacy-boundary checks.
6. Review the final diff against the approved contract, fix actionable findings, rerun affected verification, commit all work, push `main`, wait for Pages, and confirm the public URL serves v33.

Expected evidence: twelve governed Taiwan zodiac images, two available artwork collections, independent exact image/question selection behind a collapsed control, unchanged random default, all tests/validators passing, immutable v32 unchanged, and successful public v33 deployment.
