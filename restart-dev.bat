@echo off
REM SalesAIde Development Server Restart Script for Windows
REM This script safely kills existing services and restarts the development server

echo.
echo 🚀 SalesAIde Development Server Restart Script
echo ==============================================
echo.

REM Step 1: Kill existing Node.js processes on port 5000
echo [INFO] Checking for existing services on port 5000...

REM Find and kill processes using port 5000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do (
    echo [WARNING] Found process using port 5000. Killing PID %%a...
    taskkill /F /PID %%a >nul 2>&1
)

REM Step 2: Kill any Node.js processes related to this project
echo [INFO] Killing any remaining Node.js processes for this project...

REM Kill Node.js processes that might be related to our project
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM tsx.exe >nul 2>&1

echo [SUCCESS] Cleaned up existing Node.js processes

REM Step 3: Clear any potential cache issues
echo [INFO] Clearing potential cache and lock issues...

REM Remove node_modules/.cache if it exists
if exist "node_modules\.cache" (
    rmdir /S /Q "node_modules\.cache"
    echo [INFO] Cleared node_modules cache
)

echo [SUCCESS] Cache cleanup completed

REM Step 4: Check if package.json exists
if not exist "package.json" (
    echo [ERROR] package.json not found! Make sure you're in the project root directory.
    pause
    exit /b 1
)

REM Step 5: Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo [WARNING] node_modules not found. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed successfully
)

REM Step 6: Wait a moment to ensure everything is clean
echo [INFO] Waiting for system to stabilize...
timeout /t 2 /nobreak >nul

REM Step 7: Start the development server
echo [INFO] Starting development server...
echo.
echo 🎯 Starting SalesAIde development server on http://localhost:5000
echo 📝 Press Ctrl+C to stop the server
echo 🔄 The server will auto-reload when you make changes
echo.

REM Start the development server
call npm run dev

REM If we reach here, the server was stopped
echo.
echo [INFO] Development server stopped
pause
