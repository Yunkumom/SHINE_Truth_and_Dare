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
    'Apps/Standalone', 'Apps/Public-Web/v2', 'Apps/Public-Web/v3', 'Apps/Public-Web/v4', 'Apps/Public-Web/v5', 'Apps/Public-Web/v6', 'Apps/Public-Web/v7', 'Apps/Public-Web/v8', 'Apps/Public-Web/v9', 'Apps/Public-Web/v10', 'Apps/Public-Web/v11', 'Apps/Public-Web/v12', 'Apps/Public-Web/v13', 'Apps/Public-Web/v14', 'Apps/Public-Web/v15', 'Apps/Public-Web/v16', 'Assets/Catalog', 'Assets/Deities', 'Assets/Deities/v20-variants', 'Assets/Deities/v23-taiwan-safe', 'Assets/Deities/v30-safe-masters', 'Assets/Zodiac', 'Assets/Zodiac/Taiwan', 'Assets/Zodiac/Taiwan/v33-masters',
    'Development/Source/Main-App-v18', 'Development/Source/Main-App-v19', 'Development/Source/Main-App-v20', 'Development/Source/Main-App-v21', 'Development/Source/Main-App-v22', 'Development/Source/Main-App-v23', 'Development/Source/Main-App-v24', 'Development/Source/Main-App-v25', 'Development/Source/Main-App-v26', 'Development/Source/Main-App-v27', 'Development/Source/Main-App-v28', 'Development/Source/Main-App-v29', 'Development/Source/Main-App-v30', 'Development/Source/Main-App-v31', 'Development/Source/Main-App-v32', 'Development/Source/Main-App-v33', 'Development/Source/Public-Web/v2', 'Development/Source/Public-Web/v3', 'Development/Source/Public-Web/v4', 'Development/Source/Public-Web/v5', 'Development/Source/Public-Web/v6', 'Development/Source/Public-Web/v7', 'Development/Source/Public-Web/v8', 'Development/Source/Public-Web/v9', 'Development/Source/Public-Web/v10', 'Development/Source/Public-Web/v11', 'Development/Source/Public-Web/v12', 'Development/Source/Public-Web/v13', 'Development/Source/Public-Web/v14', 'Development/Source/Public-Web/v15', 'Development/Source/Public-Web/v16', 'Development/Automation/Scripts', 'Development/Automation/Tools',
    'Development/Tests', 'Development/Documentation',
    '_meta', '_agent', '_agent/Skills', '_human', '_pending',
    '_pending/Development-simplification_2026-07-19', '_pending/v24-generated-development-state_2026-07-23', '_pending/v25-generated-development-state_2026-07-24', '_pending/v26-generated-development-state_2026-07-26', '_pending/v28-generated-development-state_2026-07-26', '_pending/v29-preverification-build_2026-07-27', '_pending/v29-generated-development-state_2026-07-27', '_pending/v30-generated-development-state_2026-07-27', '_pending/v31-generated-development-state_2026-07-27', '_pending/v32-generated-development-state_2026-07-28', '_pending/v33-preverification-build_2026-07-28', '_pending/v33-generated-development-state_2026-07-28'
)
$requiredDirectories += @('Apps/Public-Web/v17', 'Apps/Public-Web/v18', 'Apps/Public-Web/v19', 'Apps/Public-Web/v20', 'Apps/Public-Web/v21', 'Apps/Public-Web/v22', 'Assets/Zodiac/Taiwan/v34-local-stories-masters', 'Development/Source/Main-App-v34', 'Development/Source/Main-App-v35', 'Development/Source/Main-App-v36', 'Development/Source/Main-App-v37', 'Development/Source/Main-App-v38', 'Development/Source/Main-App-v39', 'Development/Source/Public-Web/v17', 'Development/Source/Public-Web/v18', 'Development/Source/Public-Web/v19', 'Development/Source/Public-Web/v20', 'Development/Source/Public-Web/v21', 'Development/Source/Public-Web/v22', '_pending/v34-generated-development-state_2026-07-29', '_pending/v34-preverification-build_2026-07-29', '_pending/v35-generated-development-state_2026-07-29', '_pending/Encounter_Cards_v11_Source_2026-07-30', '_pending/v36-generated-development-state_2026-07-30', '_pending/v36-preverification-build_2026-07-30', '_pending/v37-generated-development-state_2026-07-30')
foreach ($relativePath in $requiredDirectories) {
    Assert-StructureCondition (Test-Path -LiteralPath (Join-Path $projectRoot $relativePath) -PathType Container) "Required directory exists: $relativePath"
}

