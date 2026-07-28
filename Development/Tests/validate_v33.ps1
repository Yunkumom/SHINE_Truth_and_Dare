$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V33Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v33.html', 'Apps/Public-Web/v16/index.html',
    'Development/Source/Main-App-v33/src/App.tsx',
    'Development/Source/Main-App-v33/src/data/collections.ts',
    'Development/Source/Main-App-v33/src/data/question-packs.ts',
    'Development/Source/Main-App-v33/src/lib/artwork-catalog.ts',
    'Development/Source/Main-App-v33/src/lib/zodiac-art.ts',
    'Development/Source/Main-App-v33/src/lib/question-selection.ts',
    'Assets/Zodiac/Taiwan/v33-masters/manifest.json',
    'Assets/Zodiac/Taiwan/v33-masters/contact-sheet-v33.jpg',
    'Development/Automation/Scripts/finalize-pwa-v33.mjs',
    'Development/Automation/Scripts/export-standalone-v33.mjs',
    'Development/Automation/Scripts/finalize-public-v16.mjs',
    'Development/Documentation/V33_TAIWAN_ZODIAC_EXACT_CHOICE_DESIGN.md',
    'Development/Documentation/V33_TAIWAN_ZODIAC_EXACT_CHOICE_PLAN.md',
    'Development/Source/Public-Web/v16/README.md'
)
foreach ($path in $required) { Assert-V33Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v33 file exists: $path" }

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v33/src/App.tsx')
$collections = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v33/src/data/collections.ts')
$questions = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v33/src/lib/question-selection.ts')
Assert-V33Condition ($app -match "desktopMode.*'settings'.*'test'" -and $app -match 'Desktop interactive phone test') 'Desktop Settings and Test modes remain separate'
Assert-V33Condition ($app -match 'if \(desktopWorkspace\) return' -and $app -match 'phone-fit-stage') 'Desktop tools never leak into the mobile play surface'
Assert-V33Condition ($app -match 'Exact choice' -and $app -match 'questionPreference' -and $app -match 'Choose a favorite card face') 'Entry independently exposes exact artwork and question choices'
Assert-V33Condition ($collections -match "taiwan-deities" -and $collections -match "taiwan-zodiac" -and $collections -match "world-deities" -and $collections -match "world-zodiac") 'Collection registry includes two available Taiwan families and planned world families'
Assert-V33Condition ($questions -match 'fallback: true' -and $questions -match 'nextCard') 'Ineligible exact questions safely fall back within the current pool'

$zodiacArt = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v33/src/lib/zodiac-art.ts')
$runtimeArt = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v33/src/assets/zodiac/taiwan') -Filter '*-safe-v33.webp' -File)
$masters = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Assets/Zodiac/Taiwan/v33-masters') -Filter 'tw-zodiac-*-v33.png' -File)
Assert-V33Condition ($runtimeArt.Count -eq 12 -and $masters.Count -eq 12 -and ([regex]::Matches($zodiacArt, 'safe-v33\.webp')).Count -eq 12) 'All 12 Taiwan zodiac masters and runtime copies are versioned for v33'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v33.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V33Condition (($html -match 'encounter-release" content="V33"') -and ($html -match '<title>Encounter Cards V33</title>')) 'Standalone embeds v33 release markers'
    Assert-V33Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq 'D65E8283BB7CAE0210644904B95DA2F442413242E77D0E5B8FBAB34ECAA60C29') 'Standalone v33 matches its release SHA-256'
}
Assert-V33Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v32.html')).Hash -eq '61E7F1EA84FFCB4A86A6C9B19227F0904A69F7C90918AFA9DC7A5B54460D34E6') 'Standalone v32 remains immutable'

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
Assert-V33Condition ($server -match 'encounter_cards_v33\.html' -and $server -match 'encounter-release.*V33') 'Desktop launcher serves and verifies v33'
Assert-V33Condition ($workflow -match 'Main-App-v33' -and $workflow -match 'Public-Web/v16') 'GitHub Pages builds v33 and publishes Public Web v16'

if ($failures.Count) { Write-Host "v33 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v33 validation passed.' -ForegroundColor Cyan
exit 0
