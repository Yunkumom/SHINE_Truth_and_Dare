# Simplify Development Directory / 精簡 Development 目錄

## Status / 狀態

Approved by the user on 2026-07-19. Use the conservative option: keep the current v18 development line and its required build, launch, validation, and product-contract files; move recoverable historical or inactive material to `_pending/`.

已於 2026-07-19 獲使用者核准。採保守方案：保留目前 v18、必要建置、啟動、驗證及產品合約檔案；歷史或非作用中內容可回復地移至 `_pending/`。

## Retained Development Surface / 保留範圍

- `Source/Main-App-v18/`: current authored React/TypeScript source and required project configuration.
- `Automation/Scripts/`: only v18 PWA and standalone exporters.
- `Automation/Tools/`: the loopback desktop server used by the root launcher.
- `Tests/`: v18 and repository validators adjusted to the simplified contract.
- `Documentation/`: current product, architecture, animation, card-content, and offline/PWA contracts.
- `README.md`: a human-readable inventory explaining every meaningful retained file.

## Pending Archive / 暫存封存

Move without permanent deletion:

- immutable v17 source and its generated/dependency directories;
- unpublished Public Web v1 source and its publication-only scripts/tests;
- v16 reconstruction-only builder/extractor and v16/v17 validators;
- completed historical designs and implementation plans, including this record after execution;
- generated `node_modules`, `dist`, coverage, and TypeScript build-info files not needed as authored source.

The archive is stored under a dated `_pending/Development-simplification_2026-07-19/` entry and documented in `_pending/index.md`.

## Safety and Compatibility / 安全與相容性

- Do not edit or move immutable releases under `Apps/Standalone/`.
- Preserve the v18 source path so existing v18 build scripts remain valid.
- Keep the launcher functional through the retained loopback server helper.
- Update current governance documents, both public and authorized local reconstruction records as required by repository policy; do not inspect the owner-private blueprint.
- Validate v18 and the complete simplified repository before completion.

## Verification / 驗證

1. Confirm every proposed item exists before moving it and every destination resolves inside `_pending/`.
2. Confirm only the documented current surface remains under `Development/`.
3. Run v18 typecheck, lint, tests, standalone build, focused validation, and full repository validation.
4. Confirm `Development/README.md`, `GUIDE.md`, `_meta/handoff.md`, `_meta/changelog.md`, `_meta/public_blueprint.md`, and `_pending/index.md` describe the resulting structure.
