# Yunkumom Brand Integration

## Approved direction

Replace the star used as a product-brand mark with the owner's Yunkumom road–moon–cloud symbol and use `Yunkumom` as the visible product wordmark. Remove other decorative star glyphs wherever practical. Keep `TRUTH OR DARE` only where it names the playable Truth-or-Dare experience rather than the overall product.

## Structure

- Add one reusable, accessible `YunkumomMark` inline SVG component based on the supplied monochrome trademark.
- Use the mark beside the `Yunkumom` wordmark on the mode home and Truth-or-Dare setup/game headers.
- Use the `Yunkumom` name on product-level menu, desktop showcase, studio, browser, install, and share surfaces.
- Keep the mode-selection label `真心話大冒險 / TRUTH OR DARE` and the gameplay card-back title because these identify the mode being played.
- Remove decorative `✦` glyphs from cards, keepsakes, editors, random-mode controls, exports, and end-state decoration; use neutral geometry or no ornament where an interaction still needs an icon.

## Visual behavior

The mark is a compact single-color line drawing with a rising road, crescent moon, and low cloud/wave silhouette. It inherits the current foreground color so day and night themes remain legible. The component has no runtime image request and scales cleanly inside the governed 430 × 932 canvas.

## Privacy and runtime boundaries

This is a presentation-only change. It adds no persistence, analytics, accounts, telemetry, personal-data handling, backend transmission, or runtime network dependency.

## Verification

- A focused source contract confirms product-brand strings, reusable mark placement, retained mode labels, and absence of `✦` in active V47 encounter source.
- Lint, the focused V47 suite, the encounter production build, and repository validation are run after implementation.
- A fresh 430 × 932 render is inspected for mark legibility, header fit, night-mode contrast, and horizontal overflow.
