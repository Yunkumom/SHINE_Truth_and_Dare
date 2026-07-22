# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v20/src/`
- Verified PWA output: `Development/Source/Main-App-v20/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v20.html`
- Public release: `Apps/Public-Web/v3/`
- Desktop entry: `Open Truth and Dare.cmd`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v20.html`
- Layout contract: 430 × 932 on mobile; whole-shell shrink-to-fit on desktop.
- v15–v20 standalone releases remain preserved and immutable.
- Development history and inactive product lines are recoverable at `_pending/Development-simplification_2026-07-19/`.
- GitHub repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
- Public GitHub Pages release: `https://yunkumom.github.io/SHINE_Truth_and_Dare/` (HTTP 200 verified; Pages workflow successful).

## Simplified Development / 精簡後 Development

Active Development has four responsibility directories only: `Source`, `Automation`, `Tests`, and `Documentation`. `Development/README.md` explains every meaningful retained file. v17 source, unpublished Public Web work, old-version tools/tests, completed designs/plans, dependencies, and caches were moved—not deleted—to the indexed pending archive.

## Verification / 驗證

v20 has 18 deity artworks, independent question/art/blessing composition, v16-inspired entrance/card presentation, and exact desktop centering. Source typecheck, lint, 23 automated tests, build, release validation, repository validation, and Pages deployment are the deterministic verification boundary:

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v20.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

For future source work, restore dependencies with `npm ci` inside `Development/Source/Main-App-v20/`. Do not overwrite verified v20 outputs; create v21 for product behavior changes.

## Known Limits / 已知限制

- Physical iPhone Safari install, offline update, gesture feel, PNG, and Share Sheet behavior still need full device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; the 18 v20 deity images are documented project-owned AI-generated assets.
- Material in `_pending/` requires explicit human approval before permanent disposal or reactivation.
- The owner-private blueprint was not inspected or updated during this simplification.

## Exact Next Action / 下一步

Run physical iPhone regression for v20. Any later product behavior modification must begin as v21 rather than changing verified v20 output.
