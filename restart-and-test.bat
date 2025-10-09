@echo off
echo ========================================
echo Restarting Backend Server
echo ========================================
echo.
echo Please manually restart your backend server (Ctrl+C then npm start)
echo Then press any key to test...
pause
echo.
echo ========================================
echo Testing reCAPTCHA Endpoint
echo ========================================
echo.

echo Test 1: Valid Authentication
curl -X POST http://localhost:5000/api/auth/verify-secure -H "Content-Type: application/json" -d "{\"recaptchaToken\":\"test_token\",\"faceData\":{\"descriptors\":[0.1,0.2,0.3],\"referenceDescriptors\":[0.1,0.2,0.3]},\"aadhaarData\":{\"aadhaarNumber\":\"123456789012\",\"consent\":true,\"name\":\"Test User\"},\"userId\":\"test123\",\"email\":\"test@example.com\"}"
echo.
echo.

echo ========================================
echo Test Complete
echo ========================================
pause
