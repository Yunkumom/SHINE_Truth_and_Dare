# V47 phone-first and desktop showcase implementation plan

## Scope and boundaries

- Change only V47 application, styles, focused tests, and approved documentation.
- Preserve the 430 × 932 internal canvas, privacy contract, offline behavior, local PNG/share behavior, and unrelated worktree changes.
- Do not promote `latestVerified`, change Firebase projects, add dependencies, or alter private-data persistence.

## Task 1 — lock the navigation contract with RED tests

Files:

- `Versions/v47/tests/v47-contract.test.mjs`

Add deterministic contracts for default `phone` surface state, the `SurfaceMenu` display choices and navigation, visible `V47` choice heading, contextual direct-keepsake tools, and a dedicated desktop showcase branch. Run the focused test and record the intended RED result before production changes.

## Task 2 — add the shared surface menu

Files:

- `Versions/v47/app/encounter/components/SurfaceMenu.tsx`
- `Versions/v47/app/encounter/components/ModeHome.tsx`
- `Versions/v47/app/encounter/components/DirectKeepsake.tsx`
- `Versions/v47/app/encounter/components/TaiwanFoodJourney.tsx`

Define `SurfaceMode = 'phone' | 'showcase' | 'studio'` and a reusable menu accepting current mode, mode changes, experience navigation, and contextual children. Integrate it into each special screen and place direct-card and food-print actions inside contextual menu sections.

Evidence: the focused contract becomes GREEN for menu structure and the existing direct-keepsake contracts remain GREEN.

## Task 3 — make phone mode the default and add showcase routing

Files:

- `Versions/v47/app/encounter/App.tsx`
- `Versions/v47/app/encounter/lib/viewport-scale.ts`

Replace automatic desktop activation with session-only `surfaceMode`, defaulting to `phone`. Keep `desktopWorkspace` derived only from `surfaceMode === 'studio'`. Add a `showcase` branch that renders the current shared application state inside a presentation shell. Keep all navigation callbacks centralized in `App`.

Evidence: focused state and structure contracts pass; switching mode does not recreate app state.

## Task 4 — design the phone-first and showcase surfaces

Files:

- `Versions/v47/app/encounter/styles/v47-ux.css`

Style the reusable hamburger, phone-first centered desktop background, three-column showcase, presentation rail, device stage, contextual panel, narrow-desktop fallback, and visible focus states. Preserve responsive phone behavior and continuous card surfaces.

Evidence: 430 × 932, desktop phone-first, and desktop showcase browser inspections show no overflow and the expected controls.

## Task 5 — verification and delivery

Run:

```bash
cd Versions/v47
node --test --test-name-pattern="phone-first|surface menu|desktop showcase|direct keepsake" tests/v47-contract.test.mjs
npm run lint
npm run test:v47
npm run build:encounter
cd ../..
node Versions/validate-repository.mjs
git diff --check
```

Record focused pass counts, lint warnings, build assets, the known unrelated WIP failures, and physical-device limitations. Commit only scoped files. Deploy the validated build to the already approved Firebase Hosting share target and verify the public hashed assets and visible V47 heading; do not promote `latestVerified`.

## Follow-up plan — direct-keepsake phone rows and desktop proportion

### Task 6 — lock the reported geometry with RED contracts

Update `Versions/v47/tests/v47-contract.test.mjs` with deterministic checks requiring a one-column direct-keepsake action grid, a full-width blessing row, a full-width download/share row, natural-height controls, and a desktop-only presentation scale that may exceed 1× without changing mobile behavior; run only the new contract and record the intended RED result.

### Task 7 — implement the minimal responsive geometry

Update `Versions/v47/app/encounter/App.tsx` to calculate desktop phone presentation scale from both visual-viewport dimensions with a restrained maximum while continuing to use the existing mobile scale below the desktop breakpoint. Update `Versions/v47/app/encounter/styles/v47-ux.css` so the direct-keepsake controls form two full-width rows, custom copy remains between them, and the content grid distributes remaining space without stretching the controls panel.

### Task 8 — prove real-phone and desktop behavior

Run the focused contracts, lint, full V47 suite, production build, and root validator. Inspect direct keepsake at 430 × 932 and at a large desktop viewport, confirming full-width rows, no horizontal overflow, natural controls height, centered proportional desktop phone geometry, and a working download/share trigger. Commit only the scoped files, deploy to the approved Firebase share target, and verify the cache-busted public release without promoting `latestVerified`.

## Follow-up plan — global controls and direct-card design editor

### Task 9 — lock the approved menu and editor behavior with RED contracts

Update `Versions/v47/tests/v47-contract.test.mjs` to require two horizontal scroll-snap rails, a collapsed destination disclosure, day/night controls, an English-first language dropdown retaining `zh`, `en`, and `bilingual`, an editor with photo/layout/text tabs, editable title, font-family selection, title and blessing size ranges, blessing-panel height adjustment, and preview-to-PNG design propagation. Run only the new contracts and record genuine RED failures before production changes.

### Task 10 — implement the compact global control center

Update `Versions/v47/app/encounter/components/SurfaceMenu.tsx`, `Versions/v47/app/encounter/App.tsx`, and `Versions/v47/app/encounter/styles/v47-ux.css`. Extend `SurfaceMenuNavigationProps` with active destination, language, language change, appearance theme, and theme change. Render the display and destination rails with selected semantics and scroll snapping, keep destinations inside a collapsed `details`, add the day/night switch and language `select`, default first use to English without overriding an existing saved choice, and apply night colors to application chrome without altering card/export colors.

### Task 11 — implement one draft-based direct-card editor

Update `Versions/v47/app/encounter/components/DirectKeepsake.tsx`, `Versions/v47/app/encounter/components/DirectPhotoAdjuster.tsx`, `Versions/v47/app/encounter/lib/direct-keepsake.ts`, and `Versions/v47/app/encounter/styles/v47-ux.css`. Define `DirectKeepsakeDesign` and governed font choices, hold title/font/font-size/panel-height edits in component memory, expose photo/layout/text tabs with Save/Cancel/Reset, use CSS variables so panel growth reduces artwork height inside the unchanged 63:88 card, and pass the exact saved design into PNG layout and canvas font calculations.

### Task 12 — verify interaction, geometry, privacy, and delivery

Run focused contracts, lint, `npm run test:v47`, `npm run build:encounter`, root `node Versions/validate-repository.mjs`, and `git diff --check`. In the browser, verify default English on clean local preference state, English/Traditional Chinese switching, day/night chrome, collapsed and swipeable rails, editor draft cancellation, saved title/font/size/panel changes, unchanged 63:88 geometry, zero horizontal overflow, and a download/share trigger. Commit only scoped files, deploy to the approved Firebase share target, verify current hashed assets and public HTTP 200, and do not promote `latestVerified`.
