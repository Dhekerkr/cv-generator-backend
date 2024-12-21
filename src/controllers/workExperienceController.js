const WorkExperience = require('../models/workExperienceModel.js');

// Create a new Work Experience
exports.createWorkExperience = async (req, res) => {
  try {
    const newWorkExperience = new WorkExperience(req.body);
    await newWorkExperience.save();
    res.status(201).json(newWorkExperience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Work Experiences by userId
exports.getWorkExperiences = async (req, res) => {
  try {
    const workExperiences = await WorkExperience.find({ userId: req.params.userId });
    res.json(workExperiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Work Experience by ID
exports.updateWorkExperience = async (req, res) => {
  try {
    const updatedWorkExperience = await WorkExperience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorkExperience) return res.status(404).json({ message: 'Work Experience not found' });
    res.json(updatedWorkExperience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Work Experience by ID
exports.deleteWorkExperience = async (req, res) => {
  try {
    const deletedWorkExperience = await WorkExperience.findByIdAndDelete(req.params.id);
    if (!deletedWorkExperience) return res.status(404).json({ message: 'Work Experience not found' });
    res.json({ message: 'Work Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
