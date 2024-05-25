// routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Fedback');

// Route to fetch all feedback entries
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// Route to submit feedback
router.post('/add', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

module.exports = router;
