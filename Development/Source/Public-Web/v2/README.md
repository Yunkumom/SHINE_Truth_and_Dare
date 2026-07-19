# Public Web v2 source recipe

Public v2 is produced from the canonical `Development/Source/Main-App-v19/` source. Run its verified build, then run `Development/Automation/Scripts/finalize-public-v2.mjs` exactly once. The generated pair at `Apps/Public-Web/v2/` becomes immutable after publication.

公開版 v2 由正式的 `Main-App-v19` 原始碼產生。完成驗證後執行 v2 finalizer；發布後 `Apps/Public-Web/v2/` 不得覆寫。
