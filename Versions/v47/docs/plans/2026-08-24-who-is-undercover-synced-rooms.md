# V47 Who Is the Undercover — Implementation Plan

## Scope and constraints

- Writable product scope: `Versions/v47/` plus an append-only update to root `HANDOFF.md` after verified delivery.
- Preserve the 430 × 932 phone contract, English default, Traditional Chinese and bilingual modes, existing three experiences, unrelated worktree changes, and `latestVerified: v46`.
- Do not transmit names, contacts, birthdays, notes, answers, uploads, custom questions, or analytics.
- Preserve current Realtime Database rules for existing namespaces and add only undercover namespaces.
- Commit locally after verification; push and deploy only to the already owner-approved branch and Firebase share site, without promoting v47.

## Task 1 — Pure game domain (RED → GREEN)

**Files:**

- Add `Versions/v47/tests/undercover-engine.test.ts` for role counts, unique assignments, vote resolution, ties, win conditions, and payload privacy.
- Add `Versions/v47/app/undercover/types.ts` for `UndercoverRole`, `UndercoverPhase`, `UndercoverRoom`, `UndercoverPrivatePlayer`, and vote/result types.
- Add `Versions/v47/app/undercover/word-pairs.ts` for bilingual related-word pairs.
- Add `Versions/v47/app/undercover/engine.ts` for deterministic assignment and round resolution with injected randomness.

**Evidence checkpoint:** Run `node --test tests/undercover-engine.test.ts`; first confirm RED because modules are missing, then confirm all new domain tests GREEN.

## Task 2 — Firebase room adapter and rules (RED → GREEN)

**Files:**

- Add `Versions/v47/tests/undercover-contract.test.mjs` for privacy-field exclusion, rules namespace boundaries, local QR generation, and navigation integration tokens.
- Add `Versions/v47/app/undercover/firebase.ts` for lazy configuration, anonymous auth, create/join transactions, listeners, private assignment reads, voting, phase coordination, and expiry handling.
- Add `Versions/v47/database.rules.json`, preserving existing `rooms` and `letsTalkRooms` behavior while adding `undercoverRooms` and `undercoverPrivate`.
- Update `Versions/v47/firebase.preview.json` to target `shine-truth-or-dare-share` and deploy the database rules.
- Update `Versions/v47/package.json` and `Versions/v47/package-lock.json` with `firebase` and local `qrcode` dependencies and include the focused tests in `test:v47`.

**Evidence checkpoint:** Run `node --test tests/undercover-contract.test.mjs`; confirm RED for missing adapter/rules, then GREEN after implementation, and run the Firebase rules dry-run or deployment validation before any live deploy.

## Task 3 — Responsive multiplayer UI (RED → GREEN)

**Files:**

- Add `Versions/v47/app/encounter/components/WhoIsUndercover.tsx` for create/join, lobby, reveal, discussion, voting, and result screens.
- Add `Versions/v47/app/encounter/styles/who-is-undercover.css` for governed phone layout, desktop scaling, day/night themes, reduced motion, and accessible focus states.
- Update `Versions/v47/app/encounter/App.tsx` with the `undercover` destination, deep-link parsing, and responsive rendering.
- Update `Versions/v47/app/encounter/components/ModeHome.tsx` with the fourth experience.
- Update `Versions/v47/app/encounter/components/SurfaceMenu.tsx` with the fourth destination.
- Update `Versions/v47/app/encounter/main.tsx` to load the feature stylesheet.

**Evidence checkpoint:** Extend `Versions/v47/tests/undercover-contract.test.mjs`, observe RED before integration, then GREEN; build and inspect the rendered app at 430 × 932 and desktop showcase dimensions.

## Task 4 — Verification and delivery

1. Run `node --test tests/undercover-engine.test.ts tests/undercover-contract.test.mjs` and record exact counts.
2. Run `npm run build:encounter` and verify generated assets contain the new experience.
3. Run `npm run test:v47` and distinguish any unrelated pre-existing battle failures.
4. Run `node Versions/validate-repository.mjs` from the repository root and record exact output.
5. Inspect the live Firebase site on phone-sized and desktop-sized browser viewports; create a room and join it with a second isolated browser context if authentication is available.
6. Confirm the deployed HTML returns HTTP 200 and references the new asset hash.
7. Append the verified result and URLs to `HANDOFF.md`, commit only scoped files, push `codex/v47-tactical-battle`, and deploy Hosting plus Realtime Database rules to project `shine-share-lab` without changing release promotion state.

## Security-boundary checkpoint

- Search all new runtime and rules files for forbidden personal fields and external telemetry.
- Confirm Firebase configuration contains public client configuration only and no credential or token.
- Confirm private role/vote reads require `auth.uid` ownership and public room payloads contain no word text.
- Confirm no existing database namespace rule was relaxed.
