# Truth and Dare Agent Guide / Truth and Dare Agent 指南

## Reading Order / 讀取順序

Before meaningful changes, read: `README.md`, this file, `_meta/purpose.md`, `_meta/handoff.md`, `_meta/roadmap.md`, `_agent/README.md`, `skills/README.md`, `docs/PRODUCT_SPEC.md`, relevant design or plan files, and `_meta/public_blueprint.md`. Read `_meta/owner_private_blueprint.md` only when local private access is explicitly necessary and authorized.

進行實質修改前，依序閱讀：`README.md`、本檔、`_meta/purpose.md`、`_meta/handoff.md`、`_meta/roadmap.md`、`_agent/README.md`、`skills/README.md`、`docs/PRODUCT_SPEC.md`、相關設計或計畫，以及 `_meta/public_blueprint.md`。只有本機私人存取確有必要且獲得授權時，才讀取 `_meta/owner_private_blueprint.md`。

## Product Rules / 產品規則

- Treat `app/encounter_cards_v15.html` as an immutable executable baseline; never overwrite or hand-edit it.
- Preserve Chinese, English, and bilingual modes; Levels 1–5; Truth, Dare, and Surprise modes; and the mobile card interaction unless a new version is explicitly approved.
- Treat names, optional contact information, birthdays, notes, and 18+ choices as privacy-sensitive user input.
- Do not add analytics, backend transmission, accounts, or persistent personal-data storage without explicit approval and a privacy review.
- Clearly distinguish verified v15 behavior from future requirements and from the unavailable modular TypeScript source.

- 將 `app/encounter_cards_v15.html` 視為不可變的可執行基準；不得覆寫或直接手動修改。
- 除非明確核准新版本，保留中文、英文、雙語、Level 1–5、真心話、小挑戰、隨機模式與行動卡牌互動。
- 將姓名、選填聯絡方式、生日、留言與 18+ 選擇視為隱私敏感輸入。
- 未經明確核准與隱私審查，不得加入分析追蹤、後端傳輸、帳號或個資持久儲存。
- 清楚區分已驗證的 v15 行為、未來需求，以及目前缺少的模組化 TypeScript 原始碼。

## Repository Rules / Repository 規則

- Never permanently delete project content; move uncertain material to `_pending/` and update `_pending/index.md`.
- Never read, print, copy, expose, or commit secrets, private account data, or credentials.
- Never commit `_meta/owner_private_blueprint.md`.
- Keep canonical governance filenames fixed; use Git history for revisions.
- Never overwrite generated outputs; use the next incremental version.
- Do not create optional folders unless they immediately contain confirmed work.
- Update affected product documents, `_meta/handoff.md`, and `_meta/changelog.md` after meaningful changes.
- Update both blueprints when structure, reconstruction requirements, source URLs, or reusable workflows change.
- Run `tests/validate_repository.ps1` before claiming completion.

## Common Commands / 常用指令

1. Open `app/encounter_cards_v15.html` — run the current product baseline / 執行目前產品基準
2. `powershell -ExecutionPolicy Bypass -File tests/validate_repository.ps1` — validate structure and integrity / 驗證結構與完整性
3. Review `docs/PRODUCT_SPEC.md` — inspect product behavior and scope / 檢視產品行為與範圍
4. Review `_meta/handoff.md` — see verified status and exact next action / 查看已驗證狀態與下一步
5. Review `_pending/index.md` — process items awaiting human decision / 處理待人工決定項目

## Predicted Next Commands / 預測下一步指令

1. Run a complete mobile browser regression of v15 / 執行完整的 v15 行動瀏覽器回歸測試
2. Recover the original modular React/TypeScript source / 取回原始模組化 React／TypeScript source
3. Specify and build v16 without overwriting v15 / 規格化並建立 v16，且不覆寫 v15
4. Review Level 5 age and content-safety rules / 審查 Level 5 年齡與內容安全規則
5. Review card artwork licensing and attribution / 審查卡牌圖片授權與標示
6. Prepare a GitHub publication plan / 準備 GitHub 發布計畫
7. Prepare a Firebase dev deployment checklist / 準備 Firebase dev 部署檢查表

