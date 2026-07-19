# Create Top-Level Governance Directories — Implementation Plan / 建立頂層治理目錄實作計畫

Design source: `Development/Documentation/designs/2026-07-19-top-level-governance-directories.md`

## Constraints / 限制

- Do not read, print, or expose the owner-private blueprint.
- Do not permanently delete project content.
- Do not modify immutable release outputs.
- Preserve the user's unrelated untracked v18 design and plan files.
- Keep all move sources and destinations within the repository root.

## Task 1 — RED Structure Contract

Update `Development/Tests/validate_clean_structure.ps1` and `Development/Tests/validate_repository.ps1` to require `_meta/`, `_agent/`, `_human/`, and `_pending/`, including `_pending/index.md` and the owner-private ignore rule. Run the clean-structure validator before moving files and confirm failure only for the new paths.

Evidence: validator exits non-zero and names missing top-level governance paths.

## Task 2 — Safe Relocation

1. Update `.gitignore` for `_meta/owner_private_blueprint.md` and `_agent/memory/private/`.
2. Resolve and verify every source and destination under the repository root.
3. Move `Meta`, `Agent`, `Skills`, `Human-References`, and `Pending` to their approved destinations without reading private content.
4. Remove only empty obsolete organizational directories after verifying their contents moved.

Evidence: every destination exists, each source is absent, and the private blueprint remains ignored.

## Task 3 — Documentation Alignment

Update `README.md`, `GUIDE.md`, `AGENTS.md`, `Development/README.md`, public blueprint, purpose, roadmap, handoff, changelog, local README files, and historical reorganization records. Historical old-path mappings remain clearly labelled; current instructions use canonical root paths.

Evidence: operational path scan returns no stale current references and `_pending/` is defined as the recoverable pre-deletion buffer.

## Task 4 — GREEN Verification

Run `Development/Tests/validate_clean_structure.ps1` and `Development/Tests/validate_repository.ps1`, confirm immutable release checks still pass, inspect Git status/diff, and verify the user's unrelated untracked files remain unchanged.

Evidence: both validators exit zero; no product release content changes; private blueprint is ignored and untracked by Git.

