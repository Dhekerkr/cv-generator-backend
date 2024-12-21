const PersonalInfo = require('../models/PersonalInfo');

// Create new Personal Info
exports.createPersonalInfo = async (req, res) => {
  try {
    const newPersonalInfo = new PersonalInfo(req.body);
    await newPersonalInfo.save();
    res.status(201).json(newPersonalInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Personal Info by userId
exports.getPersonalInfo = async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.find({ userId: req.params.userId });
    res.json(personalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Personal Info by ID
exports.updatePersonalInfo = async (req, res) => {
  try {
    const updatedPersonalInfo = await PersonalInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPersonalInfo) return res.status(404).json({ message: 'Personal Info not found' });
    res.json(updatedPersonalInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Personal Info by ID
exports.deletePersonalInfo = async (req, res) => {
  try {
    const deletedPersonalInfo = await PersonalInfo.findByIdAndDelete(req.params.id);
    if (!deletedPersonalInfo) return res.status(404).json({ message: 'Personal Info not found' });
    res.json({ message: 'Personal Info deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
