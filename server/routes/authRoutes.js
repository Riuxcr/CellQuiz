const express = require('express');
const router = express.Router();

// Simple Admin Auth (In production, use process.env.ADMIN_PASSWORD)
const ADMIN_PASSWORD = 'cellstart_admin_2026'; 

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    // In a real app, send a JWT. For now, we use a simple token.
    res.json({ token: 'secure_admin_session_token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
