# Handoff / 交接

## Current State / 目前狀態

- Active authored source: `Development/Source/Main-App-v27/src/`
- Verified PWA output: `Development/Source/Main-App-v27/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v27.html`
- Public release artifact: `Apps/Public-Web/v10/`
- Desktop URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v27.html`
- Public URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`
- Repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`
- v15–v27 standalone releases are immutable after release.

## v27 Contract

Mobile preserves the 430 × 932 application surface. Desktop renders a 445 × 932 iPhone Pro Max frame derived from 78.0 × 163.4 mm, with the unchanged app canvas centered inside. The left desktop workbench is interactive and the right phone preview is synchronized and inert.

The card editor exposes per-artwork horizontal/vertical focus and zoom plus shared artwork height. Blessing font scale, line height, height, padding, and X/Y offsets are normalized into safe ranges. These non-personal settings persist under `encounter-presentation-v27`; names, contacts, answers, birthdays, notes, and adult choices never enter persistence. Browser cards, keepsake preview, and PNG export share crop and blessing settings.

## Verification / 驗證

```powershell
Set-Location Development/Source/Main-App-v27
npm ci
npm run typecheck
npm run lint
npm test

Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v27.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Known Limits / 已知限制

- Physical iPhone Safari installation, offline update, long-press feel, Share Sheet, and PNG output still require final device regression.
- Packaged legacy v15/v16 artwork provenance remains incomplete; current 18 deity images have governed source records.
- Material in `_pending/` requires explicit approval before permanent disposal or reactivation.

## Next Action / 下一步

Run the physical iPhone v27 regression across layout editing, swipe/flip, all 18 Taiwan reveals, presentation controls, contact toggles, download/Share Sheet, installation, and offline update. Any product behavior change after v27 must use a new versioned source and release.
