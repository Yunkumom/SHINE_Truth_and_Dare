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
    'README.md', 'GUIDE.md', 'AGENTS.md', '.gitattributes', '.gitignore', 'Open Truth and Dare.cmd',
    '_meta/purpose.md', '_meta/roadmap.md', '_meta/handoff.md', '_meta/owner_private_blueprint.md', '_meta/public_blueprint.md', '_meta/changelog.md',
    '_agent/README.md', '_agent/Skills/README.md', '_human/README.md', '_human/code-learning-tool.html', '_pending/README.md', '_pending/index.md',
    'Apps/Standalone/encounter_cards_v15.html', 'Apps/Standalone/encounter_cards_v16.html',
    'Apps/Standalone/encounter_cards_v17.html', 'Apps/Standalone/encounter_cards_v18.html', 'Apps/Standalone/encounter_cards_v19.html',
    'Apps/Standalone/encounter_cards_v20.html', 'Apps/Public-Web/v2/index.html', 'Apps/Public-Web/v3/index.html',
    'Apps/Standalone/v16-assets/rolldown-runtime-S-ySWqyJ.js', 'Apps/Standalone/v16-assets/framework-DjPHiq1u.js',
    'Apps/Standalone/v16-assets/index-CePrWcV7.js', 'Apps/Standalone/v16-assets/layout-segment-context-Bb-kZqck.js',
    'Apps/Standalone/v16-assets/page-B3j9dtoA.js',
    'Development/README.md', 'Development/Documentation/README.md',
    'Development/Documentation/PRODUCT_SPEC.md', 'Development/Documentation/ARCHITECTURE.md',
    'Development/Documentation/ANIMATION_SPEC.md', 'Development/Documentation/CARD_CONTENT.md',
    'Development/Documentation/pwa-offline-strategy.md',
    'Development/Source/Main-App-v18/package.json', 'Development/Source/Main-App-v18/package-lock.json',
    'Development/Source/Main-App-v18/src/App.tsx', 'Development/Source/Main-App-v18/src/data/cards.ts',
    'Development/Source/Main-App-v18/src/lib/viewport-scale.ts', 'Development/Source/Main-App-v18/dist/index.html',
    'Development/Source/Main-App-v20/package.json', 'Development/Source/Main-App-v20/package-lock.json',
    'Development/Source/Main-App-v20/src/App.tsx', 'Development/Source/Main-App-v20/src/data/blessings.ts',
    'Development/Source/Main-App-v20/src/lib/encounter.ts', 'Development/Source/Main-App-v20/dist/index.html',
    'Development/Automation/Scripts/finalize-pwa-v18.mjs', 'Development/Automation/Scripts/export-standalone-v18.mjs',
    'Development/Automation/Tools/serve_truth_and_dare.ps1',
    'Development/Tests/validate_clean_structure.ps1', 'Development/Tests/validate_v18.ps1', 'Development/Tests/validate_v19.ps1', 'Development/Tests/validate_v20.ps1', 'Development/Tests/validate_repository.ps1',
    'Assets/Catalog/asset-licenses.md', 'Assets/Catalog/content-sources.json',
    '_pending/Development-simplification_2026-07-19/README.md'
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

$cleanStructureOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_clean_structure.ps1') 2>&1
$cleanStructureExit = $LASTEXITCODE
$cleanStructureOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition ($cleanStructureExit -eq 0) 'Simplified structure validation passes'

$emptyDirectories = Get-ChildItem -LiteralPath $projectRoot -Directory -Recurse -Force | Where-Object {
    $_.FullName -notmatch '[\\/]\.git([\\/]|$)' -and
    $_.FullName -notmatch '[\\/](node_modules|dist|coverage)([\\/]|$)' -and
    -not (Get-ChildItem -LiteralPath $_.FullName -Force | Select-Object -First 1)
}
Assert-RepositoryCondition ($emptyDirectories.Count -eq 0) 'No empty project directories exist'

if ($failures.Count) {
    Write-Host "Repository validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}
Write-Host 'Repository validation passed.' -ForegroundColor Cyan
exit 0
