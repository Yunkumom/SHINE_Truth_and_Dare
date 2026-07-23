$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V25Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v25.html', 'Apps/Public-Web/v8/index.html',
    'Development/Source/Main-App-v25/src/App.tsx',
    'Development/Source/Main-App-v25/src/components/TaiwanReveal.tsx',
    'Development/Source/Main-App-v25/src/lib/taiwan-shape.ts',
    'Development/Source/Main-App-v25/src/styles/taiwan-reveal.css',
    'Development/Automation/Scripts/finalize-pwa-v25.mjs',
    'Development/Automation/Scripts/export-standalone-v25.mjs',
    'Development/Automation/Scripts/finalize-public-v8.mjs',
    'Development/Documentation/V25_DESKTOP_WORKSPACE_DESIGN.md',
    'Development/Documentation/V25_DESKTOP_WORKSPACE_PLAN.md',
    'Development/Source/Public-Web/v8/README.md'
)
foreach ($path in $required) { Assert-V25Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v25 file exists: $path" }

$shape = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v25/src/lib/taiwan-shape.ts')
Assert-V25Condition ($shape -match "TAIWAN_VIEWBOX\s*=\s*'0 0 120 240'" -and ([regex]::Matches($shape, '[ML]\d')).Count -ge 40) 'Natural Earth-derived Taiwan coastline remains geographically detailed'
Assert-V25Condition ($shape -match '114\.0' -and $shape -match '234\.0') 'Taiwan outline retains north-east and south extrema'

$reveal = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v25/src/components/TaiwanReveal.tsx')
Assert-V25Condition (([regex]::Matches($reveal, 'data-canonical-shape="taiwan-v25"')).Count -eq 2) 'Reveal renders two coincident canonical Taiwan coastline paths'
Assert-V25Condition ($reveal -notmatch 'taiwan-locator-(dot|halo)') 'Reveal contains no dot or oval halo'

$css = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v25/src/styles/taiwan-reveal.css')
Assert-V25Condition ($css -match '(?s)\.taiwan-locator\s*\{.*?width:\s*40px.*?height:\s*80px') 'Locator is enlarged to a phone-readable 40 by 80 pixels'
Assert-V25Condition ($css -match '(?s)\.taiwan-coastline-glow\s*\{.*?fill:\s*none' -and $css -match '(?s)\.taiwan-coastline-crisp\s*\{.*?fill:\s*none') 'Both Taiwan paths keep a transparent interior'
Assert-V25Condition ($css -match '@keyframes taiwanCoastlineGlow' -and $css -match '(?s)prefers-reduced-motion.*?animation:\s*none') 'Coastline glows accessibly and respects reduced motion'
Assert-V25Condition ($css -notmatch 'radial-gradient|taiwan-locator-(dot|halo)') 'Legacy disc, dot, and oval halo styling is absent'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v25.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V25Condition ($html -match 'encounter-release" content="V25"' -and $html -match 'taiwan-v25') 'Standalone embeds the v25 Taiwan coastline contract'
    Assert-V25Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq 'FB01D971568500AA66C827FD4B3F9C769C9308167EC4B063F951DC53501E82D7') 'Standalone v25 matches its release SHA-256'
}
Assert-V25Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v24.html')).Hash -eq '6714926675D7785F933752DCEB04EF71469852E25EAA1572AAC180EBBD8852D0') 'Standalone v24 remains immutable'
Assert-V25Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v23.html')).Hash -eq 'F586D801E53563F16AAB2B1546523E11CF1B3F956B08F540CCF2FF3E9C01B219') 'Standalone v23 remains immutable'

$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
Assert-V25Condition ($server -match 'encounter_cards_v25\.html' -and $server -match 'encounter-release.*V25') 'Desktop launcher serves and verifies v25'
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
Assert-V25Condition ($workflow -match 'Main-App-v25' -and $workflow -match 'Public-Web/v8') 'GitHub Pages workflow builds and publishes v25 as Public Web v8'
$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v25/src/App.tsx')
$layoutCss = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v25/src/styles/v25-layout.css')
Assert-V25Condition ($app -match 'desktop-workspace' -and $app -match 'portraitObjectPosition') 'Desktop synchronized workspace and portrait-safe browser rendering are present'
Assert-V25Condition ($layoutCss -match '@media\(min-width:1100px\)' -and $layoutCss -match 'grid-template-rows:10% 62% 28%') 'Desktop breakpoint and narrower card title band are present'

if ($failures.Count) { Write-Host "v25 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v25 validation passed.' -ForegroundColor Cyan
exit 0
