# Encounter Cards v31 Milk-Tea Setup Design

## Approved direction

The setup screen uses one warm, low-contrast visual family: pale milk tea for the canvas, light ivory for cards, warm brown for text, and muted gold for borders and selected states. Large black or near-black setup surfaces are removed. Game and keepsake screens retain their established collectible-card presentation.

## Layout

- Preserve the 430 × 932 mobile canvas and 445 × 932 desktop device frame.
- Preserve the existing editable blocks and setup data flow.
- Give the familiarity and card-type legends their own in-flow title rows with explicit line height and reserved vertical space.
- Keep every legend above its control grid; no negative positioning, overlap, clipping, or ellipsis.
- Keep the Begin control independently docked at the bottom.

## Colour system

- Canvas: pale milk tea, with a subtle warm radial wash.
- Cards: light ivory / cream.
- Text: warm espresso brown.
- Borders and active states: muted antique gold.
- Editor grid, labels, selection outlines, workbench, phone frame, and editor panel: coordinated cream, caramel, and brown tones.
- No black or navy setup/workbench background panels.

## Interaction and boundaries

All form behavior, Levels 1–5, Truth/Dare/Surprise modes, language modes, layout editing, privacy constraints, card gestures, artwork, and export behavior remain unchanged. v30 stays immutable; implementation is a new v31 release.

## Acceptance

At 430 × 932 and in the desktop workbench preview, the complete bilingual headings “選擇熟識程度 · Choose familiarity level” and “想抽哪一種卡？ · Choose a card type” remain visible above their grids. The setup canvas and editing workspace read as a unified pale milk-tea interface without black background regions.
