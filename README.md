# Truth and Dare

Truth and Dare is the governed repository for **Encounter Cards**, a bilingual, iPhone-first conversation card game. Encounter Cards v33 is the current maintained release; v15–v33 remain immutable standalone references after publication.

Truth and Dare 是雙語、iPhone 優先的對話卡牌遊戲 **相遇卡 Encounter Cards**。v33 是目前維護版本；v15–v33 發布後均保留為不可變 standalone 參考版本。

## Start / 開始

- Double-click `Open Truth and Dare.cmd`; it serves and opens the current v33 release at `127.0.0.1:8765`.
- Public site: `https://yunkumom.github.io/SHINE_Truth_and_Dare/` (available after the Pages workflow completes).
- Current authored source: `Development/Source/Main-App-v33/src/`
- Current verified PWA build: `Development/Source/Main-App-v33/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v33.html`
- Current public release: `Apps/Public-Web/v16/`
- Reusable Taiwan zodiac masters: `Assets/Zodiac/Taiwan/v33-masters/`
- Public GitHub Pages artifact: `Apps/Public-Web/v15/`
- Current deity source artwork: `Assets/Deities/v30-safe-masters/`.
- Complete Development file guide: `Development/README.md`
- Recoverable retired development material: `_pending/Development-simplification_2026-07-19/`

## Repository / Repository 結構

```text
Truth and Dare/
├── Apps/          # Preserved runnable releases
├── Assets/        # Reusable assets and provenance
├── Development/   # Preserved earlier lines plus current v33 source, tools, tests, and contracts
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
Set-Location Development/Source/Main-App-v33
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
```

Existing v15–v33 outputs are immutable after release. Later product changes require a new version rather than overwriting a released version.

完整 repository 驗證：

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Product and Privacy Contract / 產品與隱私合約

- Chinese, English, and bilingual modes; Levels 1–5; Truth, Dare, and Surprise.
- Desktop Settings and Test modes are separate; mobile opens directly into the play-only 430 × 932 experience.
- Advanced entry selection supports all-random or a specific approved artwork, while the question and mandatory blessing remain independently randomized.
- The draw screen offers three favorite artwork faces before reveal; planned Taiwan astral, world deity, and world zodiac collections remain visibly unavailable until governed assets are approved.
- 430 × 932 app canvas inside a desktop-only 445 × 932 iPhone Pro Max physical-ratio frame; mobile remains full-screen.
- Eighteen deity artworks with safe hotspots; hold for 600 ms to reveal a transparent, Natural Earth-derived Taiwan coastline glow for 3 seconds.
- Swipe-up draw with a 22% commitment threshold, spring return, flip reveal, enlarged 402 × 562 game card, and bottom fallback controls.
- Privacy-safe layout JSON with stable numeric controls, opt-in scale-aware direct drag/resize, twenty-step undo/redo, reset, and import/export.
- 63:88 commemorative PNG with mandatory blessing and separately optional contact rows for both participants.
- Independent question/artwork pairing and a required blessing on every commemorative PNG; the runtime locator is not exported.
- Names, contacts, birthdays, notes, answers, and adult-content choices remain privacy-sensitive and client-side.
- No analytics, backend, accounts, or personal-data transmission without explicit approval and privacy review.
- Only language, global font scale, privacy-safe layout geometry, and non-personal artwork/question/blessing presentation settings may persist locally.

The owner-private blueprint remains local-only and excluded from Git.
