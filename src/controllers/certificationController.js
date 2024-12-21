const Certification = require('../models/Certification');

// Create a new Certification
exports.createCertification = async (req, res) => {
  try {
    const newCertification = new Certification(req.body);
    await newCertification.save();
    res.status(201).json(newCertification);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
