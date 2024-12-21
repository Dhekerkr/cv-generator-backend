const SoftSkill = require('../models/SoftSkill');

// Create a new Soft Skill
exports.createSoftSkill = async (req, res) => {
  try {
    const newSoftSkill = new SoftSkill(req.body);
    await newSoftSkill.save();
    res.status(201).json(newSoftSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Soft Skills by userId
exports.getSoftSkills = async (req, res) => {
  try {
    const softSkills = await SoftSkill.find({ userId: req.params.userId });
    res.json(softSkills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Soft Skill by ID
exports.updateSoftSkill = async (req, res) => {
  try {
    const updatedSoftSkill = await SoftSkill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSoftSkill) return res.status(404).json({ message: 'Soft Skill not found' });
    res.json(updatedSoftSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Soft Skill by ID
exports.deleteSoftSkill = async (req, res) => {
  try {
    const deletedSoftSkill = await SoftSkill.findByIdAndDelete(req.params.id);
    if (!deletedSoftSkill) return res.status(404).json({ message: 'Soft Skill not found' });
    res.json({ message: 'Soft Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
