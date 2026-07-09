const Photo = require('../models/Photo');

exports.getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: photos.length, data: photos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch photos.' });
  }
};

exports.createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);
    res.status(201).json({ success: true, data: photo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message || 'Failed to create photo.' });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Photo not found.' });
    }
    res.status(200).json({ success: true, data: photo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message || 'Failed to update photo.' });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Photo not found.' });
    }
    res.status(200).json({ success: true, message: 'Photo deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete photo.' });
  }
};
