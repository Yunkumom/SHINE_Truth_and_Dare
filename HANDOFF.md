# Truth or Dare Handoff / 真心話大冒險交接

Read only this file after `AGENTS.md` unless the current task needs a specific version or library asset.

閱讀 `AGENTS.md` 後，一般只需閱讀本檔；只有目前任務需要時，才進一步讀取特定版本或素材。

## Release state / 版本狀態

<!-- RELEASE_STATE:START -->
- Work in progress / 開發中: `v47`
- Latest verified / 最新驗證版: `v46`
- Previous verified / 前一驗證版: `v39`
<!-- RELEASE_STATE:END -->

The root launchers read `Versions/releases.json` and open v46. They must not open v47 until its complete validation succeeds and its release record receives a verified public URL.

根目錄啟動器讀取 `Versions/releases.json` 並開啟 v46。v47 完整驗證成功且 release record 具有已驗證公開 URL 前，不得由一般啟動器開啟。

## Working surface / 工作介面

- `Versions/v47/`: question-first tactical battle WIP; existing owner work is preserved.
- `Versions/v46/`: current verified Sites/Vinext application with 42 artworks and the 62-question SHINE book.
- `Versions/v39/`: verified standalone/public fallback.
- `Library/index.html`: clickable gallery for all 42 governed master images.
- `Library/Questions/SHINE_QUESTION_BOOK.md`: canonical owner-supplied question document.
- `_pending/repository-simplification_2026-08-18/`: recoverable pre-simplification structure and inventory.

## Owner requirements and documentation contract / 擁有者需求與文件分工

`HANDOFF.md` is the canonical home for consolidated, approved owner requirements and continuation instructions; write them as explicit, ordered, testable steps detailed enough for a weaker model to execute without guessing. `AGENTS.md` is reserved for foundational operating steps, safety rules, reading order, model gates, repository structure, and response conventions rather than feature-specific requests.

`HANDOFF.md` 是整理後且已核准之擁有者需求與後續執行指示的標準位置；內容必須明確、有順序、可驗證，並詳細到較弱模型也能在不猜測的情況下執行。`AGENTS.md` 僅保留基礎操作步驟、安全規則、閱讀順序、模型閘門、repository 結構與回覆規範，不記錄個別功能需求。

Use the strongest available model for owner design discussions. After approval, record the decision and a complete implementation sequence here so execution can be delegated to a less capable model while preserving intent, constraints, exact files, checks, and upgrade conditions.

與擁有者進行設計討論時使用目前最強模型。核准後，將決策與完整實作順序記錄於此，使能力較弱的模型仍能保留意圖、限制、精確檔案、檢查方式與升級條件來執行。

### Approved Taiwan food journey card requirement / 已核准的台灣美食旅行卡需求

Add a third v47 mobile experience containing 25 collectible, printable Taiwan food cards: five each for North, Central, South, East, and Offshore Islands, with a three-classic/two-local-discovery balance per region. Use an elegant illustrated travel-journal style, 63 × 88 mm and `aspect-ratio: 63 / 88`, bilingual regional and food labels, conservative sourced cultural notes, allergen labels, and all three party prompt types: Taste Talk, Food Dare, and Travel Surprise. The audience is consenting adults; optional spicy prompts must be clearly marked, hidden until group consent is enabled, and always skippable without penalty. The feature must work offline, keep all play state in memory, print all 25 front/back pairs, use original governed artwork with Library-to-runtime provenance, and add no named-shop endorsements, analytics, accounts, telemetry, backend calls, persistent personal data, forced eating/drinking, or privacy-sensitive inputs. The approved design is `Versions/v47/docs/designs/2026-08-19-taiwan-food-journey-cards.md`; the approved execution plan is `Versions/v47/docs/plans/2026-08-19-taiwan-food-journey-cards.md`.

