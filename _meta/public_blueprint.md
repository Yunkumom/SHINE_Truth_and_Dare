# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Reconstruct the repository around active v34 while preserving immutable standalone v15–v34 and recoverable development history.

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/Standalone/                         # immutable v15–v34 releases
├── Apps/Public-Web/v2/ … /v17/               # preserved public releases; v17 is current
├── Assets/Catalog/  Assets/Deities/  Assets/Zodiac/ # provenance and reusable masters
├── Development/
│   ├── Source/Main-App-v18/ … /v33/         # preserved source lines
│   ├── Source/Main-App-v34/                 # current authored source + verified dist
│   ├── Source/Public-Web/v2/ … /v17/         # versioned public recipes
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
  -> http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v34.html
```

v34 preserves v33 behavior while retaining the twelve classic Taiwan Astral Guardians and adding twelve Taiwan Zodiac Local Stories. The collapsed panel now starts with an explicit series-version choice, shows bilingual Taiwanese feature notes, and keeps exact artwork/question choices independent. Random remains default and blessings remain mandatory. Public Web v17 is produced at `Apps/Public-Web/v17/`.

Allowed local keys are `encounter-language`, `encounter-font-scale`, `encounter-layout-v34`, and `encounter-presentation-v34`. The latter two contain layout geometry, artwork IDs, typography scales, and visual values only. Desktop mode, candidate faces, exact artwork/question preferences, and search are session-only. Personal inputs must not enter persistence, logs, analytics, telemetry, or a backend.

## Reconstruction / 重建

1. Restore the canonical root entries documented in `GUIDE.md`.
2. Restore standalone v15–v34, v16 runtime assets, and Public Web v2–v17.
3. Restore `Development/Source/Main-App-v34/`, its v34/v17 automation scripts, server helper, validators, documentation, governed v30 deity masters, v33 classic zodiac masters, and v34 Local Stories masters; retain v18–v33 as preserved lines.
4. Restore `_pending/` only when historical or recoverable generated evidence is required.
5. Run `Open Truth and Dare.cmd` for the desktop release.
6. Run `Development/Tests/validate_repository.ps1` before claiming completion.
7. For future development, run `npm ci` in `Development/Source/Main-App-v34/` and create a new version rather than overwriting v34.
8. Public deployment URL: `https://yunkumom.github.io/SHINE_Truth_and_Dare/`.

Canonical repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`.
