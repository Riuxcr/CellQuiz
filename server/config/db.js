const mongoose = require('mongoose')

async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw new Error('MONGO_URI is not set in environment')
  }
  
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    })
    console.log('✅ MongoDB Connected')
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
