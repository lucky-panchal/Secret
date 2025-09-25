// NEW - Learning Service Routes
const express = require('express');
const router = express.Router();

router.get('/progress/:userId', (req, res) => {
  res.json({ message: `Get learning progress for user ${req.params.userId}` });
});

router.post('/progress', (req, res) => {
  res.json({ message: 'Update learning progress', data: req.body });
});

module.exports = router;