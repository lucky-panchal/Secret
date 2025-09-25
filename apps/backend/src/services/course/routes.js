// NEW - Course Service Routes
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all courses', courses: [] });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get course ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create course', data: req.body });
});

module.exports = router;