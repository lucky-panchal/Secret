# reCAPTCHA Testing Guide

## Backend Endpoint
**URL:** `http://localhost:5000/api/auth/verify-secure`
**Method:** POST
**Content-Type:** application/json

## Frontend Integration
**File:** `client/src/components/auth/SecureAuthModal.jsx`
**Line:** 241-265

The frontend calls this endpoint after completing all 3 verification steps:
1. reCAPTCHA verification
2. Aadhaar verification  
3. Facial recognition

## Running Tests

### Quick Test (Batch File)
```bash
test-captcha.bat
```

### Manual cURL Tests

**Test 1: Valid Request**
```bash
curl -X POST http://localhost:5000/api/auth/verify-secure -H "Content-Type: application/json" -d "{\"recaptchaToken\":\"test_token\",\"faceData\":{\"descriptors\":[0.1,0.2,0.3],\"referenceDescriptors\":[0.1,0.2,0.3]},\"aadhaarData\":{\"aadhaarNumber\":\"123456789012\",\"consent\":true},\"userId\":\"test123\",\"email\":\"test@example.com\"}"
```

**Test 2: Missing reCAPTCHA**
```bash
curl -X POST http://localhost:5000/api/auth/verify-secure -H "Content-Type: application/json" -d "{\"faceData\":{\"descriptors\":[0.1],\"referenceDescriptors\":[0.1]},\"aadhaarData\":{\"aadhaarNumber\":\"123456789012\"},\"userId\":\"test123\"}"
```

## Environment Variables Required
```
RECAPTCHA_SECRET_KEY=your_secret_key
RECAPTCHA_MIN_SCORE=0.5
AADHAAR_HACKATHON_MODE=true
```

## Expected Response
**Success (200):**
```json
{
  "success": true,
  "message": "Secure authentication successful",
  "data": {
    "verified": true,
    "recaptchaScore": 0.9,
    "faceConfidence": 0.95
  }
}
```

**Failure (403):**
```json
{
  "success": false,
  "message": "Authentication failed",
  "details": {
    "recaptcha": false,
    "faceVerification": true,
    "aadhaarVerification": true
  }
}
```
