# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around active v32 while preserving immutable standalone v15–v32 and recoverable development history.

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/Standalone/                         # immutable v15–v32 releases
├── Apps/Public-Web/v2/ … /v15/               # preserved public releases; v15 is current
├── Assets/Catalog/  Assets/Deities/         # provenance and v30 portrait-safe masters
├── Development/
│   ├── Source/Main-App-v18/ … /v31/         # preserved source lines
│   ├── Source/Main-App-v32/                 # current authored source + verified dist
│   ├── Source/Public-Web/v2/ … /v15/         # versioned public recipes
│   ├── Automation/Scripts/                  # versioned builders/exporters
│   ├── Automation/Tools/                    # loopback launcher
│   ├── Tests/                               # release and repository contracts
│   └── Documentation/                       # product designs and plans
├── _meta/  _agent/  _human/
├── _pending/                                # recoverable retired/generated state
├── GUIDE.md  README.md  AGENTS.md
└── Open Truth and Dare.cmd
```

The owner-private blueprint remains local-only and ignored. Proposed deletions first enter `_pending/` and `_pending/index.md`.

## Current Runtime / 目前 Runtime

```text
Open Truth and Dare.cmd
  -> Development/Automation/Tools/serve_truth_and_dare.ps1
  -> http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v32.html
```

v32 preserves the complete v31 visual, artwork, typography, export, and privacy behavior while adding separate desktop Settings/Test modes, mobile play-only behavior, stable opt-in editing, safe text, and governed artwork choice. Public Web v15 is deployed from `Apps/Public-Web/v15/`.

Allowed local keys are `encounter-language`, `encounter-font-scale`, `encounter-layout-v32`, and `encounter-presentation-v32`. The latter two contain layout geometry, artwork IDs, typography scales, and visual values only. Desktop mode, candidate faces, and advanced deck preference are session-only. Personal inputs must not enter persistence, logs, analytics, telemetry, or a backend.

## Reconstruction / 重建

1. Restore the canonical root entries documented in `GUIDE.md`.
2. Restore standalone v15–v32, v16 runtime assets, and Public Web v2–v15.
3. Restore `Development/Source/Main-App-v32/`, its v32/v15 automation scripts, server helper, validators, documentation, and governed v30 masters; retain v18–v31 as preserved lines.
4. Restore `_pending/` only when historical or recoverable generated evidence is required.
5. Run `Open Truth and Dare.cmd` for the desktop release.
6. Run `Development/Tests/validate_repository.ps1` before claiming completion.
7. For future development, run `npm ci` in `Development/Source/Main-App-v32/` and create a new version rather than overwriting v32.
8. Public deployment URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`.

Canonical repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
