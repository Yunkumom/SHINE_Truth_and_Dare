$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V23Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v23.html', 'Apps/Public-Web/v6/index.html',
    'Assets/Deities/v23-taiwan-safe/README.md',
    'Development/Source/Main-App-v23/src/App.tsx',
    'Development/Source/Main-App-v23/src/components/TaiwanReveal.tsx',
    'Development/Source/Main-App-v23/src/lib/deity-art.ts',
    'Development/Source/Main-App-v23/src/lib/taiwan-shape.ts',
    'Development/Source/Main-App-v23/src/styles/taiwan-reveal.css',
    'Development/Source/Main-App-v23/tests/artwork-crop-css.test.ts',
    'Development/Automation/Scripts/finalize-pwa-v23.mjs',
    'Development/Automation/Scripts/export-standalone-v23.mjs',
    'Development/Automation/Scripts/finalize-public-v6.mjs',
    'Development/Documentation/V23_TAIWAN_ARTWORK_DESIGN.md',
    'Development/Documentation/V23_TAIWAN_ARTWORK_PLAN.md',
    'Development/Source/Public-Web/v6/README.md'
)
foreach ($path in $required) { Assert-V23Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v23 file exists: $path" }

$sourcePngs = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Assets/Deities/v23-taiwan-safe') -Filter '*-taiwan-safe.png' -File)
$runtimeWebps = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v23/src/assets/deities') -Filter '*-taiwan-safe.webp' -File)
Assert-V23Condition ($sourcePngs.Count -eq 18) 'Exactly 18 high-resolution Taiwan-safe PNG sources exist'
Assert-V23Condition ($runtimeWebps.Count -eq 18) 'Exactly 18 optimized Taiwan-safe WebP runtime assets exist'

$art = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v23/src/lib/deity-art.ts')
Assert-V23Condition (([regex]::Matches($art, "-taiwan-safe\.webp'")).Count -eq 18) 'All deity art imports use Taiwan-safe runtime files'
Assert-V23Condition (([regex]::Matches($art, 'color:\s*''#[0-9a-fA-F]{6}''')).Count -eq 18 -and ([regex]::Matches($art, 'accent:\s*''#[0-9a-fA-F]{6}''')).Count -eq 18) 'Every artwork defines its own reveal colour and accent'
$hotspots = [regex]::Matches($art, 'taiwanHotspot:\s*\{\s*x:\s*(\d+),\s*y:\s*(\d+)')
$hotspotsSafe = $hotspots.Count -eq 18
foreach ($match in $hotspots) {
    $x = [int]$match.Groups[1].Value
    $y = [int]$match.Groups[2].Value
    if ($x -lt 25 -or $x -gt 75 -or $y -lt 10 -or $y -gt 90) { $hotspotsSafe = $false }
}
Assert-V23Condition $hotspotsSafe 'All 18 reveal hotspots remain inside the visible card crop'

$shape = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v23/src/lib/taiwan-shape.ts')
Assert-V23Condition ($shape -match "TAIWAN_VIEWBOX\s*=\s*'0 0 120 240'" -and ([regex]::Matches($shape, "'[ML]")).Count -ge 35) 'Canonical Taiwan outline is detailed and geographically elongated'
$reveal = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v23/src/components/TaiwanReveal.tsx')
Assert-V23Condition ($reveal -match 'data-canonical-shape="taiwan-v23"' -and $reveal -match 'TAIWAN_PATH' -and $reveal -match '--taiwan-color') 'Long-press reveal uses the canonical outline and artwork-specific colours'
$revealCss = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v23/src/styles/taiwan-reveal.css')
Assert-V23Condition ($revealCss -match 'taiwanPulse' -and $revealCss -match 'prefers-reduced-motion' -and $revealCss -match 'var\(--taiwan-accent\)') 'Reveal flashes accessibly with per-artwork colour accents'
$appCss = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v23/src/styles/v23.css')
$layoutCss = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v23/src/styles/v23-layout.css')
Assert-V23Condition ($appCss -match '(?s)\.mythic-art-frame img.*?object-position:\s*center' -and $appCss -notmatch 'object-position:\s*center\s+30%') 'Game artwork uses centred crop instead of the old top-biased crop'
Assert-V23Condition ($layoutCss -match '(?s)\.keepsake-art img.*?object-position:\s*center' -and $layoutCss -notmatch 'object-position:\s*center\s+30%') 'Keepsake artwork uses the same centred crop'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v23.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V23Condition ($html -match 'encounter-release" content="V23"') 'Standalone identifies v23'
    Assert-V23Condition ($html -match 'taiwan-v23' -and $html -match '18 ARTWORKS') 'Standalone embeds canonical reveal and all artwork metadata'
    Assert-V23Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq 'F586D801E53563F16AAB2B1546523E11CF1B3F956B08F540CCF2FF3E9C01B219') 'Standalone v23 matches its release SHA-256'
}

$v22Path = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v22.html'
Assert-V23Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $v22Path).Hash -eq '77D42D108877E6E895EF106CE49FF9C94C59DE783A6BA4507221ABA81162EEBB') 'Standalone v22 remains immutable'
$server = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
Assert-V23Condition ($server -match 'encounter_cards_v23\.html' -and $server -match 'encounter-release.*V23') 'Desktop launcher serves and verifies v23'
$workflow = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot '.github/workflows/pages.yml')
Assert-V23Condition ($workflow -match 'Main-App-v23' -and $workflow -match 'Public-Web/v6') 'GitHub Pages workflow builds and publishes v23 as Public Web v6'

if ($failures.Count) { Write-Host "v23 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v23 validation passed.' -ForegroundColor Cyan
exit 0
