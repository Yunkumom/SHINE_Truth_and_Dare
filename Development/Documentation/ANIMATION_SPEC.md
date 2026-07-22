# Card Interaction and Animation Specification

## Experience Goal

Drawing a card should feel like pulling a physical collectible card from a deck and turning it over in one continuous hand motion. The interaction should feel responsive, deliberate, and calm rather than abrupt or mechanical.

## Confirmed Target Sequence

1. The user touches or presses the visible card/deck.
2. A small movement threshold prevents accidental draws.
3. The card follows the finger or pointer in the same direction.
4. Translation and visual extension progress continuously with drag distance.
5. Crossing the draw threshold commits the draw.
6. The same motion transitions into a three-dimensional flip.
7. The front face becomes visible automatically; no second tap is required.
8. Artwork, title, body text, and challenge remain visible after completion.
9. A later swipe dismisses the used card and prepares the next draw.

## Layout Contract

- Bilingual copy must remain inside the card at supported mobile widths.
- Encounter type and hero/deity name appear above the dominant artwork.
- Supporting note or challenge appears below the artwork.
- Back-face content must be hidden after the flip and must not layer over the front.
- Front and back faces require explicit backface visibility and stacking behavior.

## Failure and Recovery

- Releasing before the threshold returns the card smoothly to its origin.
- Pointer cancellation restores a stable deck state.
- Rapid repeated gestures must not produce duplicate draws.
- Image loading failure must preserve readable text and a stable card frame.
- Share cancellation is not an error; share failure falls back to download when safe.

## Accessibility Requirements for v16

- Provide a reduced-motion path with a short fade/replace transition.
- Provide a keyboard and switch-access alternative to dragging.
- Announce the revealed card through an appropriate live region without repeating hidden back text.
- Maintain readable contrast and scalable type.

## Verification Status

This document records confirmed product intent. v16 browser testing verified language, level, mode, and Begin interactions plus responsive geometry. The complete drag, flip, discard, PNG, and physical-iPhone sequence has not yet been interactively regression-tested.

v17 implements a pointer-distance draw threshold, automatic card flip, keyboard/button draw alternative, and reduced-motion fade. Automated tests cover setup entry and policy functions; physical pointer feel and continuous discard behavior still require browser and device evidence.

v18 introduced whole-shell desktop fitting. v19 preserved that interaction contract and added the first deity artwork/question layout. v20 keeps automatic flip and drag-to-next behavior, adds a stable button alternative, and pins the complete scaled phone to the exact desktop center. Automated browser verification covers entrance, Begin, draw, flip, and non-overlapping art/question/blessing geometry; physical pointer feel and iPhone Share Sheet behavior still require device regression.

## v21 Hidden-Taiwan Reveal / v21 藏台灣揭示

- Pointer down on the artwork starts a 600 ms hold timer without starting the parent card drag.
- Moving more than 12 CSS pixels before commitment cancels the pending reveal.
- At commitment, a gold Taiwan outline and expanding halo pulse at the selected artwork's independent percentage hotspot.
- Pointer release or cancellation after commitment starts a 3-second visibility timer; early release shows nothing.
- Enter and Space trigger the same locator for 3 seconds when the artwork is focused.
- Native image drag, selection, touch callout, and context menu are disabled only inside the artwork target.
- `prefers-reduced-motion: reduce` removes continuous animation while retaining a clearly visible steady outline.
