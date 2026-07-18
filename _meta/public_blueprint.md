# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Recreate Truth and Dare as a share-safe repository for the bilingual Encounter Cards game while preserving v15 as an immutable executable baseline.

安全重建 Truth and Dare 雙語相遇卡遊戲 repository，並將 v15 保存為不可變的可執行基準。

## Architecture / 架構

```text
Truth and Dare/
├── README.md
├── AGENTS.md
├── .gitignore
├── app/
│   └── encounter_cards_v15.html    # Packaged executable baseline
├── docs/
│   ├── PRODUCT_SPEC.md
│   ├── ARCHITECTURE.md
│   ├── ANIMATION_SPEC.md
│   ├── CARD_CONTENT.md
│   ├── designs/
│   └── plans/
├── _meta/                          # Purpose, roadmap, handoff, blueprints, changelog
├── _agent/                         # Agent workspace index
├── skills/                         # Project Skill index
├── _human/                         # Supporting human-facing outputs
├── _pending/                       # Human-review buffer
└── tests/                          # Repository validation
```

The required local `_meta/owner_private_blueprint.md` must remain excluded from Git and public exports.

## Packaged Runtime / 封裝 Runtime

v15 is one HTML document containing compiled CSS, a ViNext import map, five embedded JavaScript modules, React runtime, React Server Component payloads, card content, and embedded images. No environment variable, package installation, backend, or external runtime script is required.

Verified browser-local preference keys:

- `encounter-language`
- `encounter-font-scale`

The application contains PNG generation plus Web Share and download fallback logic. User-entered names, optional contacts, birthdays, notes, and 18+ selections are privacy-sensitive and must not be exported to documentation or telemetry.

## Reconstruction Steps / 重建步驟

1. Create the governance and documentation structure shown above.
2. Restore the exact v15 packaged HTML to `app/encounter_cards_v15.html`.
3. Verify SHA-256 `C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0`.
4. Ensure `.gitignore` excludes `_meta/owner_private_blueprint.md`, secrets, credentials, and private local data.
5. Run `powershell -ExecutionPolicy Bypass -File tests/validate_repository.ps1`.
6. Complete browser regression and privacy review before publishing or developing v16.

## Post-Rebuild Checklist / 重建後檢查

- [ ] All mandatory governance and product documents exist.
- [ ] v15 hash matches the canonical baseline.
- [ ] The owner-private blueprint is ignored and the public blueprint remains trackable.
- [ ] No external runtime JavaScript or backend request has been introduced.
- [ ] Language, level, card, animation, export, and sharing flows pass browser testing.
- [ ] No secrets, private paths, personal data, or unlicensed assets appear in public documentation.

## Source / 來源

No public source repository URL was available at creation time. Use `<PUBLIC_REPOSITORY_URL>` only after confirming unauthenticated public readability. The original modular React/TypeScript source remains unavailable in this baseline.

