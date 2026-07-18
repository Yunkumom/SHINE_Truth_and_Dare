# Encounter Card Content Model

## Modes

- **Truth / 真心話:** prompts for reflection, memory, preference, and personal stories.
- **Dare / 小挑戰:** gentle, consent-aware actions appropriate to the selected familiarity level.
- **Surprise / 隨機:** selects from eligible Truth and Dare content.

## Familiarity Levels

| Level | v15 label | Intended boundary |
|---|---|---|
| 1 | 初見 / First meeting | Safe introductions and low-pressure discovery |
| 2 | 熟悉 / Familiar | Shared interests and light personal context |
| 3 | 朋友 / Friends | Memories, values, and playful challenges |
| 4 | 親近 / Close | Deeper trust and relationship reflection |
| 5 | 親密 18+ / Intimate 18+ | Gated adult-oriented intimacy with explicit consent |

## Language Contract

Every active card should provide stable identity plus Chinese and English text. Bilingual mode must render both without changing the card's meaning or hiding essential controls. Translation review should check tone, cultural fit, consent, and equivalent intensity—not only literal wording.

## Recommended Maintainable Schema for v16

```text
id
mode                 truth | dare
level                1..5
title.zh / title.en
prompt.zh / prompt.en
hero_or_deity        optional structured profile
image_asset          approved local asset identifier
content_notes        consent, cultural, or moderation notes
status               draft | reviewed | active | retired
```

This is a future source schema, not a claim about the minified v15 internal object shape.

## Content Safety

- Challenges must allow refusal without penalty.
- Level progression must not imply consent to every prompt.
- Level 5 requires clear adult-content disclosure and an exit path.
- Avoid humiliating, dangerous, coercive, discriminatory, or privacy-invasive challenges.
- Review depictions and descriptions of real cultural, religious, mythic, and historical figures for respectful context.
- Record image provenance and redistribution rights before public release.

## Inventory Status

The v15 package states that it contains 60 levelled prompts. A structured extraction, translation audit, content-safety review, and image-license inventory remain future tasks.

