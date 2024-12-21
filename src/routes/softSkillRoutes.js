const express = require('express');
const router = express.Router();
const {
  createSoftSkill,
  getSoftSkills,
  updateSoftSkill,
  deleteSoftSkill
}=require('../controllers/softSkillController');

router.post('/create', createSoftSkill);

router.get('/:userId', getSoftSkills);

router.put('/:id', updateSoftSkill);

router.delete('/:id', deleteSoftSkill);

module.exports = router;
