# Human-Nature Questions and Individual Food Art — Approved Revision

## Decision

Extend the canonical SHINE question book from 62 to 82 cards with 20 bilingual, discussion-first human-nature and philosophy scenarios, and replace the Taiwan Food Journey's single shared collage with 25 original dish-specific images.

## Question design

- Add all 20 questions at three-star depth as optional, open-ended truth prompts.
- Cover moral dilemmas, rescue and self-sacrifice, loyalty versus fairness, identity and memory, truth versus comfort, fate and free will, ghosts and the supernatural, and what makes a person good.
- Present difficult scenarios as hypothetical discussion prompts; do not pressure players to disclose trauma, enact danger, or identify real people.
- Keep Traditional Chinese and English meanings aligned and avoid implying that one answer is morally correct.

## Food-art design

- Keep the existing 25 dishes, regional balance, cultural notes, prompts, allergens, and offline behavior.
- Give every card ID exactly one portrait-oriented, text-free illustration focused on that dish alone.
- Preserve the established premium watercolor-and-gouache Taiwan travel-journal style, warm ivory paper, navy linework, and restrained regional accent colors.
- Store versioned PNG masters under `Library/Images/Food/Taiwan/individual-v47/` and optimized WebP derivatives under `Versions/v47/app/encounter/assets/food-v47/`.
- Resolve images through an explicit card-ID map used by both the live card and print deck; no network image loading or runtime fallback collage.

## Boundaries and verification

- Do not modify v46/v39, release pointers, privacy behavior, battle behavior, analytics, persistence, backend, or external accounts.
- Verify exact question counts and required scenario themes, 25 unique image mappings, card-specific live/print rendering, build inclusion, hashes, focused contracts, lint, build, repository validator, and `git diff --check`.
- Physical print, physical iPhone, PowerShell, backend, and online publication remain manual or unrun unless fresh evidence is obtained.
