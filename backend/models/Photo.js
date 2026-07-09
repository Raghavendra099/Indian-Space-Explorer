const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  imageUrl: { type: String, required: true, trim: true },
  category: { type: String, default: '', trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);
