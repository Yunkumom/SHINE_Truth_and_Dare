# Pending Human Review / 待人工確認

One failed intermediate v16 build is retained for human review.

保留一份失敗的 v16 中間產物供人工確認。

| Item | Original Path | Moved Date | Reason | Suggested Action | Human Decision |
|---|---|---|---|---|---|
| `encounter_cards_v16_failed-data-module_2026-07-18.html` | `app/encounter_cards_v16.html` | 2026-07-18 | Browser evidence showed that embedded `data:` modules could not resolve nested `/assets/` imports, so React did not hydrate. | Keep until the corrected v16 is approved, then archive or remove only with human approval. | Pending |
| `encounter_cards_v16_failed-hydration-mismatch_2026-07-18.html` | `app/encounter_cards_v16.html` | 2026-07-18 | Extracted modules loaded, but added head/body nodes and unsynchronized RSC viewport metadata caused React hydration error #418. | Keep until the corrected v16 is approved, then archive or remove only with human approval. | Pending |
