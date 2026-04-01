const mongoose = require('mongoose');
const Review = require('./models/Review');
require('dotenv').config();

const initialReviews = [
  {
    rating: 5,
    date: new Date("2026-01-19"),
    name: "Stan",
    title: "Solid budget NAD+ experiment in a bottle",
    body: "Picked this up as a cheap way to play with a basic NAD+ + resveratrol combo. On the label you get 500 mg of NAD+ and 100 mg resveratrol per serving, which is a decent starting point for a “cellular support” stack at this price. Capsules look clean, simple excipients, and a month’s supply under twenty bucks is hard to complain about."
  },
  {
    rating: 5,
    date: new Date("2026-01-16"),
    name: "Audrey",
    title: "Affordable, Well-Tolerated NAD Supplement — Great Quality for the Price",
    body: "I really appreciate the affordability and quality of this supplement compared to many others I’ve tried. I use NAD primarily for inflammation and focus, and I like that the added knotweed provides an extra layer of support. The formulation feels thoughtfully put together and effective without being harsh."
  },
  {
    rating: 5,
    date: new Date("2026-01-11"),
    name: "C.J",
    title: "Product seems consistent, no issues noted",
    body: "Product shipped quickly and arrived intact. This product's ingredients are aimed towards providing antioxidant benefits. Antioxidants provide a buffer against free radicals. Free radicals are sort of mitochondrial 'misfires' while cellular respiration, or energy production, is occurring throughout the entire body."
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');
    
    // Clear existing reviews to avoid duplicates during testing
    await Review.deleteMany({});
    
    await Review.insertMany(initialReviews);
    console.log('Database seeded with initial reviews!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
