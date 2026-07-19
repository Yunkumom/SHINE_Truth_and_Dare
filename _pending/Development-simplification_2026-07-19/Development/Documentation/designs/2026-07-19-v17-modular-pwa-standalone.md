# Encounter Cards v17 Modular PWA and Standalone Design

## Status / 狀態

Approved by the user on 2026-07-19. Existing v15 and v16 releases remain unchanged; the maintainable migration uses v17.

使用者於 2026-07-19 核准。既有 v15 與 v16 保持不變；可維護 migration 使用 v17。

## Architecture / 架構

`web/src/` is the only authored product source. React, TypeScript, and Vite produce a public PWA under `web/dist/`; a deterministic exporter produces `app/encounter_cards_v17.html` from the same verified source. Release identifiers in the UI, manifest, service-worker cache, and standalone artifact must agree.

`web/src/` 是唯一人工維護的產品來源。React、TypeScript 與 Vite 產生 `web/dist/` PWA；可重現 exporter 從同一 verified source 產生 `app/encounter_cards_v17.html`。UI、manifest、service-worker cache 與 standalone 的 release ID 必須一致。

## Interaction and Privacy / 互動與隱私

- Preserve Chinese, English, bilingual, Truth, Dare, Random, Levels 1–5, player fields, drag-to-draw, automatic flip, discard, typography controls, PNG, and share/download fallback.
- Level 5 is a soft birthday-based 18+ content gate, not legal age verification.
- Names, contacts, birthdays, answers, and notes remain memory-only and clear on reload.
- Only language and font scale may persist locally.
- Provide keyboard draw, reduced-motion, visible focus, and live-region announcements.

## Assets / 資產

Only reviewed production assets may enter `web/public/assets/`. Every committed asset requires a record in `docs/asset-licenses.md`. Unknown packaged artwork and fonts are reconstruction references, not approved public assets. v17 initially uses owned CSS/SVG presentation until reviewed artwork is available.

## PWA and Offline / PWA 與離線

The manifest uses standalone display mode. A versioned service worker precaches the complete application, card data, styles, scripts, icons, and approved assets. Offline-ready status appears only after successful caching. New caches replace old caches only after activation; first use requires a successful online load. iPhone instructions use Safari → Share → Add to Home Screen.

## Failure Behavior / 失敗行為

- Invalid card data, missing translations, unlicensed registered assets, or mismatched release identifiers fail the build.
- Incomplete drags return to rest; repeated gestures cannot duplicate a draw.
- Missing artwork retains readable card content.
- Share cancellation is normal; unsupported or failed sharing falls back to PNG download.
- Failed PWA updates retain the previous complete cache.

## Verification / 驗證

Required evidence includes repository validation, typecheck, lint, unit/component tests, PWA build, standalone build, three languages, three modes, five levels, Level 5 gate, session-only personal fields, gestures, font controls, PNG/share fallback, accessibility paths, offline first-load/update behavior, responsive layout, immutable v15, and comparison with v15/v16 behavior.

Publication, deployment, release tags, and remote changes require separate approval.
