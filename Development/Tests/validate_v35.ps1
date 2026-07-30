$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V35Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v35.html', 'Apps/Public-Web/v18/index.html',
    'Development/Source/Main-App-v35/src/App.tsx',
    'Development/Source/Main-App-v35/src/components/CardLibrary.tsx',
    'Development/Source/Main-App-v35/src/lib/card-library.ts',
    'Development/Source/Main-App-v35/src/styles/v35.css',
    'Development/Source/Main-App-v35/dist/index.html',
    'Development/Automation/Scripts/finalize-pwa-v35.mjs',
    'Development/Automation/Scripts/export-standalone-v35.mjs',
    'Development/Automation/Scripts/finalize-public-v18.mjs',
    'Development/Documentation/V35_CARD_LIBRARY_DESIGN.md',
    'Development/Documentation/V35_CARD_LIBRARY_PLAN.md'
)
foreach ($path in $required) { Assert-V35Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v35 file exists: $path" }

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v35/src/App.tsx')
$library = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v35/src/components/CardLibrary.tsx')
$policy = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v35/src/lib/card-library.ts')
$styles = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v35/src/styles/v35.css')
Assert-V35Condition ($app -match 'Open card library' -and $app -match '<CardLibrary' -and $app -match '42 ARTWORKS') 'Entrance card-library trigger and full 42-artwork catalogue are wired into v35'
Assert-V35Condition ($app -match 'chooseLibraryArtwork' -and $app -match "mode: 'specific'" -and $app -match "mode: 'random'") 'Library artwork choice remains independent from random question choice'
Assert-V35Condition ($library -match 'role="dialog"' -and $library -match 'ArrowRight' -and $library -match 'ArrowLeft' -and $library -match 'onPointerMove') 'Card library supports modal, keyboard, and pointer-swipe interaction'
Assert-V35Condition ($library -match 'cardIndexes\.map' -and $library -match 'positionIndex - 1' -and $policy -match 'Math\.max\(52, Math\.max\(viewportWidth, 1\) \* \.16\)') 'Library virtualizes three cards and uses the governed swipe threshold'
Assert-V35Condition ($styles -match 'width:360px;height:503px' -and $styles -match 'prefers-reduced-motion:reduce') 'Library card proportions and reduced-motion behavior are governed'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v35.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V35Condition ($html -match 'encounter-release" content="V35"' -and $html -match '<title>Encounter Cards V35</title>') 'Standalone embeds v35 release markers'
    Assert-V35Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq 'C802BD78E82B27D0BB3821E3A7BED7D3EE176106FBA9F8F1FFA1F292DAB9CFDC') 'Standalone v35 matches its release SHA-256'
}

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
$serviceWorker = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Apps/Public-Web/v18/service-worker.js')
Assert-V35Condition ($server -match 'encounter_cards_v37\.html' -and $server -match 'encounter-release.*V37') 'Desktop launcher advances to v37 without modifying v35'
Assert-V35Condition ($workflow -match 'Main-App-v37' -and $workflow -match 'Public-Web/v20') 'GitHub Pages advances to v37 and Public Web v20 without modifying v35'
Assert-V35Condition ($serviceWorker -match 'encounter-cards-v35-') 'Public Web v18 uses the v35 offline cache namespace'

if ($failures.Count) { Write-Host "v35 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v35 validation passed.' -ForegroundColor Cyan
exit 0
