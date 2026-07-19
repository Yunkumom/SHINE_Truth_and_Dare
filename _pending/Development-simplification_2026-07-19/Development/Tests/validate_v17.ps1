$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V17Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Development/Source/Main-App/package.json', 'Development/Source/Main-App/package-lock.json', 'Development/Source/Main-App/tsconfig.json', 'Development/Source/Main-App/vite.config.ts',
    'Development/Source/Main-App/index.html', 'Development/Source/Main-App/src/main.tsx', 'Development/Source/Main-App/src/App.tsx', 'Development/Source/Main-App/src/data/cards.ts',
    'Development/Source/Main-App/src/lib/age-gate.ts', 'Development/Source/Main-App/src/lib/game.ts', 'Development/Source/Main-App/src/styles/app.css',
    'Development/Source/Main-App/public/manifest.webmanifest', 'Development/Source/Main-App/public/service-worker.js',
    'Development/Automation/Scripts/export-standalone.mjs', 'Development/Documentation/pwa-offline-strategy.md',
    'Assets/Catalog/asset-licenses.md', 'Apps/Standalone/encounter_cards_v17.html'
)
foreach ($path in $required) {
    Assert-V17Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v17 file exists: $path"
}

$v15 = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v15.html'
$v16 = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v16.html'
Assert-V17Condition ((Get-FileHash -Algorithm SHA256 $v15).Hash -eq 'C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0') 'v15 remains immutable'
Assert-V17Condition ((Get-FileHash -Algorithm SHA256 $v16).Hash -eq 'A115066893BFECFC9060C0D31F71CD18E8EC1D47BC76E964F0A30C43D609C352') 'v16 remains immutable'

$cardsPath = Join-Path $projectRoot 'Development/Source/Main-App/src/data/cards.ts'
if (Test-Path $cardsPath) {
    $cards = Get-Content -Raw -Encoding UTF8 $cardsPath
    Assert-V17Condition (([regex]::Matches($cards, "id:\s*'card-")).Count -eq 60) 'v17 contains exactly 60 structured cards'
    Assert-V17Condition ($cards -match 'zh:' -and $cards -match 'en:') 'v17 card data is bilingual'
}

$manifestPath = Join-Path $projectRoot 'Development/Source/Main-App/public/manifest.webmanifest'
if (Test-Path $manifestPath) {
    $manifest = Get-Content -Raw -Encoding UTF8 $manifestPath
    Assert-V17Condition ($manifest -match '"display"\s*:\s*"standalone"') 'PWA manifest uses standalone display'
    Assert-V17Condition ($manifest -match 'Encounter Cards') 'PWA manifest identifies Encounter Cards'
}

$swPath = Join-Path $projectRoot 'Development/Source/Main-App/public/service-worker.js'
if (Test-Path $swPath) {
    $sw = Get-Content -Raw -Encoding UTF8 $swPath
    Assert-V17Condition ($sw -match 'encounter-cards-v17') 'Service worker cache identifies v17'
    Assert-V17Condition ($sw -match "addAll") 'Service worker precaches verified resources'
}

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v17.html'
if (Test-Path $standalonePath) {
    $standalone = Get-Content -Raw -Encoding UTF8 $standalonePath
    Assert-V17Condition ((Get-FileHash -Algorithm SHA256 $standalonePath).Hash -eq '832CDC71A4BD41E3685381D1E0094A47371F8B558D51EE23F0279C2702440FAA') 'standalone v17 matches the verified release hash'
    Assert-V17Condition ($standalone -match 'ENCOUNTER CARDS' -and $standalone -match 'V17') 'Standalone identifies v17'
    $firstScriptTag = [regex]::Match($standalone, '<script\b[^>]*>').Value
    $beforeScript = $standalone.Substring(0, $standalone.IndexOf($firstScriptTag))
    Assert-V17Condition ($firstScriptTag -notmatch '\bsrc=' -and $beforeScript -notmatch '<link[^>]+rel="stylesheet"') 'Standalone has no external script or stylesheet dependency'
}

if ($failures.Count) {
    Write-Host "v17 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}
Write-Host 'v17 validation passed.' -ForegroundColor Cyan
