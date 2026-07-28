# v33 Pre-verification Build

This folder preserves the first unpublished v33 build generated before release-specific layout and presentation storage keys were corrected from v32 to v33. It is evidence only and must not be published or restored as the active release.

本資料夾保存 v33 首次未發布 build；該版本尚未將版面與呈現設定 key 由 v32 校正為 v33。僅供驗證證據，不得發布或恢復為作用中版本。

`browser-qa-before-export-label-fix/` preserves the second unpublished candidate inspected during browser QA, before remaining user-visible v32 editor/export labels and rendered Taiwan locator calibration were corrected.

`browser-qa-before-export-label-fix/` 保存第二份瀏覽器驗證候選版本；該版本尚未修正殘留的 v32 編輯器／匯出標示，以及卡面裁切後的台灣發光定位。

`browser-qa-before-desktop-test-centering-fix/` preserves the next unpublished candidate that exposed a missing desktop test-canvas scale variable. That omission shifted the interactive 430 × 932 phone content inside its frame; the active release fixes the centering contract.

`browser-qa-before-desktop-test-centering-fix/` 保存下一份未發布候選版本；瀏覽器驗證發現桌機測試畫布缺少比例變數，導致 430 × 932 互動內容偏移。正式版本已修正置中合約。

`browser-qa-before-vertical-fit-fix/` preserves the centered but vertically oversized desktop candidate. The active release reserves the mode-switch area when calculating both phone scales, so the complete 78 × 163.4 mm frame remains visible.

`browser-qa-before-vertical-fit-fix/` 保存已置中但高度超出視窗的桌機候選版本；正式版本在計算兩個手機比例時保留模式切換區，完整 78 × 163.4 mm 外框可留在視窗內。
