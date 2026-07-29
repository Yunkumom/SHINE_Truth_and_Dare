# Encounter Cards v35 Card Library Implementation Plan

## Constraints

- Treat every v15-v34 source and output as immutable.
- Create `Development/Source/Main-App-v35/`, standalone v35, and Public Web v18 as new versioned lines.
- Preserve the 430 × 932 canvas, desktop Settings/Test split, existing 42 governed artworks, and independent artwork/question/blessing selection.
- Do not add dependencies, personal-data persistence, network calls, analytics, or backend behavior.
- Use test-first RED/GREEN evidence for carousel and application behavior.

## Task 1 — Create the v35 source boundary

Files:

- Copy `Development/Source/Main-App-v34/` to `Development/Source/Main-App-v35/` without modifying v34.
- Update v35 package, manifest, worker, HTML title, local layout/presentation keys, and visible version markers.

Evidence:

- `git diff --no-index` confirms v34 remains unchanged.
- Searches under the v35 line contain no active V34 release marker or v34 persistence key.

## Task 2 — Specify carousel behavior with failing tests

Files:

- Add `src/lib/card-library.ts` and `src/lib/card-library.test.ts` for wrapping, filter membership, and drag-release decisions.
- Add `src/components/CardLibrary.test.tsx` for accessible opening state, pointer/keyboard navigation, filters, and exact selection.
- Extend `src/App.test.tsx` for the entrance list button and the independent exact-artwork result.

RED command:

```powershell
npm test -- src/lib/card-library.test.ts src/components/CardLibrary.test.tsx src/App.test.tsx
```

Expected RED: imports or accessible card-library controls are missing for the intended new behavior.

## Task 3 — Implement the minimum library

Files:

- `src/lib/card-library.ts`: pure wrapped-index, filter, and horizontal-gesture decisions.
- `src/components/CardLibrary.tsx`: virtualized three-card carousel, pointer capture, buttons, keyboard, filters, counter, close, and choose callbacks.
- `src/App.tsx`: header trigger, deterministic complete-card preview rendering, exact-artwork callback, and session-only state.
- `src/styles/v35.css`: milk-tea overlay, complete-card sizing, edge previews, responsive motion, focus, and reduced-motion rules.

GREEN evidence:

```powershell
npm test -- src/lib/card-library.test.ts src/components/CardLibrary.test.tsx src/App.test.tsx
npm run typecheck
npm run lint
```

## Task 4 — Add release automation and outputs

Files:

- Add `Development/Automation/Scripts/finalize-pwa-v35.mjs`.
- Add `Development/Automation/Scripts/export-standalone-v35.mjs`.
- Add `Development/Automation/Scripts/finalize-public-v18.mjs`.
- Add `Development/Source/Public-Web/v18/README.md`.
- Add `Development/Tests/validate_v35.ps1`.
- Update the launcher and Pages workflow to v35/Public Web v18.
- Generate `Development/Source/Main-App-v35/dist/`, `Apps/Standalone/encounter_cards_v35.html`, and `Apps/Public-Web/v18/` once.

Evidence:

```powershell
npm run build
npm run build:standalone
node ../../Automation/Scripts/finalize-public-v18.mjs
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v35.ps1
```

## Task 5 — Regression, documentation, and commit

Files:

- Update `README.md`, `GUIDE.md`, `AGENTS.md`, `Development/README.md`, active product/architecture/animation documentation, `_meta/handoff.md`, `_meta/roadmap.md`, `_meta/changelog.md`, `_meta/public_blueprint.md`, and `_pending/index.md` when generated dependencies are archived.

Verification:

```powershell
npm run typecheck
npm run lint
npm test
npm run build
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v35.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
git diff --check
git status --short
```

Browser evidence must measure the 430 × 932 setup/library surface, open the library, navigate by drag and controls, filter all four groups, choose a card face, close back to setup, and confirm the subsequent draw uses that artwork while the question and blessing remain independently selected. Any physical-iPhone-only gesture or installation check remains explicitly listed as pending rather than claimed.
