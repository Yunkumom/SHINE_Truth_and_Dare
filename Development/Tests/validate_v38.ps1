$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V38Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v38.html',
    'Apps/Public-Web/v21/index.html',
    'Development/Source/Main-App-v38/src/App.tsx',
    'Development/Source/Main-App-v38/src/components/ArtworkAdjuster.tsx',
    'Development/Source/Main-App-v38/src/styles/v38.css',
    'Development/Source/Main-App-v38/dist/index.html',
    'Development/Automation/Scripts/finalize-pwa-v38.mjs',
    'Development/Automation/Scripts/export-standalone-v38.mjs',
    'Development/Automation/Scripts/finalize-public-v21.mjs',
    'Development/Documentation/V38_MOBILE_VIEWPORT_FIT_DESIGN.md',
    'Development/Documentation/V38_MOBILE_VIEWPORT_FIT_PLAN.md',
    'Development/Source/Public-Web/v21/README.md'
)
foreach ($path in $required) {
    Assert-V38Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v38 file exists: $path"
}

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v38/src/App.tsx')
$adjuster = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v38/src/components/ArtworkAdjuster.tsx')
$styles = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v38/src/styles/v38.css')
$layoutModel = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v38/src/layout/layout-model.ts')
$presentationModel = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v38/src/presentation/presentation-model.ts')

Assert-V38Condition ($app -match 'window\.visualViewport' -and $app -match 'v38-mobile-stage') 'Mobile scaling uses the live visual viewport'
Assert-V38Condition ($styles -match 'height:\s*932px' -and $styles -match 'scale\(var\(--phone-scale\)\)' -and $styles -match 'overflow:\s*hidden') 'Complete phone canvas scales into one non-scrolling viewport'
Assert-V38Condition ($styles -match '\.v38-shell \.artwork-control-panel[\s\S]*right:\s*14px[\s\S]*width:\s*auto') 'Revealed artwork controls remain inside the mobile canvas'
Assert-V38Condition ($adjuster -match 'data-testid="artwork-grid"' -and $adjuster -match 'min="-60" max="60"' -and $adjuster -match 'max="2\.4"') 'Artwork adjuster has grid, extended vertical movement, and 240 percent zoom'
Assert-V38Condition ($adjuster -match '取消照片調整' -and $adjuster -match '儲存照片調整') 'Artwork adjustment has explicit cancel and save actions'
Assert-V38Condition ($layoutModel -match "encounter-layout-v38" -and $presentationModel -match "encounter-presentation-v38") 'Only versioned privacy-safe layout and presentation keys changed'
Assert-V38Condition ($app -notmatch 'fetch\(' -and $app -notmatch 'sendBeacon' -and $app -notmatch 'analytics') 'v38 adds no product network or analytics behavior'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v38.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V38Condition ($html -match 'encounter-release" content="V38"' -and $html -match '<title>Encounter Cards V38</title>') 'Standalone embeds v38 release markers'
    Assert-V38Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '60E26C0B29C49944E07CCB53C149FA8C36029DD8136F278DBE26E3F97CFABA88') 'Standalone v38 matches its release SHA-256'
}

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
$publicWorkerPath = Join-Path $projectRoot 'Apps/Public-Web/v21/service-worker.js'
Assert-V38Condition ($server -match 'encounter_cards_v38\.html' -and $server -match 'encounter-release.*V38') 'Desktop launcher serves and verifies v38'
Assert-V38Condition ($workflow -match 'Main-App-v38' -and $workflow -match 'Public-Web/v21' -and $workflow -match 'node-version: 26') 'GitHub Pages builds v38 on Node 26 and publishes Public Web v21'
if (Test-Path -LiteralPath $publicWorkerPath -PathType Leaf) {
    $serviceWorker = Get-Content -Raw -Encoding UTF8 -LiteralPath $publicWorkerPath
    Assert-V38Condition ($serviceWorker -match 'encounter-cards-v38-') 'Public Web v21 uses the v38 offline cache namespace'
}

if ($failures.Count) {
    Write-Host "v38 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}
Write-Host 'v38 validation passed.' -ForegroundColor Cyan
exit 0
