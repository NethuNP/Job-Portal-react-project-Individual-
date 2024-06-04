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


router.post('/reply/:id', async (req, res) => {
  const feedbackId = req.params.id;
  const { reply } = req.body;

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, { reply }, { new: true });
    if (!updatedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Reply submitted successfully', updatedFeedback });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit reply' });
  }
});


// Route to delete feedback by ID
router.delete('/delete/:id', async (req, res) => {
  const feedbackId = req.params.id;

  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!deletedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
});

module.exports = router;
