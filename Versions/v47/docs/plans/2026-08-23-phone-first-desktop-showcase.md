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
