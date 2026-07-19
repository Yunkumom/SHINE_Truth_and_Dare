$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$expected = @{
  'Apps/Standalone/encounter_cards_v15.html' = 'C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0'
  'Apps/Standalone/encounter_cards_v16.html' = 'A115066893BFECFC9060C0D31F71CD18E8EC1D47BC76E964F0A30C43D609C352'
  'Apps/Standalone/encounter_cards_v17.html' = '832CDC71A4BD41E3685381D1E0094A47371F8B558D51EE23F0279C2702440FAA'
}
foreach ($item in $expected.GetEnumerator()) {
  $path = Join-Path $root $item.Key
  if ((Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash -ne $item.Value) { throw "Immutable baseline changed: $($item.Key)" }
}
$required = @('Development/Source/Public-Web/v1/package.json','Apps/Public-Web/index.html','Apps/Public-Web/v1/index.html','Apps/Public-Web/v1/manifest.json','.github/workflows/pages.yml')
foreach ($item in $required) { if (-not (Test-Path -LiteralPath (Join-Path $root $item))) { throw "Missing public v1 file: $item" } }
$manifest = Get-Content -LiteralPath (Join-Path $root 'Apps/Public-Web/v1/manifest.json') -Raw | ConvertFrom-Json
if ($manifest.version -ne 'v1' -or $manifest.immutable -ne $true) { throw 'Public manifest is not immutable v1' }
foreach ($entry in $manifest.files.PSObject.Properties) {
  $file = Join-Path (Join-Path $root 'Apps/Public-Web/v1') $entry.Name
  if (-not (Test-Path -LiteralPath $file)) { throw "Manifest file is missing: $($entry.Name)" }
  if ((Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash -ne $entry.Value) { throw "Manifest hash mismatch: $($entry.Name)" }
}
$ownedCards = Get-ChildItem -LiteralPath (Join-Path $root 'Apps/Public-Web/v1/assets/cards') -Filter '*.webp' -File | Where-Object Name -ne 'fallback.webp'
if (@($ownedCards).Count -ne 12) { throw "Expected 12 owned cultural card images, found $(@($ownedCards).Count)" }
$sources = Get-Content -LiteralPath (Join-Path $root 'Assets/Catalog/content-sources.json') -Raw | ConvertFrom-Json
if (@($sources.cards).Count -ne 12) { throw "Expected 12 cultural source records, found $(@($sources.cards).Count)" }
$publicFiles = Get-ChildItem -LiteralPath (Join-Path $root 'Apps/Public-Web') -Recurse -File
if ($publicFiles | Where-Object Name -Match '(?i)(\.env|secret|credential|private)') { throw 'Secret-like filename found under Apps/Public-Web/' }
$textFiles = $publicFiles | Where-Object Extension -In @('.html','.js','.css','.json','.webmanifest')
if (@($textFiles | Select-String -Pattern '(?:src|href)=["'']/(?!/)').Count -gt 0) { throw 'Absolute public asset path found' }
Write-Host 'Public v1 validation passed.'
