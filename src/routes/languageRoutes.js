const express = require('express');
const router = express.Router();
const {
  createLanguage,
  getLanguages,
  updateLanguage,
  deleteLanguage
}=require('../controllers/languageController');

router.post=('/create', createLanguage);

router.get=('/:userId',getLanguages);

router.put=('/:id', updateLanguage);

router.delete=('/:id',deleteLanguage);

module.exports=router;
