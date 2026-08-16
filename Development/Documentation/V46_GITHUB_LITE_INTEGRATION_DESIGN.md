# V46 GitHub Lite Integration Design / V46 GitHub Lite 整合設計

## Outcome / 成果

Promote the supplied `SHINE_Truth_and_Dare_v46_GitHub_Lite/` package as the authoritative current Encounter Cards v46 application without rewriting immutable v15–v39 releases. The current product becomes a multi-route Sites/Vinext application; v39 remains the latest standalone fallback.

將提供的 `SHINE_Truth_and_Dare_v46_GitHub_Lite/` 套件升級為目前權威的 Encounter Cards v46 應用，同時不改寫 v15–v39 不可變 releases。目前產品改為多路由 Sites／Vinext 應用；v39 保留為最新 standalone 備援。

## Structure / 結構

- Preserve the supplied package byte-for-byte under `_pending/SHINE_Truth_and_Dare_v46_GitHub_Lite_2026-08-16/` and register its inventory digest in `_pending/index.md`.
- Create the governed active source at `Development/Source/Main-App-v46/`.
- Keep `app/encounter/` as the authored game source and generate its browser artifact at `public/v46/`.
- Keep the Sites routes `/`, `/mobile`, and `/studio`; both framed routes load `/v46/index.html`.
- Keep `Development/Source/Main-App-v39/`, `Apps/Standalone/encounter_cards_v39.html`, and `Apps/Public-Web/v22/` unchanged.

- 將提供的套件逐位元保存於 `_pending/SHINE_Truth_and_Dare_v46_GitHub_Lite_2026-08-16/`，並在 `_pending/index.md` 登記 inventory digest。
- 在 `Development/Source/Main-App-v46/` 建立受治理的作用中 source。
- 保留 `app/encounter/` 作為人工維護的遊戲 source，並將瀏覽器成品生成至 `public/v46/`。
- 保留 Sites 路由 `/`、`/mobile` 與 `/studio`；兩個框架路由均載入 `/v46/index.html`。
- `Development/Source/Main-App-v39/`、`Apps/Standalone/encounter_cards_v39.html` 與 `Apps/Public-Web/v22/` 維持不變。

## Version and provenance / 版本與來源紀錄

The folder name and authored encounter HTML already identify the intake as v46, while wrapper labels, package metadata, storage keys, exports, and the imported browser directory still contain v40 or v41 identifiers. The preserved intake records that history. The governed source normalizes user-visible, persistent, export, package, and route identifiers to v46; inherited CSS class names such as `v40-shell` may remain implementation-only compatibility selectors.

資料夾名稱與人工維護的 encounter HTML 已將 intake 標示為 v46，但 wrapper 標籤、package metadata、storage keys、exports 與匯入的瀏覽器目錄仍包含 v40 或 v41 識別。保存的 intake 會記錄這段歷史；受治理 source 則將使用者可見、持久化、匯出、package 與 route 識別統一為 v46。`v40-shell` 等繼承 CSS class 可保留為僅供實作相容的 selector。

## Privacy and capability boundary / 隱私與能力邊界

- Retain only the existing local language, font-scale, layout, and presentation preferences.
- Keep names, contacts, birthdays, answers, custom questions, uploads, and adult-content choices in memory only.
- Do not activate authentication, accounts, D1, analytics, telemetry, or backend persistence.
- Omit the unused ChatGPT-auth helper, D1 example/schema, Drizzle configuration, and related dependencies from the active v46 line. They remain recoverable in the preserved intake.
- Keep `.openai/hosting.json` with `d1` and `r2` disabled; do not publish or modify external hosting in this integration.

- 僅保留既有本機語言、字級、版面與呈現偏好。
- 姓名、聯絡方式、生日、答案、自訂問題、上傳內容與成人內容選擇只存在記憶體。
- 不啟用 authentication、帳號、D1、analytics、telemetry 或 backend persistence。
- 作用中 v46 不納入未使用的 ChatGPT-auth helper、D1 example/schema、Drizzle 設定及相關 dependencies；它們仍可由保存的 intake 回復。
- `.openai/hosting.json` 的 `d1` 與 `r2` 維持停用；本次整合不發布或修改外部 hosting。

## Build, launch, and failure behavior / 建置、啟動與失敗行為

- A v46 encounter build must finish before the Sites/Vinext build so the wrapper cannot ship a stale `/v40/` artifact.
- The generated service worker must precache the complete generated v46 encounter artifact and use a v46 cache name.
- The root launcher advances to the local v46 development server. If locked dependencies are absent, it restores them with `npm ci`; a failed install or build stops with a non-zero status.
- v39 remains directly recoverable as the immutable fallback if v46 cannot be built.

- v46 encounter build 必須先於 Sites／Vinext build 完成，避免 wrapper 發布過期的 `/v40/` artifact。
- 生成的 service worker 必須預快取完整 v46 encounter artifact，並使用 v46 cache name。
- 根層 launcher 改為本機 v46 development server；若缺少鎖定 dependencies，使用 `npm ci` 還原；安裝或建置失敗時以非零狀態停止。
- 若 v46 無法建置，v39 仍可直接作為不可變備援回復。

## Verification / 驗證

Verification must prove: the preserved intake digest matches; immutable v39 outputs are untouched; v46 wrapper and encounter identities are consistent; `/v46/` exists; no active auth/database capability remains; all 42 governed artworks and 62 SHINE question-book records remain present; the encounter build, Sites build, lint, rendered-route tests, v46 validator, and repository validator complete or are reported with an explicit platform limitation.

驗證必須證明：保存的 intake digest 相符；不可變 v39 outputs 未變；v46 wrapper 與 encounter 識別一致；`/v46/` 存在；作用中版本不含 auth／database 能力；42 張受治理 artwork 與 62 筆 SHINE question-book 記錄仍完整；encounter build、Sites build、lint、rendered-route tests、v46 validator 與 repository validator 均完成，或明確記錄平台限制。
