$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V27Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v27.html', 'Apps/Public-Web/v10/index.html',
    'Development/Source/Main-App-v27/src/App.tsx',
    'Development/Source/Main-App-v27/src/components/TaiwanReveal.tsx',
    'Development/Source/Main-App-v27/src/lib/taiwan-shape.ts',
    'Development/Source/Main-App-v27/src/styles/taiwan-reveal.css',
    'Development/Automation/Scripts/finalize-pwa-v27.mjs',
    'Development/Automation/Scripts/export-standalone-v27.mjs',
    'Development/Automation/Scripts/finalize-public-v10.mjs',
    'Development/Documentation/V27_ENTRANCE_LAYOUT_DESIGN.md',
    'Development/Documentation/V27_ENTRANCE_LAYOUT_PLAN.md',
    'Development/Source/Public-Web/v10/README.md'
)
foreach ($path in $required) { Assert-V27Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v27 file exists: $path" }

$shape = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v27/src/lib/taiwan-shape.ts')
Assert-V27Condition ($shape -match "TAIWAN_VIEWBOX\s*=\s*'0 0 120 240'" -and ([regex]::Matches($shape, '[ML]\d')).Count -ge 40) 'Natural Earth-derived Taiwan coastline remains geographically detailed'
Assert-V27Condition ($shape -match '114\.0' -and $shape -match '234\.0') 'Taiwan outline retains north-east and south extrema'

$reveal = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v27/src/components/TaiwanReveal.tsx')
Assert-V27Condition (([regex]::Matches($reveal, 'data-canonical-shape="taiwan-v27"')).Count -eq 2) 'Reveal renders two coincident canonical Taiwan coastline paths'
Assert-V27Condition ($reveal -notmatch 'taiwan-locator-(dot|halo)') 'Reveal contains no dot or oval halo'

$css = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v27/src/styles/taiwan-reveal.css')
Assert-V27Condition ($css -match '(?s)\.taiwan-locator\s*\{.*?width:\s*40px.*?height:\s*80px') 'Locator is enlarged to a phone-readable 40 by 80 pixels'
Assert-V27Condition ($css -match '(?s)\.taiwan-coastline-glow\s*\{.*?fill:\s*none' -and $css -match '(?s)\.taiwan-coastline-crisp\s*\{.*?fill:\s*none') 'Both Taiwan paths keep a transparent interior'
Assert-V27Condition ($css -match '@keyframes taiwanCoastlineGlow' -and $css -match '(?s)prefers-reduced-motion.*?animation:\s*none') 'Coastline glows accessibly and respects reduced motion'
Assert-V27Condition ($css -notmatch 'radial-gradient|taiwan-locator-(dot|halo)') 'Legacy disc, dot, and oval halo styling is absent'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v27.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V27Condition ($html -match 'encounter-release" content="V27"' -and $html -match 'taiwan-v27') 'Standalone embeds the v27 Taiwan coastline contract'
    Assert-V27Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '6B1B0C197F6C0D0CDA8B9A1DD3FEF7BEE87AB1453C5D5FC03D44955D2AAE41BD') 'Standalone v27 matches its release SHA-256'
}
Assert-V27Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v24.html')).Hash -eq '6714926675D7785F933752DCEB04EF71469852E25EAA1572AAC180EBBD8852D0') 'Standalone v24 remains immutable'
Assert-V27Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v23.html')).Hash -eq 'F586D801E53563F16AAB2B1546523E11CF1B3F956B08F540CCF2FF3E9C01B219') 'Standalone v23 remains immutable'
Assert-V27Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v25.html')).Hash -eq 'FB01D971568500AA66C827FD4B3F9C769C9308167EC4B063F951DC53501E82D7') 'Standalone v25 remains immutable'

$publicV10 = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Apps/Public-Web/v10/index.html')
Assert-V27Condition ($publicV10 -match 'Encounter Cards v27') 'Preserved Public Web v10 identifies v27'
$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v27/src/App.tsx')
$layoutCss = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v27/src/styles/v27-layout.css')
Assert-V27Condition ($app -match 'desktop-workspace' -and $app -match 'portraitObjectPosition') 'Desktop synchronized workspace and portrait-safe browser rendering are present'
Assert-V27Condition ($layoutCss -match '@media\(min-width:1100px\)' -and $layoutCss -match 'desktop-device-frame' -and $layoutCss -match 'width:445px' -and $layoutCss -match 'width:430px') 'Desktop physical-ratio frame surrounds the unchanged 430 by 932 canvas'
$presentation = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v27/src/presentation/presentation-model.ts')
Assert-V27Condition ($presentation -match 'artworkById' -and $presentation -match 'artworkHeight' -and $presentation -match 'lineHeight' -and $presentation -match 'FORBIDDEN_PERSONAL_KEY') 'Card image and blessing settings are normalized and privacy-safe'

if ($failures.Count) { Write-Host "v27 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v27 validation passed.' -ForegroundColor Cyan
exit 0
