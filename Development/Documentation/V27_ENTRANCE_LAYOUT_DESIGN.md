# v27 Entrance Layout Design / v27 抽卡輸入介面設計

## Approved outcome / 核准成果

v27 keeps the v26 desktop workspace, 430 × 932 phone canvas, game flow, privacy boundary, card editor, and right-side phone preview. It changes only the setup/entrance presentation so Chinese, English, and bilingual copy remain readable without clipping or overlap.

The visual system follows the v16 reference: deep navy structure, parchment input panels, antique-gold rules and selected states, ink text, and restrained muted red accents. Every setup section uses the same tokens, corner language, typography rhythm, and shadow depth.

## Layout contract / 版面合約

- Header and hero remain separate navy regions with safe multi-line title sizing.
- Participant fields, familiarity, and card-type controls remain distinct editable blocks but read as one coordinated parchment form.
- Field labels wrap normally; they may never use ellipsis or be cut by the input below.
- Fieldset legends live fully inside their panels, with reserved height before their grids.
- The begin action stays at the bottom and never overlays the card-type choices.
- Desktop left-side editing remains fully interactive; the right phone preview stays synchronized.
- v26 remains immutable. v27 uses independent layout and presentation storage keys.

## Palette / 配色

| Role | Token |
| --- | --- |
| Structure | deep navy `#061722`, deepest navy `#020b11` |
| Panels | parchment `#f2e7d1`, pale parchment `#fbf4e6` |
| Rules / selection | antique gold `#c5a25f`, deep gold `#896735` |
| Main copy | ink `#1b211f` |
| Secondary copy | muted brown `#70644e` |
| Accent | muted red `#8d3932` |

## Acceptance checks / 驗收

Contract tests verify palette tokens, safe field labels and legends, non-overlapping default geometry, versioned local keys, and v27 markers. Visual inspection covers desktop and mobile at Chinese, English, and bilingual modes before immutable outputs are generated.
