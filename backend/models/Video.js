const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  thumbnail: { type: String, required: true, trim: true },
  duration: { type: String, trim: true },
  views: { type: String, trim: true },
  youtubeId: { type: String, required: true, trim: true },
  category: { type: String, default: '', trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
