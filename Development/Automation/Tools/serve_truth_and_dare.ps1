param(
    [int]$Port = 8765,
    [switch]$NoOpen
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
$relativeProductUrl = '/Apps/Standalone/encounter_cards_v24.html'
$productPath = Join-Path $projectRoot 'Apps/Standalone/encounter_cards_v24.html'
$productUrl = "http://127.0.0.1:$Port$relativeProductUrl"
$healthMarker = 'encounter-release" content="V24"'

if (-not (Test-Path -LiteralPath $productPath -PathType Leaf)) {
    throw 'Encounter Cards v24 is missing. Restore the verified standalone release before starting the launcher.'
}

function Test-TruthAndDareServer {
    try {
        $response = Invoke-WebRequest -Uri $productUrl -UseBasicParsing -TimeoutSec 2
        return $response.StatusCode -eq 200 -and $response.Content.Contains($healthMarker)
    }
    catch {
        return $false
    }
}

function Test-LocalPort {
    $client = New-Object Net.Sockets.TcpClient
    try {
        $result = $client.BeginConnect('127.0.0.1', $Port, $null, $null)
        if (-not $result.AsyncWaitHandle.WaitOne(350)) {
            return $false
        }
        $client.EndConnect($result)
        return $true
    }
    catch {
        return $false
    }
    finally {
        $client.Dispose()
    }
}

if (-not (Test-TruthAndDareServer)) {
    if (Test-LocalPort) {
        throw "Port $Port is already used by another application. Close it or run this helper with a different -Port value."
    }

    $python = Get-Command python.exe -ErrorAction SilentlyContinue
    if (-not $python) {
        $python = Get-Command python -ErrorAction SilentlyContinue
    }
    if (-not $python) {
        throw 'Python was not found. Install Python or add it to PATH, then run the launcher again.'
    }

    $serverArgs = @('-m', 'http.server', $Port, '--bind', '127.0.0.1')
    $serverProcess = Start-Process -FilePath $python.Source -ArgumentList $serverArgs -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru

    $ready = $false
    for ($attempt = 0; $attempt -lt 40; $attempt++) {
        if ($serverProcess.HasExited) {
            throw "The local server exited with code $($serverProcess.ExitCode)."
        }
        if (Test-TruthAndDareServer) {
            $ready = $true
            break
        }
        Start-Sleep -Milliseconds 250
    }

    if (-not $ready) {
        throw "The local server did not become ready at $productUrl within 10 seconds."
    }
}

Write-Host "Truth and Dare is ready at $productUrl" -ForegroundColor Cyan
if (-not $NoOpen) {
    Start-Process $productUrl
}
