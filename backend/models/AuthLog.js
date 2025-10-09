const mongoose = require('mongoose');

/**
 * AuthLog Model - Tracks all authentication attempts for security monitoring
 * Stores facial recognition, Aadhaar verification, and reCAPTCHA results
 */
const authLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true
  },
  // Facial Recognition Data
  faceVerified: {
    type: Boolean,
    default: false
  },
  faceConfidence: {
    type: Number,
    min: 0,
    max: 1
  },
  faceVerificationMethod: {
    type: String,
    enum: ['face-api.js', 'opencv.js', 'manual-fallback'],
    default: 'face-api.js'
  },
  // Aadhaar Verification Data
  aadhaarVerified: {
    type: Boolean,
    default: false
  },
  aadhaarLastFourDigits: {
    type: String,
    maxlength: 4
  },
  // reCAPTCHA Data
  recaptchaVerified: {
    type: Boolean,
    default: false
  },
  recaptchaScore: {
    type: Number,
    min: 0,
    max: 1
  },
  // Overall Authentication Status
  authenticationSuccess: {
    type: Boolean,
    required: true
  },
  failureReason: {
    type: String
  },
  // Security Metadata
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  location: {
    country: String,
    state: String,
    city: String
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
authLogSchema.index({ userId: 1, timestamp: -1 });
authLogSchema.index({ email: 1, timestamp: -1 });

module.exports = mongoose.model('AuthLog', authLogSchema);
