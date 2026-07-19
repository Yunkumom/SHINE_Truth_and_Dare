# GitHub Pages Public v1 Implementation Plan / GitHub Pages 公開版 v1 實作計畫

Design source / 設計來源: `docs/designs/2026-07-19-github-pages-public-v1.md`

## Global Constraints / 全域限制

- Writable product scope: `pages-src/v1/`, `site/index.html`, `site/v1/`, `.github/workflows/pages.yml`, v1-specific scripts/tests, and required project documentation updates.
- Immutable scope: `app/encounter_cards_v15.html`, all v16 files/assets, `web/`, `app/encounter_cards_v17.html`, and `Open Truth and Dare.cmd`.
- Do not delete or overwrite historical versions.
- Do not add analytics, a backend, accounts, trackers, secrets, or network transmission of personal input.
- Do not push, enable GitHub Pages, or change remote repository settings.
- Use React, TypeScript, Vite, Vitest, Testing Library, and the dependency versions already locked by the repository's v17 workspace unless a verified incompatibility requires a documented change.
- All behavior work follows RED → GREEN → REFACTOR with command output retained as evidence.

## File Responsibilities / 檔案責任

- `scripts/extract-v16-cards.mjs`: statically parse, never execute, the immutable v16 bundle and emit normalized original-card JSON plus provenance hashes.
- `pages-src/v1/src/data/original-cards.generated.json`: generated original card records.
- `pages-src/v1/src/data/cultural-cards.ts`: twelve new bilingual sourced cards.
- `pages-src/v1/src/data/cultural-sources.ts`: source and cultural-safety metadata.
- `pages-src/v1/src/types.ts`: `Card`, `CulturalSource`, `EncounterState`, `DragVector`, `InteractionPhase`, and preference types.
- `pages-src/v1/src/lib/gesture.ts`: pure v16-compatible gesture thresholds and state transitions.
- `pages-src/v1/src/lib/deck.ts`: original/new card merge, filter, shuffle, and next-card selection.
- `pages-src/v1/src/lib/preferences.ts`: `truth-and-dare-v1:*` storage access.
- `pages-src/v1/src/lib/share.ts`: Web Share and PNG fallback behavior.
- `pages-src/v1/src/components/EncounterCard.tsx`: exact approved card hierarchy and card-local interactions.
- `pages-src/v1/src/components/EncounterStage.tsx`: card stack, draw motion, completion, blessing, note, share, and redraw flow.
- `pages-src/v1/src/App.tsx`: existing setup/content flow and responsive outer composition.
- `pages-src/v1/src/styles/card.css`: preserved card geometry with limited approved refinements.
- `pages-src/v1/src/styles/layout.css`: mobile/tablet/desktop outer layout.
- `pages-src/v1/src/styles/motion.css`: drag, flip, stack, snap-back, and reduced-motion rules.
- `pages-src/v1/public/assets/cards/*.webp`: twelve optimized original illustrations.
- `pages-src/v1/public/assets/cards/fallback.webp`: fixed-aspect fallback artwork.
- `pages-src/v1/content-sources.json`: machine-readable public attribution list.
- `pages-src/v1/package.json`, lock/config files, and `index.html`: isolated deterministic v1 build/test entry.
- `site/index.html`: stable latest-version entry pointing to `./v1/`.
- `site/v1/`: accepted immutable production build.
- `site/v1/manifest.json`: version, source hash, asset hashes, and build verification metadata.
- `.github/workflows/pages.yml`: verify source/build parity and upload only `site/` to GitHub Pages.
- `tests/validate_public_v1.ps1`: enforce immutable scope, output structure, relative paths, manifest hashes, and no secret-like files.
- Required updates: `README.md`, `AGENTS.md`, `_meta/handoff.md`, `_meta/changelog.md`, `_meta/owner_private_blueprint.md`, `_meta/public_blueprint.md`, `_human/system-map.html`, and `_human/quick-fixes.html`.

## Task 1 — Establish immutable baselines / 建立不可變基準

1. Record SHA-256 hashes for v15, v16, v17 standalone output, and the launcher.
2. Add a failing `tests/validate_public_v1.ps1` assertion that expects the new v1 structure while also enforcing the recorded historical hashes.
3. Run `powershell -ExecutionPolicy Bypass -File tests/validate_public_v1.ps1` and confirm RED only because public v1 does not yet exist.
4. Add only the minimum empty package/config structure required for subsequent tests; do not add product behavior.

