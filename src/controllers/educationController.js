const Education = require('../models/Education');

// Create a new Education
exports.createEducation = async (req, res) => {
  try {
    const newEducation = new Education(req.body);
    await newEducation.save();
    res.status(201).json(newEducation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Education by userId
exports.getEducation = async (req, res) => {
  try {
    const education = await Education.find({ userId: req.params.userId });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Education by ID
exports.updateEducation = async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEducation) return res.status(404).json({ message: 'Education not found' });
    res.json(updatedEducation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Education by ID
exports.deleteEducation = async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) return res.status(404).json({ message: 'Education not found' });
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
