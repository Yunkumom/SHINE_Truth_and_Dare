@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0Development\Automation\Tools\serve_truth_and_dare.ps1"
if errorlevel 1 (
  echo.
  echo Truth and Dare could not start. Review the error above.
  pause
)
endlocal
