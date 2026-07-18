$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
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
    'AGENTS.md',
    '.gitignore',
    '_meta/purpose.md',
    '_meta/roadmap.md',
    '_meta/handoff.md',
    '_meta/owner_private_blueprint.md',
    '_meta/public_blueprint.md',
    '_meta/changelog.md',
    '_agent/README.md',
    'skills/README.md',
    'app/encounter_cards_v15.html',
    '_human/README.md',
    '_human/dashboards/agent-handoff_v18.html',
    '_pending/index.md',
    'docs/PRODUCT_SPEC.md',
    'docs/ARCHITECTURE.md',
    'docs/ANIMATION_SPEC.md',
    'docs/CARD_CONTENT.md',
    'docs/designs/2026-07-18-truth-and-dare-repository.md',
    'docs/designs/2026-07-18-encounter-cards-v15-product-repository.md',
    'docs/plans/2026-07-18-create-truth-and-dare-repository.md',
    'docs/plans/2026-07-18-integrate-encounter-cards-v15.md',
    'tests/validate_repository.ps1'
)

foreach ($relativePath in $requiredFiles) {
    $fullPath = Join-Path $projectRoot $relativePath
    Assert-RepositoryCondition -Condition (Test-Path -LiteralPath $fullPath -PathType Leaf) -Message "Required file exists: $relativePath"
}

$gitignorePath = Join-Path $projectRoot '.gitignore'
if (Test-Path -LiteralPath $gitignorePath -PathType Leaf) {
    $gitignore = Get-Content -Raw -Encoding UTF8 -LiteralPath $gitignorePath
    Assert-RepositoryCondition -Condition ($gitignore -match '(?m)^_meta/owner_private_blueprint\.md\s*$') -Message 'Owner-private blueprint is explicitly ignored'
    Assert-RepositoryCondition -Condition ($gitignore -notmatch '(?m)^_meta/\*blueprint\*\.md\s*$') -Message 'Public blueprint is not hidden by a wildcard ignore rule'
}

$productPath = Join-Path $projectRoot 'app/encounter_cards_v15.html'
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

$dashboardPath = Join-Path $projectRoot '_human/dashboards/agent-handoff_v18.html'
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

$emptyDirectories = Get-ChildItem -LiteralPath $projectRoot -Directory -Recurse -Force | Where-Object {
    $_.FullName -notmatch '[\\/]\.git([\\/]|$)' -and
    -not (Get-ChildItem -LiteralPath $_.FullName -Force | Select-Object -First 1)
}
Assert-RepositoryCondition -Condition ($emptyDirectories.Count -eq 0) -Message 'No empty project directories exist'

if ($failures.Count -gt 0) {
    Write-Host "Repository validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}

Write-Host 'Repository validation passed.' -ForegroundColor Cyan
exit 0
