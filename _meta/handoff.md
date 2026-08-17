# Handoff / 交接

## Current State / 目前狀態

- Active workspace path: `products/truth-or-dare/`
- The governed repository was restored from `_trash/0814/Truth and Dare/` on 2026-08-16 as a separate product from Social Interaction Games.
- Workspace display name: Truth or Dare / 真心話大冒險. Legacy launcher, GitHub, and publication identifiers remain unchanged for compatibility.
- Active authored source: `Development/Source/Main-App-v46/`
- Verified Sites output: `Development/Source/Main-App-v46/dist/`
- Generated encounter PWA: `Development/Source/Main-App-v46/public/v46/`
- Recoverable verified dependency/cache state: `_pending/v46-generated-development-state_2026-08-16/`
- Latest standalone fallback: `Apps/Standalone/encounter_cards_v39.html`
- Latest published GitHub Pages fallback: `Apps/Public-Web/v22/`
- Local desktop URL: `http://127.0.0.1:8765/`
- Current public v46 Sites URL: `https://encounter-cards-v40-review.kenimaster123.chatgpt.site`
- Legacy GitHub Pages URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`
- Repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`
- v15–v39 standalone releases are immutable after release.

## v46 Contract

The current application uses Sites/Vinext routes for the entry page, full-height mobile experience, and desktop studio. Both framed experiences load the generated `/v46/index.html` encounter PWA. The governed line contains 42 artworks and the 62-question SHINE book while preserving the v39 interaction, consent, mandatory-blessing, direct-keepsake, export, and offline contracts.

The original GitHub Lite intake is preserved under `_pending/SHINE_Truth_and_Dare_v46_GitHub_Lite_2026-08-16/`. Mixed v40/v41 provenance remains there; active routes, storage keys, exports, and visible identity are v46. Unused authentication, D1, Drizzle, and starter examples are outside the active capability boundary. D1 and R2 remain disabled, and no deployment was performed.

目前應用使用 Sites／Vinext routes 提供入口頁、全高手機體驗與電腦工作室；兩個框架體驗均載入生成的 `/v46/index.html` encounter PWA。受治理版本包含 42 張 artwork 與 62 題 SHINE 題庫，並保留 v39 互動、同意、必備祝福、直接紀念卡、輸出與離線合約。

原始 GitHub Lite intake 保存於 `_pending/SHINE_Truth_and_Dare_v46_GitHub_Lite_2026-08-16/`。混合 v40／v41 來源紀錄保留於該處；作用中 routes、storage keys、exports 與可見識別皆為 v46。未使用的 authentication、D1、Drizzle 與 starter examples 位於作用中能力邊界之外；D1 與 R2 維持停用，且未執行部署。

## Preserved v39 Contract / 保留的 v39 合約

Mobile uses a true full-width, one-viewport reflow instead of shrinking the 430 × 932 canvas, eliminating right-side blank space across current iPhone sizes. The icon-only three-line menu opens settings without visible text.

The mobile home offers Encounter Card, Direct Keepsake, and Truth or Dare. Direct Keepsake supports governed artwork or a local image upload, a library or custom blessing, and local PNG download/share while keeping uploads and custom text in memory only. Existing artwork adjustment remains grid-guided and visibly affects the drawn card. The preserved desktop studio remains unchanged.

## Verification / 驗證

```powershell
Set-Location Development/Source/Main-App-v46
npm ci
npm run lint
npm test

Set-Location ../../..
node Development/Tests/validate_v46.mjs
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

Run the physical iPhone and desktop v46 regression across `/mobile`, `/studio`, short/narrow/Pro Max viewports, all three entry modes, local upload, custom blessing, download/Share Sheet, settings, 42 artworks, the 62-question SHINE book, adjustment save/cancel, draw/flip, installation, and offline update. Any product behavior change after v46 must use a new versioned source and release.
