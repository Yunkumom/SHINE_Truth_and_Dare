# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v36/src/`
- Verified PWA output: `Development/Source/Main-App-v36/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v36.html`
- Public release artifact: `Apps/Public-Web/v19/`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v36.html`
- Public URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`
- Repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`
- v15–v36 standalone releases are immutable after release.

## v36 Contract

Mobile preserves the 430 × 932 play-only application surface. Desktop Settings renders an enlarged interactive workbench, docked editor, and inert 445 × 932 iPhone Pro Max preview derived from 78.0 × 163.4 mm. Desktop Test renders one fully interactive centered phone and retains session state across mode switches.

v36 preserves the complete v35 visual, typography, keepsake, PNG, offline, and privacy contracts. The mobile Work integration adds a five-tab settings dialog, a 42-face photo grid, independent exact artwork/question choice, session-only custom and disabled questions, content controls, and per-artwork focus/zoom. Blessings remain mandatory and user-authored question state is never persisted.

## Verification / 驗證

```powershell
Set-Location Development/Source/Main-App-v36
npm ci
npm run typecheck
npm run lint
npm test

Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v35.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v36.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Known Limits / 已知限制

- Physical iPhone Safari installation, offline update, long-press feel, Share Sheet, and PNG output still require final device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; current 18 deity and both 12-card Taiwan zodiac series have governed source records.
- Material in `_pending/` requires explicit approval before permanent disposal or reactivation.

## Next Action / 下一步

Run the physical iPhone v36 regression across all five settings tabs, 42 artworks, exact choices, session question management, artwork adjustment, draw/flip, Taiwan reveals, download/Share Sheet, installation, and offline update. Any product behavior change after v36 must use a new versioned source and release.
