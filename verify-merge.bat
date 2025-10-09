@echo off
echo ========================================
echo MERGE VERIFICATION SCRIPT
echo ========================================
echo.

echo [1/5] Checking Git Status...
git status
echo.

echo [2/5] Checking Backend Dependencies...
cd backend
if exist node_modules\axios (
    echo ✅ axios installed
) else (
    echo ❌ axios missing - run: npm install
)

if exist node_modules\bcryptjs (
    echo ✅ bcryptjs installed
) else (
    echo ❌ bcryptjs missing - run: npm install
)
cd ..
echo.

echo [3/5] Checking Frontend Dependencies...
cd client
if exist node_modules\@vladmandic\face-api (
    echo ✅ face-api installed
) else (
    echo ❌ face-api missing - run: npm install
)

if exist node_modules\next (
    echo ✅ next installed
) else (
    echo ❌ next missing - run: npm install
)
cd ..
echo.

echo [4/5] Checking Key Files...
if exist backend\routes\auth.js (
    echo ✅ backend\routes\auth.js exists
) else (
    echo ❌ backend\routes\auth.js missing
)

if exist backend\middleware\secureAuth.js (
    echo ✅ backend\middleware\secureAuth.js exists
) else (
    echo ❌ backend\middleware\secureAuth.js missing
)

if exist client\src\components\auth\SecureAuthModal.jsx (
    echo ✅ client\src\components\auth\SecureAuthModal.jsx exists
) else (
    echo ❌ client\src\components\auth\SecureAuthModal.jsx missing
)

if exist backend\.env (
    echo ✅ backend\.env exists
) else (
    echo ❌ backend\.env missing
)
echo.

echo [5/5] Checking Environment Variables...
cd backend
findstr /C:"RECAPTCHA_SECRET_KEY" .env >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ RECAPTCHA_SECRET_KEY configured
) else (
    echo ❌ RECAPTCHA_SECRET_KEY not found in .env
)

findstr /C:"AADHAAR_HACKATHON_MODE" .env >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ AADHAAR_HACKATHON_MODE configured
) else (
    echo ❌ AADHAAR_HACKATHON_MODE not found in .env
)

findstr /C:"FACE_MATCH_THRESHOLD" .env >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ FACE_MATCH_THRESHOLD configured
) else (
    echo ❌ FACE_MATCH_THRESHOLD not found in .env
)
cd ..
echo.

echo ========================================
echo VERIFICATION COMPLETE
echo ========================================
echo.
echo Next Steps:
echo 1. Start backend: cd backend ^&^& npm start
echo 2. Start frontend: cd client ^&^& npm run dev
echo 3. Test captcha: test-captcha.bat
echo.
pause
