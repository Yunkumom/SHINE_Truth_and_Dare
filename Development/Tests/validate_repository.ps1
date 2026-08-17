$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-RepositoryCondition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$requiredFiles = @(
    'README.md', 'GUIDE.md', 'AGENTS.md', '.gitattributes', '.gitignore', '.firebaserc', 'firebase.json', 'Open Truth and Dare.cmd',
    '_meta/purpose.md', '_meta/roadmap.md', '_meta/handoff.md', '_meta/owner_private_blueprint.md', '_meta/public_blueprint.md', '_meta/changelog.md',
    '_agent/README.md', '_agent/Skills/README.md', '_human/README.md', '_human/code-learning-tool.html', '_pending/README.md', '_pending/index.md',
    'Apps/Standalone/encounter_cards_v15.html', 'Apps/Standalone/encounter_cards_v16.html',
    'Apps/Standalone/encounter_cards_v17.html', 'Apps/Standalone/encounter_cards_v18.html', 'Apps/Standalone/encounter_cards_v19.html',
    'Apps/Standalone/encounter_cards_v20.html', 'Apps/Standalone/encounter_cards_v21.html', 'Apps/Standalone/encounter_cards_v22.html', 'Apps/Standalone/encounter_cards_v23.html', 'Apps/Standalone/encounter_cards_v24.html', 'Apps/Standalone/encounter_cards_v25.html', 'Apps/Standalone/encounter_cards_v26.html', 'Apps/Standalone/encounter_cards_v27.html', 'Apps/Standalone/encounter_cards_v28.html', 'Apps/Standalone/encounter_cards_v29.html', 'Apps/Standalone/encounter_cards_v30.html', 'Apps/Standalone/encounter_cards_v31.html', 'Apps/Standalone/encounter_cards_v32.html', 'Apps/Standalone/encounter_cards_v33.html', 'Apps/Standalone/encounter_cards_v34.html', 'Apps/Standalone/encounter_cards_v35.html', 'Apps/Standalone/encounter_cards_v36.html', 'Apps/Standalone/encounter_cards_v37.html', 'Apps/Standalone/encounter_cards_v38.html', 'Apps/Standalone/encounter_cards_v39.html',
    'Apps/Public-Web/v2/index.html', 'Apps/Public-Web/v3/index.html', 'Apps/Public-Web/v4/index.html', 'Apps/Public-Web/v5/index.html', 'Apps/Public-Web/v6/index.html', 'Apps/Public-Web/v7/index.html', 'Apps/Public-Web/v8/index.html', 'Apps/Public-Web/v9/index.html', 'Apps/Public-Web/v10/index.html', 'Apps/Public-Web/v11/index.html', 'Apps/Public-Web/v12/index.html', 'Apps/Public-Web/v13/index.html', 'Apps/Public-Web/v14/index.html', 'Apps/Public-Web/v15/index.html', 'Apps/Public-Web/v16/index.html', 'Apps/Public-Web/v17/index.html', 'Apps/Public-Web/v18/index.html', 'Apps/Public-Web/v19/index.html', 'Apps/Public-Web/v20/index.html', 'Apps/Public-Web/v21/index.html', 'Apps/Public-Web/v22/index.html',
    'Apps/Standalone/v16-assets/rolldown-runtime-S-ySWqyJ.js', 'Apps/Standalone/v16-assets/framework-DjPHiq1u.js',
    'Apps/Standalone/v16-assets/index-CePrWcV7.js', 'Apps/Standalone/v16-assets/layout-segment-context-Bb-kZqck.js',
    'Apps/Standalone/v16-assets/page-B3j9dtoA.js',
    'Development/README.md', 'Development/Documentation/README.md',
    'Development/Documentation/PRODUCT_SPEC.md', 'Development/Documentation/ARCHITECTURE.md',
    'Development/Documentation/ANIMATION_SPEC.md', 'Development/Documentation/CARD_CONTENT.md',
    'Development/Documentation/pwa-offline-strategy.md',
    'Development/Documentation/V35_CARD_LIBRARY_DESIGN.md', 'Development/Documentation/V35_CARD_LIBRARY_PLAN.md',
    'Development/Documentation/V36_MOBILE_WORK_INTEGRATION_DESIGN.md', 'Development/Documentation/V36_MOBILE_WORK_INTEGRATION_PLAN.md',
    'Development/Documentation/V37_DESKTOP_STUDIO_DESIGN.md', 'Development/Documentation/V37_DESKTOP_STUDIO_PLAN.md',
    'Development/Documentation/V38_MOBILE_VIEWPORT_FIT_DESIGN.md', 'Development/Documentation/V38_MOBILE_VIEWPORT_FIT_PLAN.md',
    'Development/Documentation/V39_MOBILE_MODES_AND_KEEPSAKE_DESIGN.md', 'Development/Documentation/V39_MOBILE_MODES_AND_KEEPSAKE_PLAN.md',
    'Development/Source/Main-App-v18/package.json', 'Development/Source/Main-App-v18/package-lock.json',
    'Development/Source/Main-App-v18/src/App.tsx', 'Development/Source/Main-App-v18/src/data/cards.ts',
    'Development/Source/Main-App-v18/src/lib/viewport-scale.ts', 'Development/Source/Main-App-v18/dist/index.html',
    'Development/Source/Main-App-v20/package.json', 'Development/Source/Main-App-v20/package-lock.json',
    'Development/Source/Main-App-v20/src/App.tsx', 'Development/Source/Main-App-v20/src/data/blessings.ts',
    'Development/Source/Main-App-v20/src/lib/encounter.ts', 'Development/Source/Main-App-v20/dist/index.html',
    'Development/Source/Main-App-v21/package.json', 'Development/Source/Main-App-v21/package-lock.json',
    'Development/Source/Main-App-v21/src/App.tsx', 'Development/Source/Main-App-v21/src/components/TaiwanReveal.tsx',
    'Development/Source/Main-App-v21/src/lib/deity-art.ts', 'Development/Source/Main-App-v21/dist/index.html',
    'Development/Source/Main-App-v22/package.json', 'Development/Source/Main-App-v22/package-lock.json',
    'Development/Source/Main-App-v22/src/App.tsx', 'Development/Source/Main-App-v22/src/components/LayoutEditor.tsx',
    'Development/Source/Main-App-v22/src/components/SwipeDeck.tsx', 'Development/Source/Main-App-v22/src/layout/layout-model.ts',
    'Development/Source/Main-App-v22/src/lib/share.ts', 'Development/Source/Main-App-v22/dist/index.html',
    'Development/Source/Main-App-v23/package.json', 'Development/Source/Main-App-v23/package-lock.json',
    'Development/Source/Main-App-v23/src/App.tsx', 'Development/Source/Main-App-v23/src/components/TaiwanReveal.tsx',
    'Development/Source/Main-App-v23/src/lib/deity-art.ts', 'Development/Source/Main-App-v23/src/lib/taiwan-shape.ts', 'Development/Source/Main-App-v23/dist/index.html',
    'Development/Source/Main-App-v24/package.json', 'Development/Source/Main-App-v24/package-lock.json',
    'Development/Source/Main-App-v24/src/App.tsx', 'Development/Source/Main-App-v24/src/components/TaiwanReveal.tsx',
    'Development/Source/Main-App-v24/src/lib/deity-art.ts', 'Development/Source/Main-App-v24/src/lib/taiwan-shape.ts', 'Development/Source/Main-App-v24/dist/index.html',
    'Development/Source/Main-App-v25/package.json', 'Development/Source/Main-App-v25/package-lock.json',
    'Development/Source/Main-App-v25/src/App.tsx', 'Development/Source/Main-App-v25/src/lib/portrait-focus.ts', 'Development/Source/Main-App-v25/dist/index.html',
    'Development/Source/Main-App-v26/package.json', 'Development/Source/Main-App-v26/package-lock.json',
    'Development/Source/Main-App-v26/src/App.tsx', 'Development/Source/Main-App-v26/src/lib/device-frame.ts', 'Development/Source/Main-App-v26/src/presentation/presentation-model.ts', 'Development/Source/Main-App-v26/dist/index.html',
    'Development/Source/Main-App-v27/package.json', 'Development/Source/Main-App-v27/package-lock.json',
    'Development/Source/Main-App-v27/src/App.tsx', 'Development/Source/Main-App-v27/src/styles/v27-layout.css', 'Development/Source/Main-App-v27/dist/index.html',
    'Development/Source/Main-App-v28/package.json', 'Development/Source/Main-App-v28/package-lock.json',
    'Development/Source/Main-App-v28/src/App.tsx', 'Development/Source/Main-App-v28/src/styles/v28-layout.css', 'Development/Source/Main-App-v28/dist/index.html',
    'Development/Source/Main-App-v29/package.json', 'Development/Source/Main-App-v29/package-lock.json',
    'Development/Source/Main-App-v29/src/App.tsx', 'Development/Source/Main-App-v29/src/styles/v29-layout.css', 'Development/Source/Main-App-v29/dist/index.html',
    'Development/Source/Main-App-v30/package.json', 'Development/Source/Main-App-v30/package-lock.json',
    'Development/Source/Main-App-v30/src/App.tsx', 'Development/Source/Main-App-v30/src/lib/deity-art.ts', 'Development/Source/Main-App-v30/src/styles/v30-layout.css', 'Development/Source/Main-App-v30/dist/index.html',
    'Development/Source/Main-App-v31/package.json', 'Development/Source/Main-App-v31/package-lock.json',
    'Development/Source/Main-App-v31/src/App.tsx', 'Development/Source/Main-App-v31/src/styles/v31-layout.css', 'Development/Source/Main-App-v31/dist/index.html',
    'Development/Source/Main-App-v32/package.json', 'Development/Source/Main-App-v32/package-lock.json',
    'Development/Source/Main-App-v32/src/App.tsx', 'Development/Source/Main-App-v32/src/styles/v32-layout.css', 'Development/Source/Main-App-v32/dist/index.html',
    'Development/Source/Main-App-v33/package.json', 'Development/Source/Main-App-v33/package-lock.json',
    'Development/Source/Main-App-v33/src/App.tsx', 'Development/Source/Main-App-v33/src/lib/zodiac-art.ts', 'Development/Source/Main-App-v33/src/lib/question-selection.ts', 'Development/Source/Main-App-v33/src/styles/v33.css', 'Development/Source/Main-App-v33/dist/index.html',
    'Development/Source/Main-App-v34/package.json', 'Development/Source/Main-App-v34/package-lock.json',
    'Development/Source/Main-App-v34/src/App.tsx', 'Development/Source/Main-App-v34/src/lib/zodiac-art.ts', 'Development/Source/Main-App-v34/src/lib/local-zodiac-art.ts', 'Development/Source/Main-App-v34/src/styles/v34.css', 'Development/Source/Main-App-v34/dist/index.html',
    'Development/Source/Main-App-v35/package.json', 'Development/Source/Main-App-v35/package-lock.json',
    'Development/Source/Main-App-v35/src/App.tsx', 'Development/Source/Main-App-v35/src/components/CardLibrary.tsx', 'Development/Source/Main-App-v35/src/lib/card-library.ts', 'Development/Source/Main-App-v35/src/styles/v35.css', 'Development/Source/Main-App-v35/dist/index.html',
    'Development/Source/Main-App-v36/package.json', 'Development/Source/Main-App-v36/package-lock.json',
    'Development/Source/Main-App-v36/src/App.tsx', 'Development/Source/Main-App-v36/src/components/MobileSettings.tsx', 'Development/Source/Main-App-v36/src/components/ArtworkPicker.tsx', 'Development/Source/Main-App-v36/src/components/ArtworkAdjuster.tsx', 'Development/Source/Main-App-v36/src/lib/question-manager.ts', 'Development/Source/Main-App-v36/src/styles/v36.css', 'Development/Source/Main-App-v36/dist/index.html',
    'Development/Source/Main-App-v37/package.json', 'Development/Source/Main-App-v37/package-lock.json',
    'Development/Source/Main-App-v37/src/App.tsx', 'Development/Source/Main-App-v37/src/components/LayoutEditor.tsx', 'Development/Source/Main-App-v37/src/styles/v37.css', 'Development/Source/Main-App-v37/dist/index.html',
    'Development/Source/Main-App-v38/package.json', 'Development/Source/Main-App-v38/package-lock.json',
    'Development/Source/Main-App-v38/src/App.tsx', 'Development/Source/Main-App-v38/src/components/ArtworkAdjuster.tsx', 'Development/Source/Main-App-v38/src/styles/v38.css', 'Development/Source/Main-App-v38/dist/index.html',
    'Development/Source/Main-App-v39/package.json', 'Development/Source/Main-App-v39/package-lock.json',
    'Development/Source/Main-App-v39/src/App.tsx', 'Development/Source/Main-App-v39/src/components/ModeHome.tsx', 'Development/Source/Main-App-v39/src/components/DirectKeepsake.tsx', 'Development/Source/Main-App-v39/src/lib/direct-keepsake.ts', 'Development/Source/Main-App-v39/src/styles/v39.css', 'Development/Source/Main-App-v39/dist/index.html',
    'Development/Source/Public-Web/v18/README.md', 'Development/Source/Public-Web/v19/README.md', 'Development/Source/Public-Web/v20/README.md', 'Development/Source/Public-Web/v21/README.md', 'Development/Source/Public-Web/v22/README.md',
    'Assets/Deities/v30-safe-masters/README.md', 'Assets/Zodiac/README.md', 'Assets/Zodiac/Taiwan/README.md', 'Assets/Zodiac/Taiwan/v33-masters/README.md', 'Assets/Zodiac/Taiwan/v33-masters/manifest.json', 'Assets/Zodiac/Taiwan/v34-local-stories-masters/README.md', 'Assets/Zodiac/Taiwan/v34-local-stories-masters/manifest.json',
    'Development/Automation/Scripts/finalize-pwa-v18.mjs', 'Development/Automation/Scripts/export-standalone-v18.mjs',
    'Development/Automation/Scripts/finalize-pwa-v33.mjs', 'Development/Automation/Scripts/export-standalone-v33.mjs', 'Development/Automation/Scripts/finalize-public-v16.mjs',
    'Development/Automation/Scripts/finalize-pwa-v34.mjs', 'Development/Automation/Scripts/export-standalone-v34.mjs', 'Development/Automation/Scripts/finalize-public-v17.mjs',
    'Development/Automation/Scripts/finalize-pwa-v35.mjs', 'Development/Automation/Scripts/export-standalone-v35.mjs', 'Development/Automation/Scripts/finalize-public-v18.mjs',
    'Development/Automation/Scripts/finalize-pwa-v36.mjs', 'Development/Automation/Scripts/export-standalone-v36.mjs', 'Development/Automation/Scripts/finalize-public-v19.mjs',
    'Development/Automation/Scripts/finalize-pwa-v37.mjs', 'Development/Automation/Scripts/export-standalone-v37.mjs', 'Development/Automation/Scripts/finalize-public-v20.mjs',
    'Development/Automation/Scripts/finalize-pwa-v38.mjs', 'Development/Automation/Scripts/export-standalone-v38.mjs', 'Development/Automation/Scripts/finalize-public-v21.mjs',
    'Development/Automation/Scripts/finalize-pwa-v39.mjs', 'Development/Automation/Scripts/export-standalone-v39.mjs', 'Development/Automation/Scripts/finalize-public-v22.mjs',
    'Development/Automation/Tools/serve_truth_and_dare.ps1',
    'Development/Tests/validate_clean_structure.ps1', 'Development/Tests/validate_v18.ps1', 'Development/Tests/validate_v19.ps1', 'Development/Tests/validate_v20.ps1', 'Development/Tests/validate_v21.ps1', 'Development/Tests/validate_v22.ps1', 'Development/Tests/validate_v23.ps1', 'Development/Tests/validate_v24.ps1', 'Development/Tests/validate_v25.ps1', 'Development/Tests/validate_v26.ps1', 'Development/Tests/validate_v27.ps1', 'Development/Tests/validate_v28.ps1', 'Development/Tests/validate_v29.ps1', 'Development/Tests/validate_v30.ps1', 'Development/Tests/validate_v31.ps1', 'Development/Tests/validate_v32.ps1', 'Development/Tests/validate_v33.ps1', 'Development/Tests/validate_v34.ps1', 'Development/Tests/validate_v35.ps1', 'Development/Tests/validate_v36.ps1', 'Development/Tests/validate_v37.ps1', 'Development/Tests/validate_v38.ps1', 'Development/Tests/validate_v39.ps1', 'Development/Tests/validate_repository.ps1',
    'Assets/Catalog/asset-licenses.md', 'Assets/Catalog/content-sources.json',
    '_pending/Development-simplification_2026-07-19/README.md', '_pending/v24-generated-development-state_2026-07-23/README.md', '_pending/v32-generated-development-state_2026-07-28/README.md', '_pending/v33-preverification-build_2026-07-28/README.md', '_pending/v33-generated-development-state_2026-07-28/README.md', '_pending/v35-generated-development-state_2026-07-29/README.md', '_pending/Encounter_Cards_v11_Source_2026-07-30/README.md', '_pending/v36-generated-development-state_2026-07-30/README.md', '_pending/v36-preverification-build_2026-07-30/README.md', '_pending/v37-generated-development-state_2026-07-30/README.md'
)
$requiredFiles += @(
    'Development/Documentation/V46_GITHUB_LITE_INTEGRATION_DESIGN.md',
    'Development/Documentation/V46_GITHUB_LITE_INTEGRATION_PLAN.md',
    'Development/Source/Main-App-v46/package.json',
    'Development/Source/Main-App-v46/app/page.tsx',
    'Development/Source/Main-App-v46/app/encounter/App.tsx',
    'Development/Source/Main-App-v46/public/v46/index.html',
    'Development/Source/Main-App-v46/public/v46/manifest.webmanifest',
    'Development/Source/Main-App-v46/public/v46/service-worker.js',
    'Development/Tests/validate_v46.mjs',
    '_pending/v46-generated-development-state_2026-08-16/README.md'
)
foreach ($relativePath in $requiredFiles) {
    Assert-RepositoryCondition (Test-Path -LiteralPath (Join-Path $projectRoot $relativePath) -PathType Leaf) "Required file exists: $relativePath"
}

