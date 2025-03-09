const WorkExperience = require('../models/workExperienceModel.js');

// Create a new Work Experience
exports.createWorkExperience = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: "Expected an array of work experiences " });
    }
    const workexperienceData = req.body[0];
    const newWorkExperience = new WorkExperience(workexperienceData);
    await newWorkExperience.save();
    const workexperiences= [newWorkExperience];
    if (req.body.length > 1) {
      for (let i = 1; i < req.body.length; i++) {
        const Workexperience = new WorkExperience(req.body[i]);
        await workexperience.save();
        workexperiences.push(workexperience);
      }
    }
    res.status(201).json(workexperiences);
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
