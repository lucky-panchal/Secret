const axios = require('axios');
const AuthLog = require('../models/AuthLog');

/**
 * Secure Authentication Middleware for Indian Users
 * Implements facial recognition, Aadhaar verification, and reCAPTCHA
 * This middleware sits between login and assessment/dashboard access
 */

/**
 * Verify Google reCAPTCHA v2/v3 token
 * @param {string} token - reCAPTCHA token from frontend
 * @returns {Promise<Object>} - Verification result with score
 */
async function verifyRecaptcha(token) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.warn('⚠️ RECAPTCHA_SECRET_KEY not configured');
      return { success: false, score: 0, error: 'reCAPTCHA not configured' };
    }

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: secretKey,
          response: token
        }
      }
    );

    return {
      success: response.data.success,
      score: response.data.score || 1.0, // v2 doesn't have score, default to 1.0
      action: response.data.action,
      challengeTimestamp: response.data.challenge_ts
    };
  } catch (error) {
    console.error('❌ reCAPTCHA verification error:', error.message);
    return { success: false, score: 0, error: error.message };
  }
}

/**
 * Verify Aadhaar using UIDAI e-KYC API (Sandbox)
 * @param {Object} aadhaarData - Aadhaar verification data
 * @returns {Promise<Object>} - Verification result
 */
