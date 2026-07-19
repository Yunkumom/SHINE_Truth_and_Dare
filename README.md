# Truth and Dare

Truth and Dare is the governed repository for **Encounter Cards**, a bilingual, iPhone-first conversation card game. Encounter Cards v17 is the maintainable React/TypeScript release; v15 and v16 remain preserved rollback releases.

Truth and Dare 是雙語、iPhone 優先的對話卡牌遊戲 **相遇卡 Encounter Cards** 的治理型 repository。v17 是可維護的 React／TypeScript release；v15 與 v16 保留為 rollback releases。

## Start Here / 從這裡開始

- Open [GUIDE.md](GUIDE.md) for the complete annotated directory map. / 完整資料夾用途請先閱讀 `GUIDE.md`。
- Double-click `Open Truth and Dare.cmd` to run the preserved desktop product. / 雙擊啟動器執行保留的桌面產品。
- Current source: `Development/Source/Main-App/src/`
- Current PWA build: `Development/Source/Main-App/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v17.html`
- Public v1 source: `Development/Source/Public-Web/v1/`
- Public v1 output: `Apps/Public-Web/v1/`

## Clean Root Structure / 精簡根目錄

```text
Truth and Dare/
├── Apps/          # Completed and usable products / 完成且可用的產品
├── Assets/        # Reusable resources and catalogues / 可重用素材與目錄
├── Development/   # Source, tools, tests, docs, and work history / 原始碼、工具、測試、文件與歷史
├── GUIDE.md
├── README.md
├── AGENTS.md
├── Open Truth and Dare.cmd
└── .github/
```

`Apps/` contains runnable or deployable products. `Assets/` contains reusable resources plus licence and provenance records. `Development/` contains everything used to create, verify, document, and maintain the products.

`Apps/` 保存可執行或可部署成品；`Assets/` 保存可重用素材及授權與來源；`Development/` 保存所有建立、驗證、文件化與維護產品時使用的內容。

## Development / 開發

From `Development/Source/Main-App/`:

```powershell
npm run dev
npm run typecheck
npm run lint
npm test
npm run build:standalone
```

Validate the complete repository from the project root:

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Product Contract / 產品合約

- Chinese, English, and bilingual modes / 中文、英文與雙語
- Truth, Dare, and Surprise modes / 真心話、小挑戰與隨機
- Familiarity Levels 1–5, including an 18+ Level 5 / 熟識程度 Level 1–5，包含 18+ Level 5
- Mobile drag, flip, discard, PNG, and share/download behavior / 行動拖曳、翻牌、丟棄、PNG 與分享／下載
- iPhone Pro Max 430 × 932 primary layout and a centered 430 px desktop frame / iPhone Pro Max 430 × 932 主要版面與桌面 430 px 置中框

## Version Rules / 版本規則

- `Apps/Standalone/encounter_cards_v15.html` is the immutable executable baseline.
- Existing v16 and v17 release outputs are not hand-edited.
- Build v16 only with `Development/Automation/Tools/build_v16.ps1`.
- Maintain v17 only through `Development/Source/Main-App/`.
- After public v1 publication, create matching source/output `v2`, `v3`, and later directories rather than overwriting v1.
- Direct `file://` execution is unsupported; use the launcher or loopback server helper.

## Privacy / 隱私

The packaged application has no account or product backend. Names, contacts, birthdays, notes, answers, and adult-content choices are privacy-sensitive and must not be transmitted, logged, or added to public documentation. Only language and font-scale preferences may persist locally.

封裝應用沒有帳號或產品後端。姓名、聯絡方式、生日、留言、答案與成人內容選擇皆屬隱私敏感資料，不得傳輸、記錄或加入公開文件。只有語言與字體比例偏好可保存在本機。

The owner-private blueprint under `Development/Governance/Meta/` remains local-only and excluded from Git.

