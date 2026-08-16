# Truth or Dare Agent Guide / 真心話大冒險 Agent 指南

The owner needs to learn how to state repository-development commands correctly in English. At the beginning of every task, restate the owner's request as a clear, natural English command.

Describe every proposed, ongoing, and completed action bilingually, with English first and Traditional Chinese second. Keep literal shell commands, code, paths, and identifiers unchanged, and explain their purpose bilingually when useful.<br>
使用英語在前、繁體中文在後的雙語方式，描述每一項建議、進行中與已完成的動作。實際 shell 指令、程式碼、路徑與識別字保持原樣；需要時以雙語解釋其用途。

## Centralized Compute-Efficient Model Selection / 集中式節省算力模型選擇

Before production implementation, recommend the lowest-cost current model and lowest sufficient reasoning effort using the workspace-root `AGENTS.md` and the latest root weekly model report. State the model, reasoning effort, one short reason, and the condition that would justify upgrading.
正式實作前，依工作區根層 `AGENTS.md` 與最新根層每週模型快報，建議目前最低成本且足夠可靠的模型與最低合理 reasoning effort。說明模型、推理強度、一句簡短理由，以及需要升級的條件。

Do not independently schedule, automate, browse for, or run a weekly model-status check in this repository. The SHINE_AI_OS root weekly review is the single recurring source; consume its recommendation without duplicating the review. Check official model documentation only when the user explicitly requests it, root guidance is unavailable, or an active task encounters an unexpected model-availability change.
本 repository 不得自行排程、自動化、瀏覽或執行每週模型狀況檢查。SHINE_AI_OS 根層每週審查是唯一週期性來源；直接沿用其建議，不得重複審查。只有使用者明確要求、根層指引無法取得，或作用中任務遇到非預期模型可用性變更時，才查閱官方模型文件。

## Reading Order / 讀取順序

Before meaningful changes, read `README.md`, `GUIDE.md`, this file, `_meta/purpose.md`, `_meta/handoff.md`, `_meta/roadmap.md`, `_agent/README.md`, `_agent/Skills/README.md`, `Development/README.md`, the relevant current files under `Development/Documentation/`, and `_meta/public_blueprint.md`. Read archived designs/plans under `_pending/Development-simplification_2026-07-19/` only when historical decisions are relevant. Read the owner-private blueprint only when local private access is explicitly necessary and authorized.

進行實質修改前，依序閱讀上述現行文件。只有歷史決策確有關聯時才讀取 `_pending/Development-simplification_2026-07-19/` 中的 designs/plans；owner-private blueprint 僅能在確有必要且明確授權時讀取。

## Product Rules / 產品規則

- Treat `Apps/Standalone/encounter_cards_v15.html` through `encounter_cards_v39.html` as immutable releases. Never overwrite or hand-edit them.
- v46 authored Sites/Vinext source is under `Development/Source/Main-App-v46/`; `public/v46/` and `dist/` are generated verification outputs. v39 remains the immutable standalone fallback.
- Product behavior changes after v46 require a new versioned source and output line.
- The current Windows launcher restores locked dependencies when needed, builds the v46 encounter artifact, and starts the loopback-only v46 development server. `Development/Automation/Tools/serve_truth_and_dare.ps1` remains the preserved v39 fallback helper.
- Preserve the 430 × 932 iPhone Pro Max contract, centered desktop phone frame, Chinese/English/bilingual modes, Levels 1–5, Truth/Dare/Surprise modes, and mobile card interaction unless a new version is explicitly approved.
- Treat names, optional contact information, birthdays, notes, answers, and 18+ choices as privacy-sensitive input.
- Do not add analytics, backend transmission, accounts, or persistent personal-data storage without explicit approval and privacy review.
- v17 source, unpublished Public Web work, legacy builders/tests, completed designs/plans, and failed v20 pre-release checkpoints are inactive but recoverable under `_pending/`. Do not restore or modify an archived product line without explicit reactivation scope.

- 將 `Apps/Standalone/` 中 v15–v39 視為不可變 release，不得覆寫或手改。
- v46 人工 Sites／Vinext source 位於 `Development/Source/Main-App-v46/`；`public/v46/` 與 `dist/` 是生成驗證成品。v39 保留為不可變 standalone 備援。
- v46 後的產品行為修改必須建立新版本。
- Windows 啟動器會在需要時還原鎖定依賴、建置 v46 encounter artifact，並啟動僅限 loopback 的 v46 development server；`Development/Automation/Tools/serve_truth_and_dare.ps1` 保留為 v39 備援 helper。
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
# Current desktop v46
.\Open Truth and Dare.cmd

# Source work (restore generated dependencies first)
Set-Location Development/Source/Main-App-v46
npm ci
npm run dev
npm run lint
npm test

# Current release/repository contracts
Set-Location ../../..
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v35.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v36.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v37.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v38.ps1
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v39.ps1
node Development/Tests/validate_v46.mjs
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Predicted Next Work / 預測下一步

1. Complete physical iPhone and desktop v46 regression across `/mobile`, `/studio`, mode selection, direct keepsake, settings, the 42-card library, 62-question SHINE book, artwork adjustment, draw/flip, PNG, Share Sheet, installation, and offline update.
2. Review Level 5 age/content safety and artwork provenance.
3. Create a new versioned release for any product change after v46.
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
