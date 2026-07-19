$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$failures = [System.Collections.Generic.List[string]]::new()
function Assert-V19Condition { param([bool]$Condition,[string]$Message); if($Condition){Write-Host "PASS: $Message" -ForegroundColor Green}else{$failures.Add($Message);Write-Host "FAIL: $Message" -ForegroundColor Red} }
$required = @('Apps/Standalone/encounter_cards_v19.html','Apps/Public-Web/v2/index.html','Development/Source/Main-App-v19/src/lib/deity-art.ts','Development/Source/Main-App-v19/src/lib/share.ts','Development/Automation/Scripts/finalize-pwa-v19.mjs','Development/Automation/Scripts/export-standalone-v19.mjs','Development/Automation/Scripts/finalize-public-v2.mjs','Assets/Deities/README.md')
foreach($path in $required){Assert-V19Condition (Test-Path -LiteralPath (Join-Path $projectRoot $path) -PathType Leaf) "Required v19 file exists: $path"}
$images = @(Get-ChildItem -LiteralPath (Join-Path $projectRoot 'Assets/Deities') -Filter '*.png' -File)
Assert-V19Condition ($images.Count -eq 9) 'Nine high-resolution deity source images exist'
$standalonePath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v19.html'
if(Test-Path $standalonePath){$html=Get-Content -Raw -Encoding UTF8 $standalonePath; Assert-V19Condition ($html -match 'encounter-release" content="V19"') 'Standalone identifies v19'; Assert-V19Condition ($html -match 'data:image/webp;base64,') 'Standalone embeds deity artwork'; Assert-V19Condition ((Get-FileHash -Algorithm SHA256 $standalonePath).Hash -eq '649B5FE4B42FB122213ED750AC31E8984C66650492C22D079D02E9161DD3A39C') 'Standalone v19 matches its release SHA-256'}
$server=Get-Content -Raw -Encoding UTF8 (Join-Path $projectRoot 'Development/Automation/Tools/serve_truth_and_dare.ps1')
Assert-V19Condition ($server -match 'encounter_cards_v19\.html' -and $server -match 'encounter-release.*V19') 'Desktop launcher serves and verifies v19'
if($failures.Count){Write-Host "v19 validation failed with $($failures.Count) issue(s)." -ForegroundColor Red; exit 1}
Write-Host 'v19 validation passed.' -ForegroundColor Cyan