新增第三個 v47 手機體驗，包含 25 張可收藏與列印的台灣美食卡：北部、中部、南部、東部、離島各五張，且每區採三張經典與兩張地方私房味的比例。採精緻插畫旅行誌風格、63 × 88 mm 與 `aspect-ratio: 63 / 88`，提供雙語地區及料理名稱、保守且有來源的文化短文、過敏原標示，以及「味覺真心話」、「美食小挑戰」、「旅行驚喜」三種派對題型。對象為彼此同意的成人；可選辛辣題目必須清楚標示、僅在全員同意後顯示，並可無須受罰地跳過。功能必須離線運作、所有遊玩狀態只留在記憶體、可列印全部 25 張正反面卡、使用具 Library-to-runtime 來源追溯的原創受治理圖像，且不得加入特定店家背書、analytics、accounts、telemetry、backend calls、個人資料持久保存、強迫飲食或隱私敏感輸入。已核准設計位於 `Versions/v47/docs/designs/2026-08-19-taiwan-food-journey-cards.md`；已核准執行計畫位於 `Versions/v47/docs/plans/2026-08-19-taiwan-food-journey-cards.md`。

Implementation state on 2026-08-19: the third home entry, 25 sourced cards, five region filters, three prompt types, consent-gated spicy copy, non-repeating memory-only regional draws, keyboard-accessible front/back cards, paired print deck, 3 mm bleed and 4 mm safe area, responsive 63:88 layout, and original governed artwork are implemented in v47. The art master is `Library/Images/Food/Taiwan/taiwan-food-journey-master-v47.png`; the 453,560-byte runtime derivative is `Versions/v47/app/encounter/assets/taiwan-food-journey-v47.webp`, with prompt, hashes, and provenance in the adjacent README and manifest. Fresh focused contracts passed 4/4; `npm run lint` passed with zero errors and 10 `<img>` warnings, including two in the new offline image component; `npm run build:encounter` passed and finalized 51 precache URLs. In-app browser checks at 430 × 932 and 430 × 760 showed correct front/back and consent states, five unique Central draws before cycling, no browser warnings or errors, and a 404 × 564.3125 px short-screen card at ratio 0.715915. Full `npm run test:v47` remained red at 22/25 only on three unrelated WIP failures: battle guard expected 30 but received 27, `QuickDeckSelector` is not integrated in `App.tsx`, and `db/schema.ts` is absent. `node Versions/validate-repository.mjs` retained the known unrelated failure because `_pending/repository-simplification_2026-08-18/inventory.sha256` is absent; `git diff --check` passed. Physical printing, physical iPhone, PowerShell, backend, and online publication were not run.

2026-08-19 實作狀態：v47 已完成首頁第三入口、25 張有來源的卡片、五個地區篩選、三種題型、須經同意才顯示的辛辣內容、地區內不重複且僅存在記憶體的抽卡、可用鍵盤操作的正反面卡、成對列印牌組、3 mm 出血與 4 mm 安全區、響應式 63:88 版面，以及原創受治理圖像。圖像 master 為 `Library/Images/Food/Taiwan/taiwan-food-journey-master-v47.png`；453,560-byte runtime derivative 為 `Versions/v47/app/encounter/assets/taiwan-food-journey-v47.webp`，相鄰 README 與 manifest 記錄 prompt、hash 與 provenance。最新聚焦合約以 4/4 通過；`npm run lint` 以零錯誤與 10 項 `<img>` 警告通過，其中兩項位於新的離線圖片 component；`npm run build:encounter` 通過並完成 51 個 precache URL。In-app browser 在 430 × 932 與 430 × 760 的檢查顯示正反面與同意狀態正確、中部五張在循環前皆不重複、沒有 browser warning 或 error，短畫面卡片為 404 × 564.3125 px、比例 0.715915。完整 `npm run test:v47` 仍以 22/25 呈現 RED，僅有三項無關 WIP 失敗：battle guard 預期 30 但得到 27、`QuickDeckSelector` 尚未整合至 `App.tsx`，以及缺少 `db/schema.ts`。`node Versions/validate-repository.mjs` 仍保留既知且無關的失敗，因 `_pending/repository-simplification_2026-08-18/inventory.sha256` 不存在；`git diff --check` 通過。實體列印、實體 iPhone、PowerShell、backend 與 online publication 未執行。

