const express = require('express')
const Lead = require('../models/Lead')

const router = express.Router()

router.post('/submit', async (req, res) => {
  try {
    const { name, email, answers } = req.body

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

router.get('/leads', async (req, res) => {
  try {
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

module.exports = router
