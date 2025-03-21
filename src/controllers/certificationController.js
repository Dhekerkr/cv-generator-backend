const Certification = require('../models/certificationModel.js');

// Create a new Certification
exports.createCertification = async (req, res) => {
  try {
    // Convert userId to ObjectId
    if(!Array.isArray(req.body)){
      return res.status(400).json({error:"Expected an array of certifications"})
    }
    const certificationData= req.body[0];
    const newCertification = new Certification(certificationData);
    await newCertification.save();
    const certifications=[newCertification];

    if (req.body.length > 1){
      for (let i=1; i<req.body.length; i++){
        const certification =  new Certification(req.body[i]);
        await certification.save();
        certifications.push(certification);
      }
    }
    res.status(201).json(certifications);

  } catch (error){
      console.error("Detailed error:", error);
      res.status(400).json({error:error.message});
  }
};


// Get Certifications by userId
exports.getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find({ userId: req.params.userId });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Certification by ID
exports.updateCertification = async (req, res) => {
  try {
    const updatedCertification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCertification) return res.status(404).json({ message: 'Certification not found' });
    res.json(updatedCertification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Certification by ID
exports.deleteCertification = async (req, res) => {
  try {
    const deletedCertification = await Certification.findByIdAndDelete(req.params.id);
    if (!deletedCertification) return res.status(404).json({ message: 'Certification not found' });
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
