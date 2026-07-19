# Truth and Dare Directory Guide / 資料夾指南

This is the canonical map for the repository. The root is intentionally organized around three primary categories: finished products, reusable assets, and development material.

本檔是 repository 的正式結構地圖。根目錄刻意只突出三個主要分類：完成品、可重用素材，以及開發資料。

## Root / 根目錄

| Path | Purpose / 用途 |
| --- | --- |
| `Apps/` | Completed, runnable, or publishable websites and applications. / 已完成、可執行或可發布的網站與應用程式。 |
| `Assets/` | Reusable resources plus their licence and provenance records. / 可重用素材及其授權與來源紀錄。 |
| `Development/` | Source code, automation, tests, documentation, governance, references, and retained work history. / 原始碼、自動化、測試、文件、治理、參考資料與保留的開發歷史。 |
| `.github/` | GitHub workflow configuration; GitHub requires this root location. / GitHub workflow 設定，必須留在根目錄。 |
| `GUIDE.md` | This complete structure and responsibility map. / 本結構與職責總覽。 |
| `README.md` | Product overview and quick-start commands. / 產品簡介與快速開始。 |
| `AGENTS.md` | Rules that automated contributors must follow. / 自動化協作者必須遵守的規則。 |
| `Open Truth and Dare.cmd` | One-click Windows launcher. / Windows 一鍵啟動器。 |
| `.gitignore` | Local/private/generated file exclusions. / 本機、私人與生成檔案排除規則。 |
| `.git/` | Git history and internal repository state; never reorganize manually. / Git 歷史與內部狀態，不可手動整理。 |

## Apps

| Path | Purpose / 用途 | Edit policy / 修改原則 |
| --- | --- | --- |
| `Apps/Standalone/` | Self-contained HTML product releases. / 獨立 HTML 產品版本。 | Treat existing versions as immutable. / 現有版本不可覆寫。 |
| `Apps/Standalone/v16-assets/` | Runtime modules required by v16 over loopback HTTP. / v16 透過本機 HTTP 執行所需模組。 | Generated only by the approved v16 builder. / 僅能由核准的 v16 builder 生成。 |
| `Apps/Public-Web/` | Deployable GitHub Pages tree and latest-version redirect. / 可部署的 GitHub Pages 目錄與最新版轉址。 | Build through the public-source pipeline. / 透過公開版 source pipeline 建置。 |
| `Apps/Public-Web/v1/` | Immutable public v1 output. / 不可變公開 v1 成品。 | Never hand-edit; later releases use v2, v3, etc. / 不可手改；後續使用 v2、v3。 |
| `Apps/Public-Web/v1/assets/` | Hashed CSS, JavaScript, and public card images. / 帶雜湊的 CSS、JavaScript 與公開卡圖。 | Generated release content. / 生成的 release 內容。 |
| `Apps/Public-Web/v1/assets/cards/` | Public v1 card artwork copies. / 公開 v1 卡牌圖片副本。 | Keep with the self-contained release. / 與自包含 release 一起保存。 |

## Assets

| Path | Purpose / 用途 |
| --- | --- |
| `Assets/Catalog/` | Canonical asset licence, attribution, source, and safety records. / 素材授權、標示、來源與安全限制的正式紀錄。 |

Existing version-bound images remain inside their product or source tree so immutable releases remain reproducible. New reusable source artwork should enter `Assets/` with catalogue records before being copied into a release.

既有版本綁定圖片留在產品或 source 目錄，確保不可變版本可重建。新的可重用原始素材應先放入 `Assets/` 並登錄，再複製到 release。

## Development