$gitignorePath = Join-Path $projectRoot '.gitignore'
if (Test-Path -LiteralPath $gitignorePath -PathType Leaf) {
    $gitignore = Get-Content -Raw -Encoding UTF8 -LiteralPath $gitignorePath
    Assert-RepositoryCondition ($gitignore -match '(?m)^_meta/owner_private_blueprint\.md\s*$') 'Owner-private blueprint is explicitly ignored'
    Assert-RepositoryCondition ($gitignore -notmatch '(?m)^_meta/\*blueprint\*\.md\s*$') 'Public blueprint remains trackable'
}

$expectedHashes = @{
    'Apps/Standalone/encounter_cards_v15.html' = 'C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0'
    'Apps/Standalone/encounter_cards_v16.html' = 'A115066893BFECFC9060C0D31F71CD18E8EC1D47BC76E964F0A30C43D609C352'
    'Apps/Standalone/encounter_cards_v17.html' = '832CDC71A4BD41E3685381D1E0094A47371F8B558D51EE23F0279C2702440FAA'
    'Apps/Standalone/encounter_cards_v18.html' = 'F609B32A82CD1E79B173ED263FD78C6CAA55C7AB671F4F5441567320FE17D174'
}
foreach ($relativePath in $expectedHashes.Keys) {
    $fullPath = Join-Path $projectRoot $relativePath
    if (Test-Path -LiteralPath $fullPath -PathType Leaf) {
        Assert-RepositoryCondition ((Get-FileHash -Algorithm SHA256 -LiteralPath $fullPath).Hash -eq $expectedHashes[$relativePath]) "$relativePath matches its preserved SHA-256"
    }
}

