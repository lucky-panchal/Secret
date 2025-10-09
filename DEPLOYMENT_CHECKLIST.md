# 📋 Deployment Checklist - Secure Authentication

Use this checklist to ensure proper deployment of the secure authentication feature.

---

## ✅ Pre-Deployment Setup

### 1. API Keys Configuration

#### Google reCAPTCHA
- [ ] Visit https://www.google.com/recaptcha/admin
- [ ] Register new site with reCAPTCHA v3
- [ ] Add `localhost` and production domain
- [ ] Copy **Site Key** to `client/.env.local` as `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- [ ] Copy **Secret Key** to `backend/.env` as `RECAPTCHA_SECRET_KEY`
- [ ] Test reCAPTCHA on localhost

#### Aadhaar e-KYC API (Optional for Testing)
- [ ] Visit https://uidai.gov.in/ecosystem/services/ekyc-api.html
- [ ] Apply for sandbox access
- [ ] Wait for approval (2-5 business days)
- [ ] Copy **API Key** to `backend/.env` as `AADHAAR_API_KEY`
- [ ] Test with sandbox Aadhaar numbers
- [ ] For production: Apply for production API access

#### Face-API.js Models
- [ ] Run `node download-face-models.js`
- [ ] Verify models exist in `client/public/models/`
- [ ] Check for 7 model files (3 manifests + 4 shards)
- [ ] Test face detection on localhost

---

## 🔧 Installation

### Backend
- [ ] Navigate to `backend/` directory
- [ ] Run `npm install`
- [ ] Verify no errors in installation
- [ ] Check `node_modules/` for axios (already installed)

### Frontend
- [ ] Navigate to `client/` directory
- [ ] Run `npm install`
- [ ] Verify `@vladmandic/face-api` is installed
- [ ] Check for any peer dependency warnings

---

## 🧪 Testing

### Unit Tests
- [ ] Run `cd backend && npm run test:auth`
- [ ] Verify all tests pass
- [ ] Check test coverage

### Manual Testing - Local
- [ ] Start backend: `cd backend && npm run dev`
- [ ] Start frontend: `cd client && npm run dev`
- [ ] Navigate to http://localhost:3001/login
- [ ] Test reCAPTCHA verification
- [ ] Test Aadhaar input (use 12 digits: 123456789012)
- [ ] Test camera access and face capture
- [ ] Test fallback mechanism
- [ ] Verify authentication logs in MongoDB
- [ ] Check browser console for errors

### Integration Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge
- [ ] Test on mobile devices
- [ ] Test with camera disabled (fallback)
- [ ] Test with slow network
- [ ] Test with invalid Aadhaar
- [ ] Test with no face detected

---

## 🔒 Security Review

### Code Security
- [ ] No hardcoded API keys in code
- [ ] All secrets in `.env` files
- [ ] `.env` files in `.gitignore`
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS prevention (React escapes by default)
- [ ] CSRF protection (consider adding tokens)

### Data Privacy
- [ ] Face descriptors stored, not raw images
- [ ] Aadhaar numbers partially masked in logs
- [ ] User consent obtained before verification
- [ ] Compliance with Indian IT Act
- [ ] GDPR principles followed
- [ ] Data retention policy defined

### Authentication Security
- [ ] Multi-factor authentication implemented
- [ ] Rate limiting planned (implement before production)
- [ ] Session management planned
- [ ] Token expiration configured
- [ ] Secure cookie settings

---

## 🌐 Production Deployment

### Environment Configuration
- [ ] Set `NODE_ENV=production` in backend
- [ ] Update `FRONTEND_URL` in backend `.env`
- [ ] Update `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- [ ] Configure production MongoDB URI
- [ ] Set production reCAPTCHA keys
- [ ] Set production Aadhaar API keys
- [ ] Configure CORS for production domain

### HTTPS Setup (REQUIRED)
- [ ] Obtain SSL certificate
- [ ] Configure HTTPS on backend
- [ ] Configure HTTPS on frontend
- [ ] Test camera access (requires HTTPS)
- [ ] Update reCAPTCHA domains to include HTTPS URLs

### Server Configuration
- [ ] Install Node.js 16+ on server
- [ ] Install MongoDB or configure Atlas
- [ ] Set up process manager (PM2 recommended)
- [ ] Configure firewall rules
- [ ] Set up reverse proxy (Nginx/Apache)
- [ ] Configure domain DNS

### Rate Limiting
- [ ] Install `express-rate-limit`
- [ ] Configure rate limits on `/api/auth/*` endpoints
- [ ] Set appropriate limits (e.g., 5 attempts per 15 minutes)
- [ ] Test rate limiting

