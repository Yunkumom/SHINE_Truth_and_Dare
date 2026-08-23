# V47 phone-first and desktop showcase design

## Decision

V47 opens in a phone-first surface on every device. The phone surface keeps the governed 430 × 932 application canvas while presenting it as an iPhone 17 Pro Max experience. A top-right hamburger is the primary place for experience navigation, display switching, settings, and screen-specific card tools.

Desktop no longer opens the owner editor automatically at a width breakpoint. Users explicitly choose one of three surfaces:

1. `phone` — default on every fresh load;
2. `showcase` — a presentation-oriented desktop stage with navigation, a centered interactive device, and contextual explanation;
3. `studio` — the existing advanced owner editing workspace.

## Structure

- The choice screen heading visibly includes `V47` beside `破冰遊戲選擇` or `CHOOSE AN ICEBREAKER`.
- A reusable `SurfaceMenu` owns the hamburger, surface switching, and navigation between the three experiences.
- Direct keepsake actions—choose card, upload photo, and adjust image—remain contextual items in the same hamburger.
- Food Journey print remains a contextual item in the same hamburger.
- Truth-or-Dare settings and revealed-card adjustment remain contextual items in the same hamburger.
- Desktop showcase uses the same application state as phone mode; switching surfaces must not reset the current card or private in-memory inputs.

## Desktop showcase

The showcase is a quiet three-part desktop composition: an experience rail on the left, an enlarged interactive device stage in the center, and a contextual presentation panel on the right. It is for demonstrating and playing the product on a computer, not for editing raw layout values. The advanced studio remains reachable from the hamburger.

## Privacy and failure behavior

- Surface choice is session-only and defaults to `phone` after reload.
- No new analytics, backend calls, telemetry, accounts, or persistence are added.
- If the viewport cannot comfortably display the showcase or studio, the menu keeps phone mode available and the layout remains scroll-safe.
- Existing local PNG/share and offline behavior remains unchanged.

## Acceptance criteria

1. Fresh desktop and mobile loads both start in phone mode.
2. The choice heading visibly reads `破冰遊戲選擇 · V47` or `CHOOSE AN ICEBREAKER · V47`.
3. The hamburger can switch among phone, desktop showcase, and advanced studio.
4. The hamburger can navigate among Home, Direct Keepsake, Truth or Dare, and Taiwan Food Journey.
5. Contextual card controls are inside the relevant hamburger.
6. Desktop showcase is visually distinct from the editor and keeps an interactive centered device.
7. Switching surfaces preserves current in-memory experience state.

## Approved direct-keepsake refinement — 2026-08-23

The direct-keepsake composer keeps the same content order on every surface but uses an intentional two-row action panel: the blessing label and selector occupy one complete first row, and the download/share button occupies one complete second row. A custom blessing textarea, when selected, sits between those rows. The panel must size to its contents rather than stretch into an empty white block.

On a real phone, the screen remains full-width and scroll-safe under the dynamic browser viewport. On a desktop, phone mode preserves the governed 430 × 932 logical canvas and iPhone 17 Pro Max proportions while allowing the entire phone to scale above 1× when both available width and height permit; scaling must never crop the phone or change card geometry. The desktop showcase remains a separate presentation surface.

Acceptance additions:

1. The blessing control is a single full-width row and does not collide with or truncate behind the action button.
2. Download/share is a visually balanced full-width row immediately below the blessing control, or below the custom textarea when present.
3. The controls panel has natural content height with no stretched empty region.
4. Desktop phone mode can exceed 1× on a sufficiently large viewport, is capped at a tasteful presentation scale, remains centered, and preserves 430:932 proportions.
5. Real-phone mode does not apply desktop enlargement and remains scroll-safe with browser chrome visible.

## Approved menu, theme, language, and card-editor expansion — 2026-08-23

The hamburger becomes a compact control center rather than a grid of large destinations. Display modes are one horizontally swipeable, scroll-snapping rail containing `iPhone 17 Pro Max`, `桌面展示`, and `進階功能`. Destinations live inside a collapsed disclosure whose summary identifies the current experience; opening it reveals a second horizontally swipeable, scroll-snapping rail. Both rails remain keyboard accessible and expose selected state.

The same global menu includes two interface preferences:

- `白天 · DAY` and `夜間 · NIGHT` provide an eye-comfort theme switch; this changes application chrome and controls but does not recolor the keepsake artwork or exported PNG.
- A native language dropdown uses English for first use and currently offers English, 台灣繁中, and bilingual mode to preserve the product contract. The option registry is structured so Japanese, Korean, and Thai can be added later without redesigning the menu; unavailable languages are not shown as working choices.

The direct-keepsake adjustment action opens one editor with `照片`, `版面`, and `文字` tabs. Photo retains X, Y, and zoom. Layout adds blessing-panel height; increasing it grows upward and reduces the image viewport while preserving the 63:88 card boundary. Text adds an editable current-card title, a font-family dropdown with `典藏故事書`, `溫暖楷體`, and `現代黑體`, plus separate title-size and blessing-size range controls. Changes remain draft-only until Save, Cancel discards them, Reset restores the selected artwork defaults, and saved values affect both the live preview and generated PNG for the current direct keepsake.

All added state is local UI or local export state. Theme is session-only, existing language preference remains local-device only, direct-card edits remain component memory only, and no backend, analytics, telemetry, account, personal-data persistence, or runtime font download is introduced.
