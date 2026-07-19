# Truth and Dare Agent Guide / Truth and Dare Agent 指南

## Reading Order / 讀取順序

Before meaningful changes, read: `README.md`, `GUIDE.md`, this file, `Development/Governance/Meta/purpose.md`, `Development/Governance/Meta/handoff.md`, `Development/Governance/Meta/roadmap.md`, `Development/Governance/Agent/README.md`, `Development/Governance/Skills/README.md`, `Development/Documentation/PRODUCT_SPEC.md`, relevant design or plan files, and `Development/Governance/Meta/public_blueprint.md`. Read the owner-private blueprint only when local private access is explicitly necessary and authorized.

進行實質修改前，依序閱讀：`README.md`、`GUIDE.md`、本檔、`Development/Governance/Meta/purpose.md`、`Development/Governance/Meta/handoff.md`、`Development/Governance/Meta/roadmap.md`、`Development/Governance/Agent/README.md`、`Development/Governance/Skills/README.md`、`Development/Documentation/PRODUCT_SPEC.md`、相關設計或計畫，以及 `Development/Governance/Meta/public_blueprint.md`。只有本機私人存取確有必要且獲得授權時，才讀取 owner-private blueprint。

## Product Rules / 產品規則

- Treat `Apps/Standalone/encounter_cards_v15.html` as an immutable executable baseline; never overwrite or hand-edit it. Build v16 only through `Development/Automation/Tools/build_v16.ps1`.
- Treat existing v16 as immutable. Maintain v17 only through `Development/Source/Main-App/src/` and generate outputs with `npm run build:standalone` from `Development/Source/Main-App/`.
- Never hand-edit `Development/Source/Main-App/dist/` or `Apps/Standalone/encounter_cards_v17.html` after verification; use the next version for later release changes.
- Treat `Development/Source/Public-Web/v1/` and `Apps/Public-Web/v1/` as an immutable public release pair after publication. Any later public modification must create matching `v2`, `v3`, and later source/output directories.
- Preserve the public v1 card DOM hierarchy and interaction model; do not replace its card architecture during maintenance.
- Use `Open Truth and Dare.cmd` or `Development/Automation/Tools/serve_truth_and_dare.ps1`; direct `file://` execution is unsupported.
- Preserve the 430 × 932 iPhone Pro Max contract and the centered 430 px desktop frame.
- Preserve Chinese, English, and bilingual modes; Levels 1–5; Truth, Dare, and Surprise modes; and the mobile card interaction unless a new version is explicitly approved.
- Treat names, optional contact information, birthdays, notes, and 18+ choices as privacy-sensitive user input.
- Do not add analytics, backend transmission, accounts, or persistent personal-data storage without explicit approval and a privacy review.
- Clearly distinguish verified v15 behavior from future requirements and from the unavailable modular TypeScript source.

- 將 `Apps/Standalone/encounter_cards_v15.html` 視為不可變的可執行基準；不得覆寫或直接手動修改。
- 只能透過 `Development/Automation/Tools/build_v16.ps1` 建立 v16，並使用 `Open Truth and Dare.cmd` 或 `Development/Automation/Tools/serve_truth_and_dare.ps1` 執行；不支援直接 `file://` 執行。
- 保留 430 × 932 iPhone Pro Max 版面合約，以及電腦版置中的 430 px 手機框。
- 除非明確核准新版本，保留中文、英文、雙語、Level 1–5、真心話、小挑戰、隨機模式與行動卡牌互動。
- 將姓名、選填聯絡方式、生日、留言與 18+ 選擇視為隱私敏感輸入。
- 未經明確核准與隱私審查，不得加入分析追蹤、後端傳輸、帳號或個資持久儲存。
- 清楚區分已驗證的 v15 行為、未來需求，以及目前缺少的模組化 TypeScript 原始碼。

## Repository Rules / Repository 規則

- Never permanently delete project content; move uncertain material to `Development/Pending/` and update `Development/Pending/index.md`.
- Never read, print, copy, expose, or commit secrets, private account data, or credentials.
- Never commit the owner-private blueprint under `Development/Governance/Meta/`.
- Keep canonical governance filenames fixed; use Git history for revisions.
- Never overwrite generated outputs; use the next incremental version.
- Do not create optional folders unless they immediately contain confirmed work.
- Update affected product documents, `Development/Governance/Meta/handoff.md`, and `Development/Governance/Meta/changelog.md` after meaningful changes.
- Update both blueprints when structure, reconstruction requirements, source URLs, or reusable workflows change.
- Update `GUIDE.md` whenever a repository-controlled directory changes.
- Run `Development/Tests/validate_repository.ps1` before claiming completion.

## Common Commands / 常用指令

1. Double-click `Open Truth and Dare.cmd` — run the current v16 product / 執行目前 v16 產品
2. `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1` — validate structure and integrity / 驗證結構與完整性
3. `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v16.ps1` — validate v16 and launcher contracts / 驗證 v16 與啟動器合約
4. `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_v17.ps1` — validate modular v17 and both outputs / 驗證模組化 v17 與兩種輸出
5. `cd Development/Source/Main-App; npm run typecheck; npm run lint; npm test; npm run build:standalone` — verify v17 / 驗證 v17
6. `cd Development/Source/Public-Web/v1; npm ci; npm test; npm run typecheck; npm run build; cd ../../../..; node Development/Automation/Scripts/finalize-public-v1.mjs` — rebuild public v1 before publication only / 僅在公開前重建 public v1
7. `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_public_v1.ps1` — verify public v1 and immutable baselines / 驗證 public v1 與不可變基準
8. Review `Development/Documentation/PRODUCT_SPEC.md` — inspect product behavior and scope / 檢視產品行為與範圍
9. Review `Development/Governance/Meta/handoff.md` — see verified status and exact next action / 查看已驗證狀態與下一步
10. Review `Development/Pending/index.md` — process items awaiting human decision / 處理待人工決定項目

## Predicted Next Commands / 預測下一步指令

1. Run a complete mobile browser regression of v15 / 執行完整的 v15 行動瀏覽器回歸測試
2. Recover the original modular React/TypeScript source / 取回原始模組化 React／TypeScript source
3. Specify and build v16 without overwriting v15 / 規格化並建立 v16，且不覆寫 v15
4. Review Level 5 age and content-safety rules / 審查 Level 5 年齡與內容安全規則
5. Review card artwork licensing and attribution / 審查卡牌圖片授權與標示
6. Prepare a GitHub publication plan / 準備 GitHub 發布計畫
7. Prepare a Firebase dev deployment checklist / 準備 Firebase dev 部署檢查表
