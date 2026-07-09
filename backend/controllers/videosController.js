const Video = require('../models/Video');

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: videos.length, data: videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch videos.' });
  }
};

exports.createVideo = async (req, res) => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json({ success: true, data: video });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message || 'Failed to create video.' });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found.' });
    }
    res.status(200).json({ success: true, data: video });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message || 'Failed to update video.' });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found.' });
    }
    res.status(200).json({ success: true, message: 'Video deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete video.' });
  }
};
