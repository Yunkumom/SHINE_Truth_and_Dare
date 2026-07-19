# Handoff / 交接

## Clean Repository Structure / 精簡結構

- Root is organized around `Apps/`, `Assets/`, and `Development/`.
- `GUIDE.md` is the canonical annotated map; organizational folders also contain local `README.md` files.
- Completed standalone releases are under `Apps/Standalone/`; GitHub Pages output is under `Apps/Public-Web/`.
- Reusable asset governance is under `Assets/Catalog/`.
- Source, automation, tests, documents, governance, human references, and retained failed artifacts are under `Development/`.
- No project content was permanently deleted during reorganization.

## Verified Product State / 已驗證產品狀態

- Current modular source: `Development/Source/Main-App/src/`
- Current PWA build: `Development/Source/Main-App/dist/`
- Current standalone release: `Apps/Standalone/encounter_cards_v17.html`
- Public v1 source: `Development/Source/Public-Web/v1/`
- Public v1 output: `Apps/Public-Web/v1/`
- Desktop entry point: `Open Truth and Dare.cmd`
- Local URL: `http://127.0.0.1:8765/Apps/Standalone/encounter_cards_v16.html`
- Primary layout: iPhone Pro Max at 430 × 932 CSS pixels
- Immutable v15 SHA-256: `C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0`
- Preserved v16 SHA-256: `A115066893BFECFC9060C0D31F71CD18E8EC1D47BC76E964F0A30C43D609C352`
- Preserved standalone v17 SHA-256: `832CDC71A4BD41E3685381D1E0094A47371F8B558D51EE23F0279C2702440FAA`
- Repository remains local; no push or deployment was performed.

## Build and Validation / 建置與驗證

```powershell
# Full repository
powershell -ExecutionPolicy Bypass -File Development/Tests/validate_repository.ps1

# v17
Set-Location Development/Source/Main-App
npm run typecheck
npm run lint
npm test
npm run build:standalone
```

Public v1 builds in `Development/Source/Public-Web/v1/`, then finalizes through `Development/Automation/Scripts/finalize-public-v1.mjs` and validates with `Development/Tests/validate_public_v1.ps1`.

## Known Limits / 已知限制

- Drag, continuous flip, discard, PNG generation, Web Share, physical iPhone Safari, installation, and offline update behavior still need full on-device regression.
- Packaged v15/v16 artwork provenance remains incomplete; future reusable artwork must enter `Assets/` with a catalogue record.
- Failed intermediate builds remain indexed under `Development/Pending/` until a human approves disposal.
- GitHub Pages is prepared but not pushed or deployed.

## Exact Next Action / 明確下一步

Complete fresh full-build validation from the new paths, then perform browser and physical-iPhone regression. Deployment remains separate approval.
