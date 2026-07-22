$ErrorActionPreference = 'Stop'

$cursor = (Resolve-Path -LiteralPath $PSScriptRoot).Path
while (-not (Test-Path -LiteralPath (Join-Path $cursor 'AGENTS.md') -PathType Leaf)) {
    $parent = Split-Path -Parent $cursor
    if ([string]::IsNullOrWhiteSpace($parent) -or $parent -eq $cursor) { throw 'Could not locate the project root.' }
    $cursor = $parent
}
$projectRoot = $cursor
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-StructureCondition {
    param([bool]$Condition, [string]$Message)
    if ($Condition) { Write-Host "PASS: $Message" -ForegroundColor Green; return }
    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$allowedRootEntries = @('.git', '.github', '.gitattributes', '.gitignore', 'AGENTS.md', 'Apps', 'Assets', 'Development', '_agent', '_human', '_meta', '_pending', 'GUIDE.md', 'Open Truth and Dare.cmd', 'README.md')
$unexpectedRootEntries = Get-ChildItem -LiteralPath $projectRoot -Force | Where-Object { $_.Name -notin $allowedRootEntries } | Select-Object -ExpandProperty Name
Assert-StructureCondition ($unexpectedRootEntries.Count -eq 0) 'Root contains only approved product, governance, and platform entries'

$requiredDirectories = @(
    'Apps/Standalone', 'Apps/Public-Web/v2', 'Apps/Public-Web/v3', 'Assets/Catalog', 'Assets/Deities', 'Assets/Deities/v20-variants',
    'Development/Source/Main-App-v18', 'Development/Source/Main-App-v19', 'Development/Source/Main-App-v20', 'Development/Source/Public-Web/v2', 'Development/Source/Public-Web/v3', 'Development/Automation/Scripts', 'Development/Automation/Tools',
    'Development/Tests', 'Development/Documentation',
    '_meta', '_agent', '_agent/Skills', '_human', '_pending',
    '_pending/Development-simplification_2026-07-19'
)
foreach ($relativePath in $requiredDirectories) {
    Assert-StructureCondition (Test-Path -LiteralPath (Join-Path $projectRoot $relativePath) -PathType Container) "Required directory exists: $relativePath"
}

$requiredFiles = @(
    'GUIDE.md', 'Apps/README.md', 'Assets/README.md', 'Assets/Catalog/README.md',
    'Development/README.md', 'Development/Documentation/README.md',
    'Development/Source/Main-App-v18/package.json', 'Development/Source/Main-App-v19/package.json', 'Development/Source/Main-App-v20/package.json', 'Development/Source/Public-Web/v2/README.md', 'Development/Source/Public-Web/v3/README.md', 'Development/Automation/Tools/serve_truth_and_dare.ps1',
    'Development/Tests/validate_clean_structure.ps1', 'Development/Tests/validate_v18.ps1', 'Development/Tests/validate_v19.ps1', 'Development/Tests/validate_v20.ps1', 'Development/Tests/validate_repository.ps1',
    '_meta/README.md', '_agent/README.md', '_agent/Skills/README.md', '_human/README.md',
    '_pending/README.md', '_pending/index.md', '_pending/Development-simplification_2026-07-19/README.md'
)
foreach ($relativePath in $requiredFiles) {
    Assert-StructureCondition (Test-Path -LiteralPath (Join-Path $projectRoot $relativePath) -PathType Leaf) "Required file exists: $relativePath"
}

$developmentRoot = Join-Path $projectRoot 'Development'
$expectedDevelopmentEntries = @('Automation', 'Documentation', 'README.md', 'Source', 'Tests')
$actualDevelopmentEntries = Get-ChildItem -LiteralPath $developmentRoot -Force | Select-Object -ExpandProperty Name
$unexpectedDevelopmentEntries = $actualDevelopmentEntries | Where-Object { $_ -notin $expectedDevelopmentEntries }
$missingDevelopmentEntries = $expectedDevelopmentEntries | Where-Object { $_ -notin $actualDevelopmentEntries }
Assert-StructureCondition ($unexpectedDevelopmentEntries.Count -eq 0 -and $missingDevelopmentEntries.Count -eq 0) 'Development has only the simplified current-source, automation, tests, documentation, and README surface'

$sourceEntries = @(Get-ChildItem -LiteralPath (Join-Path $developmentRoot 'Source') -Force | Select-Object -ExpandProperty Name)
$expectedSourceEntries = @('Main-App-v18','Main-App-v19','Main-App-v20','Public-Web')
Assert-StructureCondition ($sourceEntries.Count -eq $expectedSourceEntries.Count -and @($sourceEntries | Where-Object { $_ -notin $expectedSourceEntries }).Count -eq 0) 'Development Source contains preserved v18/v19, active v20, and versioned Public Web recipes'

$generatedClutter = Get-ChildItem -LiteralPath $developmentRoot -Recurse -Force | Where-Object {
    $_.Name -eq 'node_modules' -or $_.Name -eq 'coverage' -or $_.Name -like '*.tsbuildinfo'
}
Assert-StructureCondition ($generatedClutter.Count -eq 0) 'Active Development contains no generated dependency, coverage, or TypeScript cache clutter'

$developmentReadmePath = Join-Path $developmentRoot 'README.md'
if (Test-Path -LiteralPath $developmentReadmePath -PathType Leaf) {
    $developmentReadme = Get-Content -Raw -Encoding UTF8 -LiteralPath $developmentReadmePath
    $retainedFiles = Get-ChildItem -LiteralPath $developmentRoot -Recurse -Force -File | Where-Object {
        $_.FullName -notmatch '[\\/](node_modules|dist|coverage)[\\/]' -and
        $_.Extension -ne '.tsbuildinfo' -and
        $_.FullName -notmatch '[\\/]src[\\/]assets[\\/]deities[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v19[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v20[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Public-Web[\\/]v[23][\\/]'
    }
    foreach ($file in $retainedFiles) {
        $relativePath = $file.FullName.Substring($developmentRoot.Length + 1).Replace('\', '/')
        Assert-StructureCondition ($developmentReadme.Contains($relativePath)) "Development README explains retained file: $relativePath"
    }
    foreach ($annotation in @('Source/Main-App-v19/','Source/Main-App-v19/src/','Source/Main-App-v19/src/assets/deities/','Source/Public-Web/v2/','Automation/Scripts/export-standalone-v19.mjs','Automation/Scripts/finalize-pwa-v19.mjs','Automation/Scripts/finalize-public-v2.mjs','Tests/validate_v19.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v19 path: $annotation"
    }
    foreach ($annotation in @('Source/Main-App-v20/','Source/Main-App-v20/src/','Source/Main-App-v20/src/assets/deities/','Source/Public-Web/v3/','Automation/Scripts/export-standalone-v20.mjs','Automation/Scripts/finalize-pwa-v20.mjs','Automation/Scripts/finalize-public-v3.mjs','Tests/validate_v20.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v20 path: $annotation"
    }
}

$guidePath = Join-Path $projectRoot 'GUIDE.md'
if (Test-Path -LiteralPath $guidePath -PathType Leaf) {
    $guide = Get-Content -Raw -Encoding UTF8 -LiteralPath $guidePath
    foreach ($relativePath in $requiredDirectories) {
        Assert-StructureCondition ($guide.Contains($relativePath)) "GUIDE annotates: $relativePath"
    }
}

if ($failures.Count) {
    Write-Host "Clean-structure validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}
Write-Host 'Clean simplified structure validation passed.' -ForegroundColor Cyan
exit 0
