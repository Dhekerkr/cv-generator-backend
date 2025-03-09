const Education = require('../models/educationModel.js');

// Create a new Education
exports.createEducation = async (req, res) => {
  try {
    if(!Array.isArray(req.body)){
      return res.status(400).json({error:"Expected an array of educations"});
    }
    const educationData=req.body[0];
    const newEducation = new Education(educationData);    
    await newEducation.save();
    const educations = [newEducation];
    if (req.body.length >1){
      for(let i =1; i<req.body.length; i++){
        const education = new Education(req.body[i]);
        await education.save();
        educations.push(education);
      }
    }
    res.status(201).json(educations);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get Education by userId
exports.getEducation = async (req, res) => {
  try {
    const education = await Education.find({ userId: req.params.userId });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Education by ID
exports.updateEducation = async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEducation) return res.status(404).json({ message: 'Education not found' });
    res.json(updatedEducation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Education by ID
exports.deleteEducation = async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) return res.status(404).json({ message: 'Education not found' });
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
