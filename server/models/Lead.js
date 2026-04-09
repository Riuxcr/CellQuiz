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
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Lead', leadSchema)
