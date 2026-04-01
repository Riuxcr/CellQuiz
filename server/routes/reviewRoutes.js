const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// @route   GET /api/reviews
// @desc    Get all reviews (sorted by newest)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/reviews
// @desc    Submit a new review
router.post('/', async (req, res) => {
  const { name, rating, title, body } = req.body;

  // Simple validation
  if (!name || !rating || !title || !body) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  try {
    const newReview = new Review({
      name,
      rating,
      title,
      body,
    });

    const review = await newReview.save();
    res.json(review);
  } catch (err) {
    console.error('Error submitting review:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
