# Truth and Dare

Truth and Dare is the governed repository for **Encounter Cards**, a bilingual, iPhone-first conversation card game. Encounter Cards v22 is the current maintained release; v15–v21 remain immutable standalone references.

Truth and Dare 是雙語、iPhone 優先的對話卡牌遊戲 **相遇卡 Encounter Cards**。v22 是目前維護版本；v15–v21 保留為不可變 standalone 參考版本。

## Start / 開始

- Double-click `Open Truth and Dare.cmd`; it serves and opens the current v22 release at `127.0.0.1:8765`.
- Public site: `https://yunkumom.github.io/SHINE_Truth_and_Dare/` (available after the Pages workflow completes).
- Current authored source: `Development/Source/Main-App-v22/src/`
- Current verified PWA build: `Development/Source/Main-App-v22/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v22.html`
- Deity source artwork: `Assets/Deities/`.
- Complete Development file guide: `Development/README.md`
- Recoverable retired development material: `_pending/Development-simplification_2026-07-19/`

## Repository / Repository 結構

```text
Truth and Dare/
├── Apps/          # Preserved runnable releases
├── Assets/        # Reusable assets and provenance
├── Development/   # Preserved earlier lines plus current v22 source, tools, tests, and contracts
├── _meta/         # Purpose, roadmap, handoff, changelog, blueprints
├── _agent/        # Agent guidance
├── _human/        # Human-facing support references
├── _pending/      # Recoverable retired or undecided material
├── GUIDE.md
├── AGENTS.md
└── Open Truth and Dare.cmd
```

Development was conservatively simplified on 2026-07-19. v17 source, unpublished Public Web work, old-version tooling, historical designs/plans, and generated dependencies were moved—not deleted—to `_pending/Development-simplification_2026-07-19/`.

Development 已於 2026-07-19 保守精簡。v17 source、未發布 Public Web、舊版工具、歷史 designs/plans 與生成依賴均移入 `_pending/Development-simplification_2026-07-19/`，沒有永久刪除。

## Development / 開發

```powershell
Set-Location Development/Source/Main-App-v22
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
```

Existing v15–v22 outputs are immutable. Product changes after v22 require v23 rather than overwriting a released version.

完整 repository 驗證：

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Product and Privacy Contract / 產品與隱私合約

- Chinese, English, and bilingual modes; Levels 1–5; Truth, Dare, and Surprise.
- 430 × 932 iPhone Pro Max frame; v22 adds editable setup/game/keepsake blocks while the complete frame remains centered and shrink-to-fit on desktop.
- Eighteen deity artworks with independent hidden-Taiwan hotspots; hold an artwork for 600 ms to reveal a blinking locator that remains for 3 seconds after release.
- Swipe-up draw with a 22% commitment threshold, spring return, flip reveal, enlarged 402 × 562 game card, and bottom fallback controls.
- Privacy-safe layout JSON with direct drag/resize, exact numeric controls, twenty-step undo/redo, reset, and import/export.
- 63:88 commemorative PNG with mandatory blessing and separately optional contact rows for both participants.
- Independent question/artwork pairing and a required blessing on every commemorative PNG; the runtime locator is not exported.
- Names, contacts, birthdays, notes, answers, and adult-content choices remain privacy-sensitive and client-side.
- No analytics, backend, accounts, or personal-data transmission without explicit approval and privacy review.
- Only language and font-scale preferences may persist locally.

The owner-private blueprint remains local-only and excluded from Git.
