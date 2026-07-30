# Encounter Cards v36 Mobile ChatGPT Work Integration Plan

## Constraints

- Do not modify `Development/Source/Main-App-v35/`, its verified `dist/`, or any v15–v35 release artifact.
- Do not add dependencies, network APIs, analytics, accounts, or persistent personal/user-authored content.
- Keep the 430 × 932 canvas, desktop Settings/Test split, languages, Levels 1–5, Truth/Dare/Surprise, gestures, Taiwan reveal, keepsake, PNG, and offline contracts.
- Use v36-only layout and presentation keys. Exact choices and question-library changes remain session-only.
- Preserve the imported Work package intact under `_pending` after integration.

## Task 1 — Establish the v36 version boundary

Files:

- Copy `Development/Source/Main-App-v35/` to `Development/Source/Main-App-v36/`, excluding generated dependency state.
- Update `package.json`, `index.html`, `public/manifest.webmanifest`, `public/service-worker.js`, `src/App.tsx`, `src/layout/layout-model.ts`, and `src/presentation/presentation-model.ts` to V36/v36 keys.

RED evidence:

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v36.ps1
```

Expected: the new validator fails because the v36 source, release, and integration markers do not yet exist.

Checkpoint: v35 hashes and `git diff -- Development/Source/Main-App-v35 Apps/Standalone/encounter_cards_v35.html Apps/Public-Web/v18` remain unchanged.

## Task 2 — Specify and implement session question management

Files:

- `src/lib/question-manager.ts` — normalize session configuration and resolve eligible built-in/custom questions with exact-choice fallback.
- `src/lib/question-manager.test.ts` — cover enable/disable, custom questions, level/mode filtering, exact selection, and empty-pool fallback.
- `src/types.ts` — add the session-only custom-question and manager-state interfaces.

RED command:

```powershell
npm test -- src/lib/question-manager.test.ts
```

Expected RED: module and interfaces are absent.

GREEN evidence: targeted tests pass and searches confirm no question-manager localStorage key.

## Task 3 — Build the authored mobile settings surfaces

Files:

- `src/components/MobileSettings.tsx` — accessible dialog, tabs, level/mode proxies, artwork summary, question manager, content controls, and saved-position summary.
- `src/components/MobileSettings.test.tsx` — keyboard/dialog semantics, selection callbacks, custom-question lifecycle, and mandatory-blessing absence from toggles.
- `src/components/ArtworkPicker.tsx` — three-collection, 42-artwork photo-grid selection.
- `src/components/ArtworkAdjuster.tsx` — bounded per-artwork focus/zoom adjustment using the existing presentation model.
- `src/App.tsx` — integrate session manager state, settings entry, language selector, card controls, exact selections, and managed draw flow.
- `src/styles/v36.css` — migrate the supplied Work visual layer and normalize temporary version labels.

RED commands:

```powershell
npm test -- src/components/MobileSettings.test.tsx src/App.test.tsx
```

Expected RED: V36 settings, photo picker, and session manager controls are missing.

GREEN evidence: component/application tests, typecheck, and lint pass; the rendered card and keepsake always contain a blessing.

## Task 4 — Build v36 release automation and outputs

Files:

- `Development/Automation/Scripts/finalize-pwa-v36.mjs`
- `Development/Automation/Scripts/export-standalone-v36.mjs`
- `Development/Automation/Scripts/finalize-public-v19.mjs`
- `Development/Source/Public-Web/v19/README.md`
- `Development/Tests/validate_v36.ps1`
- `.github/workflows/pages.yml`
- `Development/Automation/Tools/serve_truth_and_dare.ps1`
- `Apps/Standalone/encounter_cards_v36.html`
- `Apps/Public-Web/v19/`

Evidence:

```powershell
npm run build
npm run build:standalone
node ../../Automation/Scripts/finalize-public-v19.mjs
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v36.ps1
```

Expected: immutable v36 outputs are created once, use the v36 cache namespace, and the launcher/workflow target v36/Public Web v19.

## Task 5 — Archive import and update governance

Files:

- Move `Encounter_Cards_v11_Source/` to `_pending/Encounter_Cards_v11_Source_2026-07-30/`.
- Update `_pending/index.md`, `README.md`, `GUIDE.md`, `AGENTS.md`, `Development/README.md`, current product/architecture documentation, `_meta/handoff.md`, `_meta/roadmap.md`, `_meta/changelog.md`, and `_meta/public_blueprint.md`.

Evidence: the root import folder is absent, the pending copy contains the same file count and aggregate SHA-256 inventory, and no secret/private blueprint content was read or copied.

## Task 6 — Full regression, security boundary, and commit

Commands:

```powershell
npm run typecheck
npm run lint
npm test
npm run build
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v35.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v36.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
git diff --check
git status --short
```

Review checks:

- Search v36 for stale V35/V37/V38/V40 release markers and disallowed manager persistence.
- Confirm personal fields and user-authored questions never enter localStorage, logs, network calls, analytics, or backend code.
- Confirm standalone v35 and Public Web v18 hashes still pass.
- Commit the complete main-program change after all checks succeed.