$v15Path = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v15.html'
if (Test-Path -LiteralPath $v15Path -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $v15Path
    Assert-RepositoryCondition ($html -match '<title>[^<]*Encounter Cards</title>') 'v15 title identifies Encounter Cards'
    Assert-RepositoryCondition ($html -match '<script type="importmap">') 'v15 retains its embedded import map'
    Assert-RepositoryCondition ($html -notmatch '<script\s+[^>]*src\s*=') 'v15 has no external script dependency'
    Assert-RepositoryCondition ($html -notmatch '\bfetch\s*\(') 'v15 HTML contains no direct fetch call'
}

$v18ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v18.ps1') 2>&1
$v18ValidationExit = $LASTEXITCODE
$v18ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v18ValidationExit -eq 0) 'Focused v18 contract validation passes'

$v19ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v19.ps1') 2>&1
$v19ValidationExit = $LASTEXITCODE
$v19ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v19ValidationExit -eq 0) 'Focused v19 contract validation passes'

$v20ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v20.ps1') 2>&1
$v20ValidationExit = $LASTEXITCODE
$v20ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v20ValidationExit -eq 0) 'Focused v20 contract validation passes'

$v21ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v21.ps1') 2>&1
$v21ValidationExit = $LASTEXITCODE
$v21ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v21ValidationExit -eq 0) 'Focused v21 contract validation passes'

