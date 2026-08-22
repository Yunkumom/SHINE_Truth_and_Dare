# Modular Food Card Content Plan

## Objective

Preserve the Taiwan Food Journey UI and content while making artwork, food subjects, stories, questions, question sets, card designs, and card compositions independently owned assets.

## Boundaries

- Modify only the v47 Taiwan Food Journey data model, its component, focused contracts, and handoff evidence.
- Keep the 25 governed artwork masters and runtime derivatives unchanged.
- Keep all visible bilingual copy, region balance, consent behavior, memory-only play, printing, and offline behavior unchanged.
- Do not promote v47, alter privacy boundaries, or touch unrelated WIP failures.

## File responsibilities

- `app/encounter/data/taiwan-food-subjects.ts`: dish identity, location, classification, flavors, and allergens only.
- `app/encounter/data/taiwan-food-stories.ts`: sourced cultural narratives only.
- `app/encounter/data/taiwan-food-questions.ts`: independent standard and optional-spicy question records only.
- `app/encounter/data/taiwan-food-question-sets.ts`: named collections of question references only.
- `app/encounter/data/taiwan-food-card-designs.ts`: reusable presentation-design identifiers and metadata only.
- `app/encounter/data/taiwan-food-compositions.ts`: stable references and resolver for temporary card compositions only.
- `app/encounter/data/taiwan-food-art.ts`: governed artwork imports and stable artwork IDs only.
- `app/encounter/components/TaiwanFoodJourney.tsx`: render resolved compositions without owning content.
- `app/encounter/types.ts`: independent domain interfaces.
- `tests/v47-contract.test.mjs`: deterministic separation, referential-integrity, and reuse contracts.

## Test-first sequence

1. Replace the bundled-card contract with checks that each asset layer exists, compositions contain references rather than owned copy, and the UI consumes the composition resolver; run the focused contract and confirm RED because the modules do not exist.
2. Introduce the independent types and data modules, mechanically preserving all existing content; add the composition resolver and migrate live and print rendering; run the focused contract until GREEN.
3. Verify referential integrity for all 25 compositions and demonstrate that one artwork can be composed with two question sets and one question can be rendered by two card designs.
4. Run `node --test tests/v47-contract.test.mjs`, `npm run lint`, `npm run build:encounter`, `npm run test:v47`, `node Versions/validate-repository.mjs`, and `git diff --check`; record unrelated pre-existing failures exactly.
5. Deploy the validated v47 preview to the configured Firebase Hosting target without promoting `latestVerified`, then verify the public URL and update `HANDOFF.md`.

## Acceptance evidence

- No production import of `taiwan-food-cards.ts` remains.
- No question text, story text, or image import is stored in a composition record.
- All 25 current cards resolve one subject, artwork, story, standard question, optional-spicy question, question set, and card design.
- The rendered live and print experiences retain the existing visible behavior.
