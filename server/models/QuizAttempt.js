const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  lastQuestionReached: {
    type: Number,
    default: 0
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  conversionDestination: {
    type: String, // 'product' or 'checkout'
    default: null
  },
  convertedAt: {
    type: Date
  },
  goalPath: {
    type: String, // 'Skincare' or 'Longevity'
    default: null
  },
  sequenceNumber: {
    type: Number
  },
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  history: [
    {
      step: Number,
      answer: mongoose.Schema.Types.Mixed,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
