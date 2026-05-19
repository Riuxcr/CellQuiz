const mongoose = require('mongoose')

const promoAnalyticsSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  page: {
    type: String,
    enum: ['feel-young', 'harmony'],
    required: true
  },
  action: {
    type: String,
    required: true
  },
  element: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: 'Unknown'
  },
  ip: {
    type: String,
    default: ''
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('PromoAnalytics', promoAnalyticsSchema)
