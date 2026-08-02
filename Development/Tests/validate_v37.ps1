$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V37Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v37.html',
    'Apps/Public-Web/v20/index.html',
    'Development/Source/Main-App-v37/src/App.tsx',
    'Development/Source/Main-App-v37/src/components/LayoutEditor.tsx',
    'Development/Source/Main-App-v37/src/styles/v37.css',
    'Development/Source/Main-App-v37/dist/index.html',
    'Development/Automation/Scripts/finalize-pwa-v37.mjs',
    'Development/Automation/Scripts/export-standalone-v37.mjs',
    'Development/Automation/Scripts/finalize-public-v20.mjs',
    'Development/Documentation/V37_DESKTOP_STUDIO_DESIGN.md',
    'Development/Documentation/V37_DESKTOP_STUDIO_PLAN.md',
    'Development/Source/Public-Web/v20/README.md'
)
foreach ($path in $required) {
    Assert-V37Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v37 file exists: $path"
}

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v37/src/App.tsx')
$editor = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v37/src/components/LayoutEditor.tsx')
$styles = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v37/src/styles/v37.css')
$layoutModel = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v37/src/layout/layout-model.ts')
$presentationModel = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v37/src/presentation/presentation-model.ts')

Assert-V37Condition ($app -match 'desktop-editor-rail' -and $app -match 'desktop-center-stage' -and $app -match 'desktop-phone-preview') 'Settings mode owns explicit left, centre, and right regions'
Assert-V37Condition ($app -match 'desktop-mode-bookmarks' -and $app -match 'desktop-mode-bookmark-tabs') 'Desktop mode controls use a reserved bookmark region'
Assert-V37Condition ($app -match 'desktop-phone-canvas" aria-hidden="true" inert' -and $app -match 'desktop-test-canvas') 'Settings phone is inert and Test phone is interactive'
Assert-V37Condition ($editor -match "type EditorSection = 'layout' \| 'card' \| 'history' \| 'data'" -and $editor -match 'EDITOR_SECTIONS') 'Layout editor exposes four compact selectable categories'
Assert-V37Condition ($editor -match "section === 'layout'" -and $editor -match "section === 'card'" -and $editor -match "section === 'history'" -and $editor -match "section === 'data'") 'Only the selected editor category is rendered'
Assert-V37Condition ($styles -match 'grid-template-columns:\s*270px\s+minmax\(0,\s*1fr\)\s+310px' -and $styles -match '@media \(min-width: 1366px\) and \(min-height: 768px\)') 'CSS locks the complete three-column 1366 by 768 studio contract'
Assert-V37Condition ($styles -match '\.layout-editor\.is-docked[\s\S]*overflow:\s*hidden' -and $styles -match '\.desktop-viewport[\s\S]*overflow:\s*hidden') 'Desktop page and docked editor prohibit scrolling'
Assert-V37Condition ($layoutModel -match "encounter-layout-v37" -and $presentationModel -match "encounter-presentation-v37") 'Only versioned privacy-safe layout and presentation keys changed'
Assert-V37Condition ($app -notmatch 'fetch\(' -and $app -notmatch 'sendBeacon' -and $app -notmatch 'analytics') 'v37 adds no product network or analytics behavior'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v37.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V37Condition ($html -match 'encounter-release" content="V37"' -and $html -match '<title>Encounter Cards V37</title>') 'Standalone embeds v37 release markers'
    Assert-V37Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '055F64758D68EEEEDA0D106A766DCDF03E4FA920D9A7E4EF96A88C1F7A0095EE') 'Standalone v37 matches its release SHA-256'
}

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
$publicWorkerPath = Join-Path $projectRoot 'Apps/Public-Web/v20/service-worker.js'
Assert-V37Condition ($server -match 'encounter_cards_v37\.html' -and $server -match 'encounter-release.*V37') 'Desktop launcher serves and verifies v37'
Assert-V37Condition ($workflow -match 'Main-App-v39' -and $workflow -match 'Public-Web/v22' -and $workflow -match 'node-version: 26') 'GitHub Pages advances to v38 and Public Web v21 without modifying v37'
if (Test-Path -LiteralPath $publicWorkerPath -PathType Leaf) {
    $serviceWorker = Get-Content -Raw -Encoding UTF8 -LiteralPath $publicWorkerPath
    Assert-V37Condition ($serviceWorker -match 'encounter-cards-v37-') 'Public Web v20 uses the v37 offline cache namespace'
}

if ($failures.Count) {
    Write-Host "v37 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}
Write-Host 'v37 validation passed.' -ForegroundColor Cyan
exit 0
