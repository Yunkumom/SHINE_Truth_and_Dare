# Truth and Dare Directory Guide / 資料夾指南

This is the canonical repository map. Active Development contains preserved earlier lines, the current v22 line, and files required to run, understand, and validate them.

本檔是正式 repository 地圖。作用中的 Development 保留較早版本與目前 v22，以及執行、理解與驗證所需的檔案。

## Root / 根目錄

| Path | Purpose / 用途 |
| --- | --- |
| `Apps/` | Completed runnable releases. / 完成且可執行的 releases。 |
| `Apps/Standalone/` | Immutable v15–v22 HTML releases plus v16 runtime assets. / 不可變 v15–v22 HTML 與 v16 runtime assets。 |
| `Apps/Public-Web/v2/` | Preserved immutable v19-derived GitHub Pages release. / 保留的 v19 公開版。 |
| `Apps/Public-Web/v3/` | Preserved immutable v20 GitHub Pages release. / 保留的 v20 公開版。 |
| `Apps/Public-Web/v4/` | Preserved immutable v21 GitHub Pages release. / 保留的不可變 v21 GitHub Pages release。 |
| `Apps/Public-Web/v5/` | Current immutable v22 GitHub Pages release. / 目前不可變 v22 GitHub Pages release。 |
| `Assets/` | Reusable resources and governance. / 可重用資源與治理。 |
| `Assets/Catalog/` | Licence, attribution, source, and safety records. / 授權、標示、來源與安全紀錄。 |
| `Assets/Deities/` | High-resolution AI-generated Taiwanese deity source artwork and provenance; `v20-variants/` adds nine action/pose variants. / 高解析台灣神祇原始圖；`v20-variants/` 增加九張動作變體。 |
| `Assets/Deities/v20-variants/` | v20 source PNG variants with Taiwan motifs hidden in objects, clothing, or scenery. / v20 原始 PNG，將台灣意象藏入器物、服飾或場景。 |
| `Development/` | Current v22 source, automation, validation, and product contracts. / 目前 v22 source、自動化、驗證與產品合約。 |
| `_meta/` | Purpose, roadmap, handoff, changelog, and reconstruction blueprints. / purpose、roadmap、handoff、changelog 與重建藍圖。 |
| `_agent/` | Agent workspace guidance. / Agent 工作指引。 |
| `_agent/Skills/` | Optional project-specific reusable Skills; currently only its index. / 專案 Skills，目前只有索引。 |
| `_human/` | Human-facing support artifacts. / 人類使用的支援資料。 |
| `_human/code-learning-tool.html` | Interactive v19 code-learning academy for human maintainers. / 給維護者使用的 v19 互動程式學院。 |
| `_pending/` | Recoverable retired or undecided material; no permanent deletion without approval. / 可回復的退出使用或待決資料。 |
| `_pending/Development-simplification_2026-07-19/` | Original-path archive of retired Development content. / 依原路徑保存的 Development 退出使用資料。 |
| `_pending/v20-pre-release-centering-failure_2026-07-22/` | Unpublished failed v20 build checkpoints retained as evidence. / 未發布且不可使用的 v20 檢查點。 |
| `_pending/v20-generated-development-state_2026-07-22/` | Reproducible v20 dependencies and TypeScript caches, kept outside active Development. / v20 可重建依賴與 cache。 |
| `_pending/v21-generated-development-state_2026-07-22/` | Reproducible v21 dependencies and TypeScript caches, kept outside active Development. / v21 可重建依賴與 cache。 |
| `_pending/v22-pre-release-candidate_2026-07-22/` | Unpublished v22 checkpoint from before the final swipe-out transition; evidence only. / 最終滑出轉場前的未發布 v22 檢查點，僅供驗證。 |
| `_pending/v22-generated-development-state_2026-07-22/` | Reproducible v22 dependencies and TypeScript caches, kept outside active Development. / v22 可重建依賴與 cache。 |
| `.github/` | GitHub-required workflow configuration. / GitHub workflow 設定。 |
| `.gitattributes` | Cross-platform byte-preservation rules for immutable releases and generated outputs. / 跨平台保留不可變 release 與生成輸出的原始位元組。 |
| `README.md` | Product summary and quick start. / 產品簡介與快速開始。 |
| `GUIDE.md` | This canonical directory map. / 本正式目錄地圖。 |
| `AGENTS.md` | Automated-contributor rules. / 自動化協作者規則。 |
| `Open Truth and Dare.cmd` | One-click Windows v22 launcher. / Windows v22 一鍵啟動器。 |

## Active Development / 作用中開發

| Path | Purpose / 用途 |
| --- | --- |
| `Development/README.md` | Explains every meaningful retained Development file. / 說明每個有意義的保留檔案。 |
| `Development/Source/Main-App-v18/` | Preserved v18 source line. / 保留的 v18 source。 |
| `Development/Source/Main-App-v19/` | Preserved v19 deity-card source line. / 保留的 v19 神祇卡 source。 |
| `Development/Source/Public-Web/v2/` | Recipe linking verified v19 source to the immutable public v2 output. / 將 v19 source 連結至公開 v2 成品的產製說明。 |
| `Development/Source/Main-App-v20/` | Preserved v16-inspired source with 18 deity artworks, blessings, and centered desktop fit. / 保留的 v16 風格 source，含 18 張神祇圖、祝福與桌面置中。 |
| `Development/Source/Public-Web/v3/` | Recipe linking verified v20 source to immutable Public Web v3. / v20 至公開 v3 的產製說明。 |
| `Development/Source/Main-App-v21/` | Preserved hidden-Taiwan reveal source. / 保留的藏台灣揭示 source。 |
| `Development/Source/Public-Web/v4/` | Recipe linking verified v21 source to immutable Public Web v4. / v21 至公開 v4 的產製說明。 |
| `Development/Source/Main-App-v22/` | Current source with direct layout editing, swipe/flip deck, enlarged 63:88 cards, optional contact exchange, and preserved hidden-Taiwan reveal. / 目前 source，含版面編輯、滑動翻牌、放大卡片、可選聯絡交換及藏台灣。 |
| `Development/Source/Public-Web/v5/` | Recipe linking verified v22 source to immutable Public Web v5. / v22 至公開 v5 的產製說明。 |
| `Development/Source/Main-App-v18/src/` | Authored UI, policies, data, styles, and tests. / 人工維護 UI、政策、資料、樣式與測試。 |
| `Development/Source/Main-App-v18/public/` | PWA manifest, worker template, and owned icons. / PWA manifest、worker template 與自有 icons。 |
| `Development/Source/Main-App-v18/dist/` | Verified generated v18 PWA output; never hand-edit. / 已驗證 v18 PWA 輸出，不可手改。 |
| `Development/Automation/Scripts/` | Versioned v18–v22 PWA, standalone, and public-release builders. / 版本化 v18–v22 建置器。 |
| `Development/Automation/Tools/` | Loopback-only v22 desktop server helper. / 僅限本機的 v22 desktop server。 |
| `Development/Tests/` | v18–v22, structure, and repository validators. / v18–v22、結構與 repository 驗證。 |
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

# Restore dependencies and work on current v22 source
Set-Location Development/Source/Main-App-v22
npm ci
npm run dev
npm run typecheck
npm run lint
npm test

# Validate repository from the root
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

Existing release outputs are immutable. New product behavior after v22 requires v23. Uncertain or proposed-deletion content must move to `_pending/` and be indexed; never permanently delete it without explicit human approval.
