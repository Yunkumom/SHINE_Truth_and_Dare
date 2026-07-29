# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v34/src/`
- Verified PWA output: `Development/Source/Main-App-v34/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v34.html`
- Public release artifact: `Apps/Public-Web/v17/`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v34.html`
- Public URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`
- Repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`
- v15–v34 standalone releases are immutable after release.

## v34 Contract

Mobile preserves the 430 × 932 play-only application surface. Desktop Settings renders an enlarged interactive workbench, docked editor, and inert 445 × 932 iPhone Pro Max preview derived from 78.0 × 163.4 mm. Desktop Test renders one fully interactive centered phone and retains session state across mode switches.

v34 preserves the complete v33 visual, adjustable typography, keepsake, PNG and privacy contracts. It exposes 18 deity faces, 12 preserved classic zodiac guardians, and 12 new Local Stories zodiac faces through three available series versions. Local Stories can foreground the zodiac animal or symbol, uses modern Taiwanese people only where suitable, and teaches one named Taiwanese landscape or cultural feature per card. Random artwork and eligible questions remain the default; exact artwork and question choices remain independent and session-only. Blessings are always mandatory.

## Verification / 驗證

```powershell
Set-Location Development/Source/Main-App-v34
npm ci
npm run typecheck
npm run lint
npm test

Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v34.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Known Limits / 已知限制

- Physical iPhone Safari installation, offline update, long-press feel, Share Sheet, and PNG output still require final device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; current 18 deity and both 12-card Taiwan zodiac series have governed source records.
- Material in `_pending/` requires explicit approval before permanent disposal or reactivation.

## Next Action / 下一步

Run the physical iPhone v34 regression across all 42 artworks, exact choices, swipe/flip, Taiwan reveals, download/Share Sheet, installation, and offline update. Any product behavior change after v34 must use a new versioned source and release.
