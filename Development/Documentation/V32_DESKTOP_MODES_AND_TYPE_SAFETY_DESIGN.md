# Encounter Cards v32 Desktop Modes and Typography Safety Design

## Approved direction

v32 separates authoring from play. Desktop users choose between a dedicated Settings mode and a dedicated Test mode. Mobile users open the normal playable application without desktop editing chrome. v31 remains immutable.

## Root cause addressed

- v31 treats every desktop workbench as actively editable, so layout movement intercepts ordinary controls and card gestures.
- Direct pointer movement uses unscaled viewport deltas against a scaled 430 × 932 canvas, causing blocks to move by the wrong distance.
- Editing, swipe-to-draw, and ordinary buttons currently compete for the same pointer events.
- Several card headings use fixed-height containers or overly tight line boxes that can crop Chinese glyphs.

## Desktop modes

### Settings mode

- Show a clear Settings/Test mode switch outside the 430 × 932 application canvas.
- Retain the enlarged workbench, the docked settings panel, and the phone-sized live preview.
- Numeric fields and sliders are the primary adjustment mechanism.
- Direct drag/resize is off by default and requires an explicit `Direct manipulation` toggle.
- When enabled, pointer deltas are converted from rendered workbench coordinates into unscaled canvas coordinates.
- Interactive application controls inside editable blocks do not accidentally start layout movement.
- Reset, undo, redo, JSON import, and JSON export remain available.

### Test mode

- Hide the layout editor, grid, selection outlines, labels, handles, and inactive phone preview.
- Present one horizontally and vertically centred iPhone Pro Max frame.
- Run the real application interaction contract: data entry, language selection, Levels 1–5, modes, swipe/flip, fallback draw button, Taiwan reveal, keepsake, and download/share.
- No layout movement is possible in Test mode.

## Mobile behavior

- Viewports below the desktop workspace breakpoint open the normal playable application.
- The desktop mode switch and docked editor are not rendered.
- The mobile editing trigger is removed so touch input cannot enter the desktop authoring workflow.
- The 430 × 932 design canvas continues to fit the device viewport through the existing phone scaling contract.

## Expandable deck and artwork selection

- The setup screen includes a visually quiet, collapsed `進階選牌 · Advanced deck choice` disclosure.
- Its default is `全部隨機`, preserving the current one-tap setup.
- A player may choose a collection and then optionally lock one preferred artwork. Locking artwork never locks the question or blessing; those remain independently selected from the active level and Truth/Dare mode.
- In random mode, the draw screen offers a compact fan of three candidate artwork backs/thumbnails so another participant may choose a preferred face before drawing. A specific entry choice remains locked and shows only that face. The question and blessing remain hidden and random in both paths.
- The current v32 catalog contains one available collection, `台灣神明`, using the existing 18 governed artworks. Future collections are represented in the information architecture, but unavailable collections are labelled `規劃中 · Planned` and are not selectable.
- Planned collection families include `台灣星象`, `各國神明`, and `各國星座`. Regional metadata supports Taiwan and additional countries without encoding country names into selection logic.

## Collection model

Each collection has a stable ID, family (`deity`, `astral`, or future extension), region code, bilingual name and description, availability state, and artwork IDs. Artwork selection uses a separate preference with `random`, `candidates`, or `specific` behavior. This keeps artwork, question, and blessing independent and makes later asset additions data-driven.

## Typography safety

- No visible text may be clipped on the top, bottom, left, or right in Chinese, English, or bilingual mode.
- Deity title, card eyebrow, English deity name, setup headings, legends, field labels, questions, blessings, metadata, buttons, editor labels, and status copy receive safe line boxes.
- Card headers must use content-safe padding and line height rather than vertically centring text inside an undersized fixed box.
- Long text wraps within its panel. It may scroll only in the established question/blessing content region; headings and controls cannot be hidden or ellipsized.
- Tests cover representative CJK glyphs with tall and descending forms, including the Mazu header shown in the reported defect.

## Data and privacy boundaries

- Preserve all v31 privacy rules. Personal inputs remain in component memory and never enter layout or presentation persistence.
- Only mode-independent layout geometry and non-personal presentation preferences may persist.
- Do not add analytics, accounts, backend transmission, or new network services.

## Acceptance criteria

1. Desktop opens with an obvious Settings/Test switch.
2. Test mode supports ordinary clicks and card gestures without moving any layout block.
3. Settings mode defaults to numeric/slider adjustment; direct manipulation is visibly off.
4. With direct manipulation enabled at any desktop scale, a rendered pointer movement maps correctly to 430 × 932 canvas coordinates and stays within bounds.
5. Mobile renders no editor or desktop mode switch and remains fully playable.
6. At 430 × 932, the setup, game, and keepsake screens contain no clipped visible text in Chinese, English, or bilingual mode.
7. The full deity header, including `護行之卡`, `媽祖`, and its English name, remains inside the header box with visible glyph clearance.
8. Advanced deck choice is collapsed by default, can select the Taiwan deity collection, and can lock or clear a specific artwork without changing question/blessing randomness.
9. Random mode lets another person choose among candidate artworks without revealing or fixing the question; specific mode cannot be overridden on the draw screen.
10. Planned international deity and astral collections are visible only as non-interactive roadmap labels until governed assets and provenance exist.
