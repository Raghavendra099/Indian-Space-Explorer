const Mission = require('../models/Mission');
const Photo = require('../models/Photo');
const Video = require('../models/Video');

exports.getStats = async (req, res) => {
  try {
    const missionCount = await Mission.countDocuments();
    const photoCount = await Photo.countDocuments();
    const videoCount = await Video.countDocuments();

    const stats = {
      missions: missionCount,
      satellites: 431,
      countries: 34,
      yearsActive: 58,
      photos: photoCount,
      videos: videoCount,
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch stats.' });
  }
};
