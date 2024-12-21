const express = require('express');
const router = express.Router();
const {
  createPersonalInfo,
  getPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo
}=require('../controllers/personalInfoController');

router.post('/create', createPersonalInfo);

router.get('/:userId', getPersonalInfo);

router.put('/:id', updatePersonalInfo);

router.delete('/:id', deletePersonalInfo);

module.exports = router;
