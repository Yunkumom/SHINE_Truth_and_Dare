# Taiwan Food Journey Cards — Approved Design

## Decision

Add a third offline experience to the v47 mobile home: a collectible 25-card Taiwan food journey that also works as an adult party game and as a printable 63 × 88 mm deck.

## Audience and safety

- Primary audience: consenting adults at an in-person gathering.
- Standard prompts are lively but non-humiliating.
- Optional spicy prompts are hidden until the group explicitly enables them.
- Every prompt can be skipped without penalty.
- No prompt may require eating, drinking alcohol, spending money, contacting another person, exposing private data, or ignoring allergies.
- No names, answers, choices, or usage data are persisted or transmitted.

## Collection structure

- 25 cards total: five each for North, Central, South, East, and Offshore Islands.
- Per region: three widely recognized classics and two distinctive local discoveries.
- Card fronts identify the dish, English name, city or county, region, collection number, flavor keywords, and common allergen labels.
- Card backs contain a concise food note, one standard party prompt, an optional spicy prompt, the prompt type, and a consequence-free skip cue.
- Prompt types rotate across Taste Talk, Food Dare, and Travel Surprise.

## Visual system

- Refined illustrated travel-journal direction.
- Warm ivory paper, fine navy ink, watercolor-and-gouache food imagery, handwritten annotations, map fragments, and travel stamps.
- Region colors: North mist blue, Central tea green, South coral red, East ocean teal, and Offshore sand gold.
- A project-owned original master image is stored under `Library/Images/Food/Taiwan/`; a version-local optimized copy is stored under `Versions/v47/app/encounter/assets/` with documented provenance.
- Color is never the only region or prompt-type signal.

## Interaction flow

1. Enter Taiwan Food Journey from the mobile mode home.
2. Select All or one region.
3. Optionally enable the clearly marked spicy tier after group consent.
4. Reveal a front, discuss or guess the food, and flip the card.
5. Read the food note and complete the displayed Taste Talk, Food Dare, or Travel Surprise prompt.
6. Skip without penalty or draw the next eligible card.
7. Print the complete deck when a physical copy is wanted.

## Print and mobile contract

- Finished physical size: 63 × 88 mm portrait.
- Print bleed target: 3 mm; content safe margin: at least 4 mm.
- Mobile cards preserve `aspect-ratio: 63 / 88` inside the existing 430 × 932 experience.
- Chinese, English, and bilingual presentation modes are supported.
- Printed output contains paired front and back cards for all 25 entries and excludes interactive controls.

## Content sourcing

- Cards describe regional dishes and products, never specific shops.
- Cultural statements stay conservative and trace to Taiwan Tourism Administration references recorded in the card data.
- Runtime remains offline and does not fetch those sources.
- No trademarks, restaurant endorsements, analytics, accounts, backend calls, telemetry, or personal-data storage are introduced.

## Acceptance criteria

- Home exposes Taiwan Food Journey as the third experience.
- Data contains exactly 25 unique cards and exactly five cards per region.
- All three prompt types appear.
- Spicy copy is absent from the visible back until the consent toggle is enabled.
- Region filtering and non-repeating draws work in memory.
- Front/back flipping is keyboard-accessible and reduced-motion safe.
- The deck can be printed with paired front/back faces at 63 × 88 mm.
- The experience stays inside the privacy and offline contract.
