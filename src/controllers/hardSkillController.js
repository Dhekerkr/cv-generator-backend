const HardSkill = require('../models/hardSkillModel.js');

// Create a new Hard Skill
exports.createHardSkill = async (req, res) => {
  try {
    if (!Array.isArray(req.body)){
      return res.status(400).json({error:"Expected an array of hard skills !"});
    }
    const hardskillData=req.body[0];
    const newHardSkill = new HardSkill(hardskillData);
    await newHardSkill.save();
    const hardskills = [newHardSkill];
    if(req.body.length>1){
      for(let i=1; i<req.body.length; i++){
        const hardskill = new HardSkill(req.body[i]);
        await hardskill.save;
        hardskills.push(hardskill);
      }
    }
    res.status(201).json(hardskills);
  } catch (error) {
    console.error("Detailed error:", error);
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
