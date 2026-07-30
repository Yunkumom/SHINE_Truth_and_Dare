# Encounter Cards v36 Mobile ChatGPT Work Integration Design

## Approved outcome

v36 promotes the supplied `Encounter_Cards_v11_Source` mobile ChatGPT Work preview into the governed Encounter Cards product line. The v35 authored source and all v15–v35 releases remain immutable. v36 becomes the current source, PWA, standalone release, Public Web artifact, and Windows-launcher target.

## Source boundary

- Create `Development/Source/Main-App-v36/` from the verified v35 authored source.
- Rebuild the Work preview as authored React/TypeScript and version-owned CSS instead of shipping its compiled v35 bundle plus DOM-mutation patch.
- Treat the Work export as provenance and recovery evidence. After integration, move it intact to `_pending/Encounter_Cards_v11_Source_2026-07-30/` and index it.
- Normalize all temporary V37, V38, and V40 implementation labels to the single public product version V36.

## Mobile settings experience

- Replace the setup-header card-library shortcut with one compact Settings control.
- Keep the setup surface focused on participant fields and the primary Begin action. Move level, card type, exact artwork, exact question, card library, question library, content presentation, and artwork-position controls into an accessible settings dialog.
- Provide five settings sections: general draw settings, card library, question library, card content, and saved artwork positions.
- Use a compact language selector that preserves Chinese, English, and bilingual behavior.

## Card and question management

- Browse all 42 governed artworks in a touch-friendly photo-grid picker grouped by the three available collections.
- Exact artwork and exact question choices remain independent; random remains the default.
- Allow built-in questions to be enabled or disabled for the current session, and allow session-only custom questions by level and Truth/Dare mode.
- Never persist custom question text or disabled-question choices. This prevents user-authored text from crossing the existing privacy boundary.
- Preserve the Level 5 birthday gate. A settings-level request for Level 5 must use the same in-memory 18+ verification flow as v35.

## Card presentation

- Preserve full artwork edges for the Local Stories series and provide touch-accessible per-artwork pan/zoom controls backed by the existing privacy-safe presentation model.
- Combine favorite-face choice, artwork reselection, and artwork adjustment around the draw/card surface without covering the collectible card.
- The card-content section may hide the decorative “真正的你” label or question panel for the current session. The blessing remains mandatory in the drawn card, keepsake, and PNG and cannot be disabled.
- Preserve v35 draw, swipe, flip, Taiwan reveal, keepsake, PNG, sharing, offline, and 430 × 932 behavior.

## Persistence and privacy

- Allowed persistence remains language, global font scale, `encounter-layout-v36`, and `encounter-presentation-v36`.
- Personal fields, birthdays, custom questions, disabled-question lists, exact choices, manager tab, filters, and searches remain memory-only.
- No analytics, account requirement, backend, telemetry, or personal-data transmission is introduced.

## Release boundary and acceptance

1. v15–v35 source and outputs remain byte-for-byte unchanged.
2. v36 visibly identifies itself as V36 and exposes the mobile Work settings experience.
3. All 42 governed artwork faces are available, while question and blessing selection remain independent.
4. Built-in and custom question management respects level, mode, disabled state, and safe fallback.
5. Blessings are always present on the live card, keepsake, and exported PNG.
6. v36 produces a verified PWA, `Apps/Standalone/encounter_cards_v36.html`, and `Apps/Public-Web/v19/`.
7. The launcher and Pages workflow target v36 only after verification succeeds.
8. The original Work export is recoverable under `_pending/` and is never treated as the modular production source.
