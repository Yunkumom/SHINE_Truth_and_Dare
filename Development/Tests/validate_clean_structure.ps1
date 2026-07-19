$ErrorActionPreference = 'Stop'

$cursor = (Resolve-Path -LiteralPath $PSScriptRoot).Path
while (-not (Test-Path -LiteralPath (Join-Path $cursor 'AGENTS.md') -PathType Leaf)) {
    $parent = Split-Path -Parent $cursor
    if ([string]::IsNullOrWhiteSpace($parent) -or $parent -eq $cursor) {
        throw 'Could not locate the project root from the validator directory.'
    }
    $cursor = $parent
}
$projectRoot = $cursor
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-StructureCondition {
    param(
        [Parameter(Mandatory = $true)][bool]$Condition,
        [Parameter(Mandatory = $true)][string]$Message
    )

    if ($Condition) {
        Write-Host "PASS: $Message" -ForegroundColor Green
        return
    }

    $failures.Add($Message)
    Write-Host "FAIL: $Message" -ForegroundColor Red
}

$allowedRootEntries = @(
    '.git',
    '.github',
    '.gitignore',
    'AGENTS.md',
    'Apps',
    'Assets',
    'Development',
    'GUIDE.md',
    'Open Truth and Dare.cmd',
    'README.md'
)

$unexpectedRootEntries = Get-ChildItem -LiteralPath $projectRoot -Force |
    Where-Object { $_.Name -notin $allowedRootEntries } |
    Select-Object -ExpandProperty Name
Assert-StructureCondition -Condition ($unexpectedRootEntries.Count -eq 0) -Message 'Root contains only the three primary categories and required project/platform entries'

$requiredDirectories = @(
    'Apps/Standalone',
    'Apps/Public-Web',
    'Assets/Catalog',
    'Development/Source/Main-App',
    'Development/Source/Public-Web',
    'Development/Automation/Scripts',
    'Development/Automation/Tools',
    'Development/Tests',
    'Development/Documentation',
    'Development/Governance/Meta',
    'Development/Governance/Agent',
    'Development/Governance/Skills',
    'Development/Human-References',
    'Development/Pending'
)

foreach ($relativePath in $requiredDirectories) {
    Assert-StructureCondition -Condition (Test-Path -LiteralPath (Join-Path $projectRoot $relativePath) -PathType Container) -Message "Required directory exists: $relativePath"
}

$requiredFiles = @(
    'GUIDE.md',
    'Apps/README.md',
    'Apps/Standalone/encounter_cards_v15.html',
    'Apps/Standalone/encounter_cards_v16.html',
    'Apps/Standalone/encounter_cards_v17.html',
    'Apps/Public-Web/index.html',
    'Assets/README.md',
    'Assets/Catalog/README.md',
    'Assets/Catalog/asset-licenses.md',
    'Assets/Catalog/content-sources.json',
    'Development/README.md',
    'Development/Source/README.md',
    'Development/Source/Main-App/README.md',
    'Development/Source/Public-Web/README.md',
    'Development/Automation/README.md',
    'Development/Automation/Scripts/README.md',
    'Development/Automation/Tools/README.md',
    'Development/Tests/README.md',
    'Development/Documentation/README.md',
    'Development/Documentation/designs/README.md',
    'Development/Documentation/plans/README.md',
    'Development/Governance/README.md',
    'Development/Governance/Meta/README.md',
    'Development/Human-References/README.md',
    'Development/Pending/README.md',
    'Development/Pending/index.md'
)

foreach ($relativePath in $requiredFiles) {
    Assert-StructureCondition -Condition (Test-Path -LiteralPath (Join-Path $projectRoot $relativePath) -PathType Leaf) -Message "Required file exists: $relativePath"
}

$guidePath = Join-Path $projectRoot 'GUIDE.md'
if (Test-Path -LiteralPath $guidePath -PathType Leaf) {
    $guide = Get-Content -Raw -Encoding UTF8 -LiteralPath $guidePath
    foreach ($relativePath in $requiredDirectories) {
        $escapedPath = [regex]::Escape($relativePath)
        Assert-StructureCondition -Condition ($guide -match $escapedPath) -Message "GUIDE annotates: $relativePath"
    }
}

if ($failures.Count -gt 0) {
    Write-Host "Clean-structure validation failed with $($failures.Count) issue(s)." -ForegroundColor Red
    exit 1
}

Write-Host 'Clean three-category structure validation passed.' -ForegroundColor Cyan
exit 0
