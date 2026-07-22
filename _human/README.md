# Human References / 人類參考

This directory contains human-facing support and learning references. These files are documentation resources, not product runtime bundles.

此目錄包含供人類閱讀的支援與學習參考資料。此處檔案為文件資源，而非產品執行期產物。

## Core Entry Points / 核心入口

1. **[Encounter Cards Developer Academy](code-learning-tool.html)**:
   - An interactive learning tool explaining the architecture, state lifecycles, and code logic of v19.
   - Includes annotated source code for all modules and a guide on expert learning methodologies.
   - 互動式開發者學習工具，說明 v19 的架構、狀態生命週期與程式邏輯，包含所有模組的標註程式碼與專家學習法指引。

2. **[Truth and Dare Quick Fixes / 快速維護](quick-fixes.html)**:
   - Quick reference for codebase locations, build scripts, and layout adjustments.
   - 快速維護參考，提供程式位置、建置腳本與版面調整說明。

3. **[Truth and Dare System Map / 系統地圖](system-map.html)**:
   - Map of runtime file pipelines, launchers, and directory purposes.
   - 系統架構地圖，包含執行期檔案管線、啟動器與目錄用途。

## Runtime Launch / 執行啟動

The primary desktop launcher is **`Open Truth and Dare.cmd`** in the repository root, which serves the self-contained PWA release `Apps/Standalone/encounter_cards_v19.html` over loopback HTTP at `http://127.0.0.1:8765`.

主要的電腦版啟動器為根目錄下的 **`Open Truth and Dare.cmd`**，它會在本機伺服器提供獨立封裝的 PWA 版本 `Apps/Standalone/encounter_cards_v19.html`，位址為 `http://127.0.0.1:8765`。
