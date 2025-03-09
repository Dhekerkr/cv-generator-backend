const mongoose = require('mongoose');

const softSkillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true,
  },
  skill: {
    type: String,
    required : true,
  },
  level: {
    type: String,  // Example: Beginner, Intermediate, Advanced
    required : true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SoftSkill = mongoose.model('SoftSkill', softSkillSchema);
module.exports = SoftSkill;