### Approved direct-keepsake preview requirement / 已核准的直接製作紀念卡預覽需求

The preview card must be as large as the 430 × 932 mobile content area permits because the phone screen is small, but neither the card nor its artwork may be distorted. The approved implementation uses the full inner width, preserves `aspect-ratio: 63 / 88`, keeps artwork at `object-fit: cover` with the existing position and zoom controls, and scrolls vertically when a short viewport cannot show the full card and controls together.

由於手機螢幕較小，預覽卡片必須在 430 × 932 手機內容區允許的範圍內盡量放大，但卡片與圖片都不得變形。已核准實作會使用內容區完整寬度、保留 `aspect-ratio: 63 / 88`、維持圖片的 `object-fit: cover` 與既有位置及縮放控制，並在較矮視窗無法同時顯示完整卡片與控制項時改用垂直捲動。

Continuation steps for a weaker model:

1. Read `AGENTS.md`, then this `HANDOFF.md`, then only `Versions/v47/app/encounter/styles/v40.css`, `Versions/v47/tests/v47-contract.test.mjs`, and the two `2026-08-19-direct-keepsake-preview-*.md` files under `Versions/v47/docs/` unless a failing check identifies another necessary file.
2. Preserve `.direct-keepsake-preview { width: 100%; height: auto; aspect-ratio: 63 / 88; }`; do not restore the former `355px` cap or add a height rule that compresses the ratio.
3. Preserve `.direct-keepsake-canvas` vertical scrolling and the content-sized `.direct-keepsake-content`; short screens must scroll instead of squeezing the preview.
4. Preserve `.direct-keepsake-image img` and `.card-artwork-viewport img` crop, position, zoom, and transform-origin behavior; `object-fit: cover` crops but does not stretch the source image.
5. Do not change `DirectKeepsake.tsx`, exported PNG dimensions, blessings, uploads, local share/download behavior, privacy boundaries, verified releases, analytics, storage, backend, or network behavior for this requirement.
6. Before claiming completion, run `cd Versions/v47 && npm run test:v47`, `cd Versions/v47 && npm run lint`, and repository-root `node Versions/validate-repository.mjs`; record browser, physical-iPhone, PowerShell, backend, or online checks as manual when they were not actually run.
7. Upgrade from a low-cost implementation model to the strongest model if the fixed ratio conflicts with another screen, a regression fails for an unexplained reason, or the requested change expands beyond this isolated layout contract.

較弱模型的後續執行步驟：

1. 先閱讀 `AGENTS.md`，再閱讀本 `HANDOFF.md`，接著僅閱讀 `Versions/v47/app/encounter/styles/v40.css`、`Versions/v47/tests/v47-contract.test.mjs`，以及 `Versions/v47/docs/` 內兩個 `2026-08-19-direct-keepsake-preview-*.md` 檔案；除非失敗檢查指出其他必要檔案，否則不要擴大讀取範圍。
2. 保留 `.direct-keepsake-preview { width: 100%; height: auto; aspect-ratio: 63 / 88; }`；不得恢復原本的 `355px` 上限，也不得加入會壓縮比例的高度規則。
3. 保留 `.direct-keepsake-canvas` 的垂直捲動與依內容延展的 `.direct-keepsake-content`；較矮螢幕必須捲動，而不是擠壓預覽。
4. 保留 `.direct-keepsake-image img` 與 `.card-artwork-viewport img` 的裁切、位置、縮放及 transform-origin 行為；`object-fit: cover` 只裁切而不拉伸來源圖片。
5. 此需求不得變更 `DirectKeepsake.tsx`、匯出 PNG 尺寸、祝福語、上傳、本機分享／下載行為、隱私邊界、已驗證版本、analytics、storage、backend 或 network 行為。
6. 宣告完成前，執行 `cd Versions/v47 && npm run test:v47`、`cd Versions/v47 && npm run lint`，以及 repository 根目錄的 `node Versions/validate-repository.mjs`；未實際執行的 browser、實體 iPhone、PowerShell、backend 或 online 檢查必須記為手動項目。
7. 若固定比例與其他畫面衝突、回歸測試因不明原因失敗，或需求擴大超出這項獨立版面合約，則從低成本實作模型升級至最強模型。

