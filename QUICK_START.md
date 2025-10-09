# 🚀 Quick Start Guide - Secure Authentication

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (1 min)
```bash
# Windows
install-secure-auth.bat

# Linux/Mac
chmod +x install-secure-auth.sh && ./install-secure-auth.sh
```

### Step 2: Download Face Models (1 min)
```bash
node download-face-models.js
```

### Step 3: Configure API Keys (2 min)

**Backend** (`backend/.env`):
```env
RECAPTCHA_SECRET_KEY=your_secret_key_here
AADHAAR_API_KEY=your_api_key_here
```

**Frontend** (`client/.env.local`):
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
```

### Step 4: Start Application (1 min)
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

---

## 🔑 Get API Keys

### Google reCAPTCHA (2 minutes)
1. Go to: https://www.google.com/recaptcha/admin
2. Register site → Select reCAPTCHA v3
3. Copy Site Key → Frontend `.env.local`
4. Copy Secret Key → Backend `.env`

### Aadhaar API (Optional - for production)
1. Go to: https://uidai.gov.in/ecosystem/services/ekyc-api.html
2. Apply for sandbox access
3. Copy API Key → Backend `.env`

**Note**: Aadhaar verification works in mock mode without API key for testing.

---

## 📁 Files Overview

### New Backend Files
- `backend/models/AuthLog.js` - Database model
- `backend/middleware/secureAuth.js` - Main middleware
- `backend/routes/auth.js` - API endpoints
- `backend/tests/secureAuth.test.js` - Tests

### New Frontend Files
- `client/src/components/auth/SecureAuthModal.jsx` - UI component
- `client/src/app/login/page-with-secure-auth.js` - Integration example

### Documentation
- `SECURE_AUTH_SETUP.md` - Detailed setup
- `SECURE_AUTH_README.md` - Feature docs
- `IMPLEMENTATION_SUMMARY.md` - Complete overview

---

## 🧪 Test It

1. Open: http://localhost:3001/login
2. Enter credentials
3. Complete 3-step verification:
   - ✅ reCAPTCHA (automatic)
   - ✅ Aadhaar (enter 12 digits)
   - ✅ Face capture (enable camera)

---

## 📊 API Endpoints

```bash
# Verify secure authentication
POST /api/auth/verify-secure

# Get authentication logs
GET /api/auth/logs/:userId

# Get statistics
GET /api/auth/stats/:userId

# Fallback verification
POST /api/auth/fallback-verification
```

---

## 🔧 Integration

```javascript
import SecureAuthModal from '@/components/auth/SecureAuthModal';

<SecureAuthModal
  open={showModal}
  onClose={() => setShowModal(false)}
  onSuccess={(data) => console.log('Verified!', data)}
  userEmail="user@example.com"
  userId="user123"
/>
```

---

## 🐛 Troubleshooting

**Camera not working?**
- Enable camera permissions in browser
- Use HTTPS in production

**reCAPTCHA not loading?**
- Check `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` in `client/.env.local`

**Face detection fails?**
- Ensure models are in `client/public/models/`
- Run: `node download-face-models.js`

---

## 📚 Full Documentation

- **Setup Guide**: [SECURE_AUTH_SETUP.md](./SECURE_AUTH_SETUP.md)
- **Feature Docs**: [SECURE_AUTH_README.md](./SECURE_AUTH_README.md)
- **Implementation**: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

## ✅ Checklist

- [ ] Dependencies installed
- [ ] Face models downloaded
- [ ] API keys configured
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 3001)
- [ ] Camera permissions enabled
- [ ] Test authentication flow

---

**Branch**: `feature/secure-auth-in`  
**Status**: ✅ Ready to use  
**Time to setup**: ~5 minutes
