const express = require('express');
const router = express.Router();
const { secureAuthMiddleware } = require('../middleware/secureAuth');
const AuthLog = require('../models/AuthLog');
const User = require('../models/User');
const { generateToken, authenticateToken } = require('../middleware/auth');

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

// POST /api/auth/signup - Register new user
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user,
        token
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages[0]
      });
    }

    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
});

// POST /api/auth/signin - Login user
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = user.toJSON();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user information'
    });
  }
});

// POST /api/auth/logout - Logout user (optional - mainly for token blacklisting)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a production app, you might want to blacklist the token
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

module.exports = router;
