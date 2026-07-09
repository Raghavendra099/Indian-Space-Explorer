const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  icon: { type: String, default: '🛰️' },
  description: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
  statusColor: { type: String, default: 'success', trim: true },
  link: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Mission', missionSchema);
