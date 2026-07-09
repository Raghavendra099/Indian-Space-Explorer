/**
 * API Routes — Indian Space Explorer
 * RESTful endpoints for missions, photos, videos, stats, contact, and auth
 */

const express = require('express');
const router = express.Router();
const missionsController = require('../controllers/missionsController');
const photosController = require('../controllers/photosController');
const videosController = require('../controllers/videosController');
const statsController = require('../controllers/statsController');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');
const seedController = require('../controllers/seedController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// ─── Missions ───────────────────────────────────────────────────────────────
router.get('/missions', missionsController.getMissions);
router.post('/missions', requireAuth, requireAdmin, missionsController.createMission);
router.put('/missions/:id', requireAuth, requireAdmin, missionsController.updateMission);
router.delete('/missions/:id', requireAuth, requireAdmin, missionsController.deleteMission);

// ─── Photos ─────────────────────────────────────────────────────────────────
router.get('/photos', photosController.getPhotos);
router.post('/photos', requireAuth, requireAdmin, photosController.createPhoto);
router.put('/photos/:id', requireAuth, requireAdmin, photosController.updatePhoto);
router.delete('/photos/:id', requireAuth, requireAdmin, photosController.deletePhoto);

// ─── Videos ─────────────────────────────────────────────────────────────────
router.get('/videos', videosController.getVideos);
router.post('/videos', requireAuth, requireAdmin, videosController.createVideo);
router.put('/videos/:id', requireAuth, requireAdmin, videosController.updateVideo);
router.delete('/videos/:id', requireAuth, requireAdmin, videosController.deleteVideo);

// ─── Stats ──────────────────────────────────────────────────────────────────
router.get('/stats', statsController.getStats);

// ─── Contact ───────────────────────────────────────────────────────────────
router.post('/contact', contactController.submitContact);

// ─── Auth ───────────────────────────────────────────────────────────────────
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);

// ─── Seed helper (development only) ─────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  router.post('/seed', requireAuth, requireAdmin, seedController.seedDatabase);
}

module.exports = router;
