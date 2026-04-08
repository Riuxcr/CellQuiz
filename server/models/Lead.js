const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  answers: { type: mongoose.Schema.Types.Mixed, required: true },
  isConverted: { type: Boolean, default: false },
  assignedVariant: { type: String },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Lead', leadSchema)
