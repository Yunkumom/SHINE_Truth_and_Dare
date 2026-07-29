$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V32Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v32.html', 'Apps/Public-Web/v15/index.html',
    'Development/Source/Main-App-v32/src/App.tsx',
    'Development/Source/Main-App-v32/src/data/collections.ts',
    'Development/Source/Main-App-v32/src/lib/artwork-selection.ts',
    'Development/Source/Main-App-v32/src/components/EditableBlock.tsx',
    'Development/Source/Main-App-v32/src/components/LayoutEditor.tsx',
    'Development/Source/Main-App-v32/src/styles/v32-layout.css',
    'Development/Automation/Scripts/finalize-pwa-v32.mjs',
    'Development/Automation/Scripts/export-standalone-v32.mjs',
    'Development/Automation/Scripts/finalize-public-v15.mjs',
    'Development/Documentation/V32_DESKTOP_MODES_AND_TYPE_SAFETY_DESIGN.md',
    'Development/Documentation/V32_DESKTOP_MODES_AND_TYPE_SAFETY_PLAN.md',
    'Development/Source/Public-Web/v15/README.md'
)
foreach ($path in $required) { Assert-V32Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v32 file exists: $path" }

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v32/src/App.tsx')
$editable = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v32/src/components/EditableBlock.tsx')
$collections = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v32/src/data/collections.ts')
$css = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v32/src/styles/v32-layout.css')
Assert-V32Condition ($app -match "desktopMode.*'settings'.*'test'" -and $app -match 'Desktop interactive phone test') 'Desktop Settings and Test modes are separate'
Assert-V32Condition ($app -match 'if \(desktopWorkspace\) return' -and $app -match 'return <div className="viewport-stage"><div className="phone-fit-stage"') 'Desktop tools never leak into the mobile play surface'
Assert-V32Condition ($editable -match 'directManipulation = false' -and $editable -match 'canvasScale' -and $editable -match 'data-no-layout-drag') 'Layout editing is opt-in, scale-aware, and ignores controls'
Assert-V32Condition ($app -match 'Advanced deck choice' -and $app -match 'Choose a favorite card face') 'Entry and draw surfaces expose approved artwork choices'
Assert-V32Condition ($collections -match "taiwan-deities" -and $collections -match "taiwan-astral" -and $collections -match "world-deities" -and $collections -match "world-zodiac") 'Collection registry includes the available and planned families'
Assert-V32Condition ($css -match '\.mythic-card-header\{[^}]*overflow:visible' -and $css -match '\.mythic-card-header h2\{[^}]*overflow:visible') 'Card deity name and header use non-clipping typography rules'

$art = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v32/src/lib/deity-art.ts')
$runtimeArt = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v32/src/assets/deities') -Filter '*-safe-v32.webp' -File)
Assert-V32Condition ($runtimeArt.Count -eq 18 -and ([regex]::Matches($art, 'safe-v32\.webp')).Count -eq 18) 'All 18 approved portrait-safe artworks are versioned for v32'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v32.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V32Condition (($html -match 'encounter-release" content="V32"') -and ($html -match '<title>Encounter Cards v32</title>')) 'Standalone embeds v32 release markers'
    Assert-V32Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '61E7F1EA84FFCB4A86A6C9B19227F0904A69F7C90918AFA9DC7A5B54460D34E6') 'Standalone v32 matches its release SHA-256'
}
Assert-V32Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v31.html')).Hash -eq 'AAEEFBC7A09C341BE497C8ABD8848CB474ED8D7F4FE8032856710612A79CD660') 'Standalone v31 remains immutable'

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
Assert-V32Condition ($server -match 'encounter_cards_v35\.html' -and $server -match 'encounter-release.*V35') 'Desktop launcher advances to v35 without modifying v32'
Assert-V32Condition ($workflow -match 'Main-App-v35' -and $workflow -match 'Public-Web/v18') 'GitHub Pages advances to v35 and Public Web v18'

if ($failures.Count) { Write-Host "v32 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v32 validation passed.' -ForegroundColor Cyan
exit 0
