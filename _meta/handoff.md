# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v37/src/`
- Verified PWA output: `Development/Source/Main-App-v37/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v37.html`
- Public release artifact: `Apps/Public-Web/v20/`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v37.html`
- Public URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`
- Repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`
- v15–v37 standalone releases are immutable after release.

## v37 Contract

Mobile preserves the 430 × 932 play-only application surface. At 1366 × 768 and larger, Desktop Settings renders a fixed far-left compact editor, a larger centre authoring phone, and an inert right phone preview without document or editor scrolling. Compact bookmark tabs live in a reserved centre-column rail and never overlap the editor. Desktop Test renders one fully interactive phone and retains session state across mode switches.

v37 preserves the complete v36 mobile Work, visual, typography, keepsake, PNG, offline, and privacy contracts. The editor groups Layout, Card, History, and Data controls into single-screen selectable sections. Blessings remain mandatory and user-authored question state is never persisted.

## Verification / 驗證

```powershell
Set-Location Development/Source/Main-App-v37
npm ci
npm run typecheck
npm run lint
npm test

Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v35.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v36.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v37.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Known Limits / 已知限制

- Local verification completed successfully on Node 22.14.0; the governed GitHub Pages workflow remains pinned to Node 26 and provides the required publication runtime.
- Physical iPhone Safari installation, offline update, long-press feel, Share Sheet, and PNG output still require final device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; current 18 deity and both 12-card Taiwan zodiac series have governed source records.
- Material in `_pending/` requires explicit approval before permanent disposal or reactivation.

## Next Action / 下一步

Run the physical iPhone v37 regression across all five settings tabs, 42 artworks, exact choices, session question management, artwork adjustment, draw/flip, Taiwan reveals, download/Share Sheet, installation, and offline update. Any product behavior change after v37 must use a new versioned source and release.
