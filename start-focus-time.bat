@echo off
echo ☕ Starting Focus Time...
echo.

:: Get the directory of the script
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

:: Start the server and open browser
:: We use a timeout to give the server a moment to start
start "" "http://localhost:3000"

echo 🚀 Server running at http://localhost:3000
echo 📝 Press Ctrl+C to stop the server
echo.

npx -y serve . -p 3000