$v22ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v22.ps1') 2>&1
$v22ValidationExit = $LASTEXITCODE
$v22ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v22ValidationExit -eq 0) 'Focused v22 contract validation passes'

$v23ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v23.ps1') 2>&1
$v23ValidationExit = $LASTEXITCODE
$v23ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v23ValidationExit -eq 0) 'Focused v23 contract validation passes'

$v24ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v24.ps1') 2>&1
$v24ValidationExit = $LASTEXITCODE
$v24ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v24ValidationExit -eq 0) 'Focused v24 contract validation passes'

$v25ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v25.ps1') 2>&1
$v25ValidationExit = $LASTEXITCODE
$v25ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v25ValidationExit -eq 0) 'Focused v25 contract validation passes'

$v26ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v26.ps1') 2>&1
$v26ValidationExit = $LASTEXITCODE
$v26ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v26ValidationExit -eq 0) 'Focused v26 contract validation passes'

$v27ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v27.ps1') 2>&1
$v27ValidationExit = $LASTEXITCODE
$v27ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v27ValidationExit -eq 0) 'Focused v27 contract validation passes'

$v28ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v28.ps1') 2>&1
$v28ValidationExit = $LASTEXITCODE
$v28ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v28ValidationExit -eq 0) 'Focused v28 contract validation passes'

$v29ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v29.ps1') 2>&1
$v29ValidationExit = $LASTEXITCODE
$v29ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v29ValidationExit -eq 0) 'Focused v29 contract validation passes'

