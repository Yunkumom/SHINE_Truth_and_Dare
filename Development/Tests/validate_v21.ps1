$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V21Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v21.html',
    'Apps/Public-Web/v4/index.html',
    'Development/Source/Main-App-v21/src/App.tsx',
    'Development/Source/Main-App-v21/src/components/TaiwanReveal.tsx',
    'Development/Source/Main-App-v21/src/data/blessings.ts',
    'Development/Source/Main-App-v21/src/lib/deity-art.ts',
    'Development/Source/Main-App-v21/src/lib/encounter.ts',
    'Development/Source/Main-App-v21/src/lib/share.ts',
    'Development/Source/Main-App-v21/src/styles/app.css',
    'Development/Source/Main-App-v21/src/styles/v21.css',
    'Development/Source/Main-App-v21/src/styles/taiwan-reveal.css',
    'Development/Automation/Scripts/finalize-pwa-v21.mjs',
    'Development/Automation/Scripts/export-standalone-v21.mjs',
    'Development/Automation/Scripts/finalize-public-v4.mjs',
    'Development/Documentation/V21_TAIWAN_REVEAL_DESIGN.md',
    'Development/Documentation/V21_TAIWAN_REVEAL_PLAN.md'
)
foreach ($path in $required) {
    Assert-V21Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v21 file exists: $path"
}

$runtimeImages = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v21/src/assets/deities') -Filter '*.webp' -File)
Assert-V21Condition ($runtimeImages.Count -eq 18) 'Eighteen optimized v21 deity artworks exist'

$deitySource = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v21/src/lib/deity-art.ts')
$hotspotCount = ([regex]::Matches($deitySource, 'taiwanHotspot\s*:')).Count
Assert-V21Condition ($hotspotCount -eq 18) 'All eighteen deity artworks register independent Taiwan hotspots'

$revealSource = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v21/src/components/TaiwanReveal.tsx')
Assert-V21Condition ($revealSource -match 'HOLD_TO_REVEAL_MS\s*=\s*600' -and $revealSource -match 'REVEAL_AFTER_RELEASE_MS\s*=\s*3000') 'Long press waits 600 ms and remains visible for 3 seconds after release'
Assert-V21Condition ($revealSource -match "event\.key !== 'Enter'" -and $revealSource -match "event\.key !== ' '") 'Taiwan reveal supports Enter and Space'
Assert-V21Condition ($revealSource -match 'stopPropagation' -and $revealSource -match 'MOVE_CANCEL_DISTANCE') 'Artwork reveal is isolated from card gestures and cancels on movement'

$revealCss = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v21/src/styles/taiwan-reveal.css')
Assert-V21Condition ($revealCss -match '@keyframes taiwanPulse' -and $revealCss -match '@keyframes taiwanHalo') 'Taiwan locator has blinking outline and halo animation'
Assert-V21Condition ($revealCss -match 'prefers-reduced-motion:\s*reduce' -and $revealCss -match 'animation:\s*none') 'Taiwan locator respects reduced-motion preference'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v21.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V21Condition ($html -match 'encounter-release" content="V21"') 'Standalone identifies v21'
    Assert-V21Condition ($html -match 'data:image/webp;base64,') 'Standalone embeds deity artwork'
    Assert-V21Condition ($html -match 'taiwan-locator' -and $html -match 'taiwanPulse') 'Standalone embeds the Taiwan reveal interaction and animation'
    Assert-V21Condition ($html -match 'BLESSING') 'Standalone keeps mandatory blessing presentation'
    Assert-V21Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '500CA5492AD8BD90652818289D92E1FED132DFB3E599BB69E601E96412D10281') 'Standalone v21 matches its release SHA-256'
}

$appSource = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v21/src/App.tsx')
Assert-V21Condition ($appSource -match 'Set the moment' -and $appSource -match 'Choose familiarity level' -and $appSource -match 'Choose a card type') 'Entrance preserves the approved v16 hierarchy'
Assert-V21Condition ($appSource -match 'TaiwanReveal' -and $appSource -match 'selectArtwork' -and $appSource -match 'selectBlessing') 'App integrates reveal while preserving independent composition'

$shareSource = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v21/src/lib/share.ts')
Assert-V21Condition ($shareSource -match 'BLESSING' -and $shareSource -match 'anchor\.download') 'Keepsake always draws a blessing and supports desktop download'
Assert-V21Condition ($shareSource -notmatch 'taiwan-locator' -and $shareSource -notmatch 'taiwanHotspot') 'Runtime Taiwan locator remains excluded from PNG export'

$layoutSource = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v21/src/styles/app.css')
Assert-V21Condition ($layoutSource -match 'translate\(-50%, -50%\).*scale' -and $layoutSource -match 'left: 50%' -and $layoutSource -match 'top: 50%') 'Scaled desktop phone remains anchored to the exact viewport center'

if ($failures.Count) {
    Write-Host "v21 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}
Write-Host 'v21 validation passed.' -ForegroundColor Cyan
exit 0
