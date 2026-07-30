$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V31Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v31.html', 'Apps/Public-Web/v14/index.html',
    'Development/Source/Main-App-v31/src/App.tsx',
    'Development/Source/Main-App-v31/src/presentation/presentation-model.ts',
    'Development/Source/Main-App-v31/src/components/LayoutEditor.tsx',
    'Development/Source/Main-App-v31/src/styles/v31-layout.css',
    'Development/Automation/Scripts/finalize-pwa-v31.mjs',
    'Development/Automation/Scripts/export-standalone-v31.mjs',
    'Development/Automation/Scripts/finalize-public-v14.mjs',
    'Development/Documentation/V31_MILK_TEA_SETUP_DESIGN.md',
    'Development/Documentation/V31_MILK_TEA_SETUP_PLAN.md',
    'Development/Source/Public-Web/v14/README.md'
)
foreach ($path in $required) { Assert-V31Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v31 file exists: $path" }

$presentation = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v31/src/presentation/presentation-model.ts')
Assert-V31Condition ($presentation -match "question:\s*\{\s*fontScale:\s*1\.2" -and $presentation -match "blessing:\s*\{\s*fontScale:\s*1\.25") 'Question and blessing use the approved readable defaults'
Assert-V31Condition ($presentation -match "encounter-presentation-v31" -and $presentation -match '\.9, 1\.8') 'Independent text scales are versioned and normalized to 0.9 through 1.8'
Assert-V31Condition ($presentation -match 'FORBIDDEN_PERSONAL_KEY') 'Presentation persistence retains the personal-data boundary'

$editor = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v31/src/components/LayoutEditor.tsx')
Assert-V31Condition ($editor -match 'Question font size slider' -and $editor -match 'Blessing font size slider') 'Desktop editor exposes independent number and range controls'

$art = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v31/src/lib/deity-art.ts')
$runtimeArt = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v31/src/assets/deities') -Filter '*-safe-v31.webp' -File)
$masters = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Assets/Deities/v30-safe-masters') -Filter '*-master-v30.png' -File)
Assert-V31Condition ($runtimeArt.Count -eq 18 -and $masters.Count -eq 18) 'All 18 WebP runtime artworks and 18 PNG masters exist'
Assert-V31Condition (([regex]::Matches($art, "safe-v31\.webp")).Count -eq 18) 'Every deity variant imports a regenerated v31 artwork'
Assert-V31Condition ($art -notmatch "portraitFocus:\s*\{\s*x:\s*50,\s*y:\s*(?:4[1-9]|[5-9][0-9])") 'Every artwork focal point protects the upper portrait safe zone'

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v31/src/App.tsx')
$css = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v31/src/styles/v31-layout.css')
$share = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v31/src/lib/share.ts')
Assert-V31Condition ($app -match 'question-font-scale' -and $app -match 'blessing-font-scale') 'Game and keepsake surfaces receive both typography variables'
Assert-V31Condition ($css -match 'overflow-wrap:anywhere' -and $css -match 'overflow-y:auto') 'Long card text wraps and remains readable inside its panel'
Assert-V31Condition ($share -match '37 \* presentation\.question\.fontScale' -and $share -match '23 \* blessingStyle\.fontScale') 'PNG export uses both typography settings'
Assert-V31Condition ($css -match '--setup-milk-tea:' -and $css -match '--setup-cream:' -and $css -match '--setup-espresso:') 'Setup, editor, and workbench share the warm milk-tea palette'
Assert-V31Condition ($css -match '\.v31-shell \.setup-card legend\{[^}]*position:static[^}]*min-height:' -and $css -match '\.v31-shell \.fields-card \.panel-heading>b\{[^}]*overflow:visible') 'Setup headings reserve safe in-flow height without clipping'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v31.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    $hasReleaseMarkers = ($html -match 'encounter-release" content="V31"') -and ($html -match '<title>Encounter Cards v31</title>')
    Assert-V31Condition $hasReleaseMarkers 'Standalone embeds the v31 release and visible version markers'
    Assert-V31Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq 'AAEEFBC7A09C341BE497C8ABD8848CB474ED8D7F4FE8032856710612A79CD660') 'Standalone v31 matches its release SHA-256'
}
Assert-V31Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v29.html')).Hash -eq '13B5CF313C42F15DD736D11E91ACCDD6BAA7E0A10E0330C16B401B7E9CE1B3EA') 'Standalone v29 remains immutable'
Assert-V31Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v30.html')).Hash -eq 'D4916B75378A4DCDBA088BB7DFEDA2E0230B00451793BEE7D9FA403687C572B0') 'Standalone v30 remains immutable'

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
Assert-V31Condition ($server -match 'encounter_cards_v37\.html' -and $server -match 'encounter-release.*V37') 'Current desktop launcher moved to v37 without modifying v31'
Assert-V31Condition ($workflow -match 'Main-App-v37' -and $workflow -match 'Public-Web/v20') 'Current GitHub Pages workflow moved to v37 and Public Web v20 without modifying Public Web v14'

if ($failures.Count) { Write-Host "v31 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v31 validation passed.' -ForegroundColor Cyan
exit 0
