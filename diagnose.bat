@echo off
echo ========================================
echo Server Diagnostics
echo ========================================
echo.

echo Checking if server is running...
curl -s http://localhost:5000/api/health | findstr "healthy"
if %errorlevel% equ 0 (
    echo [OK] Server is running
) else (
    echo [ERROR] Server is not running
    echo Please start the server with: cd backend ^&^& npm start
    pause
    exit
)
echo.

echo Checking auth routes...
curl -s -X POST http://localhost:5000/api/auth/verify-secure -H "Content-Type: application/json" -d "{}" | findstr "Route not found"
if %errorlevel% equ 0 (
    echo [ERROR] Auth routes not loaded - RESTART SERVER REQUIRED
    echo.
    echo ACTION NEEDED:
    echo 1. Go to your backend terminal
    echo 2. Press Ctrl+C to stop server
    echo 3. Run: npm start
    echo 4. Run this script again
) else (
    echo [OK] Auth routes are loaded
)
echo.
pause
