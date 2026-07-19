# Truth and Dare Directory Guide / 資料夾指南

This is the canonical repository map. Active Development contains the preserved v18 line, current v19 line, and files required to run, understand, and validate them.

本檔是正式 repository 地圖。作用中的 Development 保留 v18 與目前 v19，以及執行、理解與驗證所需的檔案。

## Root / 根目錄

| Path | Purpose / 用途 |
| --- | --- |
| `Apps/` | Completed runnable releases. / 完成且可執行的 releases。 |
| `Apps/Standalone/` | Immutable v15–v19 HTML releases plus v16 runtime assets. / 不可變 v15–v19 HTML 與 v16 runtime assets。 |
| `Apps/Public-Web/v2/` | Immutable v19-derived GitHub Pages release. / 由 v19 產生的不可變 GitHub Pages release。 |
| `Assets/` | Reusable resources and governance. / 可重用資源與治理。 |
| `Assets/Catalog/` | Licence, attribution, source, and safety records. / 授權、標示、來源與安全紀錄。 |
| `Assets/Deities/` | High-resolution AI-generated Taiwanese deity source artwork and provenance. / 高解析 AI 生成台灣神祇原始圖與來源說明。 |
| `Development/` | Current v19 source, automation, validation, and product contracts. / 目前 v19 source、自動化、驗證與產品合約。 |
| `_meta/` | Purpose, roadmap, handoff, changelog, and reconstruction blueprints. / purpose、roadmap、handoff、changelog 與重建藍圖。 |
| `_agent/` | Agent workspace guidance. / Agent 工作指引。 |
| `_agent/Skills/` | Optional project-specific reusable Skills; currently only its index. / 專案 Skills，目前只有索引。 |
| `_human/` | Human-facing support artifacts. / 人類使用的支援資料。 |
| `_pending/` | Recoverable retired or undecided material; no permanent deletion without approval. / 可回復的退出使用或待決資料。 |
| `_pending/Development-simplification_2026-07-19/` | Original-path archive of retired Development content. / 依原路徑保存的 Development 退出使用資料。 |
| `.github/` | GitHub-required workflow configuration. / GitHub workflow 設定。 |
| `README.md` | Product summary and quick start. / 產品簡介與快速開始。 |
| `GUIDE.md` | This canonical directory map. / 本正式目錄地圖。 |
| `AGENTS.md` | Automated-contributor rules. / 自動化協作者規則。 |
| `Open Truth and Dare.cmd` | One-click Windows v19 launcher. / Windows v19 一鍵啟動器。 |

## Active Development / 作用中開發

| Path | Purpose / 用途 |
| --- | --- |
| `Development/README.md` | Explains every meaningful retained Development file. / 說明每個有意義的保留檔案。 |
| `Development/Source/Main-App-v18/` | Preserved v18 source line. / 保留的 v18 source。 |
| `Development/Source/Main-App-v19/` | Current React, TypeScript, Vite, PWA, deity-card, and standalone source line. / 目前 v19 神祇卡 source。 |
| `Development/Source/Public-Web/v2/` | Recipe linking verified v19 source to the immutable public v2 output. / 將 v19 source 連結至公開 v2 成品的產製說明。 |
| `Development/Source/Main-App-v18/src/` | Authored UI, policies, data, styles, and tests. / 人工維護 UI、政策、資料、樣式與測試。 |
| `Development/Source/Main-App-v18/public/` | PWA manifest, worker template, and owned icons. / PWA manifest、worker template 與自有 icons。 |
| `Development/Source/Main-App-v18/dist/` | Verified generated v18 PWA output; never hand-edit. / 已驗證 v18 PWA 輸出，不可手改。 |
| `Development/Automation/Scripts/` | v18 PWA finalizer and standalone exporter. / v18 PWA finalizer 與 standalone exporter。 |
| `Development/Automation/Tools/` | Loopback-only v18 desktop server helper. / 僅限本機的 v18 desktop server。 |
| `Development/Tests/` | Current v18/v19, structure, and repository validators. / 目前 v18／v19、結構與 repository 驗證。 |
| `Development/Documentation/` | Current product, architecture, animation, content, and PWA contracts. / 目前產品、架構、動畫、內容與 PWA 合約。 |

`node_modules/`, coverage, and TypeScript build caches are not active repository structure. Restore dependencies with `npm ci` only when development is needed.

`node_modules/`、coverage 與 TypeScript build cache 不屬於作用中結構；需要開發時才用 `npm ci` 還原依賴。

## Archived Development / 封存開發資料

The following are recoverable under `_pending/Development-simplification_2026-07-19/Development/`: preserved v17 source, unpublished Public Web v1 source, old-version/publication tools and validators, completed designs/plans, redundant folder README files, and generated dependencies. `_pending/index.md` is the complete register.

以下資料可由 `_pending/Development-simplification_2026-07-19/Development/` 回復：v17 source、未發布 Public Web v1 source、舊版／發布工具與驗證、已完成 designs/plans、重複 README 與生成依賴。完整清單見 `_pending/index.md`。

## Commands / 常用命令

```powershell
# Run current desktop release
.\Open Truth and Dare.cmd

# Restore dependencies and work on v18 source
Set-Location Development/Source/Main-App-v18
npm ci
npm run dev
npm run typecheck
npm run lint
npm test

# Validate repository from the root
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

Existing release outputs are immutable. New product behavior after v18 requires the next numbered version. Uncertain or proposed-deletion content must move to `_pending/` and be indexed; never permanently delete it without explicit human approval.
