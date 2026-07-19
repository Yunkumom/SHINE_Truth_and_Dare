# Encounter Cards v15 Product Repository Design

## Status

Approved through the user's original request to create the Truth and Dare repository, the confirmed project name, the shared product conversation, and delivery of `encounter_cards_v15.html` as the product source artifact.

## Goal

Correct the repository identity so Truth and Dare represents the Encounter Cards game rather than only its Agent handoff guide. Preserve the supplied v15 file byte-for-byte as the executable baseline, retain the v18 handoff HTML as supporting governance material, and document the boundary between the packaged artifact and future maintainable source code.

## Product Baseline

The supplied file is a standalone ViNext-packaged HTML application containing an import map with embedded React runtime, application JavaScript, card data, and images. It is runnable and reconstructs the current v15 experience, but it is not the original modular TypeScript/React source tree.

## Repository Structure

- `app/encounter_cards_v15.html`: immutable v15 executable product baseline.
- `docs/PRODUCT_SPEC.md`: user-visible behavior and current product scope.
- `docs/ARCHITECTURE.md`: packaged runtime architecture and future extraction boundary.
- `docs/ANIMATION_SPEC.md`: current and desired gesture/flip interaction contract.
- `docs/CARD_CONTENT.md`: card content model, levels, languages, and safety boundaries.
- `_human/dashboards/agent-handoff_v18.html`: retained Agent handoff reference, not the product entry point.
- Existing governance, privacy, handoff, validation, design, and plan files remain active.

## Behavior and Data Boundaries

This migration does not redesign or rewrite v15. The supplied file must remain byte-identical. Its embedded code uses browser-local preferences for language and font scale, supports PNG generation plus Web Share/download fallback, and contains user-entered names and optional contact details. No backend or account integration is introduced.

## Verification

Repository validation must prove the v15 SHA-256 hash, title, embedded import map, absence of external JavaScript, expected product markers, private-blueprint ignore behavior, and absence of empty directories. Browser smoke testing should confirm that the landing interface renders; full drag/flip/share testing remains a separate behavior-validation task.

