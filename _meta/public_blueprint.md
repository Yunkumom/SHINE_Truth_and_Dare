# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around active v33 while preserving immutable standalone v15–v33 and recoverable development history.

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/Standalone/                         # immutable v15–v33 releases
├── Apps/Public-Web/v2/ … /v16/               # preserved public releases; v16 is current
├── Assets/Catalog/  Assets/Deities/  Assets/Zodiac/ # provenance and reusable masters
├── Development/
│   ├── Source/Main-App-v18/ … /v32/         # preserved source lines
│   ├── Source/Main-App-v33/                 # current authored source + verified dist
│   ├── Source/Public-Web/v2/ … /v16/         # versioned public recipes
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
  -> http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v33.html
```

v33 preserves v32 behavior while adding twelve Taiwan Astral Guardians, a country/culture-ready artwork registry, a scalable question-pack registry, and independent exact artwork/question choices behind a collapsed panel. Random remains default and blessings remain mandatory. Public Web v16 is deployed from `Apps/Public-Web/v16/`.

Allowed local keys are `encounter-language`, `encounter-font-scale`, `encounter-layout-v33`, and `encounter-presentation-v33`. The latter two contain layout geometry, artwork IDs, typography scales, and visual values only. Desktop mode, candidate faces, exact artwork/question preferences, and search are session-only. Personal inputs must not enter persistence, logs, analytics, telemetry, or a backend.

## Reconstruction / 重建

1. Restore the canonical root entries documented in `GUIDE.md`.
2. Restore standalone v15–v33, v16 runtime assets, and Public Web v2–v16.
3. Restore `Development/Source/Main-App-v33/`, its v33/v16 automation scripts, server helper, validators, documentation, governed v30 deity masters, and v33 Taiwan zodiac masters; retain v18–v32 as preserved lines.
4. Restore `_pending/` only when historical or recoverable generated evidence is required.
5. Run `Open Truth and Dare.cmd` for the desktop release.
6. Run `Development/Tests/validate_repository.ps1` before claiming completion.
7. For future development, run `npm ci` in `Development/Source/Main-App-v33/` and create a new version rather than overwriting v33.
8. Public deployment URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`.

Canonical repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