Fresh evidence from 2026-08-19: the focused direct-keepsake contract test passed; `npm run lint` passed with zero errors and seven pre-existing `<img>` warnings; `npm run build:encounter` passed; local browser measurements showed a 406 × 567.109 px preview at 430 × 932 with ratio 0.71591 (`63 / 88`), loaded artwork, and `object-fit: cover`; at 430 × 760 the preview retained the same dimensions and the canvas exposed an 842 px scroll height. The full `npm run test:v47` remains red on four unrelated WIP failures (battle guard expectation, question-only defaults, missing quick deck selector integration, and missing `db/schema.ts`), and `node Versions/validate-repository.mjs` remains red because `_pending/repository-simplification_2026-08-18/inventory.sha256` is absent. Physical-iPhone, PowerShell, backend, and online checks were not run.

2026-08-19 最新證據：直接製作紀念卡聚焦合約測試已通過；`npm run lint` 以零錯誤通過並保留七項既有 `<img>` 警告；`npm run build:encounter` 已通過；本機瀏覽器量測顯示在 430 × 932 下預覽為 406 × 567.109 px、比例 0.71591（`63 / 88`）、圖片成功載入且使用 `object-fit: cover`；在 430 × 760 下預覽維持相同尺寸，canvas 提供 842 px 捲動高度。完整 `npm run test:v47` 仍因四項無關的 WIP 問題而失敗（battle guard 預期值、question-only 預設值、quick deck selector 尚未整合，以及缺少 `db/schema.ts`），而 `node Versions/validate-repository.mjs` 仍因缺少 `_pending/repository-simplification_2026-08-18/inventory.sha256` 而失敗。實體 iPhone、PowerShell、backend 與 online 檢查未執行。

### Approved v47 mobile card experience / 已核准的 v47 手機卡片體驗

The following decisions are authoritative and must remain together; the detailed design and execution checklist are `Versions/v47/docs/designs/2026-08-19-approved-mobile-card-experience.md` and `Versions/v47/docs/plans/2026-08-19-approved-mobile-card-experience.md`.

以下決策具有優先效力且必須整體保留；詳細設計與執行清單位於 `Versions/v47/docs/designs/2026-08-19-approved-mobile-card-experience.md` 與 `Versions/v47/docs/plans/2026-08-19-approved-mobile-card-experience.md`。

