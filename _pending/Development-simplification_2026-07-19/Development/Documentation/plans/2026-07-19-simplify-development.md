# Simplify Development Directory — Implementation Plan / 精簡 Development 執行計畫

Design source: `Development/Documentation/designs/2026-07-19-simplify-development.md`

## Constraints / 限制

- Never permanently delete project content; move archival material to `_pending/Development-simplification_2026-07-19/`.
- Preserve all immutable `Apps/Standalone/` release bytes.
- Preserve authored v18 source and the existing verified v18 PWA/standalone outputs.
- Do not read the owner-private blueprint, secrets, credentials, or personal data.
- Do not publish, deploy, push, install packages, or modify external accounts.
- Preserve unrelated dirty-worktree changes and update every path affected by this reorganization.

## Task 1 — Baseline and Launcher Contract

1. Record Development inventory, immutable release hashes, and current Git status.
2. Update the v18/repository validation contract so the retained loopback server must reference `encounter_cards_v18.html` and its V18 release marker.
3. Run the focused contract before implementation and confirm it fails against the current v16 launcher target.

Evidence: a deterministic RED result identifies only the stale launcher contract.

## Task 2 — Current v18 Launcher

1. Update `Development/Automation/Tools/serve_truth_and_dare.ps1` to serve the preserved v18 standalone release.
2. Run the focused launcher/v18 validation and confirm GREEN.

Evidence: the helper resolves the existing v18 output and checks its embedded V18 marker.

## Task 3 — Recoverable Archive Move

Move the following intact into `_pending/Development-simplification_2026-07-19/`:

- `Development/Source/Main-App/`;
- `Development/Source/Public-Web/`;
- v16/v17/public-only automation and validators;
- completed `Development/Documentation/designs/` and `plans/` records;
- redundant organizational README files;
- current v18 `node_modules/`, coverage, and TypeScript build-info files.

Retain `Development/Source/Main-App-v18/dist/` because it is the current verified PWA release output.

Evidence: every source path is absent, every destination path exists, and no material is permanently deleted.

## Task 4 — Simplified Documentation and Validation

1. Rewrite `Development/README.md` as the canonical inventory for every meaningful retained file.
2. Update `Development/Documentation/README.md`, test contracts, `README.md`, `GUIDE.md`, `AGENTS.md`, `_meta/handoff.md`, `_meta/roadmap.md`, `_meta/changelog.md`, `_meta/public_blueprint.md`, and `_pending/index.md`.
3. Remove active commands and requirements for archived v16 reconstruction, v17 source, and unpublished Public Web source while keeping historical facts clearly labelled.

Evidence: current operational documents reference only existing active paths and clearly point to the recoverable archive for history.

## Task 5 — Verification

1. Before moving v18 dependencies, run `npm run typecheck`, `npm run lint`, and `npm test` from `Development/Source/Main-App-v18/`.
2. Run `Development/Tests/validate_v18.ps1` and `Development/Tests/validate_repository.ps1` after all moves.
3. Recompute immutable release hashes, scan for stale active references, verify the launcher target, and inspect the final Development tree.

Evidence: source checks and simplified repository validators pass; immutable release hashes remain unchanged; no private data, external action, permanent deletion, or broken active path is introduced.
