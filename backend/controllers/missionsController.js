const Mission = require('../models/Mission');

exports.getMissions = async (req, res) => {
  try {
    const missions = await Mission.find().sort({ year: -1 });
    res.status(200).json({ success: true, count: missions.length, data: missions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch missions.' });
  }
};

exports.createMission = async (req, res) => {
  try {
    const mission = await Mission.create(req.body);
    res.status(201).json({ success: true, data: mission });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message || 'Failed to create mission.' });
  }
};

exports.updateMission = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!mission) {
      return res.status(404).json({ success: false, message: 'Mission not found.' });
    }
    res.status(200).json({ success: true, data: mission });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message || 'Failed to update mission.' });
  }
};

exports.deleteMission = async (req, res) => {
  try {
    const mission = await Mission.findByIdAndDelete(req.params.id);
    if (!mission) {
      return res.status(404).json({ success: false, message: 'Mission not found.' });
    }
    res.status(200).json({ success: true, message: 'Mission deleted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete mission.' });
  }
};
