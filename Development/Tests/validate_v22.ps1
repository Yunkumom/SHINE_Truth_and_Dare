$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-V22Condition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$required = @(
    'Apps/Standalone/encounter_cards_v22.html', 'Apps/Public-Web/v5/index.html',
    'Development/Source/Main-App-v22/src/App.tsx',
    'Development/Source/Main-App-v22/src/components/LayoutEditor.tsx',
    'Development/Source/Main-App-v22/src/components/EditableBlock.tsx',
    'Development/Source/Main-App-v22/src/components/SwipeDeck.tsx',
    'Development/Source/Main-App-v22/src/components/TaiwanReveal.tsx',
    'Development/Source/Main-App-v22/src/layout/layout-model.ts',
    'Development/Source/Main-App-v22/src/lib/swipe-deck.ts',
    'Development/Source/Main-App-v22/src/lib/share.ts',
    'Development/Source/Main-App-v22/src/styles/v22-layout.css',
    'Development/Automation/Scripts/finalize-pwa-v22.mjs',
    'Development/Automation/Scripts/export-standalone-v22.mjs',
    'Development/Automation/Scripts/finalize-public-v5.mjs',
    'Development/Documentation/V22_LAYOUT_EDITOR_DESIGN.md',
    'Development/Documentation/V22_LAYOUT_EDITOR_PLAN.md',
    'Development/Source/Public-Web/v5/README.md'
)
foreach ($path in $required) { Assert-V22Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v22 file exists: $path" }

$layout = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v22/src/layout/layout-model.ts')
Assert-V22Condition ($layout -match 'HISTORY_LIMIT\s*=\s*20' -and $layout -match 'schemaVersion' -and $layout -match 'PERSONAL_KEYS') 'Layout editor has versioned privacy-safe JSON and twenty-step history'
Assert-V22Condition ($layout -match "begin:\s*block\(22,\s*852" -and $layout -match "modes:\s*block\(22,\s*498") 'Begin control is separated at the setup bottom'
Assert-V22Condition ($layout -match "card:\s*block\(14,\s*116,\s*402,\s*562") 'Game card uses the enlarged 402 × 562 mobile geometry'

$swipe = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v22/src/lib/swipe-deck.ts')
Assert-V22Condition ($swipe -match 'DRAW_THRESHOLD\s*=\s*\.22' -and $swipe -match "alreadyCommitted") 'Swipe deck uses a 22 percent threshold and duplicate guard'
$deck = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v22/src/components/SwipeDeck.tsx')
Assert-V22Condition ($deck -match 'data-card-artwork' -and $deck -match 'setPointerCapture') 'Swipe deck preserves artwork hold gestures and direct pointer tracking'

$share = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v22/src/lib/share.ts')
Assert-V22Condition ($share -match 'width:\s*1260,\s*height:\s*1760' -and $share -match 'getIncludedParticipants') 'Keepsake uses 63:88 geometry and selected participant rows'
Assert-V22Condition ($share -match 'BLESSING' -and $share -notmatch 'taiwan-locator') 'Keepsake keeps a blessing and excludes runtime locator chrome'

$app = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $projectRoot 'Development/Source/Main-App-v22/src/App.tsx')
Assert-V22Condition ($app -match 'LayoutEditor' -and $app -match 'SwipeDeck' -and $app -match 'Include your contact' -and $app -match 'Include their contact') 'App integrates the editor, swipe deck, and optional contact exchange'

$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v22.html'
if (Test-Path -LiteralPath $standalonePath -PathType Leaf) {
    $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $standalonePath
    Assert-V22Condition ($html -match 'encounter-release" content="V22"') 'Standalone identifies v22'
    Assert-V22Condition ($html -match 'Layout editor' -and $html -match 'SWIPE UP TO DRAW' -and $html -match 'CONTACT EXCHANGE') 'Standalone embeds v22 editor, swipe, and keepsake interfaces'
    Assert-V22Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $standalonePath).Hash -eq '77D42D108877E6E895EF106CE49FF9C94C59DE783A6BA4507221ABA81162EEBB') 'Standalone v22 matches its release SHA-256'
}

$v21Path = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v21.html'
Assert-V22Condition ((Get-FileHash -Algorithm SHA256 -LiteralPath $v21Path).Hash -eq '500CA5492AD8BD90652818289D92E1FED132DFB3E599BB69E601E96412D10281') 'Standalone v21 remains immutable'
if ($failures.Count) { Write-Host "v22 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1 }
Write-Host 'v22 validation passed.' -ForegroundColor Cyan
exit 0
