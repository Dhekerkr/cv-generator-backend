const express = require('express');
const router = express.Router();
const {
    createCertification,
    getCertifications,
    updateCertification,
    deleteCertification
}=require('../controllers/certificatitonController');

router.post('/create', createCertification);

router.get('/:userId', getCertifications);

router.put('/:id', updateCertification);

router.delete('/:id', deleteCertification);

module.exports=router;