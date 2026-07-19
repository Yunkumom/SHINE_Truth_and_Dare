$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-RepositoryCondition {
    param(
        [Parameter(Mandatory = $true)]
        [bool]$Condition,
        [Parameter(Mandatory = $true)]
        [string]$Message
    )

    if (-not $Condition) {
        $failures.Add($Message)
        Write-Host "FAIL: $Message" -ForegroundColor Red
        return
    }

    Write-Host "PASS: $Message" -ForegroundColor Green
}

$requiredFiles = @(
    'README.md',
    'GUIDE.md',
    'AGENTS.md',
    '.gitignore',
    'Development/Governance/Meta/purpose.md',
    'Development/Governance/Meta/roadmap.md',
    'Development/Governance/Meta/handoff.md',
    'Development/Governance/Meta/owner_private_blueprint.md',
    'Development/Governance/Meta/public_blueprint.md',
    'Development/Governance/Meta/changelog.md',
    'Development/Governance/Agent/README.md',
    'Development/Governance/Skills/README.md',
    'Apps/Standalone/encounter_cards_v15.html',
    'Apps/Standalone/encounter_cards_v16.html',
    'Apps/Standalone/encounter_cards_v17.html',
    'Apps/Standalone/v16-assets/rolldown-runtime-S-ySWqyJ.js',
    'Apps/Standalone/v16-assets/framework-DjPHiq1u.js',
    'Apps/Standalone/v16-assets/index-CePrWcV7.js',
    'Apps/Standalone/v16-assets/layout-segment-context-Bb-kZqck.js',
    'Apps/Standalone/v16-assets/page-B3j9dtoA.js',
    'Open Truth and Dare.cmd',
    'Development/Automation/Tools/build_v16.ps1',
    'Development/Automation/Tools/serve_truth_and_dare.ps1',
    'Development/Source/Main-App/package.json',
    'Development/Source/Main-App/package-lock.json',
    'Development/Source/Main-App/src/App.tsx',
    'Development/Source/Main-App/src/data/cards.ts',
    'Development/Source/Main-App/public/manifest.webmanifest',
    'Development/Source/Main-App/public/service-worker.js',
    'Development/Automation/Scripts/export-standalone.mjs',
    'Development/Human-References/README.md',
    'Development/Human-References/system-map.html',
    'Development/Human-References/quick-fixes.html',
    'Development/Human-References/dashboards/agent-handoff_v18.html',
    'Development/Pending/index.md',
    'Development/Documentation/PRODUCT_SPEC.md',
    'Development/Documentation/ARCHITECTURE.md',
    'Development/Documentation/ANIMATION_SPEC.md',
    'Development/Documentation/CARD_CONTENT.md',
    'Development/Documentation/pwa-offline-strategy.md',
    'Assets/Catalog/asset-licenses.md',
    'Assets/Catalog/content-sources.json',
    'Development/Documentation/designs/2026-07-18-truth-and-dare-repository.md',
    'Development/Documentation/designs/2026-07-18-encounter-cards-v15-product-repository.md',
    'Development/Documentation/designs/2026-07-18-v16-iphone-pro-max-launcher.md',
    'Development/Documentation/designs/2026-07-19-v17-modular-pwa-standalone.md',
    'Development/Documentation/designs/2026-07-19-project-directory-reorganization.md',
    'Development/Documentation/plans/2026-07-18-create-truth-and-dare-repository.md',
    'Development/Documentation/plans/2026-07-18-integrate-encounter-cards-v15.md',
    'Development/Documentation/plans/2026-07-18-build-v16-iphone-pro-max-launcher.md',
    'Development/Documentation/plans/2026-07-19-build-v17-modular-pwa-standalone.md',
    'Development/Documentation/plans/2026-07-19-reorganize-project-directory.md',
    'Development/Tests/validate_clean_structure.ps1',
    'Development/Tests/validate_v16.ps1',
    'Development/Tests/validate_v17.ps1',
    'Development/Tests/validate_repository.ps1'
)

foreach ($relativePath in $requiredFiles) {
    $fullPath = Join-Path $projectRoot $relativePath
    Assert-RepositoryCondition -Condition (Test-Path -LiteralPath $fullPath -PathType Leaf) -Message "Required file exists: $relativePath"
}

$gitignorePath = Join-Path $projectRoot '.gitignore'
if (Test-Path -LiteralPath $gitignorePath -PathType Leaf) {
    $gitignore = Get-Content -Raw -Encoding UTF8 -LiteralPath $gitignorePath
    Assert-RepositoryCondition -Condition ($gitignore -match '(?m)^Development/Governance/Meta/owner_private_blueprint\.md\s*$') -Message 'Owner-private blueprint is explicitly ignored'
    Assert-RepositoryCondition -Condition ($gitignore -notmatch '(?m)^Development/Governance/Meta/\*blueprint\*\.md\s*$') -Message 'Public blueprint is not hidden by a wildcard ignore rule'
}