| Path | Purpose / 用途 |
| --- | --- |
| `Development/Source/` | All maintainable product source lines. / 所有可維護的產品原始碼。 |
| `Development/Source/Main-App/` | Current v17 React, TypeScript, Vite, PWA, and standalone source. / 目前 v17 React、TypeScript、Vite、PWA 與 standalone source。 |
| `Development/Source/Main-App/src/` | Authored application code. / 人工維護的應用程式碼。 |
| `Development/Source/Main-App/src/data/` | Structured bilingual card data. / 結構化雙語卡牌資料。 |
| `Development/Source/Main-App/src/lib/` | Age gate, game, preferences, and sharing policies. / 年齡門檻、遊戲、偏好與分享邏輯。 |
| `Development/Source/Main-App/src/styles/` | Application styling. / 應用程式樣式。 |
| `Development/Source/Main-App/src/test/` | Test setup shared by component tests. / Component tests 共用設定。 |
| `Development/Source/Main-App/public/` | PWA manifest, service worker, icons, and approved public assets. / PWA manifest、service worker、圖示與核准公開素材。 |
| `Development/Source/Main-App/public/assets/` | Source-side public assets. / Source 端公開素材。 |
| `Development/Source/Main-App/public/assets/icons/` | Owned PWA icons. / 專案自有 PWA 圖示。 |
| `Development/Source/Main-App/dist/` | Generated PWA build; never hand-edit. / 生成的 PWA build，不可手改。 |
| `Development/Source/Public-Web/` | Versioned public website sources. / 版本化公開網站 source。 |
| `Development/Source/Public-Web/v1/` | Public v1 React/TypeScript source. / 公開 v1 React／TypeScript source。 |
| `Development/Source/Public-Web/v1/src/` | Public application source and tests. / 公開應用程式 source 與測試。 |
| `Development/Source/Public-Web/v1/src/data/` | Recovered and sourced card records. / 回復與具來源的卡牌資料。 |
| `Development/Source/Public-Web/v1/src/lib/` | Gesture and sharing helpers. / 手勢與分享輔助程式。 |
| `Development/Source/Public-Web/v1/public/` | Source-side public artwork. / Source 端公開卡圖。 |
| `Development/Source/Public-Web/v1/public/assets/` | Versioned public asset sources. / 版本化公開素材 source。 |
| `Development/Source/Public-Web/v1/public/assets/cards/` | Owned public v1 WebP artwork. / 自有公開 v1 WebP 卡圖。 |
| `Development/Automation/` | Deterministic project automation. / 可重現的專案自動化。 |
| `Development/Automation/Scripts/` | Node extraction, PWA finalization, and standalone/public exporters. / Node 抽取、PWA finalization 與輸出程式。 |
| `Development/Automation/Tools/` | PowerShell v16 build and loopback server helpers. / PowerShell v16 建置與本機 server 工具。 |
| `Development/Tests/` | Repository and release contract validators. / Repository 與 release 合約驗證。 |
| `Development/Documentation/` | Product, architecture, animation, content, design, and implementation documents. / 產品、架構、動畫、內容、設計與實作文件。 |
| `Development/Documentation/designs/` | Approved design decisions. / 已核准設計決策。 |
| `Development/Documentation/plans/` | Testable implementation plans. / 可驗證的實作計畫。 |
| `Development/Governance/` | Maintainer and Agent governance. / 維護者與 Agent 治理。 |
| `Development/Governance/Meta/` | Purpose, roadmap, handoff, blueprints, and changelog. / 目的、roadmap、handoff、blueprints 與 changelog。 |
| `Development/Governance/Agent/` | Agent workspace entry point. / Agent workspace 入口。 |
| `Development/Governance/Skills/` | Project-specific reusable Skill packages and index. / 專案專用可重用 Skill 與索引。 |
| `Development/Human-References/` | Human-readable system maps, quick fixes, and retained handoff pages. / 人類可讀系統圖、快速修復與保留 handoff 頁面。 |
| `Development/Human-References/dashboards/` | Standalone visual reference dashboards. / 獨立視覺參考 dashboard。 |
| `Development/Pending/` | Recoverable buffer for failed or undecided artifacts. / 失敗或待判斷內容的可回復緩衝區。 |
| `.github/workflows/` | CI verification and GitHub Pages deployment definitions. / CI 驗證與 GitHub Pages 部署定義。 |

Generated `node_modules/`, `coverage/`, and temporary build directories inherit the purpose of their parent source project and are not maintained as repository structure.

生成的 `node_modules/`、`coverage/` 與暫存 build 目錄沿用父 source 專案用途，不視為人工維護的 repository 結構。

## Common Tasks / 常用工作

```powershell
# Open the preserved desktop product
.\Open Truth and Dare.cmd

# Validate the complete repository
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1

# Work on the maintainable app
Set-Location Development/Source/Main-App
npm run typecheck
npm run lint
npm test
npm run build:standalone
```

## Rules for New Content / 新內容規則

1. Put usable releases in `Apps/`, reusable source materials in `Assets/`, and all work-in-progress material in `Development/`.
2. Add or update a local `README.md` when an organizational directory changes responsibility.
3. Update this guide whenever a repository-controlled directory is added, moved, renamed, or retired.
4. Never overwrite a preserved/generated version; create the next numbered version.
5. Never permanently delete uncertain project content; move it to `Development/Pending/` and update its index.