$v30ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v30.ps1') 2>&1
$v30ValidationExit = $LASTEXITCODE
$v30ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v30ValidationExit -eq 0) 'Focused v30 contract validation passes'

$v31ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v31.ps1') 2>&1
$v31ValidationExit = $LASTEXITCODE
$v31ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v31ValidationExit -eq 0) 'Focused v31 contract validation passes'

$v32ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v32.ps1') 2>&1
$v32ValidationExit = $LASTEXITCODE
$v32ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v32ValidationExit -eq 0) 'Focused v32 contract validation passes'

$v33ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v33.ps1') 2>&1
$v33ValidationExit = $LASTEXITCODE
$v33ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v33ValidationExit -eq 0) 'Focused v33 contract validation passes'

$v34ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v34.ps1') 2>&1
$v34ValidationExit = $LASTEXITCODE
$v34ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v34ValidationExit -eq 0) 'Focused v34 contract validation passes'

$v35ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v35.ps1') 2>&1
$v35ValidationExit = $LASTEXITCODE
$v35ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v35ValidationExit -eq 0) 'Focused v35 contract validation passes'

$v36ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v36.ps1') 2>&1
$v36ValidationExit = $LASTEXITCODE
$v36ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v36ValidationExit -eq 0) 'Focused v36 contract validation passes'

$v37ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v37.ps1') 2>&1
$v37ValidationExit = $LASTEXITCODE
$v37ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v37ValidationExit -eq 0) 'Focused v37 contract validation passes'

