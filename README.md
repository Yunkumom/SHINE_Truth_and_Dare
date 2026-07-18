# Truth and Dare

Truth and Dare is the governed repository for **Encounter Cards**, a bilingual mobile-first conversation card game. The current executable baseline is Encounter Cards v15, preserved as a standalone packaged HTML application.

Truth and Dare 是雙語、行動裝置優先的對話卡牌遊戲 **相遇卡 Encounter Cards** 的治理型 repository。目前可執行基準為 Encounter Cards v15，並以獨立封裝 HTML 完整保存。

## Status / 狀態

- Product baseline: `app/encounter_cards_v15.html`
- Baseline integrity: byte-identical to the supplied v15 artifact
- Source form: packaged ViNext/React HTML, not the original modular TypeScript source tree
- Repository: local Git on `main`; no commit, remote, or deployment

- 產品基準：`app/encounter_cards_v15.html`
- 基準完整性：與提供的 v15 檔案逐位元相同
- 原始碼形式：ViNext／React 封裝 HTML，不是原始模組化 TypeScript source tree
- Repository：本機 Git `main`；尚無 commit、remote 或部署

## Quick Start / 快速開始

Open `app/encounter_cards_v15.html` in a modern browser. The application contains its runtime, card data, styles, and images in one file; no package installation or environment variable is required.

使用現代瀏覽器開啟 `app/encounter_cards_v15.html`。應用程式的 runtime、卡牌資料、樣式與圖片都包含在單一檔案中，不需安裝套件或設定環境變數。

Validate the repository from PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File tests/validate_repository.ps1
```

## Product Features / 產品功能

- Chinese, English, and bilingual presentation / 中文、英文與雙語顯示
- Truth, Dare, and Surprise card modes / 真心話、小挑戰與隨機抽卡
- Five familiarity levels, including an 18+ Level 5 / 五個熟識等級，包含 18+ Level 5
- Player names and optional contact fields / 玩家姓名與選填聯絡方式
- Mobile drag, flip, and discard-oriented card experience / 行動裝置拖曳、翻牌與丟棄導向的卡牌體驗
- Adjustable text size and language preferences / 可調整文字大小與語言偏好
- PNG card creation with Web Share and download fallback / PNG 卡片生成、Web Share 與下載備援

## Folder Guide / 資料夾導覽

- `app/`: immutable versioned executable product baselines / 不可覆寫的版本化產品執行基準
- `docs/`: product, architecture, animation, card-content, design, and implementation documentation / 產品、架構、動畫、卡牌內容、設計與執行文件
- `_meta/`: purpose, roadmap, handoff, reconstruction blueprints, and change history / 目的、路線圖、交接、重建藍圖與變更紀錄
- `_agent/`: Agent workspace index / Agent 工作區索引
- `skills/`: project Skill index; no active project Skills yet / 專案 Skill 索引，目前沒有作用中 Skill
- `_human/`: human-facing supporting outputs, including the Agent handoff reference / 人類可讀支援成果，包含 Agent 交接參考
- `_pending/`: human-review buffer; Agents never permanently delete project content / 人工審查緩衝區，Agent 不得永久刪除專案內容
- `tests/`: deterministic repository validation / 可重複執行的 repository 驗證

## Privacy / 隱私

The packaged application contains no backend or account integration. Static inspection found browser-local preference keys for language and font scale. Names, contact fields, and notes must not be transmitted or added to public documentation. `_meta/owner_private_blueprint.md` is local-only and excluded from Git.

封裝應用程式沒有後端或帳號整合。靜態檢查發現語言與字體比例的瀏覽器本機偏好 key。姓名、聯絡欄位與留言不得傳輸或加入公開文件。`_meta/owner_private_blueprint.md` 僅供本機使用並由 Git 排除。

## Important Source Limitation / 重要原始碼限制

v15 is a reproducible executable artifact, but maintainable feature development requires recovery or reconstruction of modular React/TypeScript source. Do not edit the 11.7 MB packaged file in place; create a new version or an approved modular-source migration.

v15 是可重現的執行產物，但可維護的功能開發仍需取回或重建模組化 React／TypeScript 原始碼。不要直接修改 11.7 MB 封裝檔；應建立新版本或經核准的模組化 source migration。

