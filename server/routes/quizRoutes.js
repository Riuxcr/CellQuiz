const express = require('express')
const Lead = require('../models/Lead')
const QuizAttempt = require('../models/QuizAttempt')

const router = express.Router()

// Start a new quiz session for drop-off tracking
router.post('/start-session', async (req, res) => {
  try {
    const { sessionId } = req.body
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session ID is required' })
    }

    const attempt = await QuizAttempt.create({
      sessionId,
      lastQuestionReached: 0,
      isCompleted: false
    })

    res.json({ success: true, attempt })
  } catch (err) {
    console.error('Failed to start quiz session:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Track real-time progress for each question
router.put('/track', async (req, res) => {
  try {
    const { sessionId, questionIndex } = req.body
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session ID is required' })
    }

    await QuizAttempt.findOneAndUpdate(
      { sessionId },
      { lastQuestionReached: questionIndex },
      { new: true, upsert: true }
    )

    res.json({ success: true })
  } catch (err) {
    console.error('Failed to track progress:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.post('/submit', async (req, res) => {
  try {
    const { name, email, answers, sessionId } = req.body

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      })
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      })
    }

    if (
      answers == null ||
      typeof answers !== 'object' ||
      Array.isArray(answers)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Answers are required',
      })
    }

    await Lead.create({
      name: name.trim(),
      email: email.trim(),
      answers,
    })

    // If a session ID was provided, mark it as completed
    if (sessionId) {
      await QuizAttempt.findOneAndUpdate(
        { sessionId },
        { isCompleted: true }
      ).catch(err => console.error('Error marking session complete:', err))
    }

    // Client only checks success; skip extra payload for a slightly faster response.
    return res.json({ success: true })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: err.message,
      })
    }
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
})

router.get('/analytics', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== 'secure_admin_session_token') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const attempts = await QuizAttempt.find();
    
    // Aggregate drop-off data: how many users reached each question index
    const counts = {};
    attempts.forEach(a => {
      const idx = a.lastQuestionReached || 0;
      counts[idx] = (counts[idx] || 0) + 1;
    });

    const totalAttempts = attempts.length;
    const completions = attempts.filter(a => a.isCompleted).length;

    res.json({
      success: true,
      data: {
        totalAttempts,
        completions,
        dropOffMap: counts
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/leads', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== 'secure_admin_session_token') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const leads = await Lead.find().sort({ createdAt: -1 })
    res.json({
      success: true,
      leads,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
})

// Mark a lead as converted when they click purchase buttons
router.put('/mark-converted', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    await Lead.findOneAndUpdate(
      { email },
      { isConverted: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error('Failed to mark converted:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router