$v38ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v38.ps1') 2>&1
$v38ValidationExit = $LASTEXITCODE
$v38ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v38ValidationExit -eq 0) 'Focused v38 contract validation passes'

$v39ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v39.ps1') 2>&1
$v39ValidationExit = $LASTEXITCODE
$v39ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($v39ValidationExit -eq 0) 'Focused v39 contract validation passes'

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
Assert-RepositoryCondition ($null -ne $nodeCommand) 'Node.js is available for v46 validation'
if ($null -ne $nodeCommand) {
    $v46ValidationOutput = & $nodeCommand.Source (Join-Path $PSScriptRoot 'validate_v46.mjs') 2>&1
    $v46ValidationExit = $LASTEXITCODE
    $v46ValidationOutput | ForEach-Object { Write-Host $_ }
    Assert-RepositoryCondition ($v46ValidationExit -eq 0) 'Focused v46 contract validation passes'
}

$cleanStructureOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_clean_structure.ps1') 2>&1
$cleanStructureExit = $LASTEXITCODE
$cleanStructureOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($cleanStructureExit -eq 0) 'Simplified structure validation passes'

$emptyDirectories = Get-ChildItem -LiteralPath $projectRoot -Directory -Recurse -Force | Where-Object {
    $_.FullName -notmatch '[\\/]\.git([\\/]|$)' -and
    $_.FullName -notmatch '[\\/](node_modules(?:-final)?|dist|coverage)([\\/]|$)' -and
    $_.FullName -notmatch '[\\/]_pending[\\/]v46-generated-development-state_2026-08-16([\\/]|$)' -and
    -not (Get-ChildItem -LiteralPath $_.FullName -Force | Select-Object -First 1)
}
Assert-RepositoryCondition ($emptyDirectories.Count -eq 0) 'No empty project directories exist'

if ($failures.Count) {
    Write-Host "Repository validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}
Write-Host 'Repository validation passed.' -ForegroundColor Cyan
exit 0
