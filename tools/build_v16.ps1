$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourcePath = Join-Path $projectRoot 'app/encounter_cards_v15.html'
$outputPath = Join-Path $projectRoot 'app/encounter_cards_v16.html'
$assetRoot = Join-Path $projectRoot 'app/v16-assets'
$expectedV15Hash = 'C7619A49ED761E6A5552F46CB020ED1726F17FFCF305563B7403906149C4E9B0'
$utf8NoBom = New-Object Text.UTF8Encoding($false)

if (-not (Test-Path -LiteralPath $sourcePath -PathType Leaf)) {
    throw 'The immutable v15 source file is missing.'
}

$actualV15Hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $sourcePath).Hash
if ($actualV15Hash -ne $expectedV15Hash) {
    throw "The v15 source hash changed. Expected $expectedV15Hash but found $actualV15Hash."
}

$html = Get-Content -Raw -Encoding UTF8 -LiteralPath $sourcePath

$oldViewport = '<meta name="viewport" content="width=device-width, initial-scale=1"/>'
$newViewport = '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>'
if (-not $html.Contains($oldViewport)) {
    throw 'The expected v15 viewport metadata was not found.'
}
$html = $html.Replace($oldViewport, $newViewport)
$oldRscViewport = '\"content\":\"width=device-width, initial-scale=1\"'
$newRscViewport = '\"content\":\"width=device-width, initial-scale=1, viewport-fit=cover\"'
if (-not $html.Contains($oldRscViewport)) {
    throw 'The expected v15 RSC viewport metadata was not found.'
}
$html = $html.Replace($oldRscViewport, $newRscViewport)

$importMapPattern = '(?s)<script type="importmap">(.*?)</script>'
$importMapMatch = [regex]::Match($html, $importMapPattern)
if (-not $importMapMatch.Success) {
    throw 'The embedded v15 import map was not found.'
}

$importMap = $importMapMatch.Groups[1].Value | ConvertFrom-Json
$pageModuleKey = '/assets/page-B3j9dtoA.js'
$moduleOutputs = [System.Collections.Generic.List[object]]::new()
foreach ($moduleProperty in $importMap.imports.PSObject.Properties) {
    $moduleKey = $moduleProperty.Name
    $moduleValue = [string]$moduleProperty.Value
    if (-not $moduleValue.StartsWith('data:text/javascript;base64,')) {
        throw "The v15 module $moduleKey is not an embedded JavaScript data URL."
    }

    $moduleParts = $moduleValue.Split(',', 2)
    $moduleText = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($moduleParts[1]))
    if ($moduleKey -eq $pageModuleKey) {
        $moduleText = $moduleText.Replace('V15', 'V16')
    }

    $assetName = [IO.Path]::GetFileName($moduleKey)
    $assetPath = Join-Path $assetRoot $assetName
    $moduleOutputs.Add([pscustomobject]@{
        Name = $assetName
        Path = $assetPath
        Content = $moduleText
    })
    $importMap.imports.$moduleKey = "./v16-assets/$assetName"
}

if (-not ($moduleOutputs | Where-Object { $_.Name -eq 'page-B3j9dtoA.js' })) {
    throw 'The canonical v15 page module mapping was not found.'
}

$newImportMapJson = $importMap | ConvertTo-Json -Compress -Depth 5
$html = $html.Substring(0, $importMapMatch.Index) + '<script type="importmap">' + $newImportMapJson + '</script>' + $html.Substring($importMapMatch.Index + $importMapMatch.Length)

$html = $html.Replace('V15', 'V16')

$mobileMedia = '@media (width<=560px){'
$sharedMedia = '@media (width<=560px), (width>560px){'
if (-not $html.Contains($mobileMedia)) {
    throw 'The canonical v15 mobile media query was not found.'
}
$html = $html.Replace($mobileMedia, $sharedMedia)

$v16Css = @'
/* data-encounter-v16-iphone-pro-max */
/* file-launch-notice: direct file mode is unsupported; use Open Truth and Dare.cmd */
:root {
  --iphone-pro-max-width: 430px;
  --iphone-pro-max-height: 932px;
  --desktop-frame-gap: 24px;
}

@supports (padding: env(safe-area-inset-top)) {
  .site-header {
    height: calc(54px + env(safe-area-inset-top));
    padding-top: env(safe-area-inset-top);
    padding-left: max(12px, env(safe-area-inset-left));
    padding-right: max(12px, env(safe-area-inset-right));
  }
  .hero,
  .game-layout {
    height: calc(100svh - 54px - env(safe-area-inset-top));
    padding-bottom: max(14px, env(safe-area-inset-bottom));
  }
}

@media (min-width: 561px) {
  html,
  body {
    min-height: 100%;
    overflow: auto;
    background: #02080d;
  }
  body {
    display: grid;
    place-items: center;
    min-height: 100vh;
    padding: var(--desktop-frame-gap);
    background:
      radial-gradient(circle at 50% 12%, #143347 0, #07141e 42%, #02080d 78%);
  }
  .landing-shell,
  .game-shell {
    width: var(--iphone-pro-max-width);
    max-width: 100%;
    height: min(var(--iphone-pro-max-height), calc(100vh - (var(--desktop-frame-gap) * 2)));
    min-height: 640px;
    border: 1px solid #d5b77a59;
    border-radius: 48px;
    overflow: hidden;
    box-shadow: 0 30px 90px #000a, 0 0 0 8px #071019;
    isolation: isolate;
  }
  .hero,
  .game-layout {
    height: calc(100% - 54px);
  }
}
'@

$styleCloseIndex = $html.IndexOf('</style>')
if ($styleCloseIndex -lt 0) {
    throw 'The canonical style element was not found.'
}
$html = $html.Substring(0, $styleCloseIndex) + $v16Css + $html.Substring($styleCloseIndex)

if (Test-Path -LiteralPath $outputPath -PathType Leaf) {
    $existing = Get-Content -Raw -Encoding UTF8 -LiteralPath $outputPath
    if ($existing -eq $html) {
        Write-Host 'v16 already matches the deterministic build output.' -ForegroundColor Cyan
        exit 0
    }
    throw 'A different v16 output already exists. Create the next version instead of overwriting it.'
}

if (-not (Test-Path -LiteralPath $assetRoot -PathType Container)) {
    New-Item -ItemType Directory -Path $assetRoot | Out-Null
}
foreach ($moduleOutput in $moduleOutputs) {
    if (Test-Path -LiteralPath $moduleOutput.Path -PathType Leaf) {
        $existingModule = Get-Content -Raw -Encoding UTF8 -LiteralPath $moduleOutput.Path
        if ($existingModule -ne $moduleOutput.Content) {
            throw "A different v16 module already exists: $($moduleOutput.Name)"
        }
        continue
    }
    [IO.File]::WriteAllText($moduleOutput.Path, $moduleOutput.Content, $utf8NoBom)
}

[IO.File]::WriteAllText($outputPath, $html, $utf8NoBom)
Write-Host "Created $outputPath" -ForegroundColor Cyan
