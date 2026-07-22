# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v22/src/`
- Verified PWA output: `Development/Source/Main-App-v22/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v22.html`
- Public release artifact: `Apps/Public-Web/v5/`
- Desktop entry: `Open Truth and Dare.cmd`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v22.html`
- Layout contract: 430 × 932 on mobile; whole-shell shrink-to-fit on desktop.
- v15–v22 standalone releases remain preserved and immutable.
- Development history and inactive product lines are recoverable at `_pending/Development-simplification_2026-07-19/`.
- GitHub repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
- Public GitHub Pages URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`; the local v5 artifact requires a new explicitly authorized GitHub push/deployment before it replaces public v4.

## Simplified Development / 精簡後 Development

Active Development has four responsibility directories only: `Source`, `Automation`, `Tests`, and `Documentation`. `Development/README.md` explains every meaningful retained file. v17 source, unpublished Public Web work, old-version tools/tests, completed designs/plans, dependencies, and caches were moved—not deleted—to the indexed pending archive.

## Verification / 驗證

v22 adds a three-screen direct layout editor, privacy-safe JSON and twenty-step history, a 22% swipe-and-flip deck, an enlarged 402 × 562 mobile card, and a 63:88 blessing-bearing keepsake with optional participant rows. It preserves v21 hidden-Taiwan behavior and exact desktop centering. Source typecheck, lint, 59 automated tests, build, release validation, repository validation, and browser regression are the deterministic verification boundary:

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v22.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

For future source work, restore dependencies with `npm ci` inside `Development/Source/Main-App-v22/`. Do not overwrite verified v22 outputs; create v23 for product behavior changes.

## Known Limits / 已知限制

- Physical iPhone Safari install, offline update, gesture feel, PNG, and Share Sheet behavior still need full device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; the 18 v20–v22 deity images are documented project-owned AI-generated assets.
- Material in `_pending/` requires explicit human approval before permanent disposal or reactivation.
- The owner-private blueprint was not inspected or updated during this simplification.

## Exact Next Action / 下一步

Run physical iPhone regression for v22, including editor handles, swipe feel, long press, hotspot alignment, contact toggles, Share Sheet, and offline update. Any later product behavior modification must begin as v23 rather than changing verified v22 output.
