# v27 Entrance Layout Implementation Plan

## Constraints

- Write only the new v27 source/release line, v10 public recipe/output, v27 automation/tests, current pointers, and affected governance documents.
- Do not edit v15–v26 authored or generated releases.
- Preserve all gameplay, privacy, artwork, coastline, export, desktop editor, and 430 × 932 behavior inherited from v26.

## Tasks and evidence

1. Copy v26 into `Development/Source/Main-App-v27`, rename version markers and storage keys, and add deterministic setup-layout contract tests. Run the focused tests and record RED for the missing v27 visual contract.
2. Define v27 setup palette tokens and safe typography/fieldset/input rules in `src/styles/v27-layout.css`; adjust only setup default block geometry in `src/layout/layout-model.ts`. Run focused tests to GREEN.
3. Run typecheck, lint, and all Vitest tests. Build the PWA and visually inspect desktop plus phone layouts in Chinese, English, and bilingual modes.
4. Add v27 PWA/standalone/v10 public automation and validator, then generate immutable outputs once.
5. Update launcher, Pages workflow, README/GUIDE/Development documentation, public blueprint, handoff, changelog, and pending index. Move reproducible dependencies/caches to `_pending/`.
6. Run `validate_v27.ps1` and `validate_repository.ps1`, review the diff against the approved design and privacy boundary, commit, push, and verify the Pages deployment and public URL.

## Expected evidence

- Focused CSS/layout tests: all pass after an observed intended RED.
- Source suite: typecheck and lint exit 0; all Vitest tests pass.
- Browser screenshots: no clipped headings, labels, legends, or controls at the governed viewports.
- Repository validators: exit 0 with release hashes and current targets matching v27/v10.
