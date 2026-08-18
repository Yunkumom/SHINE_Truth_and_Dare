# Responsive Play and Owner Studio Implementation Plan

## Scope and constraints

- Writable scope: `Versions/v47/app/encounter/`, `Versions/v47/tests/`, and the two design/plan documents for this task.
- Preserve all existing v47 tactical-battle work and all unrelated working-tree changes.
- Do not modify `Versions/v46`, governed artwork, question content, external services, or release URLs.
- Do not add dependencies, analytics, accounts, telemetry, or personal-data persistence.

## Task 1 — Lock the contract with RED tests

Add source-contract coverage to `Versions/v47/tests/v47-contract.test.mjs` for:

1. a reserved five-row mobile game flow with a flexible card row;
2. no absolute positioning on the in-flow settings/action controls;
3. localized back navigation;
4. owner-studio landmarks and friendly labels;
5. direct manipulation enabled by default;
6. raw coordinates and JSON contained in an advanced editor section.

Run `npm run test:v47` and confirm the new assertions fail for missing behavior rather than test syntax.

## Task 2 — Implement the mobile flow

Update `Versions/v47/app/encounter/App.tsx` and `Versions/v47/app/encounter/styles/v40.css` to provide semantic flow classes, localized navigation, a compact contextual settings row, reserved safe-area action space, and card sizing bounded by the flexible row.

Run `npm run test:v47` and record GREEN evidence for the mobile contract plus existing focused tests.

## Task 3 — Implement the owner studio

Update `Versions/v47/app/encounter/App.tsx`, `Versions/v47/app/encounter/components/LayoutEditor.tsx`, `Versions/v47/app/encounter/styles/layout-editor.css`, `Versions/v47/app/encounter/styles/v37.css`, and `Versions/v47/app/encounter/styles/v32-layout.css` to:

- default to direct manipulation;
- expose friendly screen/element navigation;
- group common controls into clear inspector sections;
- move coordinates, stacking, and JSON into Advanced;
- display device/fit/safe-area guidance;
- keep Test mode visually clean.

Run `npm run test:v47`, then `npm run lint`.

## Task 4 — Refactor and regression

Remove obsolete duplicate styles only where the new contract supersedes them, keep selector specificity bounded to `.v40-shell`, and inspect the changed diff for privacy or scope expansion.

Run:

```bash
cd Versions/v47
npm run test:v47
npm run lint
npm test
cd ../..
node Versions/validate-repository.mjs
```

Record any unavailable physical-device, PowerShell, backend, or online checks explicitly.

## Evidence checkpoints

- RED: new contract assertions fail for the intended missing UI contract.
- GREEN mobile: focused v47 tests pass after mobile implementation.
- GREEN studio: focused tests and lint pass after studio implementation.
- Final: full v47 build/rendered tests and repository validation pass with no changes to `Versions/v46`.
