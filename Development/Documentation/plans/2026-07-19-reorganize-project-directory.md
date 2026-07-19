# Reorganize Project Directory — Implementation Plan / 專案資料夾重整實作計畫

Design source: `Development/Documentation/designs/2026-07-19-project-directory-reorganization.md`

## Global Constraints / 全域限制

- Preserve all project content; do not permanently delete files.
- Do not read or expose private blueprint content, secrets, credentials, or private account data.
- Preserve v15, v16, v17, v16 runtime modules, and public v1 file bytes during relocation.
- Keep `.git/`, `.github/`, `.gitignore`, `AGENTS.md`, `README.md`, `GUIDE.md`, and `Open Truth and Dare.cmd` at the root.
- Do not push, publish, deploy, install packages, change external accounts, or alter repository visibility.
- Work around the existing dirty worktree and preserve all unrelated user changes.
- Use explicit resolved paths for directory moves and verify every source and destination remains inside the project root.

## Task 1 — Capture Baseline and Add a RED Structure Contract

1. Record Git status, tracked/untracked inventory, directory sizes, and SHA-256 values for all immutable releases and public v1 files.
2. Add `tests/validate_clean_structure.ps1` at the current location. It must require `Apps/`, `Assets/`, `Development/`, `GUIDE.md`, category annotations, the mapped product/source paths, and a root allow-list.
3. Run the new validator before relocation and confirm RED because the three-category structure does not yet exist.

Evidence checkpoint: immutable hashes are recorded; the new validator fails only on expected new-structure requirements.

## Task 2 — Create the Annotated Category Skeleton

1. Create `Apps/README.md`, `Assets/README.md`, `Assets/Catalog/README.md`, and the required `Development/**/README.md` organizational annotations.
2. Create root `GUIDE.md` containing the full annotated directory tree, edit policies, common tasks, version rules, and old-to-new path lookup.
3. Do not add files inside immutable release/version directories solely for annotation.

Evidence checkpoint: every planned organizational directory has a local annotation and every repository-controlled directory has an entry in `GUIDE.md`.

## Task 3 — Relocate Content Byte-for-Byte

Use explicit, verified moves for the mapping in the approved design:

- `app/` → `Apps/Standalone/`
- `site/` → `Apps/Public-Web/`
- `web/` → `Development/Source/Main-App/`
- `pages-src/` → `Development/Source/Public-Web/`
- `scripts/` → `Development/Automation/Scripts/`
- `tools/` → `Development/Automation/Tools/`
- `tests/` → `Development/Tests/`
- remaining `docs/` → `Development/Documentation/`
- `_meta/`, `_agent/`, and `skills/` → `Development/Governance/Meta/`, `Agent/`, and `Skills/`
- `_human/` → `Development/Human-References/`
- `_pending/` → `Development/Pending/`
- asset licence and source catalogs → `Assets/Catalog/`

Verify destinations after each group before moving the next group. Recompute immutable hashes immediately after relocation.

Evidence checkpoint: every source path is absent, every destination exists, file counts agree, and immutable hashes are identical.

## Task 4 — Repair Executable and Build Paths

Update, without changing product behavior:

- `Open Truth and Dare.cmd`
- `Development/Automation/Tools/build_v16.ps1`
- `Development/Automation/Tools/serve_truth_and_dare.ps1`
- all Node scripts under `Development/Automation/Scripts/`
- `Development/Source/Main-App/package.json` and relevant Vite/config references
- `Development/Source/Public-Web/v1/package.json` and relevant Vite/config references
- `.github/workflows/pages.yml`
- validators under `Development/Tests/`
- `Apps/Public-Web/v1/manifest.json` only if its source-location metadata is contractually included in parity generation; regenerate through the approved pipeline rather than hand-editing output.

Run focused syntax/path checks after each automation family.

Evidence checkpoint: launcher and all build/test entry points resolve only existing new paths; no immutable output is hand-edited.

## Task 5 — Update Governance and Human Documentation

Update `README.md`, `AGENTS.md`, `GUIDE.md`, product/architecture/design/plan documents, human references, pending index, both reconstruction blueprints, roadmap, handoff, and changelog to use the new canonical structure. Historical design records may retain old paths only when explicitly labelled as historical; current commands and reconstruction instructions must not.

Update the mandatory reading order in `AGENTS.md` and the validation command locations. Keep the private blueprint ignored and never commit it.

Evidence checkpoint: current operational documents use new paths; stale-path scan results are either zero or limited to clearly labelled migration history.

## Task 6 — GREEN Structure and Focused Release Verification

Run:

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_clean_structure.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v16.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v17.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_public_v1.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

Expected result: every validator exits zero and reports canonical new paths without weakening immutable hash, privacy, or release checks.

## Task 7 — Full Build Regression and Final Audit

1. In `Development/Source/Main-App/`, run typecheck, lint, tests, and `npm run build:standalone`.
2. In `Development/Source/Public-Web/v1/`, run tests, typecheck, and build; then run the relocated public finalizer and validator.
3. Re-run all repository validators after generated outputs settle.
4. Recompute and compare immutable hashes and file counts.
5. Scan for secrets, private/local paths, missing folder annotations, broken relative links, and unintended root entries.
6. Review the final diff for unrelated edits and confirm no content was deleted rather than relocated.

Evidence checkpoint: builds and validators pass, root contract is clean, immutable bytes match the appropriate regenerated/preserved contracts, and all known limitations are documented in the handoff.
