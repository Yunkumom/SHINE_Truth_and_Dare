$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V24Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v24.html', 'Apps/Public-Web/v7/index.html',
    'Development/Source/Main-App-v24/src/App.tsx',
    'Development/Source/Main-App-v24/src/components/TaiwanReveal.tsx',
    'Development/Source/Main-App-v24/src/lib/taiwan-shape.ts',
    'Development/Source/Main-App-v24/src/styles/taiwan-reveal.css',
    'Development/Automation/Scripts/finalize-pwa-v24.mjs',
    'Development/Automation/Scripts/export-standalone-v24.mjs',
    'Development/Automation/Scripts/finalize-public-v7.mjs',
    'Development/Documentation/V24_TAIWAN_OUTLINE_DESIGN.md',
    'Development/Documentation/V24_TAIWAN_OUTLINE_PLAN.md',
    'Development/Source/Public-Web/v7/README.md'
)
foreach ($path in $required) { Assert-V24Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v24 file exists: $path" }

$shape = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v24/src/lib/taiwan-shape.ts')
Assert-V24Condition ($shape -match "TAIWAN_VIEWBOX\s*=\s*'0 0 120 240'" -and ([regex]::Matches($shape, '[ML]\d')).Count -ge 40) 'Natural Earth-derived Taiwan coastline remains geographically detailed'
Assert-V24Condition ($shape -match '114\.0' -and $shape -match '234\.0') 'Taiwan outline retains north-east and south extrema'

$reveal = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v24/src/components/TaiwanReveal.tsx')
Assert-V24Condition (([regex]::Matches($reveal, 'data-canonical-shape="taiwan-v24"')).Count -eq 2) 'Reveal renders two coincident canonical Taiwan coastline paths'
Assert-V24Condition ($reveal -notmatch 'taiwan-locator-(dot|halo)') 'Reveal contains no dot or oval halo'

$css = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v24/src/styles/taiwan-reveal.css')
Assert-V24Condition ($css -match '(?s)\.taiwan-locator\s*\{.*?width:\s*40px.*?height:\s*80px') 'Locator is enlarged to a phone-readable 40 by 80 pixels'
Assert-V24Condition ($css -match '(?s)\.taiwan-coastline-glow\s*\{.*?fill:\s*none' -and $css -match '(?s)\.taiwan-coastline-crisp\s*\{.*?fill:\s*none') 'Both Taiwan paths keep a transparent interior'
Assert-V24Condition ($css -match '@keyframes taiwanCoastlineGlow' -and $css -match '(?s)prefers-reduced-motion.*?animation:\s*none') 'Coastline glows accessibly and respects reduced motion'
Assert-V24Condition ($css -notmatch 'radial-gradient|taiwan-locator-(dot|halo)') 'Legacy disc, dot, and oval halo styling is absent'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v24.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V24Condition ($html -match 'encounter-release" content="V24"' -and $html -match 'taiwan-v24') 'Standalone embeds the v24 Taiwan coastline contract'
    Assert-V24Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '6714926675D7785F933752DCEB04EF71469852E25EAA1572AAC180EBBD8852D0') 'Standalone v24 matches its release SHA-256'
}
Assert-V24Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v23.html')).Hash -eq 'F586D801E53563F16AAB2B1546523E11CF1B3F956B08F540CCF2FF3E9C01B219') 'Standalone v23 remains immutable'

if ($failures.Count) { Write-Host "v24 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v24 validation passed.' -ForegroundColor Cyan
exit 0
