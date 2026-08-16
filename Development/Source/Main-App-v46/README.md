# Encounter Cards v46 / 相遇卡 v46

Encounter Cards v46 is the current governed Truth or Dare application. It combines a multi-route Sites/Vinext wrapper with the privacy-first bilingual encounter-card experience generated under `public/v46/`.

相遇卡 v46 是目前受治理的真心話大冒險應用。它結合多路由 Sites／Vinext wrapper，以及生成於 `public/v46/` 的隱私優先雙語相遇卡體驗。

## Product routes / 產品路由

- `/` — choose the mobile experience or desktop studio. / 選擇手機體驗或電腦工作室。
- `/mobile` — full-height phone experience. / 全高手機體驗。
- `/studio` — desktop frame and phone simulation. / 電腦框架與手機模擬。
- `/v46/index.html` — generated encounter-card PWA surface. / 生成的相遇卡 PWA 介面。

## Privacy boundary / 隱私邊界

Language, font scale, layout geometry, and non-personal presentation settings may persist locally. Names, contacts, birthdays, answers, custom questions, uploaded images, and adult-content choices remain in memory only. v46 has no account flow, authentication helper, analytics, D1 database, R2 storage, or backend persistence.

語言、字級、版面幾何與非個人呈現設定可保存在本機。姓名、聯絡方式、生日、答案、自訂問題、上傳圖片與成人內容選擇只存在記憶體。v46 不含帳號流程、authentication helper、analytics、D1 database、R2 storage 或 backend persistence。

## Local development / 本機開發

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. The root repository launcher uses the same v46 development server.

開啟 Vite 顯示的本機 URL。根層 repository launcher 使用相同的 v46 development server。

## Verification / 驗證

```bash
npm run build:encounter
npm run build
npm run lint
npm test
npm run validate:artifact
```

`npm run build` first generates and finalizes the complete `/v46/` PWA precache, then builds and validates the Sites Worker artifact. On Linux hosting workers, the build uses GNU `timeout`; on macOS it runs the same build without that optional outer time limit. `npm run install:ci` remains the bounded Linux hosting installer; local macOS and Windows development uses `npm ci`.

`npm run build` 會先生成並完成 `/v46/` PWA 的完整 precache，再建置並驗證 Sites Worker artifact。Linux hosting worker 會使用 GNU `timeout`；macOS 會執行相同建置，但沒有選用的外層時間限制。`npm run install:ci` 保留為 Linux hosting 的 bounded installer；macOS 與 Windows 本機開發使用 `npm ci`。

## Provenance / 來源紀錄

The original GitHub Lite intake is preserved at `_pending/SHINE_Truth_and_Dare_v46_GitHub_Lite_2026-08-16/` from the repository root. It records the incoming mixed v40/v41/v46 labels and unused starter capability files. The governed source normalizes active identifiers to v46 while keeping inherited CSS selector names only where compatibility requires them.

原始 GitHub Lite intake 保存於 repository 根層的 `_pending/SHINE_Truth_and_Dare_v46_GitHub_Lite_2026-08-16/`。它記錄匯入時混合的 v40／v41／v46 標籤與未使用 starter 能力檔案。受治理 source 將作用中識別統一為 v46；只有相容性需要時才保留繼承的 CSS selector 名稱。
