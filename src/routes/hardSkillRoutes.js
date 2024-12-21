const express = require('express');
const router = express.Router();
const {
  createHardSkill,
  getHardSkills,
  updateHardSkill,
  deleteHardSkill
} = require('../controllers/hardSkillController');

// Create Hard Skill
router.post('/create', createHardSkill);

// Get Hard Skills by userId
router.get('/:userId', getHardSkills);

// Update Hard Skill
router.put('/:id', updateHardSkill);

// Delete Hard Skill
router.delete('/:id', deleteHardSkill);

module.exports = router;
