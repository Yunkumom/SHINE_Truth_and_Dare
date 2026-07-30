# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around active v36 while preserving immutable standalone v15–v36 and recoverable development history.

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/Standalone/                         # immutable v15–v36 releases
├── Apps/Public-Web/v2/ … /v19/              # immutable public releases; v19 is current
├── Assets/Catalog/  Assets/Deities/  Assets/Zodiac/ # provenance and reusable masters
├── Development/
│   ├── Source/Main-App-v18/ … /v35/         # preserved source lines
│   ├── Source/Main-App-v36/                 # current authored source + verified dist
│   ├── Source/Public-Web/v2/ … /v19/        # versioned public recipes
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
  -> http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v36.html
```

v36 preserves the complete v35 experience and integrates the supplied mobile ChatGPT Work settings as authored React/TypeScript. Five tabs cover draw settings, all 42 governed artworks, session-only question management, content controls, and saved artwork positions. Artwork and question choices stay independent, custom questions and disabled/exact choices are memory-only, and blessings remain mandatory. Public Web v19 is produced at `Apps/Public-Web/v19/`.

Allowed local keys are `encounter-language`, `encounter-font-scale`, `encounter-layout-v36`, and `encounter-presentation-v36`. The latter two contain layout geometry, artwork IDs, typography scales, and visual values only. Desktop mode, candidate faces, exact artwork/question preferences, custom questions, disabled questions, and search are session-only. Personal inputs must not enter persistence, logs, analytics, telemetry, or a backend.

## Reconstruction / 重建

1. Restore the canonical root entries documented in `GUIDE.md`.
2. Restore standalone v15–v36, v16 runtime assets, and Public Web v2–v19.
3. Restore `Development/Source/Main-App-v36/`, its v36/v19 automation scripts, server helper, validators, documentation, governed v30 deity masters, v33 classic zodiac masters, and v34 Local Stories masters; retain v18–v35 as preserved lines.
4. Restore `_pending/` only when historical or recoverable generated evidence is required.
5. Run `Open Truth and Dare.cmd` for the desktop release.
6. Run `Development/Tests/validate_repository.ps1` before claiming completion.
7. For future development, run `npm ci` in `Development/Source/Main-App-v36/` with Node 26 and create a new version rather than overwriting v36.
8. Public deployment URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`.

Canonical repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