### Monitoring & Logging
- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Configure application logging
- [ ] Set up uptime monitoring
- [ ] Configure alerts for failed authentications
- [ ] Set up database backup

---

## 📊 Database Setup

### MongoDB Configuration
- [ ] Create `authlogs` collection (auto-created on first use)
- [ ] Verify indexes on `userId` and `timestamp`
- [ ] Set up database backup schedule
- [ ] Configure data retention policy
- [ ] Test database connection from production server

---

## 🚀 Deployment Steps

### 1. Backend Deployment
- [ ] Clone repository on server
- [ ] Checkout `feature/secure-auth-in` branch
- [ ] Run `npm install` in backend directory
- [ ] Copy production `.env` file
- [ ] Test backend: `npm start`
- [ ] Configure PM2: `pm2 start server.js --name kaushalx-backend`
- [ ] Set PM2 to start on boot: `pm2 startup`
- [ ] Save PM2 configuration: `pm2 save`

### 2. Frontend Deployment
- [ ] Run `npm install` in client directory
- [ ] Copy production `.env.local` file
- [ ] Build production: `npm run build`
- [ ] Test build: `npm start`
- [ ] Configure PM2: `pm2 start npm --name kaushalx-frontend -- start`
- [ ] Or deploy to Vercel/Netlify

### 3. Reverse Proxy (Nginx)
- [ ] Install Nginx
- [ ] Configure proxy for backend (port 5000)
- [ ] Configure proxy for frontend (port 3000)
- [ ] Set up SSL with Let's Encrypt
- [ ] Test HTTPS access
- [ ] Configure WebSocket proxy (if needed)

---

## ✅ Post-Deployment Verification

### Functionality Tests
- [ ] Visit production URL
- [ ] Test complete authentication flow
- [ ] Verify reCAPTCHA works
- [ ] Verify Aadhaar validation
- [ ] Verify face capture with HTTPS
- [ ] Test on multiple devices
- [ ] Test fallback mechanism

### Performance Tests
- [ ] Check page load times
- [ ] Test with multiple concurrent users
- [ ] Monitor server resource usage
- [ ] Check database query performance
- [ ] Verify CDN for face-api models (optional)

### Security Tests
- [ ] Run security scan (OWASP ZAP, etc.)
- [ ] Test rate limiting
- [ ] Verify HTTPS enforcement
- [ ] Check for exposed secrets
- [ ] Test authentication bypass attempts
- [ ] Verify logging is working

---

## 📱 Mobile Testing

### iOS
- [ ] Test on Safari (iPhone)
- [ ] Test camera access
- [ ] Test face detection
- [ ] Test responsive design

### Android
- [ ] Test on Chrome (Android)
- [ ] Test camera access
- [ ] Test face detection
- [ ] Test responsive design

---

## 📚 Documentation

### User Documentation
- [ ] Create user guide for authentication process
- [ ] Document fallback procedures
- [ ] Create FAQ for common issues
- [ ] Document privacy policy updates

### Developer Documentation
- [ ] Update API documentation
- [ ] Document deployment process
- [ ] Create troubleshooting guide
- [ ] Document monitoring procedures

---

## 🔄 Rollback Plan

### Preparation
- [ ] Document current production state
- [ ] Create database backup
- [ ] Tag current production version in Git
- [ ] Document rollback procedure

### Rollback Steps (if needed)
1. [ ] Stop new deployment
2. [ ] Checkout previous stable branch
3. [ ] Restore previous `.env` files
4. [ ] Restart services
5. [ ] Verify functionality
6. [ ] Restore database if needed

---

## 📞 Support & Monitoring

### Monitoring Setup
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error alerts
- [ ] Set up performance monitoring
- [ ] Monitor authentication success rates
- [ ] Track API usage and quotas

### Support Preparation
- [ ] Document common issues and solutions
- [ ] Create support ticket system
- [ ] Train support team on new feature
- [ ] Prepare user communication

---

## ✅ Final Checklist

- [ ] All API keys configured
- [ ] All tests passing
- [ ] HTTPS enabled
- [ ] Rate limiting active
- [ ] Monitoring configured
- [ ] Documentation complete
- [ ] Team trained
- [ ] Rollback plan ready
- [ ] User communication sent
- [ ] Production deployment successful

---

## 🎉 Go-Live Approval

**Approved by**: ___________________  
**Date**: ___________________  
**Signature**: ___________________

---

## 📝 Notes

Use this section to document any deployment-specific notes, issues encountered, or deviations from the standard process.

---

**Branch**: feature/secure-auth-in  
**Version**: 1.0.0  
**Last Updated**: 2024
