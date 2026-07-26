# V26 iPhone Frame and Card Presentation Editor Design

## Status

Approved on 2026-07-26.

## Goals

- Preserve the 430 × 932 mobile application contract.
- Represent an iPhone Pro Max in the desktop workspace using the supplied physical ratio: 78.0 mm × 163.4 mm.
- Give the desktop editor a large working view on the left and a synchronized phone preview on the right.
- Let the current card artwork and blessing presentation be adjusted while drawing cards.
- Apply the same presentation settings to the interactive card, keepsake preview, and exported PNG.

## Device frame

At a 932 px reference height, the physical ratio produces a 445 px outer width (`round(932 × 78 / 163.4)`). The desktop-only simulated device therefore uses a 445 × 932 outer frame. The 430 × 932 application canvas remains centered inside it, leaving 7.5 px of visual chassis on each side. Mobile rendering does not include the desktop chassis.

## Presentation controls

The editor exposes two groups while a card is available:

- Artwork: horizontal focus, vertical focus, zoom, and artwork-region height.
- Blessing: font scale, line height, height, padding, horizontal offset, and vertical offset.

Artwork focus and zoom are stored per artwork ID so one deity can be corrected without changing every other image. Region and blessing typography settings are shared card-presentation defaults. Values are normalized into safe ranges so neither the editor nor PNG export can create an invalid layout.

## Persistence and privacy

Only non-personal presentation values and artwork IDs are stored locally. Names, contact information, answers, birthdays, notes, and adult-content choices are excluded. Imported editor JSON is rejected when it includes privacy-sensitive keys.

## Output synchronization

The large desktop workbench is interactive. The right phone view is synchronized and inert. Both previews, the keepsake, and PNG export use the same normalized presentation document. Existing v15–v25 releases and v25 authored source remain immutable; this work ships as v26.
