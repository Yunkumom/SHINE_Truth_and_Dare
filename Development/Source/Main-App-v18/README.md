# Main App v18 Source / 主應用程式 v18 原始碼

This is the preserved React, TypeScript, and Vite source for Encounter Cards v18. `src/` is authored code, `public/` contains approved PWA resources, and `dist/` is the verified generated PWA output. v18 keeps the 430 × 932 mobile contract and scales the complete phone shell down to fit desktop viewports.

此處保存 Encounter Cards v18 的 React／TypeScript／Vite source。`src/` 是人工程式碼，`public/` 是核准 PWA 資源，`dist/` 是已驗證生成成品。

Restore generated dependencies with `npm ci`, then use `npm run typecheck`, `npm run lint`, and `npm test`. `npm run build:standalone` targets the existing v18 output and therefore requires explicit audit/recovery approval. New product behavior must use the next numbered source/output release rather than overwrite v18.

先用 `npm ci` 還原生成依賴，再執行 typecheck、lint 與 test。`npm run build:standalone` 會指向既有 v18，只有明確核准的稽核／復原才能執行；新產品行為必須建立下一個編號版本。
