$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V16Condition {
    param(
        [Parameter(Mandatory = $true)]
        [bool]$Condition,
        [Parameter(Mandatory = $true)]
        [string]$Message
    )

    if ($Condition) {
        Write-Host "PASS: $Message" -ForegroundColor Green
        return
    }

    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$v15Path = Join-Path $projectRoot 'app/encounter_cards_v15.html'
$v16Path = Join-Path $projectRoot 'app/encounter_cards_v16.html'
$serverPath = Join-Path $projectRoot 'tools/serve_truth_and_dare.ps1'
$launcherPath = Join-Path $projectRoot 'Open Truth and Dare.cmd'
$assetRoot = Join-Path $projectRoot 'app/v16-assets'
$requiredAssets = @(
    'rolldown-runtime-S-ySWqyJ.js',
    'framework-DjPHiq1u.js',
    'index-CePrWcV7.js',
    'layout-segment-context-Bb-kZqck.js',
    'page-B3j9dtoA.js'
)

Assert-V16Condition -Condition (Test-Path -LiteralPath $v16Path -PathType Leaf) -Message 'v16 product file exists'
Assert-V16Condition -Condition (Test-Path -LiteralPath $serverPath -PathType Leaf) -Message 'PowerShell server helper exists'
Assert-V16Condition -Condition (Test-Path -LiteralPath $launcherPath -PathType Leaf) -Message 'One-click desktop launcher exists'
foreach ($assetName in $requiredAssets) {
    Assert-V16Condition -Condition (Test-Path -LiteralPath (Join-Path $assetRoot $assetName) -PathType Leaf) -Message "Extracted module exists: $assetName"
}

if (Test-Path -LiteralPath $v15Path -PathType Leaf) {
    $v15Hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $v15Path).Hash
    Assert-V16Condition -Condition ($v15Hash -eq 'C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0') -Message 'v15 immutable baseline hash is unchanged'
}

if (Test-Path -LiteralPath $v16Path -PathType Leaf) {
    $v16 = Get-Content -Raw -Encoding UTF8 -LiteralPath $v16Path
    Assert-V16Condition -Condition ($v16 -match 'viewport-fit=cover') -Message 'v16 enables iOS safe-area viewport support'
    Assert-V16Condition -Condition ($v16 -match 'data-encounter-v16-iphone-pro-max') -Message 'v16 contains the iPhone Pro Max layout marker'
    Assert-V16Condition -Condition ($v16 -match '--iphone-pro-max-width:\s*430px') -Message 'v16 declares a 430 px iPhone Pro Max frame'
    Assert-V16Condition -Condition ($v16 -match 'env\(safe-area-inset-top\)') -Message 'v16 handles the iOS top safe area'
    Assert-V16Condition -Condition ($v16 -match 'env\(safe-area-inset-bottom\)') -Message 'v16 handles the iOS bottom safe area'
    Assert-V16Condition -Condition (($v16 -match 'ENCOUNTER CARDS') -and ($v16 -match 'V16')) -Message 'v16 visible product labels identify version 16'
    Assert-V16Condition -Condition ($v16 -match 'file-launch-notice') -Message 'v16 includes a direct-file launch explanation'
    Assert-V16Condition -Condition ($v16 -match '\./v16-assets/index-CePrWcV7\.js') -Message 'v16 import map points to hierarchical HTTP module assets'
    Assert-V16Condition -Condition ($v16 -notmatch 'data:text/javascript') -Message 'v16 import map no longer embeds JavaScript data URLs'
    $v15ForStructure = Get-Content -Raw -Encoding UTF8 -LiteralPath $v15Path
    Assert-V16Condition -Condition (([regex]::Matches($v16, '<style\b')).Count -eq ([regex]::Matches($v15ForStructure, '<style\b')).Count) -Message 'v16 preserves the hydration-compatible style-node count'
    Assert-V16Condition -Condition (([regex]::Matches($v16, 'viewport-fit=cover')).Count -ge 2) -Message 'v16 synchronizes HTML and RSC viewport metadata'
    Assert-V16Condition -Condition ($v16 -notmatch '<div[^>]+file-launch-notice') -Message 'v16 does not inject pre-hydration notice DOM'
}

if (Test-Path -LiteralPath $serverPath -PathType Leaf) {
    $server = Get-Content -Raw -Encoding UTF8 -LiteralPath $serverPath
    Assert-V16Condition -Condition ($server -match "127\.0\.0\.1") -Message 'Server binds only to loopback'
    Assert-V16Condition -Condition ($server -match '8765') -Message 'Server uses the dedicated port 8765'
    Assert-V16Condition -Condition ($server -match 'encounter_cards_v16\.html') -Message 'Server opens the v16 product URL'
}

if (Test-Path -LiteralPath $launcherPath -PathType Leaf) {
    $launcher = Get-Content -Raw -Encoding UTF8 -LiteralPath $launcherPath
    Assert-V16Condition -Condition ($launcher -match 'serve_truth_and_dare\.ps1') -Message 'Desktop launcher calls the approved server helper'
}

if ($failures.Count -gt 0) {
    Write-Host "v16 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}

Write-Host 'v16 validation passed.' -ForegroundColor Cyan
exit 0
