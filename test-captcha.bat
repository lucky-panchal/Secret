@echo off
echo ========================================
echo Testing reCAPTCHA Endpoint
echo ========================================
echo.

echo Test 1: Valid Authentication (All Pass)
curl -X POST http://localhost:5000/api/auth/verify-secure ^
  -H "Content-Type: application/json" ^
  -d "{\"recaptchaToken\":\"test_token\",\"faceData\":{\"descriptors\":[0.1,0.2,0.3],\"referenceDescriptors\":[0.1,0.2,0.3]},\"aadhaarData\":{\"aadhaarNumber\":\"123456789012\",\"consent\":true,\"name\":\"Test User\"},\"userId\":\"test123\",\"email\":\"test@example.com\"}"
echo.
echo.

echo Test 2: Missing reCAPTCHA Token
curl -X POST http://localhost:5000/api/auth/verify-secure ^
  -H "Content-Type: application/json" ^
  -d "{\"faceData\":{\"descriptors\":[0.1,0.2],\"referenceDescriptors\":[0.1,0.2]},\"aadhaarData\":{\"aadhaarNumber\":\"123456789012\"},\"userId\":\"test123\"}"
echo.
echo.

echo Test 3: Invalid Aadhaar Format
curl -X POST http://localhost:5000/api/auth/verify-secure ^
  -H "Content-Type: application/json" ^
  -d "{\"recaptchaToken\":\"test_token\",\"faceData\":{\"descriptors\":[0.1],\"referenceDescriptors\":[0.1]},\"aadhaarData\":{\"aadhaarNumber\":\"123\"},\"userId\":\"test123\"}"
echo.
echo.

echo ========================================
echo Tests Complete
echo ========================================
pause
