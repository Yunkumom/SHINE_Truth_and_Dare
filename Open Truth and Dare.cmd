@echo off
setlocal
cd /d "%~dp0Development\Source\Main-App-v46"
if not exist "node_modules\.bin\vite.cmd" (
  echo Restoring locked Encounter Cards v46 dependencies...
  call npm ci --no-audit --no-fund
  if errorlevel 1 goto :failure
)
call npm run build:encounter
if errorlevel 1 goto :failure
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://127.0.0.1:8765/"
call npm run dev -- --host 127.0.0.1 --port 8765
if errorlevel 1 goto :failure
goto :end

:failure
echo.
echo Encounter Cards v46 could not start. Review the error above.
pause

:end
endlocal
