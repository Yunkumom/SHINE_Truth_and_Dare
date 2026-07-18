# Build Encounter Cards v16 iPhone Pro Max Edition — Implementation Plan

## Scope and Constraints

Writes are limited to `<PROJECT_ROOT>`. Do not modify `app/encounter_cards_v15.html`, install packages, deploy, commit, push, expose the server beyond `127.0.0.1`, enter personal data, or trigger share/download. Use the existing system Python runtime only. v16 must preserve the embedded application code and alter only version labeling, viewport metadata, layout CSS, and the non-hydrated launch notice.

## Task 1 — Create RED contract

Create `tests/validate_v16.ps1` requiring:

- `app/encounter_cards_v16.html`;
- `viewport-fit=cover`;
- the `encounter-v16-iphone-pro-max` CSS marker;
- 430 px desktop frame and iOS safe-area rules;
- v16 version labels;
- the root `.cmd` launcher and PowerShell server helper;
- loopback-only port 8765 and the v16 HTTP URL;
- unchanged v15 SHA-256.

Run the test before implementation. Expected evidence: failure because v16 and launcher files do not exist, not because the test is malformed.

## Task 2 — Implement deterministic v16 build

Create `tools/build_v16.ps1`. It reads v15, verifies its canonical SHA-256, changes the viewport metadata and visible version labels, broadens the existing mobile layout rules to become the shared layout, appends safe-area and desktop phone-frame CSS, inserts a launch notice, and writes v16 only when no conflicting output exists.

Evidence checkpoint: build exits 0, v15 hash remains canonical, and a second identical build is a no-op.

## Task 3 — Implement desktop launcher

Create `tools/serve_truth_and_dare.ps1` and `Open Truth and Dare.cmd`. The helper validates the target file, detects a project-owned existing server when possible, rejects a foreign service on port 8765, starts Python HTTP server hidden and loopback-only, waits up to ten seconds, and opens the exact v16 URL.

Evidence checkpoint: static contract passes and a focused invocation makes the correct URL reachable without changing external state.

## Task 4 — GREEN and repository integration

Run `tests/validate_v16.ps1`, add it to `tests/validate_repository.ps1`, and update README, AGENTS, product/architecture/animation documentation, both blueprints, human index, roadmap, handoff, and changelog.

Evidence checkpoint: focused v16 validation and full repository validation both exit 0.

## Task 5 — Browser and security verification

Start the approved loopback server, verify hydration and zero initial console errors, test the non-personal controls, then validate layouts at 430 × 932 and a wide desktop viewport. Confirm desktop renders one centered 430 px phone frame and mobile has no horizontal overflow. Do not test share/download or enter names/contacts.

Expected evidence: interaction state changes are observable; screenshots or measured DOM geometry confirm layout; v15 hash, Git privacy, loopback binding, and secret scans remain clean. Report any browser limitation separately.

