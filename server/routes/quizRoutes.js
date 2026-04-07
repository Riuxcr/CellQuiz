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

    const totalCount = await QuizAttempt.countDocuments()
    const sequenceNumber = totalCount + 1

    const attempt = await QuizAttempt.create({
      sessionId,
      lastQuestionReached: 0,
      isCompleted: false,
      sequenceNumber
    })

    res.json({ success: true, attempt, sequenceNumber })
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

    // Capture the lead in our DB
    await Lead.create({
      name: name.trim(),
      email: email.trim(),
      answers,
    })

    // --- Step 3: Klaviyo Server-Side Sync ---
    const axios = require('axios')
    const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_KEY
    if (KLAVIYO_KEY) {
      try {
        const goal = answers['goal'] || 'Unknown'
        
        // Match frontend segment logic for consistency
        let segment = 'unknown'
        if (goal === 'Skincare & anti-aging') {
          const hasRoutine = answers['routine'] === 'Yes'
          segment = hasRoutine ? 'skincare_with_routine' : 'skincare_no_routine'
        } else if (goal === 'Longevity & cellular repair') {
          const isActive = ['Highly Active', 'Moderately Active'].includes(answers['active'])
          segment = isActive ? 'longevity_active' : 'longevity_sedentary'
        }
        
        await axios.post('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
          data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
              profiles: {
                data: [
                  {
                    type: 'profile',
                    attributes: {
                      email: email.trim(),
                      first_name: name.trim(),
                      properties: {
                        'Quiz Goal': goal,
                        'Quiz Segment': segment,
                        ...answers
                      }
                    }
                  }
                ]
              }
            }
          }
        }, {
          headers: {
            'Authorization': `Klaviyo-API-Key ${KLAVIYO_KEY}`,
            'accept': 'application/vnd.api+json',
            'revision': '2024-02-15',
            'content-type': 'application/vnd.api+json'
          }
        }).catch(err => {
          console.error('Klaviyo Sync Error (non-blocking):', err.response?.data || err.message)
        })
      } catch (err) {
        console.error('Klaviyo Prep Error:', err)
      }
    } else {
      console.warn('KLAVIYO_PRIVATE_KEY not set in environment.')
    }
    // ----------------------------------------

    // If a session ID was provided, mark it as completed
    if (sessionId) {
      await QuizAttempt.findOneAndUpdate(
        { sessionId },
        { isCompleted: true }
      ).catch(err => console.error('Error marking session complete:', err))
    }

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
    
    // Count conversions and total leads from Lead model
    const totalLeads = await Lead.countDocuments();
    const totalConversions = await Lead.countDocuments({ isConverted: true });

    res.json({
      success: true,
      data: {
        totalAttempts,
        completions,
        totalLeads,
        totalConversions,
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
