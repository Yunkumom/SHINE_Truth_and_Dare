# Public Reconstruction Blueprint / 公開重建藍圖

## Purpose / 目的

Recreate Truth and Dare from the maintainable v17 line and isolated public-release line while preserving v15 and v16 rollback releases and the clean three-category repository structure.

以可維護 v17 與隔離的公開 release 產品線重建 Truth and Dare，同時保留 v15、v16 rollback releases 與精簡三分類結構。

## Canonical Structure / 正式結構

```text
Truth and Dare/
├── Apps/
│   ├── Standalone/                    # v15, v16, v17 HTML releases
│   │   └── v16-assets/                # v16 loopback runtime modules
│   └── Public-Web/
│       └── v1/                        # immutable public v1 output
├── Assets/
│   └── Catalog/                       # licences and provenance
├── Development/
│   ├── Source/
│   │   ├── Main-App/                  # v17 React/TypeScript/Vite source
│   │   └── Public-Web/v1/             # public v1 source
│   ├── Automation/
│   │   ├── Scripts/                   # Node build/finalization scripts
│   │   └── Tools/                     # PowerShell build/server tools
│   ├── Tests/                         # release and repository validation
│   ├── Documentation/                 # specs, designs, and plans
│   ├── Governance/                    # meta, Agent, and Skill indexes
│   ├── Human-References/              # human support artifacts
│   └── Pending/                       # recoverable review buffer
├── GUIDE.md                           # complete annotated directory map
├── README.md
├── AGENTS.md
├── Open Truth and Dare.cmd
└── .github/workflows/pages.yml
```

The local owner-private blueprint under `Development/Governance/Meta/` remains excluded from Git and public exports. `GUIDE.md` is the canonical directory annotation.

## Packaged Runtime / 封裝 Runtime

v15 is one self-contained HTML document. v16 extracts five embedded modules into `Apps/Standalone/v16-assets/` and uses a normal HTTP import map. The Windows launcher invokes `Development/Automation/Tools/serve_truth_and_dare.ps1`, which binds only to `127.0.0.1:8765` and opens `/Apps/Standalone/encounter_cards_v16.html`.

Verified browser-local preference keys:

- `encounter-language`
- `encounter-font-scale`

Names, contacts, birthdays, notes, answers, and adult-content choices are privacy-sensitive and must not enter documentation, analytics, logs, or telemetry.

## Build Flows / 建置流程

```text
Development/Source/Main-App/
  -> npm run build:standalone
  -> Development/Source/Main-App/dist/
  -> Apps/Standalone/encounter_cards_v17.html

Development/Source/Public-Web/v1/
  -> npm run build
  -> Development/Automation/Scripts/finalize-public-v1.mjs
  -> Apps/Public-Web/v1/
```

## Reconstruction Steps / 重建步驟

1. Restore the three-category structure documented in `GUIDE.md`.
2. Restore the exact v15 artifact to `Apps/Standalone/encounter_cards_v15.html` and verify SHA-256 `C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0`.
3. Run `powershell -ExecutionPolicy Bypass -File Development/Automation/Tools/build_v16.ps1`.
4. Start the desktop product with `Open Truth and Dare.cmd`; do not use `file://`.
5. Build v17 from `Development/Source/Main-App/` with `npm run build:standalone`.
6. Build public v1 from `Development/Source/Public-Web/v1/`, then run `node Development/Automation/Scripts/finalize-public-v1.mjs`.
7. Run `powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1`.
8. Verify `Development/Tests/validate_public_v1.ps1` before any optional publication.
9. Publish only `Apps/Public-Web/` through the approved Pages workflow. After publication, create matching source/output v2 directories for later changes.

## Post-Rebuild Checklist / 重建後檢查

- [ ] Root contains only `Apps/`, `Assets/`, `Development/`, required entry files, and Git/GitHub infrastructure.
- [ ] Every organizational directory is locally annotated and every repository-controlled directory appears in `GUIDE.md`.
- [ ] v15, v16, and preserved release hashes match their contracts.
- [ ] The local server binds only to loopback and opens the canonical Apps URL.
- [ ] Public v1 matches its manifest and uses relative asset URLs.
- [ ] The owner-private blueprint is ignored while this public blueprint remains trackable.
- [ ] No backend, analytics, secret, private path, personal data, or unlicensed asset appears in public output.

## Source / 來源

Canonical public repository: `https://github.com/Yunkumom/SHINE_Truth_and_Dare`. Publication and deployment require separate approval.
