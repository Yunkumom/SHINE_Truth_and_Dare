$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V28Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v28.html', 'Apps/Public-Web/v11/index.html',
    'Development/Source/Main-App-v28/src/App.tsx',
    'Development/Source/Main-App-v28/src/components/TaiwanReveal.tsx',
    'Development/Source/Main-App-v28/src/lib/taiwan-shape.ts',
    'Development/Source/Main-App-v28/src/styles/taiwan-reveal.css',
    'Development/Automation/Scripts/finalize-pwa-v28.mjs',
    'Development/Automation/Scripts/export-standalone-v28.mjs',
    'Development/Automation/Scripts/finalize-public-v11.mjs',
    'Development/Documentation/V28_BAOSHENG_SAFE_ARTWORK_DESIGN.md',
    'Development/Documentation/V28_BAOSHENG_SAFE_ARTWORK_PLAN.md',
    'Development/Source/Public-Web/v11/README.md',
    'Assets/Deities/baosheng-dadi-apothecary-wide-taiwan-safe-v28.png',
    'Development/Source/Main-App-v28/src/assets/deities/baosheng-apothecary-wide-taiwan-safe-v28.png'
)
foreach ($path in $required) { Assert-V28Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v28 file exists: $path" }

$shape = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v28/src/lib/taiwan-shape.ts')
Assert-V28Condition ($shape -match "TAIWAN_VIEWBOX\s*=\s*'0 0 120 240'" -and ([regex]::Matches($shape, '[ML]\d')).Count -ge 40) 'Natural Earth-derived Taiwan coastline remains geographically detailed'
Assert-V28Condition ($shape -match '114\.0' -and $shape -match '234\.0') 'Taiwan outline retains north-east and south extrema'

$reveal = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v28/src/components/TaiwanReveal.tsx')
Assert-V28Condition (([regex]::Matches($reveal, 'data-canonical-shape="taiwan-v28"')).Count -eq 2) 'Reveal renders two coincident canonical Taiwan coastline paths'
Assert-V28Condition ($reveal -notmatch 'taiwan-locator-(dot|halo)') 'Reveal contains no dot or oval halo'

$css = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v28/src/styles/taiwan-reveal.css')
Assert-V28Condition ($css -match '(?s)\.taiwan-locator\s*\{.*?width:\s*40px.*?height:\s*80px') 'Locator is enlarged to a phone-readable 40 by 80 pixels'
Assert-V28Condition ($css -match '(?s)\.taiwan-coastline-glow\s*\{.*?fill:\s*none' -and $css -match '(?s)\.taiwan-coastline-crisp\s*\{.*?fill:\s*none') 'Both Taiwan paths keep a transparent interior'
Assert-V28Condition ($css -match '@keyframes taiwanCoastlineGlow' -and $css -match '(?s)prefers-reduced-motion.*?animation:\s*none') 'Coastline glows accessibly and respects reduced motion'
Assert-V28Condition ($css -notmatch 'radial-gradient|taiwan-locator-(dot|halo)') 'Legacy disc, dot, and oval halo styling is absent'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v28.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V28Condition ($html -match 'encounter-release" content="V28"' -and $html -match 'taiwan-v28') 'Standalone embeds the v28 Taiwan coastline contract'
    Assert-V28Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq 'DC21C3575873041E8F63D9B37BAEE38CAF311AC1839D757F28E66CFFCCB3B596') 'Standalone v28 matches its release SHA-256'
}
Assert-V28Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v24.html')).Hash -eq '6714926675D7785F933752DCEB04EF71469852E25EAA1572AAC180EBBD8852D0') 'Standalone v24 remains immutable'
Assert-V28Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v23.html')).Hash -eq 'F586D801E53563F16AAB2B1546523E11CF1B3F956B08F540CCF2FF3E9C01B219') 'Standalone v23 remains immutable'
Assert-V28Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v25.html')).Hash -eq 'FB01D971568500AA66C827FD4B3F9C769C9308167EC4B063F951DC53501E82D7') 'Standalone v25 remains immutable'

$publicIndex = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Apps/Public-Web/v11/index.html')
$publicWorker = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Apps/Public-Web/v11/service-worker.js')
Assert-V28Condition ($publicIndex -match 'Encounter Cards v28' -and $publicWorker -match 'encounter-cards-v28-') 'Preserved Public Web v11 remains the immutable v28 deployment artifact'
$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v28/src/App.tsx')
$layoutCss = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v28/src/styles/v28-layout.css')
Assert-V28Condition ($app -match 'desktop-workspace' -and $app -match 'portraitObjectPosition') 'Desktop synchronized workspace and portrait-safe browser rendering are present'
Assert-V28Condition ($layoutCss -match '@media\(min-width:1100px\)' -and $layoutCss -match 'desktop-device-frame' -and $layoutCss -match 'width:445px' -and $layoutCss -match 'width:430px') 'Desktop physical-ratio frame surrounds the unchanged 430 by 932 canvas'
$presentation = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v28/src/presentation/presentation-model.ts')
Assert-V28Condition ($presentation -match 'artworkById' -and $presentation -match 'artworkHeight' -and $presentation -match 'lineHeight' -and $presentation -match 'FORBIDDEN_PERSONAL_KEY') 'Card image and blessing settings are normalized and privacy-safe'
$deityArt = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v28/src/lib/deity-art.ts')
Assert-V28Condition ($deityArt -match 'baosheng-apothecary-wide-taiwan-safe-v28\.png' -and $deityArt -match "portraitFocus: \{ x: 50, y: 34 \}" -and $deityArt -match "taiwanHotspot: \{ x: 52, y: 68, scale: \.38, rotation: 8") 'Baosheng wide artwork has a crown-safe crop and aligned Taiwan locator'

if ($failures.Count) { Write-Host "v28 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v28 validation passed.' -ForegroundColor Cyan
exit 0
