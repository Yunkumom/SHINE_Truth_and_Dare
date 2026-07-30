$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V36Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v36.html', 'Apps/Public-Web/v19/index.html',
    'Development/Source/Main-App-v36/src/App.tsx',
    'Development/Source/Main-App-v36/src/components/MobileSettings.tsx',
    'Development/Source/Main-App-v36/src/components/ArtworkPicker.tsx',
    'Development/Source/Main-App-v36/src/components/ArtworkAdjuster.tsx',
    'Development/Source/Main-App-v36/src/lib/question-manager.ts',
    'Development/Source/Main-App-v36/src/styles/v36.css',
    'Development/Source/Main-App-v36/dist/index.html',
    'Development/Automation/Scripts/finalize-pwa-v36.mjs',
    'Development/Automation/Scripts/export-standalone-v36.mjs',
    'Development/Automation/Scripts/finalize-public-v19.mjs',
    'Development/Documentation/V36_MOBILE_WORK_INTEGRATION_DESIGN.md',
    'Development/Documentation/V36_MOBILE_WORK_INTEGRATION_PLAN.md'
)
foreach ($path in $required) { Assert-V36Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v36 file exists: $path" }

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v36/src/App.tsx')
$settings = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v36/src/components/MobileSettings.tsx')
$picker = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v36/src/components/ArtworkPicker.tsx')
$manager = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v36/src/lib/question-manager.ts')
$styles = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v36/src/styles/v36.css')
Assert-V36Condition ($app -match '<MobileSettings' -and $app -match '<ArtworkAdjuster' -and $app -match 'V36') 'v36 app integrates the mobile settings and artwork adjustment surfaces'
Assert-V36Condition ($app -match '<BlessingText' -and $settings -notmatch 'showBlessing' -and $styles -notmatch 'hide-blessing') 'Blessings remain mandatory in the card and settings contract'
Assert-V36Condition ($settings -match "'general'" -and $settings -match "'cards'" -and $settings -match "'questions'" -and $settings -match "'content'" -and $settings -match "'positions'") 'Mobile settings expose the five governed tabs'
Assert-V36Condition ($picker -match 'photo-picker-grid' -and $settings -match '<ArtworkPicker') 'Photo picker exposes the governed artwork library'
Assert-V36Condition ($manager -match 'resolveManagedQuestion' -and $manager -match 'disabledQuestionIds' -and $manager -match 'custom') 'Question manager supports session filtering, custom questions, and exact selection'
Assert-V36Condition ($app -notmatch 'question-manager.*localStorage' -and $settings -notmatch 'localStorage') 'Question-manager and custom-question state are not persisted'
Assert-V36Condition ($styles -match '\.library-manager' -and $styles -match '\.photo-picker-grid' -and $styles -match '\.artwork-control-panel' -and $styles -match '\.language-select') 'Imported Work visual surfaces are authored in v36 styles'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v36.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V36Condition ($html -match 'encounter-release" content="V36"' -and $html -match '<title>Encounter Cards V36</title>') 'Standalone embeds v36 release markers'
    Assert-V36Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '8D4305743D157E27B66F1387E56D80B578323E4C76F9D9F944C2EE235DEE740A') 'Standalone v36 matches its release SHA-256'
}

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
$publicWorkerPath = Join-Path $projectRoot 'Apps/Public-Web/v19/service-worker.js'
Assert-V36Condition ($server -match 'encounter_cards_v37\.html' -and $server -match 'encounter-release.*V37') 'Desktop launcher advances to v37 without modifying v36'
Assert-V36Condition ($workflow -match 'Main-App-v37' -and $workflow -match 'Public-Web/v20' -and $workflow -match 'node-version: 26') 'GitHub Pages advances to v37 and Public Web v20 on Node 26 without modifying v36'
if (Test-Path -LiteralPath $publicWorkerPath -PathType Leaf) {
    $serviceWorker = Get-Content -Raw -Encoding UTF8 -LiteralPath $publicWorkerPath
    Assert-V36Condition ($serviceWorker -match 'encounter-cards-v36-') 'Public Web v19 uses the v36 offline cache namespace'
}

if ($failures.Count) { Write-Host "v36 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v36 validation passed.' -ForegroundColor Cyan
exit 0
