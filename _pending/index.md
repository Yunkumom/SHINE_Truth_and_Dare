# Pending Index / 待確認索引

## `Development-simplification_2026-07-19/`

Moved here intact during the approved conservative Development simplification. The archive retains original `Development/...` relative paths for recovery.

經核准的保守式 Development 精簡後完整移入；封存保留原本的 `Development/...` 相對路徑，方便復原。

| Archived item | Reason / 原因 |
| --- | --- |
| `Development/Source/Main-App/` | Preserved v17 source, dependencies, and generated build; v18 is the only active source line. / v17 source、依賴與 build；目前只維護 v18。 |
| `Development/Source/Public-Web/` | Unpublished Public Web v1 source and dependencies; publication is not active. / 未發布的 Public Web v1 source 與依賴；目前無發布作業。 |
| `Development/Source/Main-App-v18/node_modules/` | Generated dependencies recoverable with `npm ci`. / 可用 `npm ci` 重建的依賴。 |
| `Development/Source/Main-App-v18/*.tsbuildinfo` | Generated TypeScript build caches. / TypeScript 生成 cache。 |
| `Development/Automation/Scripts/finalize-pwa.mjs` | v17-only PWA finalizer. / 僅供 v17 的 PWA finalizer。 |
| `Development/Automation/Scripts/export-standalone.mjs` | v17-only standalone exporter. / 僅供 v17 的 standalone exporter。 |
| `Development/Automation/Scripts/finalize-public-v1.mjs` | Publication-only Public Web finalizer. / 僅供 Public Web 發布的 finalizer。 |
| `Development/Automation/Scripts/extract-v16-cards.mjs` | Legacy v16 extraction helper. / 舊 v16 擷取工具。 |
| `Development/Automation/Tools/build_v16.ps1` | Legacy v16 reconstruction builder; preserved release remains under `Apps/Standalone/`. / 舊 v16 重建工具；成品仍保留於 Apps。 |
| `Development/Tests/validate_v16.ps1` | Retired version-specific validator; immutable hashes remain covered by current validation. / 退出作用中的 v16 專用驗證。 |
| `Development/Tests/validate_v17.ps1` | Retired version-specific validator; immutable hashes remain covered by current validation. / 退出作用中的 v17 專用驗證。 |
| `Development/Tests/validate_public_v1.ps1` | Publication-only validator archived with the publication line. / 與發布產品線一起封存的驗證。 |
| `Development/Documentation/designs/` | Completed design history, including this simplification design. / 已完成設計歷史，包含本次精簡設計。 |
| `Development/Documentation/plans/` | Completed implementation history, including this simplification plan. / 已完成實作計畫歷史，包含本次精簡計畫。 |
| Organizational `README.md` files | Redundant after `Development/README.md` became the complete retained-file inventory. / Development README 成為完整清單後的重複說明。 |

Other earlier pending artifacts referenced by Git history were already absent from the working tree before this simplification and were not recreated or permanently removed by this task.

Git 歷史中提及的其他舊 pending 項目在本次精簡前即不在 working tree；本次工作未重建，也未永久刪除它們。
# Pending / 待處理

## v19 first-build artifacts / v19 首次建置產物

- `_pending/v19-first-build-unembedded-artwork_2026-07-19/` preserves the first unpublished v19 standalone and Public Web v2 outputs. They referenced external dynamic artwork paths and are not release candidates.
- 此目錄保留未發布的首次 v19／Public Web v2 產物；因圖像未真正內嵌，不可作為 release。

## v19 generated development state / v19 生成開發狀態

- `_pending/v19-generated-development-state_2026-07-19/` retains the reproducible `node_modules` directory and TypeScript build caches after verification so active Development stays uncluttered.
- 此目錄保留可重建的依賴與 TypeScript cache，讓作用中的 Development 維持簡潔。
