$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V18Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Development/Source/Main-App-v18/package.json', 'Development/Source/Main-App-v18/package-lock.json',
    'Development/Source/Main-App-v18/src/App.tsx', 'Development/Source/Main-App-v18/src/lib/viewport-scale.ts',
    'Development/Source/Main-App-v18/src/lib/viewport-scale.test.ts', 'Development/Source/Main-App-v18/src/styles/app.css',
    'Development/Source/Main-App-v18/public/manifest.webmanifest', 'Development/Source/Main-App-v18/public/service-worker.js',
    'Development/Automation/Scripts/finalize-pwa-v18.mjs', 'Development/Automation/Scripts/export-standalone-v18.mjs',
    'Apps/Standalone/encounter_cards_v18.html'
)
foreach ($path in $required) {
    Assert-V18Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v18 file exists: $path"
}

$immutable = @{
    'Apps/Standalone/encounter_cards_v15.html' = 'C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0'
    'Apps/Standalone/encounter_cards_v16.html' = 'A115066893BFECFC9060C0D31F71CD18E8EC1D47BC76E964F0A30C43D609C352'
    'Apps/Standalone/encounter_cards_v17.html' = '832CDC71A4BD41E3685381D1E0094A47371F8B558D51EE23F0279C2702440FAA'
}
foreach ($path in $immutable.Keys) {
    Assert-V18Condition ((Get-FileHash -Algorithm SHA256 (Join-Path $projectRoot $path)).Hash -eq $immutable[$path]) "$path remains immutable"
}

$scalePath = Join-Path $projectRoot 'Development/Source/Main-App-v18/src/lib/viewport-scale.ts'
if (Test-Path $scalePath) {
    $scale = Get-Content -Raw -Encoding UTF8 $scalePath
    Assert-V18Condition ($scale -match 'PHONE_WIDTH = 430' -and $scale -match 'PHONE_HEIGHT = 932') 'v18 preserves the 430 × 932 phone contract'
    Assert-V18Condition ($scale -match 'Math\.min\(1') 'v18 only shrinks the desktop frame and never enlarges it'
}

$cssPath = Join-Path $projectRoot 'Development/Source/Main-App-v18/src/styles/app.css'
if (Test-Path $cssPath) {
    $css = Get-Content -Raw -Encoding UTF8 $cssPath
    Assert-V18Condition ($css -match 'phone-fit-stage' -and $css -match 'transform:scale\(var\(--phone-scale\)\)') 'v18 reserves scaled space and scales the phone shell'
    Assert-V18Condition ($css -match '@media\(min-width:561px\)' -and $css -match 'overflow:hidden') 'v18 desktop layout prevents page scrolling'
}

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v18.html'
if (Test-Path $standalonePath) {
    $standalone = Get-Content -Raw -Encoding UTF8 $standalonePath
    Assert-V18Condition ($standalone -match 'ENCOUNTER CARDS' -and $standalone -match 'V18') 'Standalone identifies v18'
    Assert-V18Condition ($standalone -match 'encounter-release" content="V18"') 'Standalone has the v18 release marker'
    $firstScriptTag = [regex]::Match($standalone, '<script\b[^>]*>').Value
    $beforeScript = $standalone.Substring(0, $standalone.IndexOf($firstScriptTag))
    Assert-V18Condition ($firstScriptTag -notmatch '\bsrc=' -and $beforeScript -notmatch '<link[^>]+rel="stylesheet"') 'Standalone has no external script or stylesheet dependency'
}

if ($failures.Count) {
    Write-Host "v18 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}
Write-Host 'v18 validation passed.' -ForegroundColor Cyan
