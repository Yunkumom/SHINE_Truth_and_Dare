# V46 GitHub Lite Integration Plan / V46 GitHub Lite 整合計畫

## Constraints / 限制

- Writable scope: the supplied intake location, `_pending/`, `Development/Source/Main-App-v46/`, `Development/Tests/`, current governance/documentation files, and the root launcher.
- Prohibited: editing immutable v15–v39 release outputs, reading the owner-private blueprint, enabling accounts/backends/analytics, publishing, or deleting project content.
- Preserve at least the working v37, v38, and v39 lines before creating v46. Published historical source lines are release history, not disposable working snapshots.
- Keep the original v40/v41 identifiers in the preserved intake as provenance; normalize the governed active line only.

- 可寫入範圍：提供的 intake 位置、`_pending/`、`Development/Source/Main-App-v46/`、`Development/Tests/`、目前治理／文件檔案與根層 launcher。
- 禁止：修改 v15–v39 不可變 release outputs、讀取 owner-private blueprint、啟用帳號／backend／analytics、發布或刪除專案內容。
- 建立 v46 前至少保留可用的 v37、v38 與 v39。已發布歷史 source lines 屬於 release history，不是可丟棄的工作快照。
- 保存 intake 內原始 v40／v41 識別作為 provenance；只統一受治理的作用中版本。

## Task 1 — Establish a failing v46 contract / 建立失敗中的 v46 合約

Create `Development/Tests/validate_v46.mjs` to require the canonical v46 source, v46 routes/labels/storage/export names, generated `public/v46/`, disabled hosting storage, 42 artwork files, 62 SHINE records, preserved intake, and absence of active auth/D1/Drizzle modules. Run it before promotion and require a non-zero RED result caused by the missing canonical source.

建立 `Development/Tests/validate_v46.mjs`，要求正式 v46 source、v46 routes／標籤／storage／export 名稱、生成的 `public/v46/`、停用的 hosting storage、42 張 artwork、62 筆 SHINE records、保存的 intake，以及作用中版本不含 auth／D1／Drizzle 模組。升級前先執行，並確認因正式 source 尚不存在而得到非零 RED 結果。

Evidence: validator output identifies `Development/Source/Main-App-v46/` as missing.

## Task 2 — Preserve intake and promote source / 保存 intake 並升級 source

Compute a deterministic SHA-256 inventory digest for the supplied folder. Copy the package into `Development/Source/Main-App-v46/`, then move the original folder without content changes to `_pending/SHINE_Truth_and_Dare_v46_GitHub_Lite_2026-08-16/`. Register the archive and digest in `_pending/index.md`. Confirm v37–v39 still exist.

計算提供資料夾的 deterministic SHA-256 inventory digest。將套件複製至 `Development/Source/Main-App-v46/`，再把原始資料夾不改內容移至 `_pending/SHINE_Truth_and_Dare_v46_GitHub_Lite_2026-08-16/`。在 `_pending/index.md` 登記 archive 與 digest，並確認 v37–v39 仍存在。

Evidence: archive digest matches the pre-move value; the active and archived inventories initially match.

## Task 3 — Normalize and harden the active v46 line / 統一並強化作用中 v46

Update package and lockfile identity to v46. Normalize wrapper, game, export, storage, manifest, service-worker, and route identifiers to v46. Generate the encounter artifact at `public/v46/`. Remove the development preview marker. Exclude `app/chatgpt-auth.ts`, `db/`, `examples/d1/`, `drizzle/`, `drizzle.config.ts`, Drizzle dependencies/scripts, and the unused Worker DB binding from the active line only. Keep `d1` and `r2` null.

將 package 與 lockfile identity 更新為 v46。統一 wrapper、game、export、storage、manifest、service-worker 與 route 識別為 v46，並在 `public/v46/` 生成 encounter artifact。移除 development preview marker。只從作用中版本排除 `app/chatgpt-auth.ts`、`db/`、`examples/d1/`、`drizzle/`、`drizzle.config.ts`、Drizzle dependencies／scripts 與未使用的 Worker DB binding；`d1` 與 `r2` 維持 null。

Evidence: targeted searches find no active account/database imports and no user-facing V40 labels; implementation-only inherited CSS selectors are documented exceptions.

## Task 4 — Build and test the promoted application / 建置並測試升級後應用

Restore dependencies from `package-lock.json`. Run the encounter build, finalize its complete precache, build the Sites artifact, run lint, and run Node tests. Update rendered-route tests to assert v46 metadata/routes, the 62-question contract, and the absence of the temporary preview marker.

依 `package-lock.json` 還原 dependencies。執行 encounter build、完成完整 precache、建置 Sites artifact、執行 lint 與 Node tests。更新 rendered-route tests，驗證 v46 metadata／routes、62-question 合約及暫時 preview marker 已移除。

Evidence: commands exit zero; generated `public/v46/index.html` references existing hashed JS/CSS assets; Sites artifact validation passes.

## Task 5 — Advance governance and launcher / 推進治理文件與 launcher

Update `README.md`, `GUIDE.md`, `AGENTS.md`, `Development/README.md`, `Development/Documentation/README.md`, `PRODUCT_SPEC.md`, `ARCHITECTURE.md`, `_meta/handoff.md`, `_meta/roadmap.md`, `_meta/changelog.md`, `_meta/public_blueprint.md`, `HANDOFF.md`, `index.md`, `guide.html`, and `Open Truth and Dare.cmd` where their current-version contract changes. Keep v39 documented as the immutable standalone fallback.

在 current-version 合約受影響之處更新 `README.md`、`GUIDE.md`、`AGENTS.md`、`Development/README.md`、`Development/Documentation/README.md`、`PRODUCT_SPEC.md`、`ARCHITECTURE.md`、`_meta/handoff.md`、`_meta/roadmap.md`、`_meta/changelog.md`、`_meta/public_blueprint.md`、`HANDOFF.md`、`index.md`、`guide.html` 與 `Open Truth and Dare.cmd`。v39 繼續記錄為不可變 standalone 備援。

Evidence: no current-state document still calls v39 the active authored application; immutable-release statements remain intact.

## Task 6 — Regression, review, and commit / 回歸、審查與 commit

Run `Development/Tests/validate_v46.mjs`, the v46 package tests/build/lint, and `Development/Tests/validate_repository.ps1`. If PowerShell is unavailable on macOS, record that exact limitation and perform bounded static inspection of the validator without claiming it ran. Review the relevant diff for privacy, version consistency, immutable-output changes, generated artifacts, and unexpected files. Establish local Git metadata only if no repository exists, stage only the integration scope, and commit the main-program integration locally; do not add a remote or push.

執行 `Development/Tests/validate_v46.mjs`、v46 package tests／build／lint 與 `Development/Tests/validate_repository.ps1`。若 macOS 無 PowerShell，明確記錄此限制，並對 validator 進行有限靜態檢查，不宣稱已執行。審查相關 diff 的隱私、版本一致性、不可變 output 變更、生成成品與非預期檔案。只有在 repository 不存在時才建立本機 Git metadata，只 stage 整合範圍並在本機 commit 主程式整合；不新增 remote、不 push。

Evidence: final validator/test outputs are fresh, `git status` shows only known unstaged legacy content if a new repository was necessary, and the integration commit hash is recorded.
