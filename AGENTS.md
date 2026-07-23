# Truth and Dare Agent Guide / Truth and Dare Agent 指南

## Reading Order / 讀取順序

Before meaningful changes, read `README.md`, `GUIDE.md`, this file, `_meta/purpose.md`, `_meta/handoff.md`, `_meta/roadmap.md`, `_agent/README.md`, `_agent/Skills/README.md`, `Development/README.md`, the relevant current files under `Development/Documentation/`, and `_meta/public_blueprint.md`. Read archived designs/plans under `_pending/Development-simplification_2026-07-19/` only when historical decisions are relevant. Read the owner-private blueprint only when local private access is explicitly necessary and authorized.

進行實質修改前，依序閱讀上述現行文件。只有歷史決策確有關聯時才讀取 `_pending/Development-simplification_2026-07-19/` 中的 designs/plans；owner-private blueprint 僅能在確有必要且明確授權時讀取。

## Product Rules / 產品規則

- Treat `Apps/Standalone/encounter_cards_v15.html` through `encounter_cards_v24.html` as immutable releases. Never overwrite or hand-edit them.
- v24 authored source remains under `Development/Source/Main-App-v24/src/`; its verified `dist/` is generated and immutable.
- Product behavior changes after v24 require v25 source and output artifacts.
- The current Windows launcher must serve `Apps/Standalone/encounter_cards_v24.html` through `Development/Automation/Tools/serve_truth_and_dare.ps1`; direct `file://` execution is unsupported for the complete contract.
- Preserve the 430 × 932 iPhone Pro Max contract, centered desktop phone frame, Chinese/English/bilingual modes, Levels 1–5, Truth/Dare/Surprise modes, and mobile card interaction unless a new version is explicitly approved.
- Treat names, optional contact information, birthdays, notes, answers, and 18+ choices as privacy-sensitive input.
- Do not add analytics, backend transmission, accounts, or persistent personal-data storage without explicit approval and privacy review.
- v17 source, unpublished Public Web work, legacy builders/tests, completed designs/plans, and failed v20 pre-release checkpoints are inactive but recoverable under `_pending/`. Do not restore or modify an archived product line without explicit reactivation scope.

- 將 `Apps/Standalone/` 中 v15–v24 視為不可變 release，不得覆寫或手改。
- v24 人工 source 位於 `Development/Source/Main-App-v24/src/`；已驗證 `dist/` 為不可變生成成品。
- v24 後的產品行為修改必須建立 v25。
- Windows 啟動器必須透過本機 server 開啟 v24；完整合約不支援直接 `file://`。
- 保留 430 × 932、中／英／雙語、Level 1–5、真心話／小挑戰／隨機及行動卡牌互動，除非明確核准新版本。
- 隱私敏感輸入不得傳輸、記錄或持久保存；未經核准不得加入 analytics、backend 或帳號。

## Repository Rules / Repository 規則

- Never permanently delete project content. Move retired, proposed-deletion, or uncertain material to `_pending/` and update `_pending/index.md`.
- Never read, print, copy, expose, or commit secrets, private account data, credentials, or `_meta/owner_private_blueprint.md`.
- Keep canonical governance filenames fixed; use Git history for revisions.
- Do not create optional folders unless they immediately contain confirmed work.
- Update affected product documents, `Development/README.md`, `GUIDE.md`, `_meta/handoff.md`, and `_meta/changelog.md` after meaningful structural changes.
- Update the public blueprint when structure, reconstruction requirements, source URLs, or reusable workflows change. The private blueprint requires explicit access authorization.
- Run `Development/Tests/validate_repository.ps1` before claiming completion.

## Common Commands / 常用指令

```powershell
# Current desktop v24
.\Open Truth and Dare.cmd

# Source work (restore generated dependencies first)
Set-Location Development/Source/Main-App-v24
npm ci
npm run dev
npm run typecheck
npm run lint
npm test

# Current release/repository contracts
Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v24.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Predicted Next Work / 預測下一步

1. Complete physical iPhone v24 regression for layout editing, swipe/flip, precise glowing Taiwan coastline, PNG, Share Sheet, installation, and offline update.
2. Review Level 5 age/content safety and artwork provenance.
3. Create v24 for any later product change.
4. Review `_pending/index.md`; permanent disposal requires explicit human approval.

---

## Main Program Change & Working Version Preservation Rules / 主程式變更與工作版本留存規則

Any change or adjustment that affects how the main program works must be committed to Git.
任何影響主程式運作的變更或微調，都必須 commit 到 Git。

This includes changes to:
包含對以下項目的任何調整與變更：
- Game content / 遊戲內容
- Images / 圖片
- Animations or interactions / 動畫或互動效果
- Commands / 指令
- Program logic / 程式邏輯
- Any behavior that could affect whether the game works correctly / 任何可能影響遊戲或程式是否正常運作的行為

Rules for Working Versions & Archiving / 工作版本留存與封存規則：
1. **Preserve Working Versions / 留存工作版本**: Before making changes, always preserve at least three working versions (e.g. `game_v1`, `game_v2`, `game_v3`). This prevents the program from becoming unusable after an incorrect modification.
   修改前務必保留至少 3 個可用工作版本（例如：`game_v1`、`game_v2`、`game_v3`），防止錯誤修改導致程式無法運作。
2. **Automatic Versioning / 版本號碼自動更新**: The version number should update automatically (e.g. auto-incrementing versioning).
   版本號碼應自動更新升級。
3. **Archive Older Versions / 封存過舊版本**: When there are more than three old versions, move the older versions into `_pending`.
   當存在超過 3 個舊版本時，將較舊的版本移入 `_pending` 資料夾。
