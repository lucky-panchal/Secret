const express = require('express');
const router = express.Router();
const aiWebSearcher = require('../services/aiWebSearcher');

// Trigger AI course discovery
router.post('/discover', async (req, res) => {
  try {
    const result = await aiWebSearcher.searchAndAnalyzeCourses();
    res.json({
      success: result.success,
      message: result.message,
      coursesFound: result.courses || 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'AI course discovery failed',
      error: error.message
    });
  }
});

// Get AI search status
router.get('/status', (req, res) => {
  res.json({
    success: true,
    isRunning: aiWebSearcher.isRunning,
    hasApiKeys: !!(process.env.JINA_API_KEY && process.env.OPENAI_API_KEY)
  });
});

module.exports = router;