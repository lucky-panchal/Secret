// NEW - User Service Routes
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Validation middleware
const validateUser = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Routes
router.post('/register', validateUser, (req, res) => {
  // TODO: Implement user registration
  res.json({ message: 'User registration endpoint', data: req.body });
});

router.post('/login', validateUser, (req, res) => {
  // TODO: Implement user login
  res.json({ message: 'User login endpoint' });
});

router.get('/profile', (req, res) => {
  // TODO: Implement get user profile
  res.json({ message: 'User profile endpoint' });
});

module.exports = router;