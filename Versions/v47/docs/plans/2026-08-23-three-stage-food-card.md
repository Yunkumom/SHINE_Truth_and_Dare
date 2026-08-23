# Three-stage Taiwan food card — Implementation plan

## Scope and constraints

Implement only the approved live Taiwan Food Journey presentation in V47, preserve the modular artwork/story/question/card-design boundaries, keep 63:88 geometry and offline/privacy behavior, retain the established 25-pair print deck, preserve unrelated worktree changes, and do not promote or deploy a release as part of this plan.

Writable files:

- `Versions/v47/tests/v47-contract.test.mjs`: deterministic three-stage interaction and CSS contracts.
- `Versions/v47/app/encounter/components/TaiwanFoodJourney.tsx`: stage state, controls, accessible labels, utensil SVG, dish cover, and information layer markup.
- `Versions/v47/app/encounter/styles/taiwan-food-journey.css`: back, front, hinged-open, bottom-caption, short-screen, reduced-motion, and focus presentation.
- `Versions/v47/docs/designs/2026-08-23-three-stage-food-card.md`: approved design.
- `Versions/v47/docs/plans/2026-08-23-three-stage-food-card.md`: this plan.
- `HANDOFF.md`: verified owner requirement and evidence record after implementation.

No asset master, runtime image, food content record, question text, composition reference, release record, deployment target, or external account may change.

## Task 1 — RED contract

Add one focused contract asserting:

- `FoodCardStage` contains `back`, `front`, and `open`.
- the initial state and region/draw resets use `back`.
- the ordered transition function advances `back → front → open → back`.
- the utensil cover contains one labelled decorative SVG with distinct `food-card-fork` and `food-card-spoon` groups.
- the dish cover and information layer have distinct markup classes.
- the live dish image uses `object-fit: cover`, top positioning, and a slim lower caption rail.
- the open cover uses a top transform origin and hinge transform.
- `aria-expanded`, Enter, Space, and reduced-motion behavior remain present.
- print front/back pairing remains present.

Run:

```bash
cd Versions/v47
node --test --test-name-pattern="three-stage Taiwan food card" tests/v47-contract.test.mjs
```

Expected evidence: RED only because the three-stage state, markup, and styling do not yet exist.

## Task 2 — GREEN component behavior

In `TaiwanFoodJourney.tsx`:

1. Replace `flipped` with `cardStage: FoodCardStage`, initially `back`.
2. Add a deterministic `advanceCardStage` transition and reset region changes and new draws to `back`.
3. Replace the two rotating faces with a semantic information layer, dish cover, and utensil cover.
4. Keep the existing resolved story, prompt, spicy, allergen, and skip content in the information layer.
5. Add one inline line-art SVG containing one fork and one spoon.
6. Add stage-specific accessible labels, `aria-pressed`, `aria-expanded`, keyboard operation, and next-action footer copy.

Run the focused contract and confirm its component assertions pass before CSS work proceeds.

## Task 3 — GREEN visual behavior

In `taiwan-food-journey.css`:

1. Remove the former rotate-Y two-face implementation from the live card.
2. Style the utensil back as sparse warm-ivory line art.
3. Make the dish cover full-card artwork with top-centered cover cropping and a slim lower caption rail.
4. Anchor the cover at the top and lift it for the `open` stage while preserving the information layer below.
5. Keep compact open-layer typography readable at 430 × 932 and short-screen sizes.
6. Provide immediate, transform-free reduced-motion stage changes.
7. Do not alter the established print selectors except where shared selectors must be separated from live-card selectors.

Run the focused contract and all Taiwan food contract tests; expected result is GREEN.

## Task 4 — Regression and boundary verification

Run:

```bash
cd Versions/v47
node --test --test-name-pattern="Taiwan food|three-stage Taiwan food card" tests/v47-contract.test.mjs
npm run test:v47
npm run lint
npm run build:encounter
cd ../..
node Versions/validate-repository.mjs
git diff --check
```

Expected evidence:

- focused food contracts pass;
- any unrelated existing v47 WIP failures are reported separately;
- lint has zero errors and warning counts are exact;
- the encounter production build completes;
- repository-validator output is reported exactly, including any known `_pending` migration-inventory failure without inspecting `_pending`;
- no new persistence, network call, privacy-sensitive field, generated asset, deployment, promotion, or unrelated file change is introduced.

## Task 5 — Handoff and local commit

Append the approved behavior and fresh evidence to `HANDOFF.md`, review only the scoped diff, and create a local commit containing only the scoped files when repository state allows safe path-limited staging; do not push, deploy, or promote from this plan.
