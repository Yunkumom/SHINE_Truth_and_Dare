# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v25/src/`
- Verified PWA output: `Development/Source/Main-App-v25/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v25.html`
- Public release artifact: `Apps/Public-Web/v8/`
- Desktop entry: `Open Truth and Dare.cmd`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v25.html`
- Layout contract: 430 × 932 single mobile surface; desktop two-column workbench with an exact synchronized phone preview.
- v15–v25 standalone releases remain preserved and immutable.
- Development history and inactive product lines are recoverable at `_pending/Development-simplification_2026-07-19/`.
- GitHub repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
- Public GitHub Pages URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`; Pages deploys Public Web v8 from `main`.

## Simplified Development / 精簡後 Development

Active Development has four responsibility directories only: `Source`, `Automation`, `Tests`, and `Documentation`. `Development/README.md` explains every meaningful retained file. v17 source, unpublished Public Web work, old-version tools/tests, completed designs/plans, dependencies, and caches were moved—not deleted—to the indexed pending archive.

## Verification / 驗證

v24 preserves the complete v23 editor/deck/keepsake behavior and replaces the old locator symbol with a Natural Earth-derived 44-point Taiwan coastline. Two transparent coincident strokes provide a broad glow and crisp shore, with no dot, oval halo, radial disc, or solid fill. Source typecheck, lint, 61 automated tests, build, release validation, repository validation, and 430 × 932 browser regression are the deterministic verification boundary:

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v24.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

For future source work, restore dependencies with `npm ci` inside `Development/Source/Main-App-v24/`. Do not overwrite verified v24 outputs; create v25 for product behavior changes.

## Known Limits / 已知限制

- Physical iPhone Safari install, offline update, gesture feel, PNG, and Share Sheet behavior still need full device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; the 18 v23 deity images are documented project-owned AI-generated edits.
- Material in `_pending/` requires explicit human approval before permanent disposal or reactivation.
- The owner-private blueprint was not inspected or updated during this simplification.

## Exact Next Action / 下一步

Run physical iPhone regression for v24, including editor handles, swipe feel, long press, all 18 coastline alignments, contact toggles, Share Sheet, and offline update. Any later product behavior modification must begin as v25 rather than changing verified v24 output.
