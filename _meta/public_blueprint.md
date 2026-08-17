# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around the active v46 Sites/Vinext application while preserving immutable standalone v15–v39, the latest v39 standalone fallback, reusable artwork masters, and recoverable development history.

以作用中的 v46 Sites／Vinext 應用為中心重建 repository，同時保留不可變 standalone v15–v39、最新 v39 standalone 備援、可重用 artwork masters 與可回復開發歷史。

## Canonical Structure / 正式結構

```text
Truth or Dare/
├── Apps/Standalone/                         # immutable v15–v39 releases
├── Apps/Public-Web/v2/ … /v22/              # immutable published fallbacks
├── Assets/Catalog/  Assets/Deities/  Assets/Zodiac/
├── Development/
│   ├── Source/Main-App-v18/ … /v39/         # preserved source lines
│   ├── Source/Main-App-v46/                 # current Sites/Vinext source
│   │   ├── app/encounter/                   # authored encounter source
│   │   ├── public/v46/                      # generated encounter PWA
│   │   └── dist/                            # generated Sites Worker artifact
│   ├── Source/Public-Web/v2/ … /v22/        # preserved public recipes
│   ├── Automation/                          # preserved standalone tooling
│   ├── Tests/validate_v46.mjs               # current v46 contract
│   └── Documentation/                       # product designs and plans
├── _meta/  _agent/  _human/
├── _pending/                                # preserved intake and recoverable history
├── firebase.json  .firebaserc               # Firebase sandbox/share hosting targets
├── GUIDE.md  README.md  AGENTS.md
└── Open Truth and Dare.cmd
```

The owner-private blueprint remains local-only and ignored. Proposed deletions first enter `_pending/` and `_pending/index.md`.

## Current Runtime / 目前 Runtime

```text
Open Truth and Dare.cmd
  -> npm ci when locked dependencies are absent
  -> npm run build:encounter
  -> Vite/Vinext on http://127.0.0.1:8765/
  -> /mobile or /studio
  -> /v46/index.html
```

v46 uses a Sites/Vinext entry page, mobile route, and desktop studio around one generated encounter PWA. It preserves the 42 governed artwork faces, adds the 62-question SHINE book supplied by the intake, and retains bilingual modes, Levels 1–5, Truth/Dare/Surprise, consent, card library, artwork adjustment, direct keepsake, PNG share/download, and offline behavior.

Allowed local keys are `encounter-language`, `encounter-font-scale`, `encounter-layout-v46`, and `encounter-presentation-v46`. Layout and presentation contain non-personal geometry and visual settings only. Personal fields, uploads, custom questions, disabled states, exact choices, and adult-content choices remain session-only. Authentication, accounts, D1, R2, analytics, telemetry, and backend persistence are not active product capabilities.

v46 使用 Sites／Vinext 入口、手機 route 與電腦工作室包覆同一個生成 encounter PWA。它保留 42 張受治理 artwork，加入 intake 提供的 62 題 SHINE 題庫，並維持雙語模式、Level 1–5、真心話／小挑戰／隨機、同意、卡庫、圖片調整、直接紀念卡、PNG 分享／下載及離線行為。

允許的 local keys 為 `encounter-language`、`encounter-font-scale`、`encounter-layout-v46` 與 `encounter-presentation-v46`。Layout／presentation 僅含非個人幾何與視覺設定；個人欄位、uploads、自訂問題、停用狀態、指定選擇與成人內容選擇只存在 session。Authentication、帳號、D1、R2、analytics、telemetry 與 backend persistence 不是作用中產品能力。

## Reconstruction / 重建

1. Restore the canonical root entries documented in `GUIDE.md`.
2. Restore immutable standalone v15–v39, v16 runtime assets, and Public Web v2–v22.
3. Restore `Development/Source/Main-App-v46/`, including its authored `app/encounter/`, package lock, build scripts, `.openai/hosting.json`, generated `public/v46/`, and v46 validator/design/plan.
4. Restore the governed v30 deity, v33 classic-zodiac, and v34 Local Stories masters; retain v37–v39 as immediate working fallbacks and earlier source lines as release history.
5. Preserve the original v46 intake at `_pending/SHINE_Truth_and_Dare_v46_GitHub_Lite_2026-08-16/` with the digest recorded in `_pending/index.md`.
6. Run `npm ci`, `npm test`, and `npm run lint` in `Development/Source/Main-App-v46/`.
7. Run `node Development/Tests/validate_v46.mjs` and `Development/Tests/validate_repository.ps1` where PowerShell is available.
8. Restore `firebase.json` and `.firebaserc` to publish the static `public/v46/` PWA to the dedicated `shine-sandbox-lab` and `shine-share-lab` hosting sites.
9. Run `Open Truth and Dare.cmd` for the current Windows desktop experience. Use `Apps/Standalone/encounter_cards_v39.html` through the preserved loopback helper only as fallback.
10. Create a new versioned source for behavior changes after v46. Do not overwrite v15–v39 releases or the preserved intake.

Canonical repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare` (legacy external identifier retained for compatibility). Current v46 deployments are recorded in `_meta/handoff.md`.
