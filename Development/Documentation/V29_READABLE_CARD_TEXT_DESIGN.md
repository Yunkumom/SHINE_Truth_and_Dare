# Encounter Cards v29 Readable Card Text Design

Date: 2026-07-27

## Approved outcome

- Increase the default question text scale by 20% and blessing text scale by 25%.
- Expose independent Question and Blessing font-size controls in the desktop card-presentation editor.
- Normalize both scales to a safe 0.9–1.8 range.
- Apply the same values to the interactive card, synchronized phone preview, keepsake preview, and downloaded/shared PNG.
- Allow text to wrap inside its panel without clipping or crossing the artwork boundary.
- Keep v15–v28 immutable and ship the behavior as v29.

## Interaction

The existing desktop left-side editor remains the only interactive workbench. Under the card presentation settings, Question font size and Blessing font size each receive a numeric field and range slider that stay synchronized. Mobile keeps the existing global A−/A＋ accessibility controls and receives the improved defaults.

## Persistence and privacy

The v29 presentation document stores only artwork geometry and non-personal typography values under a new versioned key. Names, contacts, birthdays, answers, notes, and adult-content choices remain memory-only and are rejected from imported presentation JSON.

## Verification

Deterministic tests cover default values, normalization, editor controls, CSS variables, PNG font scaling, version markers, and privacy rejection. Browser inspection covers the 430 × 932 phone view and desktop synchronized preview using long bilingual question and blessing copy.