1. Mode home uses the single compact headline `破冰遊戲選擇`; it removes the former eyebrow and explanatory sentence, keeps the heading close to the brand bar, and leaves vertical capacity for future modes.
2. Gameplay product branding is English-only `TRUTH OR DARE` in the mobile wordmark and card back; do not restore `相遇卡` or `ENCOUNTER CARDS` in those surfaces.
3. Direct keepsake preview uses 418 px at a 430 px viewport with 6 px safe margins, preserves `aspect-ratio: 63 / 88`, never stretches artwork, scrolls on short screens, and uses a continuous rounded edge with a subtle inset Taiwanese classical meander.
4. Direct keepsake title contains no `相遇紀念卡`; deity art uses `神祇名稱｜守護意義`, including exact examples `保生大帝｜健康守護` and `觀音｜慈悲守護`, while zodiac titles retain their governed artwork names.
5. `Versions/v47/app/encounter/lib/artwork-copy.ts` is the complete mapping for all 42 governed artworks; every artwork ID must have a unique short friendly humorous bilingual blessing and artwork selection must immediately select that artwork-linked blessing by default while preserving preset/custom overrides.
6. Live revealed cards show only the localized main question in the lower panel; no `真正的你`, prompt title, activity label, level/type marker, feature note, or blessing appears during play.
7. The physical deck exposes three underlying card edges; the top card follows upward movement with resistance and depth separation, springs back below threshold, commits and flips above threshold, and uses a short fade with no transform under `prefers-reduced-motion: reduce`.
8. Card-library and question-library changes remain drafts until the sticky footer action `儲存並套用`; `取消` or close discards them, saving applies only the changed card/question part to the currently revealed composition, and the settings panel closes.
9. The post-draw keepsake is a dedicated 430 px mobile editor focused on `今天的題目`, adds optional memory-only `回答關鍵字`, provides image adjustment, uses a single compact editable blessing, and retains `交換聯絡方式（選填）` as a collapsed-by-default single-column disclosure.
10. Post-draw name, image, question, blessing, and contact areas read as one seamless rounded card with a continuous Taiwanese meander and subtle hairline dividers; do not restore separate rectangular boxed sections or allow any control to exceed the viewport.
11. Local PNG/share includes the question, optional answer keywords, selected blessing, and explicitly included contacts; names, contacts, keywords, uploads, and answers remain component-memory/local-export data only with no backend, analytics, telemetry, account, or persistent storage.
12. Before changing this area, run the focused v47 contract tests first, preserve the 430 × 932 and privacy contracts, then run `npm run test:v47`, `npm run lint`, `npm run build:encounter`, and root `node Versions/validate-repository.mjs`; never promote or deploy v47 unless the owner separately requests it.

1. 模式首頁只使用精簡標題 `破冰遊戲選擇`；移除原本的上方眉標與說明句，標題靠近品牌列，並保留未來新增模式的垂直空間。
2. 手機品牌與卡背的遊戲產品名稱只顯示英文 `TRUTH OR DARE`；不得在這些介面恢復 `相遇卡` 或 `ENCOUNTER CARDS`。
3. 直接紀念卡在 430 px viewport 使用 418 px 寬度與左右各 6 px 安全距離，保留 `aspect-ratio: 63 / 88`、不得拉伸圖片、矮螢幕改用捲動，並使用連續圓角邊緣與內縮的台灣古典回紋。
4. 直接紀念卡標題不得出現 `相遇紀念卡`；神祇圖片使用 `神祇名稱｜守護意義`，精確例子包含 `保生大帝｜健康守護` 與 `觀音｜慈悲守護`，星座則保留受治理圖片名稱。
5. `Versions/v47/app/encounter/lib/artwork-copy.ts` 是全部 42 張受治理圖片的完整對照；每個圖片 ID 必須有獨一、簡短、友善、幽默且雙語的祝福語，選擇圖片時預設立即選中該圖片祝福，同時保留其他預設與自訂選項。
6. 遊戲翻開後的卡片下方只顯示依語言處理的主要題目；不得顯示 `真正的你`、題目小標、活動類型、等級／卡型、特色註記或祝福。
7. 實體牌堆露出三張下層卡片邊緣；最上層卡片隨上滑手勢帶阻力與景深分離，未達門檻回彈、超過門檻送出並翻面，且在 `prefers-reduced-motion: reduce` 下只做短暫淡化、不做 transform 動畫。
8. 卡庫與問題庫的變更在按下黏附底部的 `儲存並套用` 前都只屬草稿；`取消` 或關閉會捨棄草稿，儲存只把有變更的卡面／題目部分立即套用至目前已翻開卡片，然後關閉設定。
9. 抽卡後紀念卡是專用的 430 px 手機編輯器，以 `今天的題目` 為主，加入選填且僅記憶體保存的 `回答關鍵字`、提供圖片調整、只用一行精簡可編輯祝福，並保留預設收合、單欄的 `交換聯絡方式（選填）`。
10. 抽卡後的名稱、圖片、題目、祝福與聯絡區必須看起來是一張連續圓角卡片，外框為台灣古典回紋、內部分隔只用淡線；不得恢復分割的矩形方框，也不得讓控制項超出 viewport。
11. 本機 PNG／分享包含題目、選填回答關鍵字、所選祝福與明確勾選的聯絡資訊；名字、聯絡資訊、關鍵字、上傳與回答只能存在 component memory 與本機匯出流程，不得加入 backend、analytics、telemetry、帳號或持久儲存。
12. 修改這個區域前先執行聚焦 v47 合約測試，保留 430 × 932 與隱私合約，接著執行 `npm run test:v47`、`npm run lint`、`npm run build:encounter` 及根目錄 `node Versions/validate-repository.mjs`；除非擁有者另行要求，不得 promotion 或部署 v47。

