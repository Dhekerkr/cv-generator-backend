const HardSkill = require('../models/hardSkillModel.js');

// Create a new Hard Skill
exports.createHardSkill = async (req, res) => {
  try {
    const newHardSkill = new HardSkill(req.body);
    await newHardSkill.save();
    res.status(201).json(newHardSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Hard Skills by userId
exports.getHardSkills = async (req, res) => {
  try {
    const hardSkills = await HardSkill.find({ userId: req.params.userId });
    res.json(hardSkills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Hard Skill by ID
exports.updateHardSkill = async (req, res) => {
  try {
    const updatedHardSkill = await HardSkill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHardSkill) return res.status(404).json({ message: 'Hard Skill not found' });
    res.json(updatedHardSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Hard Skill by ID
exports.deleteHardSkill = async (req, res) => {
  try {
    const deletedHardSkill = await HardSkill.findByIdAndDelete(req.params.id);
    if (!deletedHardSkill) return res.status(404).json({ message: 'Hard Skill not found' });
    res.json({ message: 'Hard Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
