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

## v16 Runtime Correction / v16 Runtime 修正

The original `data:text/javascript` modules had a non-hierarchical base URL, so nested `/assets/` imports could not resolve and React did not hydrate. v16 extracts all five modules to `Apps/Standalone/v16-assets/` and maps the original specifiers to normal HTTP-relative files. The launcher supplies the required loopback HTTP origin.

React hydrates the entire document. For compatibility, v16 does not add pre-hydration head/body nodes; it appends layout rules inside the existing style node and updates both visible HTML and embedded RSC viewport metadata.

Desktop data flow:

```text
Open Truth and Dare.cmd
  -> Development/Automation/Tools/serve_truth_and_dare.ps1
  -> python http.server on 127.0.0.1:8765
  -> Apps/Standalone/encounter_cards_v16.html
  -> Apps/Standalone/v16-assets/*.js
  -> React hydration and interactive game
```

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

## v17 Modular Architecture / v17 模組化架構

v17 implements that extraction under `Development/Source/Main-App/src/` using React, TypeScript, and Vite. `App.tsx` owns session UI state; `data/cards.ts` contains 60 bilingual cards; `lib/age-gate.ts`, `game.ts`, `preferences.ts`, and `share.ts` isolate testable policies. Vite creates `Development/Source/Main-App/dist/`; scripts under `Development/Automation/Scripts/` finalize its complete precache and inline the same production JavaScript and CSS into the immutable v17 standalone release under `Apps/Standalone/`.

Personal fields and birthdays are component memory only. Language and font scale retain the existing localStorage keys. No backend, analytics, account, or network data transmission is introduced.
