# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v32/src/`
- Verified PWA output: `Development/Source/Main-App-v32/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v32.html`
- Public release artifact: `Apps/Public-Web/v15/`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v32.html`
- Public URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`
- Repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`
- v15–v32 standalone releases are immutable after release.

## v32 Contract

Mobile preserves the 430 × 932 play-only application surface. Desktop Settings renders an enlarged interactive workbench, docked editor, and inert 445 × 932 iPhone Pro Max preview derived from 78.0 × 163.4 mm. Desktop Test renders one fully interactive centered phone and retains session state across mode switches.

v32 preserves the complete v31 visual, artwork, adjustable typography, keepsake, PNG and privacy contracts. Direct manipulation is opt-in and scale-aware. Entry supports random or specific approved artwork; specific choice never locks the independently random question or mandatory blessing. Draw offers three favorite faces. Planned collections remain disabled until governed content exists. Names, contacts, answers, birthdays, notes, and adult choices never enter persistence.

## Verification / 驗證

```powershell
Set-Location Development/Source/Main-App-v32
npm ci
npm run typecheck
npm run lint
npm test

Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v32.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Known Limits / 已知限制

- Physical iPhone Safari installation, offline update, long-press feel, Share Sheet, and PNG output still require final device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; current 18 deity images have governed source records.
- Material in `_pending/` requires explicit approval before permanent disposal or reactivation.

## Next Action / 下一步

Run the physical iPhone v32 regression across all 18 artworks, selection, swipe/flip, Taiwan reveals, download/Share Sheet, installation, and offline update. Any product behavior change after v32 must use a new versioned source and release.
