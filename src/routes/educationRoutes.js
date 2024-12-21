const express = require('express');
const router = express.Router();
const {
  createEducation,
  getEducation,
  updateEducation,
  deleteEducation
}=require('../controllers/educationController');

router.post('/create', createEducation);

router.get('/:userId', getEducation);

router.put('/:id', updateEducation);

router.delete('/:id', deleteEducation);

module.exports=router;