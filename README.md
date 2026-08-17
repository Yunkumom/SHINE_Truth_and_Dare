# Truth or Dare / 真心話大冒險

Truth or Dare is the governed repository for **Encounter Cards**, a bilingual, iPhone-first conversation card game. Encounter Cards v46 is the current maintained Sites/Vinext application; v15–v39 remain immutable standalone references after publication.

Truth or Dare（真心話大冒險）是雙語、iPhone 優先的對話卡牌遊戲 **相遇卡 Encounter Cards**。v46 是目前維護的 Sites／Vinext 應用；v15–v39 發布後均保留為不可變 standalone 參考版本。

## Start / 開始

- Double-click `Open Truth and Dare.cmd`; it restores locked dependencies when needed and opens the current v46 application at `127.0.0.1:8765`.
- Current public v46 site: `https://encounter-cards-v40-review.kenimaster123.chatgpt.site`
- Legacy GitHub Pages site: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`
- Current authored source: `Development/Source/Main-App-v46/`
- Current verified Sites build: `Development/Source/Main-App-v46/dist/`
- Current generated encounter PWA: `Development/Source/Main-App-v46/public/v46/`
- Latest immutable standalone fallback: `Apps/Standalone/encounter_cards_v39.html`
- Latest published GitHub Pages fallback: `Apps/Public-Web/v22/`
- Reusable Taiwan zodiac masters: `Assets/Zodiac/Taiwan/v33-masters/` (classic) and `Assets/Zodiac/Taiwan/v34-local-stories-masters/` (Local Stories).
- Current deity source artwork: `Assets/Deities/v30-safe-masters/`.
- Complete Development file guide: `Development/README.md`
- Recoverable retired development material: `_pending/Development-simplification_2026-07-19/`

## Repository / Repository 結構

```text
Truth or Dare/
├── Apps/          # Preserved runnable releases
├── Assets/        # Reusable assets and provenance
├── Development/   # Preserved earlier lines plus current v46 source, tools, tests, and contracts
├── _meta/         # Purpose, roadmap, handoff, changelog, blueprints
├── _agent/        # Agent guidance
├── _human/        # Human-facing support references
├── _pending/      # Recoverable retired or undecided material
├── GUIDE.md
├── AGENTS.md
└── Open Truth and Dare.cmd
```

`Open Truth and Dare.cmd`, the existing GitHub repository URL, and published release identifiers remain legacy compatibility names. This repository migration does not rewrite immutable releases or external deployment identifiers.
`Open Truth and Dare.cmd`、既有 GitHub repository URL 與已發布 release 識別碼保留為舊版相容名稱；此次 repository 遷移不改寫不可變 releases 或外部部署識別碼。

Development was conservatively simplified on 2026-07-19. v17 source, unpublished Public Web work, old-version tooling, historical designs/plans, and generated dependencies were moved—not deleted—to `_pending/Development-simplification_2026-07-19/`.

Development 已於 2026-07-19 保守精簡。v17 source、未發布 Public Web、舊版工具、歷史 designs/plans 與生成依賴均移入 `_pending/Development-simplification_2026-07-19/`，沒有永久刪除。

## Development / 開發

```powershell
Set-Location Development/Source/Main-App-v46
npm ci
npm run dev
npm run lint
npm test
```

Existing v15–v39 outputs are immutable after release. v46 is a new governed Sites line; later product changes require a new version rather than overwriting a released version.

完整 repository 驗證：

```powershell
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1
```

## Product and Privacy Contract / 產品與隱私合約

- Chinese, English, and bilingual modes; Levels 1–5; Truth, Dare, and Surprise.
- Desktop Settings and Test modes are separate; mobile fills the live viewport width and reflows within `100dvh` without horizontal or document scrolling.
- Mobile starts with Encounter Card, direct keepsake, and Truth or Dare choices; every experience can return to that mode home.
- Direct keepsake creation accepts a governed artwork or local photo plus a library/custom blessing and produces a 63:88 PNG without persisting or transmitting the inputs.
- Advanced entry selection supports all-random or a specific approved artwork, while the question and mandatory blessing remain independently randomized.
- Mobile settings expose Level/mode selection, the governed 42-face library, exact artwork/question choice, session-only custom-question management, content controls, and per-artwork adjustment with a nine-square grid, explicit Cancel/Save, X −50…50%, Y −60…60%, and 100…240% zoom.
- Blessings remain mandatory; custom questions, disabled states, and exact choices are memory-only and are cleared when the session reloads.
- The draw screen offers three favorite artwork faces before reveal; hidden advanced choice exposes Taiwan deities, preserved classic zodiac guardians, and the new Local Stories zodiac version. World deity and world zodiac collections remain planned.
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
