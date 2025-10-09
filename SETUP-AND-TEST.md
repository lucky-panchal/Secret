# Setup and Testing Guide

## Backend Setup Fixed ✅
- Added module.exports to secureAuth.js
- Environment variables already configured in .env
- Route properly configured in routes/auth.js

## Frontend Integration Added ✅
- SecureAuthModal integrated into login page
- Triggers after email/password entry
- Shows 3-step verification process

## Testing Steps

### 1. Start Backend Server
```bash
cd backend
npm start
```
Server should run on http://localhost:5000

### 2. Start Frontend
```bash
cd client
npm run dev
```
Frontend should run on http://localhost:3001

### 3. Test Backend Endpoint Directly
Run: `test-captcha.bat`

Expected: Should return authentication responses (not "Route not found")

### 4. Test Frontend Flow
1. Go to http://localhost:3001/login
2. Enter email and password
3. Click "Sign In"
4. SecureAuthModal should appear with 3 steps:
   - reCAPTCHA Verification
   - Aadhaar Verification (enter 12 digits)
   - Facial Recognition (camera access)

## Environment Variables

### Backend (.env)
```
RECAPTCHA_SECRET_KEY=6LfG2OMrAAAAAFjhef5cE6LAn6p8lf35296m3vNY
RECAPTCHA_MIN_SCORE=0.5
AADHAAR_HACKATHON_MODE=true
FACE_MATCH_THRESHOLD=0.6
```

### Frontend (.env.local)
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LfG2OMrAAAAABrj43beOYNIwLnwjTwBdqccp7HA
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Troubleshooting

### "Route not found" error
- Restart backend server
- Check if auth routes are loaded in server.js
- Verify module.exports in secureAuth.js

### reCAPTCHA not loading
- Check NEXT_PUBLIC_RECAPTCHA_SITE_KEY in frontend .env.local
- Verify internet connection (loads from Google CDN)

### Camera not working
- Grant browser camera permissions
- Use HTTPS or localhost (required for camera access)

## API Endpoint
POST http://localhost:5000/api/auth/verify-secure

Request Body:
```json
{
  "userId": "test123",
  "email": "test@example.com",
  "recaptchaToken": "token_from_google",
  "aadhaarData": {
    "aadhaarNumber": "123456789012",
    "consent": true,
    "name": "Test User"
  },
  "faceData": {
    "descriptors": [0.1, 0.2, 0.3],
    "referenceDescriptors": [0.1, 0.2, 0.3],
    "method": "face-api.js"
  }
}
```