$productPath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v15.html'
if (Test-Path -LiteralPath $productPath -PathType Leaf) {
    $expectedProductHash = 'C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0'
    $actualProductHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $productPath).Hash
    Assert-RepositoryCondition -Condition ($actualProductHash -eq $expectedProductHash) -Message 'Encounter Cards v15 matches the canonical SHA-256 baseline'

    $productHtml = Get-Content -Raw -Encoding UTF8 -LiteralPath $productPath
    Assert-RepositoryCondition -Condition ($productHtml -match '<title>[^<]*Encounter Cards</title>') -Message 'Product title identifies Encounter Cards'
    Assert-RepositoryCondition -Condition ($productHtml -match '<script type="importmap">') -Message 'Product contains its embedded import map'
    Assert-RepositoryCondition -Condition ($productHtml -match '/assets/page-B3j9dtoA\.js') -Message 'Product contains the canonical v15 page module mapping'
    Assert-RepositoryCondition -Condition (($productHtml -match 'ENCOUNTER CARDS') -and ($productHtml -match 'V15')) -Message 'Product UI identifies version 15'
    Assert-RepositoryCondition -Condition (($productHtml -match 'language-switch') -and ($productHtml -match '>EN<')) -Message 'Product exposes language controls'
    Assert-RepositoryCondition -Condition ($productHtml -match '>Truth<') -Message 'Product exposes Truth mode'
    Assert-RepositoryCondition -Condition ($productHtml -match '>Dare<') -Message 'Product exposes Dare mode'
    Assert-RepositoryCondition -Condition (($productHtml -match '18\+') -and ($productHtml -match '<b>L<!-- -->5</b>')) -Message 'Product identifies the gated Level 5 mode'
    Assert-RepositoryCondition -Condition ($productHtml -notmatch '<script\s+[^>]*src\s*=') -Message 'Product has no external script dependency'
    Assert-RepositoryCondition -Condition ($productHtml -notmatch '\bfetch\s*\(') -Message 'Product HTML contains no direct fetch call'
}

$dashboardPath = Join-Path $projectRoot 'Development/Human-References/dashboards/agent-handoff_v18.html'
if (Test-Path -LiteralPath $dashboardPath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $dashboardPath
    Assert-RepositoryCondition -Condition ($html -match '<title>SHINE AI OS . Agent Handoff v18</title>') -Message 'Dashboard title identifies Agent Handoff v18'
    Assert-RepositoryCondition -Condition ($html -match 'shine-guide-font-size') -Message 'Font-size persistence marker is present'
    Assert-RepositoryCondition -Condition ($html -match 'data-copy="handoffPrompt"') -Message 'Copy-ready prompt control is present'
    Assert-RepositoryCondition -Condition ($html -match 'navigator\.clipboard\.writeText') -Message 'Clipboard API behavior is present'
    Assert-RepositoryCondition -Condition ($html -match '@media print') -Message 'Print styling is present'
    Assert-RepositoryCondition -Condition ($html -notmatch '<script\s+[^>]*src\s*=') -Message 'No external script dependency is present'
    Assert-RepositoryCondition -Condition ($html -notmatch '<link\s+[^>]*href\s*=') -Message 'No external stylesheet dependency is present'
    Assert-RepositoryCondition -Condition ($html -notmatch '(?i)https?://') -Message 'No HTTP or HTTPS runtime reference is present'
    Assert-RepositoryCondition -Condition (($html -match '<!doctype html>') -and ($html -match '</html>')) -Message 'Core HTML document markers are present'
}

$v16ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v16.ps1') 2>&1
$v16ValidationExit = $LASTEXITCODE
$v16ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition -Condition ($v16ValidationExit -eq 0) -Message 'Focused v16 contract validation passes'

$v17ValidationOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_v17.ps1') 2>&1
$v17ValidationExit = $LASTEXITCODE
$v17ValidationOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition -Condition ($v17ValidationExit -eq 0) -Message 'Focused v17 contract validation passes'

$cleanStructureOutput = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'validate_clean_structure.ps1') 2>&1
$cleanStructureExit = $LASTEXITCODE
$cleanStructureOutput | ForEach-Object { Write-Host $_ }
Assert-RepositoryCondition -Condition ($cleanStructureExit -eq 0) -Message 'Clean three-category structure validation passes'

$emptyDirectories = Get-ChildItem -LiteralPath $projectRoot -Directory -Recurse -Force | Where-Object {
    $_.FullName -notmatch '[\\/]\.git([\\/]|$)' -and
    $_.FullName -notmatch '[\\/](node_modules|dist|coverage)([\\/]|$)' -and
    -not (Get-ChildItem -LiteralPath $_.FullName -Force | Select-Object -First 1)
}
Assert-RepositoryCondition -Condition ($emptyDirectories.Count -eq 0) -Message 'No empty project directories exist'

if ($failures.Count -gt 0) {
    Write-Host "Repository validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}

Write-Host 'Repository validation passed.' -ForegroundColor Cyan
exit 0
