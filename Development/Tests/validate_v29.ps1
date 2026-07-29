$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V29Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v29.html', 'Apps/Public-Web/v12/index.html',
    'Development/Source/Main-App-v29/src/App.tsx',
    'Development/Source/Main-App-v29/src/presentation/presentation-model.ts',
    'Development/Source/Main-App-v29/src/components/LayoutEditor.tsx',
    'Development/Source/Main-App-v29/src/styles/v29-layout.css',
    'Development/Automation/Scripts/finalize-pwa-v29.mjs',
    'Development/Automation/Scripts/export-standalone-v29.mjs',
    'Development/Automation/Scripts/finalize-public-v12.mjs',
    'Development/Documentation/V29_READABLE_CARD_TEXT_DESIGN.md',
    'Development/Documentation/V29_READABLE_CARD_TEXT_PLAN.md',
    'Development/Source/Public-Web/v12/README.md'
)
foreach ($path in $required) { Assert-V29Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v29 file exists: $path" }

$presentation = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v29/src/presentation/presentation-model.ts')
Assert-V29Condition ($presentation -match "question:\s*\{\s*fontScale:\s*1\.2" -and $presentation -match "blessing:\s*\{\s*fontScale:\s*1\.25") 'Question and blessing use the approved readable defaults'
Assert-V29Condition ($presentation -match "encounter-presentation-v29" -and $presentation -match '\.9, 1\.8') 'Independent text scales are versioned and normalized to 0.9 through 1.8'
Assert-V29Condition ($presentation -match 'FORBIDDEN_PERSONAL_KEY') 'Presentation persistence retains the personal-data boundary'

$editor = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v29/src/components/LayoutEditor.tsx')
Assert-V29Condition ($editor -match 'Question font size slider' -and $editor -match 'Blessing font size slider') 'Desktop editor exposes independent number and range controls'

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v29/src/App.tsx')
$css = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v29/src/styles/v29-layout.css')
$share = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v29/src/lib/share.ts')
Assert-V29Condition ($app -match 'question-font-scale' -and $app -match 'blessing-font-scale') 'Game and keepsake surfaces receive both typography variables'
Assert-V29Condition ($css -match 'overflow-wrap:anywhere' -and $css -match 'overflow-y:auto') 'Long card text wraps and remains readable inside its panel'
Assert-V29Condition ($share -match '37 \* presentation\.question\.fontScale' -and $share -match '23 \* blessingStyle\.fontScale') 'PNG export uses both typography settings'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v29.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    $hasReleaseMarkers = ($html -match 'encounter-release" content="V29"') -and ($html -match '<title>Encounter Cards v29</title>')
    Assert-V29Condition $hasReleaseMarkers 'Standalone embeds the v29 release and visible version markers'
    Assert-V29Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '13B5CF313C42F15DD736D11E91ACCDD6BAA7E0A10E0330C16B401B7E9CE1B3EA') 'Standalone v29 matches its release SHA-256'
}
Assert-V29Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v28.html')).Hash -eq 'DC21C3575873041E8F63D9B37BAEE38CAF311AC1839D757F28E66CFFCCB3B596') 'Standalone v28 remains immutable'

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
Assert-V29Condition ($server -match 'encounter_cards_v35\.html' -and $server -match 'encounter-release.*V35') 'Current desktop launcher moved forward without modifying v29'
Assert-V29Condition ($workflow -match 'Main-App-v35' -and $workflow -match 'Public-Web/v18') 'Current GitHub Pages workflow moved forward without modifying Public Web v12'

if ($failures.Count) { Write-Host "v29 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v29 validation passed.' -ForegroundColor Cyan
exit 0
