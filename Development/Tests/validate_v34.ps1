$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V34Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v34.html', 'Apps/Public-Web/v17/index.html',
    'Development/Source/Main-App-v34/src/App.tsx',
    'Development/Source/Main-App-v34/src/data/collections.ts',
    'Development/Source/Main-App-v34/src/lib/artwork-catalog.ts',
    'Development/Source/Main-App-v34/src/lib/zodiac-art.ts',
    'Development/Source/Main-App-v34/src/lib/local-zodiac-art.ts',
    'Assets/Zodiac/Taiwan/v34-local-stories-masters/manifest.json',
    'Assets/Zodiac/Taiwan/v34-local-stories-masters/contact-sheet-v34.jpg',
    'Development/Automation/Scripts/finalize-pwa-v34.mjs',
    'Development/Automation/Scripts/export-standalone-v34.mjs',
    'Development/Automation/Scripts/finalize-public-v17.mjs',
    'Development/Documentation/V34_MODERN_TAIWAN_ZODIAC_DESIGN.md',
    'Development/Documentation/V34_MODERN_TAIWAN_ZODIAC_PLAN.md'
)
foreach ($path in $required) { Assert-V34Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v34 file exists: $path" }

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v34/src/App.tsx')
$collections = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v34/src/data/collections.ts')
$catalog = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v34/src/lib/artwork-catalog.ts')
Assert-V34Condition ($app -match 'Collection version' -and $app -match 'featureDescription' -and $app -match '42 ARTWORKS') 'Version picker and Taiwan feature notes are wired into v34'
Assert-V34Condition ($collections -match 'taiwan-zodiac-classic' -and $collections -match 'taiwan-zodiac-local-stories') 'Classic and Local Stories zodiac versions are both available'
Assert-V34Condition ($catalog -match 'TAIWAN_ZODIAC_CLASSIC_ART' -and $catalog -match 'TAIWAN_ZODIAC_LOCAL_STORIES_ART') 'Artwork catalogue retains classic art and adds Local Stories'

$runtimeArt = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v34/src/assets/zodiac/taiwan/local-stories') -Filter '*-safe-v34.webp' -File)
$masters = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Assets/Zodiac/Taiwan/v34-local-stories-masters') -Filter 'tw-local-zodiac-*-v34.png' -File)
Assert-V34Condition ($runtimeArt.Count -eq 12 -and $masters.Count -eq 12) 'All 12 Local Stories masters and runtime copies are present'

$manifest = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Assets/Zodiac/Taiwan/v34-local-stories-masters/manifest.json') | ConvertFrom-Json
Assert-V34Condition ($manifest.artworks.Count -eq 12 -and @($manifest.artworks | Where-Object { -not $_.featureLabel.zh -or -not $_.featureDescription.zh }).Count -eq 0) 'All Local Stories artworks have Taiwan feature labels and descriptions'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v34.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V34Condition ($html -match 'encounter-release" content="V34"' -and $html -match '<title>Encounter Cards V34</title>') 'Standalone embeds v34 release markers'
    Assert-V34Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '1BACC5A73BE8592D149666401EF5B1D5F3BB41473E8918C4CBA2B5349B1B8ADD') 'Standalone v34 matches its release SHA-256'
}

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
Assert-V34Condition ($server -match 'encounter_cards_v37\.html' -and $server -match 'encounter-release.*V37') 'Desktop launcher advances to v37 without modifying v34'
Assert-V34Condition ($workflow -match 'Main-App-v37' -and $workflow -match 'Public-Web/v20') 'GitHub Pages advances to v37 and Public Web v20 without modifying v34'

if ($failures.Count) { Write-Host "v34 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v34 validation passed.' -ForegroundColor Cyan
exit 0