async function verifyAadhaar(aadhaarData) {
  try {
    const aadhaarNumber = aadhaarData.aadhaarNumber;
    
    // Validate Aadhaar format (12 digits)
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return { success: false, error: 'Invalid Aadhaar format' };
    }

    // HACKATHON MODE: Instant verification without API
    const hackathonMode = process.env.AADHAAR_HACKATHON_MODE === 'true';
    
    if (hackathonMode) {
      // Instant verification for hackathon demo
      return {
        success: true,
        verified: true,
        lastFourDigits: aadhaarNumber.slice(-4),
        name: aadhaarData.name || 'Demo User',
        message: 'Aadhaar verified successfully (Hackathon Demo Mode)'
      };
    }

    // Production mode with actual API (when API key is available)
    const apiKey = process.env.AADHAAR_API_KEY;
    if (!apiKey || apiKey === 'hackathon_demo_key') {
      return { success: false, error: 'Aadhaar API not configured for production' };
    }

    // Actual API call for production
    const sandboxUrl = process.env.AADHAAR_SANDBOX_URL;
    const response = await axios.post(sandboxUrl, {
      aadhaarNumber: aadhaarNumber,
      consent: aadhaarData.consent,
      timestamp: new Date().toISOString()
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      success: true,
      verified: true,
      lastFourDigits: aadhaarNumber.slice(-4),
      name: response.data.name || aadhaarData.name,
      message: 'Aadhaar verified successfully'
    };
  } catch (error) {
    console.error('❌ Aadhaar verification error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Verify facial recognition data
 * Compares captured face with Aadhaar photo or stored reference
 * @param {Object} faceData - Face recognition data from frontend
 * @returns {Promise<Object>} - Verification result with confidence score
 */
async function verifyFace(faceData) {
  try {
    const { descriptors, method, referenceDescriptors } = faceData;
    
    if (!descriptors || !referenceDescriptors) {
      return { 
        success: false, 
        confidence: 0, 
        error: 'Missing face descriptors' 
      };
    }

    // Calculate Euclidean distance between face descriptors
    // Lower distance = higher similarity
    const distance = calculateEuclideanDistance(descriptors, referenceDescriptors);
    
    // Convert distance to confidence score (0-1)
    // Threshold: distance < 0.6 is considered a match
    const threshold = parseFloat(process.env.FACE_MATCH_THRESHOLD) || 0.6;
    const confidence = Math.max(0, 1 - (distance / threshold));
    
    return {
      success: distance < threshold,
      confidence: confidence,
      distance: distance,
      method: method || 'face-api.js',
      message: distance < threshold ? 'Face verified successfully' : 'Face verification failed'
    };
  } catch (error) {
    console.error('❌ Face verification error:', error.message);
    return { success: false, confidence: 0, error: error.message };
  }
}

/**
 * Calculate Euclidean distance between two face descriptor arrays
 * @param {Array} desc1 - First descriptor array
 * @param {Array} desc2 - Second descriptor array
 * @returns {number} - Euclidean distance
 */
function calculateEuclideanDistance(desc1, desc2) {
  if (!Array.isArray(desc1) || !Array.isArray(desc2)) {
    return Infinity;
  }
  
  if (desc1.length !== desc2.length) {
    return Infinity;
  }
  
  let sum = 0;
  for (let i = 0; i < desc1.length; i++) {
    sum += Math.pow(desc1[i] - desc2[i], 2);
  }
  
  return Math.sqrt(sum);
}

/**
 * Main Secure Authentication Middleware
 * Validates facial recognition, Aadhaar, and reCAPTCHA
 */
async function secureAuthMiddleware(req, res, next) {
  try {
    const { 
      recaptchaToken, 
      faceData, 
      aadhaarData, 
      userId, 
      email 
    } = req.body;

    // Initialize verification results
    let recaptchaResult = { success: false, score: 0 };
    let faceResult = { success: false, confidence: 0 };
    let aadhaarResult = { success: false };

    // 1. Verify reCAPTCHA (Bot Prevention)
    if (recaptchaToken) {
      recaptchaResult = await verifyRecaptcha(recaptchaToken);
      
      // reCAPTCHA v3 score threshold (0.5 is recommended)
      const minScore = parseFloat(process.env.RECAPTCHA_MIN_SCORE) || 0.5;
      if (recaptchaResult.score < minScore) {
        recaptchaResult.success = false;
      }
    }

    // 2. Verify Facial Recognition
    if (faceData) {
      faceResult = await verifyFace(faceData);
    }

    // 3. Verify Aadhaar
    if (aadhaarData) {
      aadhaarResult = await verifyAadhaar(aadhaarData);
    }

    // Determine overall authentication success
    // All three verifications must pass
    const authSuccess = recaptchaResult.success && 
                       faceResult.success && 
                       aadhaarResult.success;

    // Log authentication attempt
    const authLog = new AuthLog({
      userId: userId || 'unknown',
      email: email || 'unknown',
      faceVerified: faceResult.success,
      faceConfidence: faceResult.confidence,
      faceVerificationMethod: faceResult.method || 'face-api.js',
      aadhaarVerified: aadhaarResult.success,
      aadhaarLastFourDigits: aadhaarResult.lastFourDigits,
      recaptchaVerified: recaptchaResult.success,
      recaptchaScore: recaptchaResult.score,
      authenticationSuccess: authSuccess,
      failureReason: !authSuccess ? determineFailureReason(recaptchaResult, faceResult, aadhaarResult) : null,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      timestamp: new Date()
    });

    // Save log asynchronously (don't block request)
    authLog.save().catch(err => console.error('Failed to save auth log:', err));

    // If authentication fails, return error
    if (!authSuccess) {
      return res.status(403).json({
        success: false,
        message: 'Authentication failed',
        details: {
          recaptcha: recaptchaResult.success,
          faceVerification: faceResult.success,
          aadhaarVerification: aadhaarResult.success
        },
        reason: determineFailureReason(recaptchaResult, faceResult, aadhaarResult)
      });
    }

    // Authentication successful - attach verification data to request
    req.secureAuth = {
      verified: true,
      recaptchaScore: recaptchaResult.score,
      faceConfidence: faceResult.confidence,
      aadhaarVerified: true,
      timestamp: new Date()
    };

    // Proceed to next middleware/route
    next();
  } catch (error) {
    console.error('❌ Secure auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication system error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
}

/**
 * Determine the specific reason for authentication failure
 */
function determineFailureReason(recaptchaResult, faceResult, aadhaarResult) {
  const reasons = [];
  
  if (!recaptchaResult.success) {
    reasons.push('reCAPTCHA verification failed - possible bot activity');
  }
  
  if (!faceResult.success) {
    reasons.push(`Face verification failed - confidence: ${(faceResult.confidence * 100).toFixed(1)}%`);
  }
  
  if (!aadhaarResult.success) {
    reasons.push('Aadhaar verification failed');
  }
  
  return reasons.join('; ');
}

/**
 * Optional: Middleware to check if user has completed secure auth
 * Use this on protected routes that require secure authentication
 */
function requireSecureAuth(req, res, next) {
  if (!req.secureAuth || !req.secureAuth.verified) {
    return res.status(401).json({
      success: false,
      message: 'Secure authentication required',
      redirectTo: '/secure-auth'
    });
  }
  next();
}

module.exports = {
  secureAuthMiddleware,
  requireSecureAuth,
  verifyRecaptcha,
  verifyAadhaar,
  verifyFace
};
