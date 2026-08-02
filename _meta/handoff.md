# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v39/src/`
- Verified PWA output: `Development/Source/Main-App-v39/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v39.html`
- Public release artifact: `Apps/Public-Web/v22/`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v39.html`
- Public URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`
- Repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`
- v15–v39 standalone releases are immutable after release.

## v39 Contract

Mobile uses a true full-width, one-viewport reflow instead of shrinking the 430 × 932 canvas, eliminating right-side blank space across current iPhone sizes. The icon-only three-line menu opens settings without visible text.

The mobile home offers Encounter Card, Direct Keepsake, and Truth or Dare. Direct Keepsake supports governed artwork or a local image upload, a library or custom blessing, and local PNG download/share while keeping uploads and custom text in memory only. Existing artwork adjustment remains grid-guided and visibly affects the drawn card. The preserved desktop studio remains unchanged.

## Verification / 驗證

```powershell
Set-Location Development/Source/Main-App-v39
npm ci
npm run typecheck
npm run lint
npm test

Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v35.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v36.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v37.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v38.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v39.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Known Limits / 已知限制

- Local verification completed successfully; the governed GitHub Pages workflow remains pinned to Node 26 and provides the required publication runtime.
- Physical iPhone Safari installation, offline update, long-press feel, Share Sheet, and PNG output still require final device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; current 18 deity and both 12-card Taiwan zodiac series have governed source records.
- Material in `_pending/` requires explicit approval before permanent disposal or reactivation.

## Next Action / 下一步

Run the physical iPhone v39 regression across short, narrow, and iPhone Pro Max Safari/Chrome viewports, all three entry modes, local upload, custom blessing, download/Share Sheet, settings, 42 artworks, adjustment save/cancel, draw/flip, installation, and offline update. Any product behavior change after v39 must use a new versioned source and release.
