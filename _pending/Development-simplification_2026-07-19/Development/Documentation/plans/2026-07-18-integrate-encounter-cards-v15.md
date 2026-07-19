# Integrate Encounter Cards v15 — Implementation Plan

## Scope and Constraints

Writes are limited to `<PROJECT_ROOT>`. Preserve `encounter_cards_v15.html` byte-for-byte. Do not install packages, access accounts, make network requests, deploy, commit, push, replace v15, or claim that the packaged HTML is original modular source code. Keep the existing handoff guide as a versioned reference.

## Task 1 — Preserve the executable baseline

Create `app/encounter_cards_v15.html` from the supplied artifact. Record its SHA-256 hash and confirm the repository copy matches exactly.

Evidence checkpoint: both hashes equal `C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0`.

## Task 2 — Correct project identity and governance

Update `README.md`, `AGENTS.md`, `_meta/purpose.md`, `_meta/roadmap.md`, `_meta/handoff.md`, `_meta/public_blueprint.md`, `_meta/owner_private_blueprint.md`, `_meta/changelog.md`, and `_human/README.md` so the game is the primary product and the v18 page is a supporting reference.

Evidence checkpoint: entry points consistently name Truth and Dare / Encounter Cards v15, distinguish packaged artifact from modular source, and document privacy-sensitive local fields.

## Task 3 — Add product documentation

Create `docs/PRODUCT_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/ANIMATION_SPEC.md`, and `docs/CARD_CONTENT.md` from the supplied artifact and confirmed conversation requirements. Separate verified v15 behavior from future desired behavior.

Evidence checkpoint: the documents cover language modes, levels, card modes, local user fields, gesture/flip expectations, image export, privacy, and extraction limitations without claiming unverified implementation details.

## Task 4 — Expand deterministic validation

Update `tests/validate_repository.ps1` to require the v15 product file and documentation, verify its hash and structural markers, and retain all existing governance and privacy checks.

Evidence checkpoint: validation exits 0 with explicit passes for both the product artifact and the handoff reference.

## Task 5 — Final review and regression evidence

Run repository validation, Git ignore checks, secret and local-path scans, empty-directory checks, source/repository hash comparison, and a bounded browser rendering smoke test if the local file can be opened without changing state.

Expected result: the repository is a faithful, documented v15 product baseline with no publication or destructive side effects. Any untested drag, flip, PNG, or iPhone-share behavior is reported as a limitation.