Implementation evidence from 2026-08-19: six focused approved-experience contracts pass; lint passes with zero errors and ten `<img>` performance warnings; the encounter production build passes; and a real 430 × 932 browser run measured both direct and post-draw cards at 418 px wide with 6 px safe margins, direct ratio 0.715916 (`63 / 88`), `object-fit: cover`, no horizontal overflow, a collapsed contact disclosure, and zero captured browser console errors. Browser interaction also proved that selecting Guanyin left the current Mazu card unchanged before save and changed it to `觀音｜慈悲守護` only after `儲存並套用`. The full v47 suite reports 22 passes and three unrelated WIP failures: the existing battle guard expectation (`27 !== 30`), missing QuickDeckSelector integration, and missing battle client/schema files. Root validation still fails only because `_pending/repository-simplification_2026-08-18/inventory.sha256` is absent; `_pending` was not inspected or repaired. Physical-iPhone, PowerShell, backend, and online checks were not run, and this change was not deployed or promoted.

2026-08-19 實作證據：六項已核准體驗的聚焦合約全部通過；lint 以零錯誤通過並有十項 `<img>` 效能警告；encounter production build 通過；實際 430 × 932 瀏覽器檢查量得直接卡片與抽卡後卡片皆為 418 px 寬、左右安全距離各 6 px，直接卡片比例為 0.715916（`63 / 88`）、圖片使用 `object-fit: cover`、沒有水平溢出、聯絡交換預設收合，且瀏覽器 console 沒有擷取到錯誤。互動檢查也證明選擇觀音後，儲存前目前媽祖卡片保持不變，只有按下 `儲存並套用` 才變成 `觀音｜慈悲守護`。完整 v47 測試為 22 項通過及三項無關的 WIP 失敗：既有 battle guard 預期值（`27 !== 30`）、QuickDeckSelector 尚未整合，以及缺少 battle client／schema 檔案。根目錄驗證仍只因 `_pending/repository-simplification_2026-08-18/inventory.sha256` 不存在而失敗；本次未讀取或修復 `_pending`。實體 iPhone、PowerShell、backend 與 online 檢查未執行，本次變更也沒有部署或 promotion。

## Next product action / 下一項產品工作

Continue v47 only when requested. Complete its validator, D1/privacy boundary, build, and manual two-phone regression before promotion. Normal repository maintenance should not inspect v47 battle internals.

只有在使用者要求時才繼續 v47。Promotion 前需完成 validator、D1／隱私邊界、build 與雙手機手動回歸。一般 repository 維護不需檢查 v47 對戰內部。

## Exact commands / 精確指令

```bash
node Versions/open-latest.mjs --dry-run
node Versions/validate-repository.mjs

cd Versions/v46
npm ci --no-audit --no-fund
npm run lint
npm test
```

Public verified v46: `https://encounter-cards-v40-review.kenimaster123.chatgpt.site`

Physical iPhone regression and v47 two-phone battle verification remain manual unless a later handoff records fresh evidence.

實體 iPhone 回歸與 v47 雙手機對戰驗證仍屬手動項目，除非後續 handoff 記錄最新證據。
