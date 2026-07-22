# v23 Taiwan Artwork Implementation Plan

Date: 2026-07-22
Design: `Development/Documentation/V23_TAIWAN_ARTWORK_DESIGN.md`

## Constraints

- Preserve immutable v15–v22 source/output releases.
- Work only in the new v23 source/output paths, v23 artwork library, launch/build/test scripts, and affected current documentation.
- Keep all personal data local; add no analytics, account, backend, or persistence behavior.
- Do not publish or push without a separate explicit request.
- Never permanently delete project content.

## Task 1 — Curate the artwork library

Files:

- `Assets/Deities/v23-taiwan-safe/*.png`
- `Assets/Deities/v23-taiwan-safe/README.md`
- `Assets/README.md`

Actions:

1. Preserve one imagegen-edited PNG for every one of the 18 v22 artwork variants.
2. Record source mapping, motif object, color, position, generation method, and safe-zone contract.
3. Visually inspect all 18 outputs for intact anatomy, recognizable Taiwan contour, and central placement.

Evidence: 18 PNGs plus catalog documentation; all motifs inside 25–75% normalized coordinates.

## Task 2 — Establish v23 with failing contracts

Files:

- `Development/Source/Main-App-v23/` copied from v22 without generated dependencies/output.
- `Development/Source/Main-App-v23/src/lib/taiwan-shape.test.ts`
- `Development/Source/Main-App-v23/src/lib/deity-art.test.ts`
- `Development/Source/Main-App-v23/src/components/TaiwanReveal.test.tsx`

RED contracts:

1. Exactly 18 artwork variants use v23 safe artwork.
2. Every hotspot is within x/y 25–75 and declares motif color, accent color, scale, and rotation.
3. Reveal rendering imports one exported canonical Taiwan SVG path.
4. The canonical path is detailed and invariant across every artwork.

Command: `npm test -- --run src/lib/taiwan-shape.test.ts src/lib/deity-art.test.ts src/components/TaiwanReveal.test.tsx`
Expected RED: missing v23 safe imports/metadata and missing canonical shape module.

## Task 3 — Implement safe art and precise reveal

Files:

- `Development/Source/Main-App-v23/src/assets/deities/*.webp`
- `Development/Source/Main-App-v23/src/lib/taiwan-shape.ts`
- `Development/Source/Main-App-v23/src/lib/deity-art.ts`
- `Development/Source/Main-App-v23/src/components/TaiwanReveal.tsx`
- `Development/Source/Main-App-v23/src/styles/taiwan-reveal.css`
- v23 version labels/configuration.

Actions:

1. Optimize the 18 curated PNGs to source WebP assets.
2. Add one detailed canonical Taiwan path and consume it from the reveal component.
3. Align per-artwork safe hotspots and colored CSS variables with the baked motifs.
4. Retain long-press/touch behavior, pulse animation, and reduced-motion behavior.

GREEN commands:

- Focused test command from Task 2.
- `npm run typecheck`
- `npm run lint`
- `npm test -- --run`

Expected: all commands exit 0.

## Task 4 — Build v23 release surfaces

Files:

- `Development/Automation/Scripts/export-standalone-v23.mjs`
- `Development/Automation/Scripts/finalize-pwa-v23.mjs`
- `Development/Automation/Scripts/finalize-public-v6.mjs`
- `Apps/Standalone/encounter_cards_v23.html`
- `Apps/Public-Web/v6/`
- `Development/Automation/Tools/serve_truth_and_dare.ps1`
- `Open Truth and Dare.cmd`
- `.github/workflows/pages.yml`

Actions:

1. Build v23 and export immutable standalone output.
2. Generate Public Web v6 and offline PWA metadata.
3. Update local launcher and Pages artifact selection to v23/v6 without deploying.

Evidence:

- `npm run build` exits 0.
- Standalone and public outputs contain v23 artwork and no external asset dependencies.

## Task 5 — Validate releases and repository

Files:

- `Development/Tests/validate_v23.ps1`
- `Development/Tests/validate_repository.ps1`

Checks:

1. v23 output/source/art counts and safe hotspot metadata.
2. Immutable older release hashes remain unchanged.
3. Repository structure and public safety constraints remain valid.

Commands:

- `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v23.ps1`
- `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1`

Expected: all checks pass.

## Task 6 — Documentation and handoff

Files:

- `README.md`, `GUIDE.md`, `AGENTS.md`
- `Apps/README.md`, `Assets/README.md`, `Development/README.md`
- affected files in `Development/Documentation/`
- `_meta/handoff.md`, `_meta/roadmap.md`, `_meta/changelog.md`, `_meta/public_blueprint.md`
- `_pending/index.md` if generated development state is retired.

Actions:

1. Set v23/v6 as current and document the artwork/reveal contract.
2. Record remaining physical-iPhone QA and that no deployment occurred.
3. Move generated dependency/build state to a dated `_pending/` path if cleanup is needed.

Final evidence: review diff, rerun repository validation, verify clean security/privacy boundaries, and commit the complete v23 change on the current branch.
