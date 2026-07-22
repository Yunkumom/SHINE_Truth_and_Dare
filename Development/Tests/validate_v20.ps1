$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V20Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v20.html',
    'Apps/Public-Web/v3/index.html',
    'Development/Source/Main-App-v20/src/App.tsx',
    'Development/Source/Main-App-v20/src/data/blessings.ts',
    'Development/Source/Main-App-v20/src/lib/deity-art.ts',
    'Development/Source/Main-App-v20/src/lib/encounter.ts',
    'Development/Source/Main-App-v20/src/lib/share.ts',
    'Development/Source/Main-App-v20/src/styles/app.css',
    'Development/Source/Main-App-v20/src/styles/v20.css',
    'Development/Automation/Scripts/finalize-pwa-v20.mjs',
    'Development/Automation/Scripts/export-standalone-v20.mjs',
    'Development/Automation/Scripts/finalize-public-v3.mjs',
    'Assets/Deities/v20-variants/README.md',
    'Assets/Deities/v20-variants/PROMPTS.md'
)
foreach ($path in $required) {
    Assert-V20Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v20 file exists: $path"
}

$variantImages = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Assets/Deities/v20-variants') -Filter '*.png' -File)
Assert-V20Condition ($variantImages.Count -eq 9) 'Nine high-resolution v20 deity variants exist'
$runtimeImages = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v20/src/assets/deities') -Filter '*.webp' -File)
Assert-V20Condition ($runtimeImages.Count -eq 18) 'Eighteen optimized v20 deity artworks exist'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v20.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V20Condition ($html -match 'encounter-release" content="V20"') 'Standalone identifies v20'
    Assert-V20Condition ($html -match 'data:image/webp;base64,') 'Standalone embeds deity artwork'
    Assert-V20Condition ($html -match 'ENCOUNTER CARDS' -and $html -match 'BLESSING') 'Standalone contains the v16-inspired card and blessing presentation'
    Assert-V20Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '34FAF72620CDF22F8BF015A8AD545C5623F9801CA4C1B2F84C05794FB0511F1A') 'Standalone v20 matches its release SHA-256'
}

$appSource = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v20/src/App.tsx')
Assert-V20Condition ($appSource -match 'Set the moment' -and $appSource -match 'Choose familiarity level' -and $appSource -match 'Choose a card type') 'Entrance preserves the approved v16 hierarchy'
Assert-V20Condition ($appSource -match 'selectArtwork' -and $appSource -match 'selectBlessing') 'Question, artwork, and blessing are composed independently'

$shareSource = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v20/src/lib/share.ts')
Assert-V20Condition ($shareSource -match 'BLESSING' -and $shareSource -match 'anchor\.download') 'Keepsake always draws a blessing and supports desktop download'

$layoutSource = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v20/src/styles/app.css')
Assert-V20Condition ($layoutSource -match 'translate\(-50%, -50%\).*scale' -and $layoutSource -match 'left: 50%' -and $layoutSource -match 'top: 50%') 'Scaled desktop phone is anchored to the exact viewport center'

if ($failures.Count) {
    Write-Host "v20 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}
Write-Host 'v20 validation passed.' -ForegroundColor Cyan
exit 0
