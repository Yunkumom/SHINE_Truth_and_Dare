# Encounter Cards v32 Desktop Modes and Typography Safety Plan

## Boundaries

- Create `Development/Source/Main-App-v32/`; never modify v31 authored source, dist, standalone, or Public Web v14.
- Generate `Apps/Standalone/encounter_cards_v32.html` and `Apps/Public-Web/v15/` only through versioned automation.
- Preserve the 430 × 932 canvas, v31 functionality, artwork, privacy model, and immutable releases.
- Do not install new packages or access the owner-private blueprint.

## Task 1 — Create the v32 line and failing contracts

Files:

- `Development/Source/Main-App-v32/`
- `Development/Source/Main-App-v32/src/lib/desktop-mode.test.ts`
- `Development/Source/Main-App-v32/src/components/EditableBlock.test.tsx`
- `Development/Source/Main-App-v32/tests/typography-safety-css.test.ts`

Steps:

1. Copy the governed v31 source and generated baseline to v32, update versioned names and local-storage keys, and rename v31 styles/assets to v32 equivalents.
2. Add tests requiring explicit desktop `settings` and `test` modes, mobile play-only behavior, and direct manipulation off by default.
3. Add a scale-conversion test proving a pointer delta is divided by the rendered canvas scale.
4. Add deterministic CSS/DOM contracts for safe deity-header line boxes and no clipped headings.
5. Run focused tests and capture genuine RED results for the missing behavior.

Evidence checkpoint: tests fail specifically because v31-style always-editing desktop behavior, raw pointer deltas, and unsafe header sizing still exist.

## Task 2 — Implement mode separation

Files:

- `src/App.tsx`
- `src/styles/v32-layout.css`

Steps:

1. Add a desktop mode state with `settings` and `test` values.
2. Render an external, accessible segmented mode switch on desktop.
3. Render the workbench/editor/phone preview only in Settings mode.
4. Render one centred, fully interactive device frame in Test mode.
5. Keep mobile in ordinary play mode and omit desktop authoring controls.

Evidence checkpoint: focused component tests show mode switching changes rendered chrome without changing game state.

## Task 3 — Make authoring stable

Files:

- `src/components/EditableBlock.tsx`
- `src/components/LayoutEditor.tsx`
- `src/layout/layout-model.ts`
- related tests and styles

Steps:

1. Add an explicit direct-manipulation toggle, default off.
2. Keep selection available without starting movement from form controls or buttons.
3. When direct manipulation is enabled, convert pointer movement by the rendered canvas scale before applying layout changes.
4. Keep normalization/clamping, snap, history, reset, and persistence behavior.
5. Run focused tests to GREEN, then nearby layout and editor tests.

Evidence checkpoint: deterministic pointer tests prove correct scale conversion and no movement from interactive descendants.

## Task 4 — Enforce typography safety

Files:

- `src/styles/v32-layout.css`
- `src/styles/v32.css`
- `tests/typography-safety-css.test.ts`
- relevant component tests

Steps:

1. Replace unsafe fixed line boxes in deity/card headers with safe padding, minimum heights, and explicit CJK-aware line heights.
2. Ensure all setup legends, editor labels, action text, questions, blessings, and bilingual variants wrap or scroll inside their intended regions.
3. Add representative rendered DOM measurements at 430 × 932 for Chinese, English, and bilingual modes.
4. Verify no target element has `scrollWidth > clientWidth` or `scrollHeight > clientHeight` unless it is the approved scrollable question/blessing region.

Evidence checkpoint: the reported Mazu title and every measured text target fit inside its box.

## Task 5 — Add expandable collections and artwork choice

Files:

- `src/types.ts`
- `src/data/collections.ts`
- `src/lib/artwork-selection.ts`
- `src/App.tsx`
- `src/styles/v32-layout.css`
- related tests

Steps:

1. Add failing tests for an available Taiwan deity collection, non-selectable planned collections, specific-artwork locking, candidate generation, and continued random question/blessing selection.
2. Add the collection catalog and selection preference types without adding ungoverned assets.
3. Add the collapsed Advanced deck choice to setup with random and specific artwork paths.
4. Add a three-choice candidate fan to the draw screen; selecting a face chooses only artwork and then draws a random eligible question and blessing.
5. Verify mobile touch targets, keyboard operation, bilingual labels, and empty/future collection fallback behavior.

Evidence checkpoint: selection tests prove artwork preference is independent from question and blessing, while planned collections cannot be activated.

## Task 6 — Release, governance, and verification

Files:

- versioned v32/v15 automation and validators
- launcher, Pages workflow, repository docs, GUIDE, handoff, changelog, roadmap, and public blueprint

Steps:

1. Build v32 dist, standalone v32, and Public Web v15.
2. Add `validate_v32.ps1` and extend repository structure contracts without weakening immutable v31 checks.
3. Run `npm test`, typecheck, lint, build, focused browser checks at desktop and 430 × 932, `validate_v32.ps1`, and `validate_repository.ps1`.
4. Confirm no personal data, secrets, dependency directories, or v31 changes are staged.
5. Commit and push the complete working tree only under the user's existing publication authorization, then verify the GitHub Pages workflow and public URL.

Expected evidence: all automated checks pass, desktop Settings/Test modes are distinct, mobile remains playable, typography measurements fit, immutable v31 hashes remain unchanged, and Pages serves v32.

## Completion evidence / 完成證據

- Genuine RED: 9 focused failures covered missing mode separation, mobile editor leakage, raw pointer deltas, enabled-by-default movement, and unsafe text CSS.
- GREEN before release: 23 test files and 95 tests passed; typecheck, lint, and production build passed.
- Browser QA: desktop Settings/Test flows completed; 430 × 932 Chinese, English, and bilingual setup measurements had zero overflow failures; a chosen artwork revealed a card whose header/title/toolbar/actions all fit; browser warnings and errors were empty.
- Final repository and GitHub Pages evidence is recorded by `validate_v32.ps1`, `validate_repository.ps1`, and the published workflow run.
