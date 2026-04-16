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
    const { sessionId, questionIndex, answer } = req.body
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session ID is required' })
    }

    const updateData = { lastQuestionReached: questionIndex };
    
    if (answer !== undefined) {
      updateData.$set = { [`answers.${questionIndex}`]: answer };
      updateData.$push = { history: { step: questionIndex, answer, timestamp: new Date() } };
      
      // If this is the first question (index 0 - Goal), track the path
      if (questionIndex === 0) {
          const goal = answer === 'Skincare & anti-aging' ? 'Skincare' : 'Longevity';
          updateData.goalPath = goal;
      }
    }

    await QuizAttempt.findOneAndUpdate(
      { sessionId },
      updateData,
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
    const { 
      name, email, answers, sessionId, assignedVariant,
      source, utm_source, utm_medium, utm_campaign, utm_content, utm_term 
    } = req.body

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' })
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required' })
    }
    if (answers == null || typeof answers !== 'object' || Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Answers are required' })
    }

    const trimmedEmail = email.trim().toLowerCase()
    const isTestLead = trimmedEmail.includes('test') || 
                       trimmedEmail.includes('example') || 
                       name.toLowerCase().includes('test')

    const goal = answers['goal'] || 'Unknown'
    const goalPath = goal.toLowerCase().includes('skin') ? 'Skincare' : 'Longevity'

    // Capture the lead in our DB
    await Lead.create({
      name: name.trim(),
      email: trimmedEmail,
      answers,
      assignedVariant,
      goalPath,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      isTestLead
    })

    // --- Klaviyo Server-Side Sync ---
    const axios = require('axios')
    const KLAVIYO_KEY = process.env.KLAVIYO_PRIVATE_KEY
    if (KLAVIYO_KEY) {
      try {
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
    }
    // ----------------------------------------

    // If a session ID was provided, mark it as completed
    if (sessionId) {
      await QuizAttempt.findOneAndUpdate(
        { sessionId },
        { isCompleted: true, goalPath }
      ).catch(err => console.error('Error marking session complete:', err))
    }

    return res.json({ success: true })
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message })
    }
    console.error(err)
    return res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.get('/analytics', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader !== 'secure_admin_session_token') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const { goal } = req.query; // Optional filter: 'Skincare' or 'Longevity'
    let query = {};
    if (goal) query.goalPath = goal;

    const attempts = await QuizAttempt.find(query).sort({ updatedAt: -1 });
    const leads = await Lead.find(query).sort({ createdAt: -1 });

    // Aggregate drop-off data
    const counts = {};
    const questionStats = {};
    
    attempts.forEach(a => {
      const idx = a.lastQuestionReached || 0;
      counts[idx] = (counts[idx] || 0) + 1;
      
      if (a.answers && a.answers instanceof Map) {
         a.answers.forEach((val, key) => {
           if (!questionStats[key]) questionStats[key] = {};
           questionStats[key][val] = (questionStats[key][val] || 0) + 1;
         });
      }
    });

    const totalAttempts = attempts.length;
    const completions = attempts.filter(a => a.isCompleted).length;
    const totalConversions = leads.filter(l => l.isConverted).length;

    // Destination Split Analysis
    const destSplit = {
        checkout: leads.filter(l => l.isConverted && l.conversionDestination === 'checkout').length,
        product: leads.filter(l => l.isConverted && l.conversionDestination === 'product').length
    };

    // Calculate abandonment rate per step
    const abandonmentRate = {};
    const totalParticipants = attempts.length || 1;
    let accumulated = 0;
    Object.keys(counts).sort((a,b) => a-b).forEach(idx => {
       const dropoffsAtThisStep = counts[idx];
       abandonmentRate[idx] = ((dropoffsAtThisStep / totalParticipants) * 100).toFixed(1);
    });

    // Latest activity feed
    const activityFeed = attempts.slice(0, 10).map(a => ({
      sessionId: a.sessionId,
      lastStep: a.lastQuestionReached,
      isCompleted: a.isCompleted,
      updatedAt: a.updatedAt,
      conversionDestination: a.conversionDestination
    }));

    res.json({
      success: true,
      data: {
        totalAttempts,
        completions,
        totalLeads: leads.length,
        totalConversions,
        dropOffMap: counts,
        abandonmentRate,
        destSplit,
        questionStats,
        activityFeed
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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Lead.countDocuments(query)
    ]);

    res.json({ 
      success: true, 
      leads,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        hasMore: page * limit < total
      }
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Mark a lead as converted with destination tracking
router.put('/mark-converted', async (req, res) => {
  try {
    const { email, destination, sessionId } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const convertedAt = new Date();

    await Lead.findOneAndUpdate(
      { email },
      { isConverted: true, conversionDestination: destination, convertedAt },
      { new: true }
    );

    if (sessionId) {
      await QuizAttempt.findOneAndUpdate(
        { sessionId },
        { isConverted: true, conversionDestination: destination, convertedAt }
      ).catch(err => console.error('Error marking attempt converted:', err));
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Failed to mark converted:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router
