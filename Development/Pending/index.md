# Pending Human Review / 待人工確認

Failed v16 and v17 build intermediates are retained for human review.

保留失敗的 v16 與 v17 中間產物供人工確認。

| Item | Original Path | Moved Date | Reason | Suggested Action | Human Decision |
|---|---|---|---|---|---|
| `encounter_cards_v16_failed-data-module_2026-07-18.html` | `app/encounter_cards_v16.html` | 2026-07-18 | Browser evidence showed that embedded `data:` modules could not resolve nested `/assets/` imports, so React did not hydrate. | Keep until the corrected v16 is approved, then archive or remove only with human approval. | Pending |
| `encounter_cards_v16_failed-hydration-mismatch_2026-07-18.html` | `app/encounter_cards_v16.html` | 2026-07-18 | Extracted modules loaded, but added head/body nodes and unsynchronized RSC viewport metadata caused React hydration error #418. | Keep until the corrected v16 is approved, then archive or remove only with human approval. | Pending |
| `encounter_cards_v17_failed-unescaped-script_2026-07-19.html` | `app/encounter_cards_v17.html` | 2026-07-19 | The first standalone exporter did not escape literal closing script tags inside the bundle, so the browser rendered JavaScript as text. | Retain as failed-build evidence until a human approves disposal. | Pending |
| `encounter_cards_v17_failed-replacement-token_2026-07-19.html` | `app/encounter_cards_v17.html` | 2026-07-19 | Replacement-string tokens inside the bundle expanded to the original external script tag; callback replacement was required. | Retain as failed-build evidence until a human approves disposal. | Pending |
| `encounter_cards_v17_failed-classic-script-order_2026-07-19.html` | `app/encounter_cards_v17.html` | 2026-07-19 | The inlined bundle lost `type=module` and executed before the root element existed, producing a blank page. | Retain as failed-build evidence until a human approves disposal. | Pending |
