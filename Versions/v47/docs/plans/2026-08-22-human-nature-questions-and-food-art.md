# Human-Nature Questions and Individual Food Art — Implementation Plan

## Scope

Work only in the canonical question document, its v47 runtime copy/data, focused v47 contracts, new versioned food-art masters and runtime derivatives, the Taiwan Food Journey image resolver/component, provenance records, and `HANDOFF.md`; add no dependencies and preserve all privacy/offline contracts.

## Task 1 — Lock observable contracts (RED)

- Modify `Versions/v47/tests/v47-contract.test.mjs` to require 82 runtime questions, IDs 63–82, representative trolley/self-sacrifice/ghost/free-will themes, 25 explicit image imports, 25 unique card-ID mappings, and card-specific image lookup in live and print faces.
- Run the focused tests and record that they fail for the missing questions and per-card image resolver.

## Task 2 — Add governed questions (GREEN)

- Append questions 63–82 to `Library/Questions/SHINE_QUESTION_BOOK.md` and mirror it to `Versions/v47/app/encounter/assets/questions/SHINE_QUESTION_BOOK.md`.
- Append matching typed entries to `Versions/v47/app/encounter/data/shine-question-book.ts` and update the documented count.
- Run the focused question contract and confirm 82 unique cards.

## Task 3 — Generate and govern 25 images

- Generate one text-free portrait illustration per existing dish using the built-in image generation tool and a shared style specification.
- Inspect representative outputs and every file's format/dimensions; save masters non-destructively under `Library/Images/Food/Taiwan/individual-v47/`.
- Convert each master to an optimized version-local WebP and record prompts, paths, dimensions, SHA-256 hashes, generation method, and privacy constraints in README/manifest.

## Task 4 — Wire card-specific images (GREEN)

- Add `Versions/v47/app/encounter/data/taiwan-food-art.ts` with one static import and one card-ID mapping per dish.
- Modify `TaiwanFoodJourney.tsx` so live and print fronts resolve `TAIWAN_FOOD_ART[card.id]`, with localized dish-specific alt text for the live image and decorative empty alt text in print.
- Run focused contracts, lint, and encounter build; verify no shared collage import remains in the component.

## Task 5 — Final verification and handoff

- Run `node --test --test-name-pattern="human-nature|individual food" tests/v47-contract.test.mjs`, `npm run test:v47`, `npm run lint`, `npm run build:encounter`, root `node Versions/validate-repository.mjs`, and `git diff --check`.
- Check for network, storage, analytics, personal-data, release-pointer, and verified-version changes; update `HANDOFF.md` with exact results and unrun manual checks.
