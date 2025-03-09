const mongoose = require('mongoose');

const hardSkillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true,
  },
  skill: {
    type: String,
    required : true,
  },
  proficiency: {
    type: String,  // Example: Beginner, Intermediate, Advanced
    required : true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const HardSkill = mongoose.model('HardSkill', hardSkillSchema);
module.exports = HardSkill;
