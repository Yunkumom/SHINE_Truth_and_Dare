# Build Encounter Cards v17 Modular PWA and Standalone — Implementation Plan

## Scope and boundaries / 範圍與邊界

Writes stay inside the Truth and Dare project. Preserve v15 and v16 byte-for-byte. Do not push, tag, deploy, change repository visibility, expose a network listener, read private blueprints, or introduce telemetry/backend transmission. Review dependencies before installation. Use React + TypeScript + Vite from a single source.

## Task 1 — RED repository contract

Create `tests/validate_v17.ps1` requiring the modular source, package scripts, manifest, service worker, 60 bilingual cards, privacy markers, build outputs, asset licence inventory, and unchanged v15/v16 hashes. Integrate it only after focused GREEN.

Evidence: focused validation fails because v17 files are absent, while v15/v16 hashes pass.

## Task 2 — Dependency and source foundation

Review and pin React, React DOM, Vite, TypeScript, ESLint, Vitest, Testing Library, jsdom, and required type packages. Create `web/package.json`, lockfile, configs, `index.html`, and modular source boundaries for types, card data, preferences, age gate, game selection, and application state.

Evidence: install succeeds; typecheck, lint, and focused unit tests pass.

## Task 3 — RED/GREEN product behavior

Add tests before implementation for language persistence, session-only personal data, Level 5 birthday gate, mode/level filtering, non-repeating draw behavior, accessible draw control, and setup-to-game flow. Implement the iPhone-first UI, CSS card artwork, drag/flip/discard state, typography controls, and privacy-safe fields.

Evidence: each focused test demonstrates intended RED then GREEN; all unit/component tests pass.

## Task 4 — PWA and offline behavior

Create a valid manifest, owned icons, versioned service worker, offline-ready messaging, safe cache activation, and iPhone installation instructions. Add deterministic tests for cache name, required precache entries, first-visit limitation, and obsolete-cache cleanup timing.

Evidence: production build passes and offline contract checks pass.

## Task 5 — PNG/share and standalone output

Implement canvas PNG creation, user-triggered Web Share, cancellation handling, and download fallback. Create `scripts/export-standalone.mjs` to inline the verified Vite CSS/JS/manifest/icon dependencies into `app/encounter_cards_v17.html` without overwriting existing versions.

Evidence: export is deterministic; standalone contains no external runtime dependency and identifies v17.

## Task 6 — Repository integration and documentation

Update repository validation, README, AGENTS, affected product/architecture/animation/card docs, PWA strategy, asset licences, both blueprints, roadmap, handoff, changelog, Agent/human indexes, and human system/quick-fix pages. Fix the private-blueprint wildcard ignore gap without hiding the public blueprint.

Evidence: documentation and structure checks pass; public blueprint includes the verified public GitHub URL.

## Task 7 — Full verification and review

Run dependency audit, typecheck, lint, tests, PWA build, standalone export, focused v17 contract, full repository validation, secret/local-path scans, immutable hashes, and browser checks at 430 × 932 and desktop. Review source/security boundaries and report physical-iPhone-only limitations separately.

No Git publication or deployment is part of this plan.
