# Taiwan Food Journey Cards — Implementation Plan

## Constraints and writable scope

- Work only in v47 plus new governed food-art master/provenance files under `Library/Images/Food/Taiwan/` and the approved requirement record in root `HANDOFF.md`.
- Do not alter verified v46 or v39, release pointers, backend/D1 behavior, analytics, storage, service accounts, or external systems.
- Keep the feature offline and memory-only.
- Preserve the existing 430 × 932 shell, direct-keepsake ratio contract, Truth/Dare/Surprise behavior, blessings, local PNG/share behavior, and current WIP battle files.
- Do not add dependencies.

## Task 1 — Lock the data and home-entry contracts

Files:

- Modify `Versions/v47/tests/v47-contract.test.mjs`.

Steps:

1. Add a contract asserting that `ModeHome.tsx` exposes a third Taiwan food experience callback and label.
2. Add a contract asserting that `taiwan-food-cards.ts` contains exactly 25 IDs, five region IDs with five entries each, all three prompt types, spicy prompts, allergen fields, and source URLs.
3. Add a contract asserting that `TaiwanFoodJourney.tsx` provides region filtering, a consent toggle, front/back control, skip language, and printing.
4. Add a CSS contract for `aspect-ratio: 63 / 88`, all five region tokens, print dimensions, and reduced motion.
5. Run `cd Versions/v47 && node --test --test-name-pattern="Taiwan food" tests/v47-contract.test.mjs`; expected RED is missing source/component/style behavior.

Evidence checkpoint: capture the intended assertion failure rather than a syntax or fixture failure.

## Task 2 — Add typed, sourced 25-card content

Files:

- Modify `Versions/v47/app/encounter/types.ts`.
- Add `Versions/v47/app/encounter/data/taiwan-food-cards.ts`.

Interfaces:

- `TaiwanFoodRegion = 'north' | 'central' | 'south' | 'east' | 'offshore'`.
- `TaiwanFoodPromptType = 'taste-talk' | 'food-dare' | 'travel-surprise'`.
- `TaiwanFoodCard` includes stable ID, sequence, region, city/county, bilingual dish names and notes, bilingual flavor labels, allergen labels, prompt type, standard bilingual prompt, spicy bilingual prompt, and source URL.

Steps:

1. Define the interfaces without weakening existing types.
2. Add exactly five entries per region, using the approved three-classic/two-discovery balance.
3. Keep all notes shop-neutral and conservative.
4. Run the focused contract; expected progress is data assertions GREEN while UI/style assertions remain RED.

Evidence checkpoint: verify uniqueness, distribution, prompt coverage, and source presence from the test output.

## Task 3 — Build the memory-only card experience

Files:

- Add `Versions/v47/app/encounter/components/TaiwanFoodJourney.tsx`.

Behavior:

- Props: `language`, `onBack`, and the imported governed card set.
- Local state only: selected region, drawn history, current card, face, and spicy consent.
- Region changes reset the current card and draw history.
- Draws do not repeat until every eligible card has appeared, then begin a fresh cycle.
- Spicy text renders only when consent is enabled.
- The whole card is operable as a button with a visible dedicated flip control and correct `aria-pressed`/labels.
- Printing calls `window.print()` and renders all 25 paired faces in a print-only sheet.

Steps:

1. Implement the minimum component needed for the UI contract.
2. Keep text localization inside data and local display helpers.
3. Keep all fields memory-only and add no browser storage or network code.
4. Run the focused contract; expected UI assertions GREEN.

Evidence checkpoint: inspect the component for no storage, fetch, analytics, or personal inputs.

## Task 4 — Integrate the third home mode

Files:

- Modify `Versions/v47/app/encounter/components/ModeHome.tsx`.
- Modify `Versions/v47/app/encounter/App.tsx`.

Steps:

1. Add `onChooseFoodJourney` to `ModeHomeProps` and render a third experience card.
2. Extend `mobileDestination` with `food-journey`.
3. Add `chooseFoodJourney()` and render `TaiwanFoodJourney` only on the mobile special surface.
4. Keep desktop studio behavior and the two existing modes unchanged.
5. Run the focused contract and TypeScript/build checks.

Evidence checkpoint: confirm the third entry exists without removing the two existing entries.

## Task 5 — Create and govern original art

Files:

- Add `Library/Images/Food/Taiwan/taiwan-food-journey-master-v47.png`.
- Add `Library/Images/Food/Taiwan/README.md`.
- Add `Library/Images/Food/Taiwan/manifest.json`.
- Add `Versions/v47/app/encounter/assets/taiwan-food-journey-v47.webp`.

Steps:

1. Generate one original text-free watercolor-and-gouache Taiwan food travel-journal master with the built-in image generation tool.
2. Inspect it for food relevance, no trademarks, no text artifacts, and sufficient calm negative space.
3. Copy the master into the governed Library folder without overwriting any existing master.
4. Create an optimized WebP runtime copy and record the prompt, generation method, date, paths, hashes, and relationship in README/manifest.
5. Import the runtime asset only from the version-local component.

Evidence checkpoint: compare file hashes and inspect runtime dimensions/format.

## Task 6 — Implement the responsive and print visual system

Files:

- Add `Versions/v47/app/encounter/styles/taiwan-food-journey.css`.
- Modify `Versions/v47/app/encounter/App.tsx` to import the stylesheet.

Steps:

1. Implement warm ivory/navy travel-journal styling and all five named region tokens.
2. Preserve card ratio and fit controls inside 430 × 932, with short-screen scrolling where necessary.
3. Pair color with region text and prompt icons.
4. Add visible focus, touch targets, bilingual density handling, and `prefers-reduced-motion: reduce`.
5. Add `@page` and `@media print` rules for 63 × 88 mm paired faces with safe content insets.
6. Run the focused contract, lint, and encounter build.

Evidence checkpoint: record exact warnings and ensure generated output includes the runtime image.

## Task 7 — Full verification and handoff

Files:

- Update `HANDOFF.md` with exact implementation state and fresh verification evidence.

Commands:

```bash
cd Versions/v47
node --test --test-name-pattern="Taiwan food" tests/v47-contract.test.mjs
npm run test:v47
npm run lint
npm run build:encounter
cd ../..
node Versions/validate-repository.mjs
git diff --check
```

Expected evidence:

- Focused Taiwan food contracts pass.
- Any existing unrelated v47 WIP failures are reported separately and not hidden.
- Lint has zero errors; pre-existing warnings are counted exactly.
- Encounter build completes and contains the new runtime asset.
- Repository validator result is reported exactly, including the known missing `_pending/repository-simplification_2026-08-18/inventory.sha256` if still present.
- Physical print, physical iPhone, PowerShell, backend, and online checks are explicitly marked unrun unless actually performed.

Security checkpoint: verify no personal inputs, persistence, analytics, runtime source fetches, backend fields, or external publication were added.
