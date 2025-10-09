@echo off
REM Secure Authentication Installation Script for Windows
REM This script automates the setup process for the secure authentication feature

echo ========================================
echo Installing Secure Authentication Middleware...
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
echo [OK] Backend dependencies installed
echo.

REM Install frontend dependencies
echo Installing frontend dependencies...
cd ..\client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)
echo [OK] Frontend dependencies installed
echo.

REM Create models directory
echo Creating face-api.js models directory...
if not exist "public\models" mkdir public\models
echo [OK] Models directory created at client\public\models\
echo.

REM Check environment files
echo Checking environment configuration...
cd ..
if not exist "backend\.env" (
    echo [WARNING] backend\.env not found
) else (
    echo [OK] backend\.env exists
)

if not exist "client\.env.local" (
    echo [WARNING] client\.env.local not found
) else (
    echo [OK] client\.env.local exists
)
echo.

REM Summary
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Configure API keys in backend\.env and client\.env.local
echo 2. Download face-api.js models to client\public\models\
echo 3. Review SECURE_AUTH_SETUP.md for detailed instructions
echo.
echo To start the application:
echo   Backend:  cd backend ^&^& npm run dev
echo   Frontend: cd client ^&^& npm run dev
echo.
echo Documentation:
echo   - Setup Guide: SECURE_AUTH_SETUP.md
echo   - Feature README: SECURE_AUTH_README.md
echo.
pause
