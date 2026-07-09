/**
 * API Routes — Indian Space Explorer
 * RESTful endpoints for missions, photos, videos, stats, and contact
 */

const express = require('express');
const router = express.Router();
const data = require('../data/missions.json');

// ─── GET /api/missions ────────────────────────────────────────────────────────
router.get('/missions', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: data.missions.length,
      data: data.missions,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch missions.' });
  }
});

// ─── GET /api/photos ──────────────────────────────────────────────────────────
router.get('/photos', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: data.photos.length,
      data: data.photos,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch photos.' });
  }
});

// ─── GET /api/videos ──────────────────────────────────────────────────────────
router.get('/videos', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: data.videos.length,
      data: data.videos,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch videos.' });
  }
});

// ─── GET /api/stats ───────────────────────────────────────────────────────────
router.get('/stats', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: data.stats,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats.' });
  }
});

// ─── POST /api/contact ────────────────────────────────────────────────────────
router.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address.',
    });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Message must be at least 10 characters.',
    });
  }

  // In production, you'd send an email here (e.g., via Nodemailer)
  console.log(`📧 Contact form submission from ${name} <${email}>: ${subject}`);

  res.status(200).json({
    success: true,
    message: `Thank you, ${name}! Your message has been received. We'll get back to you shortly.`,
  });
});

module.exports = router;
