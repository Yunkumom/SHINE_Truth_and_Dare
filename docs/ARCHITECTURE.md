# Encounter Cards Architecture

## Current v15 Package / 目前 v15 封裝

The baseline is one approximately 11.7 MB HTML document. It contains:

- compiled Tailwind CSS and product styling;
- a ViNext import map with five embedded `data:text/javascript` modules;
- embedded React and React DOM runtime code;
- an approximately 8.2 MB page module containing application logic, card data, and image payloads;
- React Server Component payload scripts;
- embedded favicon and product images;
- no external JavaScript module and no detected `fetch()` request.

目前基準是一份約 11.7 MB 的 HTML，內含編譯 CSS、五個 import-map JavaScript module、React runtime、卡牌邏輯與資料、圖片，以及 React Server Component payload。未發現外部 JavaScript 或 `fetch()` 呼叫。

## Runtime Data Flow / 執行資料流

1. The browser parses the standalone HTML and compiled CSS.
2. The import map maps virtual `/assets/*.js` paths to embedded data URLs.
3. The module entry imports the embedded application bundle.
4. React reconstructs the interactive Encounter Cards interface from the embedded payload.
5. Card state, gestures, and selected prompts run in the browser.
6. Language and font scale may be persisted through `encounter-language` and `encounter-font-scale`.
7. PNG export renders a card to canvas, creates a PNG file, attempts `navigator.share`, and falls back to an anchor download.

## Security and Privacy Surface / 安全與隱私面

- No environment variables, API credentials, backend, or account session are required.
- The only verified persistent keys are language and font scale preferences.
- User-entered names, contacts, birthdays, notes, and responses must remain client-side unless a future design explicitly changes the boundary.
- The large packaged module must be treated as generated code; direct edits are fragile and difficult to review.

## Source Boundary / 原始碼邊界

The package supports preservation, execution, comparison, and bounded static inspection. It is not suitable for normal component-level maintenance because original file boundaries, TypeScript types, meaningful symbols, tests, and asset provenance are absent.

A future v16 extraction should create explicit modules for:

- application shell and screens;
- language and typography preferences;
- player and session state;
- level selection and age gate;
- card data and content validation;
- drag, flip, and discard state machine;
- card rendering and PNG export;
- image assets, licensing, and attribution;
- unit, interaction, responsive, accessibility, and export tests.

v15 must remain unchanged as the regression oracle during extraction.

