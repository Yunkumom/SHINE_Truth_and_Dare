# Three-stage Taiwan food card — Approved design

## Decision

Replace the live Taiwan Food Journey card's two-face flip with a three-stage reveal:

1. `back`: a quiet warm-ivory card back containing one minimal line-art fork and one minimal line-art spoon.
2. `front`: an image-led dish face that preserves almost the complete portrait artwork, cropping only a small amount from the lower edge when the source and 63:88 card ratios differ.
3. `open`: the dish face lifts upward like a hinged cover and reveals the sourced food note, party prompt, optional consent-gated spicy prompt, allergen reminder, and consequence-free skip cue underneath.

The three stages belong to the `food-travel-journal-v47` card-design presentation and do not merge artwork, food subjects, stories, or question data.

## Structure

- Keep the existing 63:88 card shell and 430 × 932 mobile contract.
- Render the information layer at the base of the shell.
- Render the dish artwork as a cover above it; in `front` it is closed, and in `open` it rotates upward from its top edge.
- Render the utensil back as the initial cover above both layers.
- Keep only a slim lower caption rail on the dish face for the regional label, bilingual dish name, and the lift cue.
- Draw the fork and spoon as inline, decorative SVG paths so the card remains offline and no new governed raster master is needed.

## Interaction and accessibility

- Every newly selected or drawn card starts at `back`.
- Tapping the card, pressing Enter, pressing Space, or using the primary footer control advances `back → front → open → back`.
- The card exposes stage-specific accessible labels, `aria-pressed` for whether the initial back has been turned, and `aria-expanded` for whether the information layer is open.
- The footer control text describes the next action rather than referring generically to front/back.
- The next-food and region-selection controls reset the new card to `back`.
- With `prefers-reduced-motion: reduce`, the reveal uses an immediate visibility change without hinge transforms.

## Artwork crop

- The live dish cover uses the complete image width with `object-fit: cover` and top-centered positioning.
- Because the governed masters are 2:3 and the card is 63:88, the ratio mismatch is absorbed at the bottom edge instead of symmetrically cutting the top and bottom.
- The slim caption rail overlays the lower edge and does not reduce the artwork viewport to the former 52% height.
- Existing per-artwork focus metadata remains unchanged for other consumers and printed output.

## Content and safety

- The open layer continues to resolve the existing independent story and question references.
- Spicy copy remains absent until the existing group-consent toggle is enabled.
- Skip remains consequence-free.
- No persistence, analytics, accounts, telemetry, backend calls, privacy-sensitive inputs, or runtime network dependencies are added.

## Print boundary

- Preserve the established printable 25-card front/back pairs: the printed front remains the dish face and the printed back remains the sourced story-and-question face.
- The live utensil cover and hinge animation are interaction affordances and are not added as a third printed sheet, avoiding a breaking change to duplex print pairing.

## Verification

- A focused contract proves all three stages, reset behavior, utensil SVG, hinge classes, bottom-only live crop, accessibility state, consent gate, reduced motion, and unchanged print pairing.
- Run the focused Taiwan food contracts, full v47 contract suite, lint, encounter build, repository validator, and `git diff --check`.
- Manually inspect the live card at 430 × 932 when a browser surface is available; physical printing and physical iPhone verification remain manual limitations unless actually performed.
