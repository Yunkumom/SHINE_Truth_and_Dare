$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V39Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v39.html',
    'Apps/Public-Web/v22/index.html',
    'Development/Source/Main-App-v39/src/App.tsx',
    'Development/Source/Main-App-v39/src/components/ModeHome.tsx',
    'Development/Source/Main-App-v39/src/components/DirectKeepsake.tsx',
    'Development/Source/Main-App-v39/src/components/ArtworkAdjuster.tsx',
    'Development/Source/Main-App-v39/src/lib/direct-keepsake.ts',
    'Development/Source/Main-App-v39/src/styles/v39.css',
    'Development/Source/Main-App-v39/dist/index.html',
    'Development/Automation/Scripts/finalize-pwa-v39.mjs',
    'Development/Automation/Scripts/export-standalone-v39.mjs',
    'Development/Automation/Scripts/finalize-public-v22.mjs',
    'Development/Documentation/V39_MOBILE_MODES_AND_KEEPSAKE_DESIGN.md',
    'Development/Documentation/V39_MOBILE_MODES_AND_KEEPSAKE_PLAN.md',
    'Development/Source/Public-Web/v22/README.md'
)
foreach ($path in $required) {
    Assert-V39Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v39 file exists: $path"
}

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v39/src/App.tsx')
$home = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v39/src/components/ModeHome.tsx')
$keepsake = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v39/src/components/DirectKeepsake.tsx')
$keepsakeExport = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v39/src/lib/direct-keepsake.ts')
$styles = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v39/src/styles/v39.css')
$adjuster = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v39/src/components/ArtworkAdjuster.tsx')
$layoutModel = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v39/src/layout/layout-model.ts')
$presentationModel = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v39/src/presentation/presentation-model.ts')

Assert-V39Condition ($app -match 'ModeHome' -and $app -match 'DirectKeepsake' -and $app -match 'menu-icon' -and $app -match 'v39-mobile-stage') 'App routes three mobile modes and uses the icon-only menu'
Assert-V39Condition ($home -match 'Encounter Card' -and $home -match 'Direct Keepsake' -and $home -match 'Truth or Dare') 'Mode home exposes all three approved experiences'
Assert-V39Condition ($styles -match 'width:\s*100%' -and $styles -match 'height:\s*100dvh' -and $styles -match 'transform:\s*none') 'Mobile uses a full-width one-viewport reflow without canvas shrinking'
Assert-V39Condition ($styles -match 'inset-inline:\s*12px' -and $styles -match '\.menu-icon') 'Mobile controls keep equal edge insets and an icon-only settings affordance'
Assert-V39Condition ($keepsake -match 'type="file"' -and $keepsake -match 'accept="image/\*"' -and $keepsake -match '自己寫' -and $keepsake -match 'downloadDirectKeepsake') 'Direct Keepsake supports local images, custom blessings, and export'
Assert-V39Condition ($keepsakeExport -match '1260' -and $keepsakeExport -match '1760' -and $keepsakeExport -match 'drawImageContain' -and $keepsakeExport -notmatch 'fetch\(') 'Keepsake PNG contains complete images and adds no network behavior'
Assert-V39Condition ($adjuster -match 'data-testid="artwork-grid"' -and $adjuster -match 'min="-60" max="60"' -and $adjuster -match 'max="2\.4"') 'Existing grid-guided artwork adjustment remains available'
Assert-V39Condition ($layoutModel -match 'encounter-layout-v39' -and $presentationModel -match 'encounter-presentation-v39') 'Only versioned privacy-safe layout and presentation keys changed'
Assert-V39Condition ($app -notmatch 'fetch\(' -and $app -notmatch 'sendBeacon' -and $app -notmatch 'analytics') 'v39 adds no product network or analytics behavior'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v39.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V39Condition ($html -match 'encounter-release" content="V39"' -and $html -match '<title>Encounter Cards V39</title>') 'Standalone embeds v39 release markers'
    Assert-V39Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '51331CCE3286FD889ED0CE746148662B9B2279E3BAB26BCA21119869E1371563') 'Standalone v39 matches its release SHA-256'
}

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
$publicWorkerPath = Join-Path $projectRoot 'Apps/Public-Web/v22/service-worker.js'
Assert-V39Condition ($server -match 'encounter_cards_v39\.html' -and $server -match 'encounter-release.*V39') 'Desktop launcher serves and verifies v39'
Assert-V39Condition ($workflow -match 'Main-App-v39' -and $workflow -match 'Public-Web/v22' -and $workflow -match 'node-version: 26') 'GitHub Pages builds v39 on Node 26 and publishes Public Web v22'
if (Test-Path -LiteralPath $publicWorkerPath -PathType Leaf) {
    $serviceWorker = Get-Content -Raw -Encoding UTF8 -LiteralPath $publicWorkerPath
    Assert-V39Condition ($serviceWorker -match 'encounter-cards-v39-') 'Public Web v22 uses the v39 offline cache namespace'
}

if ($failures.Count) {
    Write-Host "v39 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}
Write-Host 'v39 validation passed.' -ForegroundColor Cyan
exit 0
