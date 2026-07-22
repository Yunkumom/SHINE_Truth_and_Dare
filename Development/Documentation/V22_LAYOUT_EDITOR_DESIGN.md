# Encounter Cards v22 Layout Editor Design

## Approved objective

v22 keeps the v21 visual identity, hidden-Taiwan interaction, privacy boundary, languages, levels, and card modes while rebuilding the setup, draw, and keepsake layouts around a larger 63:88 card and a touch-first layout editor.

## Screen structure

- Setup separates identity fields, familiarity, and card type from the bottom-aligned Begin control.
- Draw presents a large layered deck, a direct-manipulation top card, and a bottom fallback action row.
- Keepsake follows the supplied 63:88 reference: deity header, dominant artwork, question, mandatory blessing, and optional contact rows.
- The 430 × 932 canvas remains canonical and the whole canvas remains centered and shrink-to-fit on desktop.

## Layout editor

- Player mode contains no editing chrome.
- Editor mode can target setup, draw, or keepsake preview independently.
- Every registered block exposes direct drag, corner resize, and precise X/Y/width/height/font scale/padding/layer controls.
- A safe-area grid provides optional snapping; minimum dimensions and canvas bounds prevent inaccessible blocks.
- The editor provides at least twenty undo/redo steps, reset-current-screen, reset-all, and JSON import/export.
- Layout JSON uses a versioned schema and contains layout numbers only. It never contains names, contacts, birthdays, answers, notes, or card history.
- Invalid or incompatible imports are rejected without replacing the active document.

## Card interaction

- The top card follows the pointer one-to-one with horizontal tilt while exposing the deck below.
- Releasing before 22% travel returns the card with a spring; crossing the threshold commits exactly one draw.
- A committed card moves to center and flips to its face. Reduced motion uses a short fade.
- A revealed card can be dismissed from its non-art frame to return to the deck. Artwork press remains reserved for the v21 Taiwan reveal.
- The bottom Draw/Next button is a keyboard, switch-access, and gesture-failure fallback only.

## Keepsake and privacy

- The keepsake always contains one blessing.
- Each participant can choose whether their entered contact line is included before export.
- Personal fields remain memory-only and are never written into layout JSON or browser storage.
- The exported PNG excludes editor chrome and the hidden-Taiwan locator.

## Failure and accessibility behavior

- Pointer cancellation and sub-threshold drag restore a stable deck.
- Duplicate pointer completion cannot create duplicate cards.
- Import, image, share, or download failure preserves the current screen and reports a readable status.
- Enter/Space activates fallback controls; editor controls expose labels and keyboard-operable numeric fields.
- Reduced motion removes spring, parallax, and 3D flip while retaining state clarity.

## Acceptance evidence

- Deterministic tests cover layout validation, history, privacy-safe serialization, drag thresholds, duplicate prevention, gesture isolation, contact inclusion, and mandatory blessings.
- Browser checks cover 430 × 932 use of space, card size, setup separation, editor drag/resize, JSON round trip, deck feel, flip, keepsake preview, desktop centering, and console errors.
- v15–v21 release bytes remain unchanged; v22 receives new source, PWA, standalone, public-web, automation, validation, and documentation artifacts.
