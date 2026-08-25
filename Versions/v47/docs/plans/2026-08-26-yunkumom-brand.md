# Yunkumom Brand Integration Plan

## Constraints

- Writable scope: `Versions/v47/` plus this approved design and plan.
- Preserve the 430 × 932 mobile contract, all playable modes, offline behavior, privacy boundaries, and the existing v46 verified release.
- Do not inspect `_pending/` or `_trash/`, add dependencies, deploy, promote, or modify external accounts for this first prototype.

## Task 1: Define the failing brand contract

Update `Versions/v47/tests/v47-contract.test.mjs` so the compact-home contract requires `Yunkumom`, `YunkumomMark`, and `Yunkumom · V47` on product surfaces; continues to require `TRUTH OR DARE` for the playable mode; and rejects the `✦` glyph in active encounter source.

Evidence checkpoint: `node --test tests/v47-contract.test.mjs` fails on the current branding before production code changes.

## Task 2: Add the reusable mark and brand surfaces

- Add `Versions/v47/app/encounter/components/YunkumomMark.tsx` with a reusable inline SVG and accessible-title option.
- Update `ModeHome.tsx`, `SurfaceMenu.tsx`, and `App.tsx` to use the mark and `Yunkumom` on product-brand surfaces while retaining the Truth-or-Dare mode label.
- Update browser/install/share metadata in `app/encounter/index.html`, `app/encounter/public/manifest.webmanifest`, and `app/encounter/lib/share.ts`.
- Update relevant CSS in `app/encounter/styles/v40.css` and `app/encounter/styles/v47-ux.css` for compact mark sizing and theme contrast.

Evidence checkpoint: the focused brand contract turns GREEN and the mark remains within the existing 62 px header.

## Task 3: Remove remaining decorative stars

Update active encounter components, export renderers, and content icons so decorative `✦` glyphs are removed or replaced with neutral non-star geometry without changing gameplay semantics.

Evidence checkpoint: `rg -n "✦" Versions/v47/app/encounter --glob '!public/v47/**'` returns no matches, and the focused contract remains GREEN.

## Task 4: Full regression and visual verification

Run:

```bash
cd Versions/v47
npm run test:v47
npm run lint
npm run build:encounter
cd ../..
node Versions/validate-repository.mjs
```

Then render the current app at 430 × 932 and inspect day/night headers, product wordmarks, retained Truth-or-Dare mode naming, and horizontal overflow.

Expected evidence: focused branding checks pass; any unrelated pre-existing V47 or repository failures are recorded exactly; production build succeeds; the visible brand is Yunkumom with no decorative stars; privacy and offline boundaries remain unchanged.
