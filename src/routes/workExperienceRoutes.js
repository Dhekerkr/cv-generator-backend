const express = require('express');
const router = express.Router();
const {
  createWorkExperience,
  getWorkExperiences,
  updateWorkExperience,
  deleteWorkExperience
}=require('../controllers/workExperienceController.js');

router.post('/create', createWorkExperience);

router.get('/:userId', getWorkExperiences);

router.put('/:id', updateWorkExperience);

router.delete('/:id', deleteWorkExperience);

module.exports = router;
