# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v19/src/`
- Verified PWA output: `Development/Source/Main-App-v19/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v19.html`
- Public release: `Apps/Public-Web/v2/`
- Desktop entry: `Open Truth and Dare.cmd`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v19.html`
- Layout contract: 430 × 932 on mobile; whole-shell shrink-to-fit on desktop.
- v15–v17 standalone releases remain preserved and immutable.
- Development history and inactive product lines are recoverable at `_pending/Development-simplification_2026-07-19/`.
- Nothing was pushed, published, or deployed.

## Simplified Development / 精簡後 Development

Active Development has four responsibility directories only: `Source`, `Automation`, `Tests`, and `Documentation`. `Development/README.md` explains every meaningful retained file. v17 source, unpublished Public Web work, old-version tools/tests, completed designs/plans, dependencies, and caches were moved—not deleted—to the indexed pending archive.

## Verification / 驗證

Before the dependency archive move, v18 typecheck, lint, and all 12 automated tests passed. Current deterministic verification is:

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v18.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

For future source work, restore dependencies with `npm ci` inside `Development/Source/Main-App-v18/`. Do not overwrite verified v18 outputs for product changes; create the next numbered source/output release.

## Known Limits / 已知限制

- Physical iPhone Safari install, offline update, gesture feel, PNG, and Share Sheet behavior still need full device regression.
- Packaged v15/v16 artwork provenance remains incomplete.
- Material in `_pending/` requires explicit human approval before permanent disposal or reactivation.
- The owner-private blueprint was not inspected or updated during this simplification.

## Exact Next Action / 下一步

Run physical iPhone regression for v18. Any later product modification should begin as a new numbered release rather than changing verified v18 output.
