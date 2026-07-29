# Encounter Cards v35 Entrance Card Library Design

## Approved outcome

v35 adds a quiet list control to the setup header. Opening it replaces the setup surface with an in-app card library where all 42 governed card faces can be inspected as complete collectible cards. The normal first-load experience remains random and the existing advanced exact-choice panel remains available.

## Interaction

- The setup header exposes one compact `卡庫 · Library` list button.
- The library shows one complete card in the centre, with restrained previous/next edge previews.
- Horizontal touch or mouse drag moves the card one-to-one and commits after a deliberate threshold. A short drag springs back.
- Previous/next buttons and Left/Right keyboard keys provide equivalent navigation.
- Browsing wraps from the last card to the first card and vice versa.
- Filters expose all cards, Taiwan deities, classic Taiwan zodiac, and Taiwan Zodiac Local Stories.
- The counter always states the current position and filtered total.
- `選擇這張卡面 · Choose this face` sets an exact artwork preference and closes the library. It never fixes the question or blessing.
- Closing the library without choosing leaves the existing preference unchanged.

## Card preview

Each library item uses the full v16-inspired collectible-card composition: title band, portrait-safe artwork, question panel, and mandatory blessing. The question and blessing are deterministic preview examples so browsing does not expose or mutate the live draw session. A visible note explains that the real draw still selects question and blessing independently.

Only the previous, current, and next cards are rendered at one time. This keeps all 42 faces available without keeping 42 full image-and-card trees active on mobile.

## Visual and responsive contract

- Preserve the 430 × 932 application canvas and the desktop physical-ratio phone frame.
- Use the existing milk-tea, ivory, caramel, espresso, muted-gold, and restrained navy family.
- Keep the complete card inside the available library viewport with no clipped title, question, blessing, face, or crown.
- Mobile and desktop Test mode are fully interactive. Desktop Settings keeps its existing workbench behavior and inert phone preview.
- Reduced-motion mode removes spring and parallax in favour of a short opacity transition.

## Accessibility and privacy

- The library is an accessible modal dialog with a labelled close control, filter group, live position text, keyboard navigation, and visible focus states.
- No personal fields, browsing position, filter, or selected artwork are transmitted. Selection remains session-only, matching v34 exact-choice behavior.
- No analytics, account, backend, network request, or new persistent storage is introduced.

## Acceptance

1. The entrance exposes a compact card-library list button without disturbing the v16-quality hierarchy.
2. All 42 governed artworks are reachable and can be viewed as full cards.
3. Left/right swipe, mouse drag, buttons, and keyboard navigation select exactly one adjacent card per committed action; incomplete gestures return safely.
4. Collection filters report the correct totals: 42 all, 18 deities, 12 classic zodiac, and 12 Local Stories.
5. Choosing a face sets only the artwork preference; question and mandatory blessing remain independent.
6. The complete v34 mobile, desktop, language, level, mode, draw, Taiwan reveal, keepsake, offline, export, and privacy contracts remain intact.
