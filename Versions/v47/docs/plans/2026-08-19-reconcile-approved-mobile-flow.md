# Reconcile approved mobile flow

## Scope and constraints

Correct the deployed v47 mobile Truth-or-Dare flow so it consistently reflects the approved friendly, English-branded game experience rather than retaining legacy encounter copy. Preserve the 430 × 932 contract, offline/memory-only privacy boundary, direct-keepsake ratio, card-draw mechanics, 42 artwork blessings, draft-save settings, post-draw editor, and the current Firebase preview target. Do not modify v46, `latestVerified`, backend settings, analytics, persistent storage, or unrelated owner worktree changes.

## Tasks

1. Add a focused contract assertion in `Versions/v47/tests/v47-contract.test.mjs` that the mobile Truth-or-Dare setup copy contains neither the former encounter headline/lead nor the `準備這次相遇` setup label; run it first and record the expected RED failure against the current code.
2. In `Versions/v47/app/encounter/App.tsx`, replace only the mobile-visible legacy encounter setup copy with concise, friendly icebreaker copy, retain `TRUTH OR DARE` as the gameplay brand, and remove the remaining setup label that uses `相遇`.
3. Run the focused v47 contract test to prove GREEN, then run `npm run lint` and `npm run build:encounter`; do not conceal unrelated existing WIP failures.
4. Use the deployed Firebase preview at 430 × 932 to verify the mode home, direct keepsake, Truth-or-Dare setup, card draw, and post-draw keepsake visible labels; capture browser evidence and check for console errors.
5. Deploy the fresh production build to Firebase project `shine-sandbox-lab`, Hosting site `shine-truth-or-dare-dev`, verify an HTTP 200 public response, record the deployment in `HANDOFF.md`, run `git diff --check`, and commit only files changed for this correction.

## Evidence checkpoints

- RED: the added setup-copy contract fails before the copy change.
- GREEN: the focused contract passes after the copy change.
- Build: the generated Vite assets complete successfully.
- Browser: at 430 × 932, no visible legacy encounter setup copy remains and the approved mobile surfaces remain reachable.
- Deployment: Firebase reports the release URL and the public URL responds successfully.