Evidence checkpoint: historical hashes match and the RED reason is the missing v1 implementation, not a modified baseline.

## Task 2 — Extract and validate original card data / 擷取並驗證原始卡牌資料

1. Write tests for a static extractor using a small fixture with embedded data URLs and bilingual fields.
2. Confirm RED because `scripts/extract-v16-cards.mjs` does not exist.
3. Implement a deterministic lexical parser that reads the v16 bundle as text without importing or evaluating it.
4. Generate `original-cards.generated.json` with source SHA-256, record count, IDs, field names, and image payloads preserved.
5. Add parity tests for original record count, unique IDs, required bilingual fields, and deterministic output hash.

Commands:

```powershell
cd pages-src/v1
npm test -- src/data/original-cards.test.ts
node ../../scripts/extract-v16-cards.mjs
npm test -- src/data/original-cards.test.ts
```

Evidence checkpoint: GREEN tests prove the original content model was ported without executing the compiled bundle or touching v16.

## Task 3 — Recreate the v16 gesture state machine / 重建 v16 手勢狀態機

1. Add failing pure-function tests for phases `idle`, `dragging`, `drawing`, `revealed`, `changing`, and snap-back behavior.
2. Encode verified thresholds: revealed swipe at distance ≥ 68 px or velocity ≥ 0.65 with distance ≥ 30 px; unrevealed draw at distance ≥ 58 px.
3. Test pointer cancel, pointer capture intent, left/right direction, and keyboard Enter/Space/ArrowLeft/ArrowRight mappings.
4. Implement the minimum pure transition functions in `gesture.ts`; refactor only after GREEN.

Command: `npm test -- src/lib/gesture.test.ts`

Evidence checkpoint: all boundary values immediately below, at, and above each threshold pass.

## Task 4 — Lock the original card DOM contract / 鎖定原卡牌 DOM 契約

1. Add a failing Testing Library test for the approved hierarchy and required class names.
2. Implement `EncounterCard.tsx` with `card-stack`, stacked backs, `draw-motion`, `encounter-card`, `card-face card-front`, `mythic-card`, `mythic-card-header`, `mythic-art-frame`, and `mythic-text-panel`.
3. Add failing then passing tests for text enlargement, image fallback, pointer handlers, keyboard handlers, and no alternate card component.
4. Implement `EncounterStage.tsx` and test the complete-answer → blessing → note/share/PNG → redraw flow.

Command: `npm test -- src/components/EncounterCard.test.tsx src/components/EncounterStage.test.tsx`

Evidence checkpoint: rendered DOM and interactions match the approved contract; no v17 simplified card DOM is present.

## Task 5 — Add sourced cultural content / 新增具來源的文化內容

1. Add failing validation tests requiring exactly six Taiwan and six Australia records, unique IDs, bilingual text, region, attribution, authoritative source URL, and visual-restriction metadata.
2. Write original Truth/Dare prompts and blessings; do not quote or reproduce source narratives.
3. Limit Seven Sisters to the public/open story layer and Rainbow Serpent to a clearly qualified cross-regional overview.
4. Label Drop Bear as modern folklore and Min Min Lights as an unexplained legend, not fact.
5. Run content validation and manually review wording for false universal claims or missing attribution.

Command: `npm test -- src/data/cultural-cards.test.ts`

Evidence checkpoint: twelve records pass automated schema/source checks and a documented cultural-safety review.

## Task 6 — Produce and optimize original artwork / 製作並最佳化原創插畫

1. Create twelve original images with the approved dark-blue, gold, engraved mythic-card mood.
2. For Indigenous-associated subjects, prohibit imitation of dot painting, rock art, clan designs, sacred motifs, ceremonial dress, and protected visual languages in every generation prompt.
3. Visually inspect every source image before acceptance.
4. Convert accepted art deterministically to WebP, strip metadata, cap dimensions/file size, and generate `fallback.webp`.
5. Record generated-asset provenance and constraints in `content-sources.json` and `docs/asset-licenses.md`.

Evidence checkpoint: twelve distinct optimized images exist, contain no embedded metadata, pass dimensions/size checks, and have completed visual/cultural review.

## Task 7 — Implement responsive visual treatment / 實作響應式視覺

