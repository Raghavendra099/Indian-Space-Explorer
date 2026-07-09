const Mission = require('../models/Mission');
const Photo = require('../models/Photo');
const Video = require('../models/Video');
const data = require('../data/missions.json');

// Remove any provided `_id` fields so MongoDB can assign ObjectIds
const stripId = (arr) => (arr || []).map(item => {
  const { _id, id, ...rest } = item || {};
  return rest;
});

exports.seedDatabase = async (req, res) => {
  try {
    await Mission.deleteMany({});
    await Photo.deleteMany({});
    await Video.deleteMany({});

    const missions = stripId(data.missions);
    const photos = stripId(data.photos);
    const videos = stripId(data.videos);

    await Mission.insertMany(missions);
    await Photo.insertMany(photos);
    await Video.insertMany(videos);

    res.status(200).json({ success: true, message: 'Database seeded with mission, photo, and video data.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to seed database.' });
  }
};
