# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v23/src/`
- Verified PWA output: `Development/Source/Main-App-v23/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v23.html`
- Public release artifact: `Apps/Public-Web/v6/`
- Desktop entry: `Open Truth and Dare.cmd`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v23.html`
- Layout contract: 430 × 932 on mobile; whole-shell shrink-to-fit on desktop.
- v15–v23 standalone releases remain preserved and immutable.
- Development history and inactive product lines are recoverable at `_pending/Development-simplification_2026-07-19/`.
- GitHub repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
- Public GitHub Pages URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`; the local v6 artifact requires a new explicitly authorized GitHub push/deployment before it replaces the currently published release.

## Simplified Development / 精簡後 Development

Active Development has four responsibility directories only: `Source`, `Automation`, `Tests`, and `Documentation`. `Development/README.md` explains every meaningful retained file. v17 source, unpublished Public Web work, old-version tools/tests, completed designs/plans, dependencies, and caches were moved—not deleted—to the indexed pending archive.

## Verification / 驗證

v23 preserves the complete v22 editor/deck/keepsake behavior and replaces all 18 deity images with Taiwan-safe edits. Each coloured silhouette is inside the centred visible crop; a shared 39-segment geographic path provides correctly aligned pointer and keyboard reveal. Source typecheck, lint, automated tests, build, release validation, repository validation, and 430 × 932 browser regression are the deterministic verification boundary:

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v23.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

For future source work, restore dependencies with `npm ci` inside `Development/Source/Main-App-v23/`. Do not overwrite verified v23 outputs; create v24 for product behavior changes.

## Known Limits / 已知限制

- Physical iPhone Safari install, offline update, gesture feel, PNG, and Share Sheet behavior still need full device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; the 18 v23 deity images are documented project-owned AI-generated edits.
- Material in `_pending/` requires explicit human approval before permanent disposal or reactivation.
- The owner-private blueprint was not inspected or updated during this simplification.

## Exact Next Action / 下一步

Run physical iPhone regression for v23, including editor handles, swipe feel, long press, all 18 hotspot alignments, contact toggles, Share Sheet, and offline update. Any later product behavior modification must begin as v24 rather than changing verified v23 output.
