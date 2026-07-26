# V26 iPhone Frame and Card Presentation Editor Plan

## 1. Version and contracts

- Create `Development/Source/Main-App-v26` from the verified v25 source without editing v25.
- Add failing tests for the 78.0:163.4 frame ratio, normalized presentation settings, editor controls, browser rendering, and PNG parity.
- Increment product, storage, generated artifact, and validation identifiers to v26.

## 2. Device frame

- Add named physical/device constants and unit tests.
- Wrap desktop workbench and preview canvases in a 445 × 932 chassis.
- Keep each application canvas exactly 430 × 932 and centered.
- Leave the mobile layout unchanged.

## 3. Card presentation model

- Add a versioned, privacy-safe presentation document.
- Store per-artwork focus/zoom and shared artwork-height/blessing controls.
- Add normalization, import/export, reset, and local persistence.

## 4. Rendering and export

- Apply artwork settings to draw, keepsake, and phone preview images.
- Apply blessing typography and geometry settings to draw and keepsake cards.
- Pass the settings into PNG composition and verify crop/zoom helpers with unit tests.

## 5. Release

- Generate and validate the v26 standalone release and next Public Web package.
- Update launcher, Pages workflow, current documentation, handoff, changelog, and public blueprint.
- Run typecheck, lint, tests, v26 validation, repository validation, and browser visual checks.
- Commit, push, wait for GitHub Pages, and verify the public URL.
