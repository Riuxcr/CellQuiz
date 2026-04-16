const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  answers: { type: mongoose.Schema.Types.Mixed, required: true },
  isConverted: { type: Boolean, default: false },
  conversionDestination: { type: String, default: null }, // 'product' or 'checkout'
  convertedAt: { type: Date },
  assignedVariant: { type: String },
  goalPath: { type: String }, // 'Skincare' or 'Longevity'
  source: { type: String }, // e.g., 'meta', 'tiktok', 'direct'
  utm_source: { type: String },
  utm_medium: { type: String },
  utm_campaign: { type: String },
  utm_content: { type: String },
  utm_term: { type: String },
  isTestLead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Lead', leadSchema)