1. Add failing browser/layout assertions for 390 × 844, 430 × 932, 768 × 1024, and 1440 × 900.
2. Implement card CSS without changing the DOM contract or internal order.
3. Implement safe-area mobile spacing, tablet breathing room, and a balanced desktop outer stage while retaining the centered maximum-scale card.
4. Add focus-visible, minimum touch target, color contrast, and reduced-motion tests.
5. Verify no horizontal overflow and no clipped completion controls at every target viewport.

Evidence checkpoint: screenshots at all four viewports are approved and DOM contract tests remain GREEN.

## Task 8 — Complete preferences, offline-safe behavior, and sharing / 完成偏好、離線安全與分享

1. Add failing tests proving only `truth-and-dare-v1:*` storage keys are used.
2. Add failing tests for current/next image preload, image fallback, Web Share success, Web Share rejection, unsupported Web Share, and PNG fallback.
3. Implement the minimum behavior without service workers that could cross-control historical versions; use static caching semantics only unless a v1-scoped worker is proven safe.
4. Test that losing the network after load does not crash the current encounter.

Evidence checkpoint: no v16/v17 storage is read or written, no personal data leaves the browser, and all fallbacks pass.

## Task 9 — Build the immutable Pages package / 建立不可變 Pages 套件

1. Configure Vite with relative base URLs and deterministic asset naming.
2. Add failing path tests for repository-subpath hosting and absence of absolute `/assets` references.
3. Build to a temporary directory, then populate `site/v1/` only during initial v1 creation.
4. Generate `site/v1/manifest.json` with version `v1`, source hashes, and hashes for every public file.
5. Create `site/index.html` pointing to `./v1/` and `site/.nojekyll`.
6. Rebuild to a second temporary directory and byte-compare it with `site/v1/`.

Commands:

```powershell
cd pages-src/v1
npm run typecheck
npm run lint
npm test
npm run build
powershell -ExecutionPolicy Bypass -File ../../tests/validate_public_v1.ps1
```

Evidence checkpoint: two clean builds are identical, all URLs are relative, and manifest verification passes.

## Task 10 — Add GitHub Pages workflow without publishing / 加入 Pages workflow 但不發布

1. Add workflow-schema/static tests that require least-privilege Pages permissions and upload only `site/`.
2. Implement `.github/workflows/pages.yml` to install dependencies, run all v1 checks, rebuild to temporary output, compare with frozen `site/v1/`, verify manifest hashes, and upload `site/`.
3. Do not run `git push`, `gh`, or change Pages settings.

Evidence checkpoint: workflow syntax and local-equivalent commands pass; repository publication state is unchanged.

## Task 11 — Documentation and maintenance layer / 文件與人工維護層

1. Update README and AGENTS with the public v1/v2/v3 immutability workflow and project-specific commands.
2. Update system map for `pages-src/` → build verification → `site/` → GitHub Pages data flow.
3. Update quick fixes with safe-to-edit content fields, artwork replacement rules, version rules, and storage keys.
4. Update handoff, changelog, both blueprints, and asset license/source documentation.
5. Ensure the public blueprint contains only public-safe paths and a verified public repository URL or sanitized placeholder.

Evidence checkpoint: documentation agrees on paths, version rules, commands, and publication boundary.

## Task 12 — Full regression and security-boundary verification / 完整回歸與安全邊界驗證

Run:

```powershell
cd pages-src/v1
npm ci
npm run typecheck
npm run lint
npm test
npm run build
cd ../..
powershell -ExecutionPolicy Bypass -File tests/validate_public_v1.ps1
powershell -ExecutionPolicy Bypass -File tests/validate_v16.ps1
powershell -ExecutionPolicy Bypass -File tests/validate_v17.ps1
powershell -ExecutionPolicy Bypass -File tests/validate_repository.ps1
git diff --check
git status --short
```

Then perform fresh browser checks at all four target viewports for draw, reveal, swipe, keyboard change, text enlargement, completion, blessing, note, share fallback, redraw, image fallback, and relative-path navigation.

Final evidence must show:

- v15/v16/v17/launcher hashes are unchanged.
- All automated commands pass from a clean dependency install.
- No secret-like or private files are under `site/`.
- No absolute asset paths, analytics, backend calls, trackers, accounts, or cross-version storage access exist.
- Twelve sourced cards and twelve reviewed original illustrations are present.
- `site/v1/` matches its manifest and is ready for, but not yet published to, GitHub Pages.
