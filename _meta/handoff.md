# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v38/src/`
- Verified PWA output: `Development/Source/Main-App-v38/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v38.html`
- Public release artifact: `Apps/Public-Web/v21/`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v38.html`
- Public URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`
- Repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`
- v15–v38 standalone releases are immutable after release.

## v38 Contract

Mobile uniformly scales the complete 430 × 932 play-only application into the live visual viewport, keeping setup and Begin visible together and preventing horizontal clipping on the drawn card and its controls. At 1366 × 768 and larger, the preserved v37 desktop studio remains unchanged.

Artwork adjustment uses a nine-square grid, draft-based Cancel/Save, X −50…50%, Y −60…60%, and 100…240% zoom. Saved values visibly affect the drawn card and keepsake. v38 preserves the complete v37 desktop, mobile Work, typography, keepsake, PNG, offline, and privacy contracts; blessings remain mandatory and user-authored question state is never persisted.

## Verification / 驗證

```powershell
Set-Location Development/Source/Main-App-v38
npm ci
npm run typecheck
npm run lint
npm test

Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v35.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v36.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v37.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v38.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Known Limits / 已知限制

- Local verification completed successfully on Node 22.14.0; the governed GitHub Pages workflow remains pinned to Node 26 and provides the required publication runtime.
- Physical iPhone Safari installation, offline update, long-press feel, Share Sheet, and PNG output still require final device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; current 18 deity and both 12-card Taiwan zodiac series have governed source records.
- Material in `_pending/` requires explicit approval before permanent disposal or reactivation.

## Next Action / 下一步

Run the physical iPhone v38 regression across short and narrow Safari/Chrome viewports, all five settings tabs, 42 artworks, adjustment save/cancel, draw/flip, Taiwan reveals, download/Share Sheet, installation, and offline update. Any product behavior change after v38 must use a new versioned source and release.
