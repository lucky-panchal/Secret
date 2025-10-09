@echo off
echo ========================================
echo   HACKATHON MODE - INSTANT SETUP
echo ========================================
echo.

echo Step 1: Installing dependencies...
cd backend
call npm install
cd ..\client
call npm install
cd ..
echo [OK] Dependencies installed
echo.

echo Step 2: Downloading face models...
node download-face-models.js
echo.

echo Step 3: Starting servers...
echo.
echo Opening 2 terminals...
echo Terminal 1: Backend (port 5000)
echo Terminal 2: Frontend (port 3001)
echo.

start cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
start cmd /k "cd client && npm run dev"

echo.
echo ========================================
echo   SERVERS STARTING...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3001
echo.
echo Test login at: http://localhost:3001/login
echo.
echo Use any 12-digit Aadhaar number (e.g., 123456789012)
echo.
pause
