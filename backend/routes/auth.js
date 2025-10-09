const express = require('express');
const router = express.Router();
const { secureAuthMiddleware } = require('../middleware/secureAuth');
const AuthLog = require('../models/AuthLog');

/**
 * POST /api/auth/verify-secure
 * Main endpoint for secure authentication verification
 * Validates facial recognition, Aadhaar, and reCAPTCHA
 */
router.post('/verify-secure', secureAuthMiddleware, async (req, res) => {
  try {
    // If middleware passes, authentication is successful
    res.json({
      success: true,
      message: 'Secure authentication successful',
      data: {
        verified: true,
        recaptchaScore: req.secureAuth.recaptchaScore,
        faceConfidence: req.secureAuth.faceConfidence,
        timestamp: req.secureAuth.timestamp
      }
    });
  } catch (error) {
    console.error('❌ Secure auth verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
});

/**
 * GET /api/auth/logs/:userId
 * Retrieve authentication logs for a specific user
 * For security monitoring and audit purposes
 */
router.get('/logs/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10, skip = 0 } = req.query;

    const logs = await AuthLog.find({ userId })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .select('-__v');

    const total = await AuthLog.countDocuments({ userId });

    res.json({
      success: true,
      data: {
        logs,
        total,
        limit: parseInt(limit),
        skip: parseInt(skip)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching auth logs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch authentication logs',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
});

/**
 * GET /api/auth/stats/:userId
 * Get authentication statistics for a user
 */
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const stats = await AuthLog.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalAttempts: { $sum: 1 },
          successfulAttempts: {
            $sum: { $cond: ['$authenticationSuccess', 1, 0] }
          },
          failedAttempts: {
            $sum: { $cond: ['$authenticationSuccess', 0, 1] }
          },
          avgFaceConfidence: { $avg: '$faceConfidence' },
          avgRecaptchaScore: { $avg: '$recaptchaScore' }
        }
      }
    ]);

    res.json({
      success: true,
      data: stats[0] || {
        totalAttempts: 0,
        successfulAttempts: 0,
        failedAttempts: 0,
        avgFaceConfidence: 0,
        avgRecaptchaScore: 0
      }
    });
  } catch (error) {
    console.error('❌ Error fetching auth stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch authentication statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
});

/**
 * POST /api/auth/fallback-verification
 * Fallback endpoint when facial recognition fails
 * Allows manual verification with additional security checks
 */
router.post('/fallback-verification', async (req, res) => {
  try {
    const { userId, email, reason, alternateMethod } = req.body;

    // Log fallback attempt
    const authLog = new AuthLog({
      userId,
      email,
      faceVerified: false,
      faceVerificationMethod: 'manual-fallback',
      authenticationSuccess: false,
      failureReason: `Fallback verification: ${reason}`,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      timestamp: new Date()
    });

    await authLog.save();

    res.json({
      success: true,
      message: 'Fallback verification initiated',
      data: {
        alternateMethod: alternateMethod || 'otp',
        instructions: 'Please complete alternate verification method'
      }
    });
  } catch (error) {
    console.error('❌ Fallback verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Fallback verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
});

module.exports = router;
