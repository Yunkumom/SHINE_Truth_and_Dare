# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v28/src/`
- Verified PWA output: `Development/Source/Main-App-v28/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v28.html`
- Public release artifact: `Apps/Public-Web/v11/`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v28.html`
- Public URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`
- Repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`
- v15–v28 standalone releases are immutable after release.

## v28 Contract

Mobile preserves the 430 × 932 application surface. Desktop renders a 445 × 932 iPhone Pro Max frame derived from 78.0 × 163.4 mm, with the unchanged app canvas centered inside. The left desktop workbench is interactive and the right phone preview is synchronized and inert.

The card editor preserves the v27 presentation controls under the v28 privacy-safe storage key. The regenerated Baosheng Dadi apothecary source adds wider scene coverage, generous crown clearance, a complete central Taiwan enamel, and a recalibrated default coastline locator. Names, contacts, answers, birthdays, notes, and adult choices never enter persistence.

## Verification / 驗證

```powershell
Set-Location Development/Source/Main-App-v28
npm ci
npm run typecheck
npm run lint
npm test

Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v28.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Known Limits / 已知限制

- Physical iPhone Safari installation, offline update, long-press feel, Share Sheet, and PNG output still require final device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; current 18 deity images have governed source records.
- Material in `_pending/` requires explicit approval before permanent disposal or reactivation.

## Next Action / 下一步

Run the physical iPhone v28 regression across layout editing, swipe/flip, all 18 Taiwan reveals—especially Baosheng Dadi—presentation controls, contact toggles, download/Share Sheet, installation, and offline update. Any product behavior change after v28 must use a new versioned source and release.