$requiredFiles = @(
    'GUIDE.md', 'Apps/README.md', 'Assets/README.md', 'Assets/Catalog/README.md', 'Assets/Deities/v30-safe-masters/README.md', 'Assets/Zodiac/README.md', 'Assets/Zodiac/Taiwan/README.md', 'Assets/Zodiac/Taiwan/v33-masters/README.md',
    'Development/README.md', 'Development/Documentation/README.md',
    'Development/Source/Main-App-v33/package.json', 'Development/Source/Public-Web/v16/README.md',
    'Development/Source/Main-App-v18/package.json', 'Development/Source/Main-App-v19/package.json', 'Development/Source/Main-App-v20/package.json', 'Development/Source/Main-App-v21/package.json', 'Development/Source/Main-App-v22/package.json', 'Development/Source/Main-App-v23/package.json', 'Development/Source/Main-App-v24/package.json', 'Development/Source/Main-App-v25/package.json', 'Development/Source/Main-App-v26/package.json', 'Development/Source/Main-App-v27/package.json', 'Development/Source/Main-App-v28/package.json', 'Development/Source/Main-App-v29/package.json', 'Development/Source/Main-App-v30/package.json', 'Development/Source/Main-App-v31/package.json', 'Development/Source/Main-App-v32/package.json', 'Development/Source/Public-Web/v2/README.md', 'Development/Source/Public-Web/v3/README.md', 'Development/Source/Public-Web/v4/README.md', 'Development/Source/Public-Web/v5/README.md', 'Development/Source/Public-Web/v6/README.md', 'Development/Source/Public-Web/v7/README.md', 'Development/Source/Public-Web/v8/README.md', 'Development/Source/Public-Web/v9/README.md', 'Development/Source/Public-Web/v10/README.md', 'Development/Source/Public-Web/v11/README.md', 'Development/Source/Public-Web/v12/README.md', 'Development/Source/Public-Web/v13/README.md', 'Development/Source/Public-Web/v14/README.md', 'Development/Source/Public-Web/v15/README.md', 'Development/Automation/Tools/serve_truth_and_dare.ps1',
    'Development/Tests/validate_clean_structure.ps1', 'Development/Tests/validate_v18.ps1', 'Development/Tests/validate_v19.ps1', 'Development/Tests/validate_v20.ps1', 'Development/Tests/validate_v21.ps1', 'Development/Tests/validate_v22.ps1', 'Development/Tests/validate_v23.ps1', 'Development/Tests/validate_v24.ps1', 'Development/Tests/validate_v25.ps1', 'Development/Tests/validate_v26.ps1', 'Development/Tests/validate_v27.ps1', 'Development/Tests/validate_v28.ps1', 'Development/Tests/validate_v29.ps1', 'Development/Tests/validate_v30.ps1', 'Development/Tests/validate_v31.ps1', 'Development/Tests/validate_v32.ps1', 'Development/Tests/validate_repository.ps1',
    'Development/Tests/validate_v33.ps1',
    '_meta/README.md', '_agent/README.md', '_agent/Skills/README.md', '_human/README.md',
    '_pending/README.md', '_pending/index.md', '_pending/Development-simplification_2026-07-19/README.md', '_pending/v24-generated-development-state_2026-07-23/README.md', '_pending/v25-generated-development-state_2026-07-24/README.md', '_pending/v26-generated-development-state_2026-07-26/README.md', '_pending/v28-generated-development-state_2026-07-26/README.md', '_pending/v29-preverification-build_2026-07-27/README.md', '_pending/v29-generated-development-state_2026-07-27/README.md', '_pending/v30-generated-development-state_2026-07-27/README.md', '_pending/v31-generated-development-state_2026-07-27/README.md', '_pending/v32-generated-development-state_2026-07-28/README.md', '_pending/v33-preverification-build_2026-07-28/README.md', '_pending/v33-generated-development-state_2026-07-28/README.md'
)
$requiredFiles += @('Assets/Zodiac/Taiwan/v34-local-stories-masters/README.md', 'Development/Source/Main-App-v34/package.json', 'Development/Source/Main-App-v35/package.json', 'Development/Source/Main-App-v36/package.json', 'Development/Source/Main-App-v37/package.json', 'Development/Source/Main-App-v38/package.json', 'Development/Source/Main-App-v39/package.json', 'Development/Source/Public-Web/v17/README.md', 'Development/Source/Public-Web/v18/README.md', 'Development/Source/Public-Web/v19/README.md', 'Development/Source/Public-Web/v20/README.md', 'Development/Source/Public-Web/v21/README.md', 'Development/Source/Public-Web/v22/README.md', 'Development/Tests/validate_v34.ps1', 'Development/Tests/validate_v35.ps1', 'Development/Tests/validate_v36.ps1', 'Development/Tests/validate_v37.ps1', 'Development/Tests/validate_v38.ps1', 'Development/Tests/validate_v39.ps1', '_pending/v34-generated-development-state_2026-07-29/README.md', '_pending/v34-preverification-build_2026-07-29/README.md', '_pending/v35-generated-development-state_2026-07-29/README.md', '_pending/Encounter_Cards_v11_Source_2026-07-30/README.md', '_pending/v36-generated-development-state_2026-07-30/README.md', '_pending/v36-preverification-build_2026-07-30/README.md', '_pending/v37-generated-development-state_2026-07-30/README.md')
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
$expectedSourceEntries = @('Main-App-v18','Main-App-v19','Main-App-v20','Main-App-v21','Main-App-v22','Main-App-v23','Main-App-v24','Main-App-v25','Main-App-v26','Main-App-v27','Main-App-v28','Main-App-v29','Main-App-v30','Main-App-v31','Main-App-v32','Main-App-v33','Main-App-v34','Main-App-v35','Main-App-v36','Main-App-v37','Main-App-v38','Main-App-v39','Public-Web')
Assert-StructureCondition ($sourceEntries.Count -eq $expectedSourceEntries.Count -and @($sourceEntries | Where-Object { $_ -notin $expectedSourceEntries }).Count -eq 0) 'Development Source contains preserved v18-v38, active v39, and versioned Public Web recipes'

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
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v21[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v22[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v23[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v24[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v25[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v26[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v27[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v28[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v29[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v30[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v31[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v32[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v33[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v34[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v35[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v36[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v37[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v38[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Main-App-v39[\\/]' -and
        $_.FullName -notmatch '[\\/]Source[\\/]Public-Web[\\/]v(1[0123456789]|[23456789])[\\/]'
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
    foreach ($annotation in @('Source/Main-App-v21/','Source/Main-App-v21/src/','Source/Main-App-v21/src/components/TaiwanReveal.tsx','Source/Main-App-v21/src/lib/deity-art.ts','Source/Main-App-v21/src/styles/taiwan-reveal.css','Source/Public-Web/v4/','Automation/Scripts/export-standalone-v21.mjs','Automation/Scripts/finalize-pwa-v21.mjs','Automation/Scripts/finalize-public-v4.mjs','Tests/validate_v21.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v21 path: $annotation"
    }
    foreach ($annotation in @('Source/Main-App-v22/','Source/Main-App-v22/src/','Source/Main-App-v22/src/layout/layout-model.ts','Source/Main-App-v22/src/components/LayoutEditor.tsx','Source/Main-App-v22/src/components/EditableBlock.tsx','Source/Main-App-v22/src/components/SwipeDeck.tsx','Source/Main-App-v22/src/lib/swipe-deck.ts','Source/Main-App-v22/src/lib/share.ts','Source/Main-App-v22/src/styles/v22-layout.css','Source/Public-Web/v5/','Automation/Scripts/export-standalone-v22.mjs','Automation/Scripts/finalize-pwa-v22.mjs','Automation/Scripts/finalize-public-v5.mjs','Tests/validate_v22.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v22 path: $annotation"
    }
    foreach ($annotation in @('Source/Main-App-v23/','Source/Main-App-v23/src/','Source/Main-App-v23/src/assets/deities/','Source/Main-App-v23/src/components/TaiwanReveal.tsx','Source/Main-App-v23/src/lib/deity-art.ts','Source/Main-App-v23/src/lib/taiwan-shape.ts','Source/Main-App-v23/src/styles/taiwan-reveal.css','Source/Main-App-v23/src/styles/v23.css','Source/Main-App-v23/src/styles/v23-layout.css','Source/Public-Web/v6/','Automation/Scripts/export-standalone-v23.mjs','Automation/Scripts/finalize-pwa-v23.mjs','Automation/Scripts/finalize-public-v6.mjs','Tests/validate_v23.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v23 path: $annotation"
    }
    foreach ($annotation in @('Source/Main-App-v24/','Source/Main-App-v24/src/','Source/Main-App-v24/src/components/TaiwanReveal.tsx','Source/Main-App-v24/src/lib/taiwan-shape.ts','Source/Main-App-v24/src/styles/taiwan-reveal.css','Source/Public-Web/v7/','Automation/Scripts/export-standalone-v24.mjs','Automation/Scripts/finalize-pwa-v24.mjs','Automation/Scripts/finalize-public-v7.mjs','Tests/validate_v24.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v24 path: $annotation"
    }
    foreach ($annotation in @('Source/Main-App-v25/','Source/Main-App-v25/src/','Source/Main-App-v25/src/lib/portrait-focus.ts','Source/Main-App-v25/src/styles/v25-layout.css','Source/Public-Web/v8/','Automation/Scripts/export-standalone-v25.mjs','Automation/Scripts/finalize-pwa-v25.mjs','Automation/Scripts/finalize-public-v8.mjs','Tests/validate_v25.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v25 path: $annotation"
    }
    foreach ($annotation in @('Source/Main-App-v26/','Source/Main-App-v26/src/','Source/Main-App-v26/src/lib/device-frame.ts','Source/Main-App-v26/src/presentation/presentation-model.ts','Source/Main-App-v26/src/styles/v26-layout.css','Source/Public-Web/v9/','Automation/Scripts/export-standalone-v26.mjs','Automation/Scripts/finalize-pwa-v26.mjs','Automation/Scripts/finalize-public-v9.mjs','Tests/validate_v26.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v26 path: $annotation"
    }
    foreach ($annotation in @('Source/Main-App-v36/','Source/Main-App-v36/src/components/MobileSettings.tsx','Source/Main-App-v36/src/components/ArtworkPicker.tsx','Source/Main-App-v36/src/components/ArtworkAdjuster.tsx','Source/Main-App-v36/src/lib/question-manager.ts','Source/Public-Web/v19/','Automation/Scripts/export-standalone-v36.mjs','Automation/Scripts/finalize-pwa-v36.mjs','Automation/Scripts/finalize-public-v19.mjs','Tests/validate_v36.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v36 path: $annotation"
    }
    foreach ($annotation in @('Source/Main-App-v37/','Source/Main-App-v37/src/App.tsx','Source/Main-App-v37/src/components/LayoutEditor.tsx','Source/Main-App-v37/src/styles/v37.css','Source/Public-Web/v20/','Automation/Scripts/export-standalone-v37.mjs','Automation/Scripts/finalize-pwa-v37.mjs','Automation/Scripts/finalize-public-v20.mjs','Tests/validate_v37.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v37 path: $annotation"
    }
    foreach ($annotation in @('Source/Main-App-v38/','Source/Main-App-v38/src/components/ArtworkAdjuster.tsx','Source/Main-App-v38/src/styles/v38.css','Source/Public-Web/v21/','Automation/Scripts/export-standalone-v38.mjs','Automation/Scripts/finalize-pwa-v38.mjs','Automation/Scripts/finalize-public-v21.mjs','Tests/validate_v38.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v38 path: $annotation"
    }
    foreach ($annotation in @('Source/Main-App-v39/','Source/Main-App-v39/src/components/ModeHome.tsx','Source/Main-App-v39/src/components/DirectKeepsake.tsx','Source/Main-App-v39/src/lib/direct-keepsake.ts','Source/Main-App-v39/src/styles/v39.css','Source/Public-Web/v22/','Automation/Scripts/export-standalone-v39.mjs','Automation/Scripts/finalize-pwa-v39.mjs','Automation/Scripts/finalize-public-v22.mjs','Tests/validate_v39.ps1')) {
        Assert-StructureCondition ($developmentReadme.Contains($annotation)) "Development README annotates v39 path: $annotation"
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
