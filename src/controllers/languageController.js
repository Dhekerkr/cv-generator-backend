const Language = require('../models/languagesModel.js');

// Create a new Language
exports.createLanguage = async (req, res) => {
  try {
    const newLanguage = new Language(req.body);
    await newLanguage.save();
    res.status(201).json(newLanguage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Languages by userId
exports.getLanguages = async (req, res) => {
  try {
    const languages = await Language.find({ userId: req.params.userId });
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Language by ID
exports.updateLanguage = async (req, res) => {
  try {
    const updatedLanguage = await Language.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLanguage) return res.status(404).json({ message: 'Language not found' });
    res.json(updatedLanguage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Language by ID
exports.deleteLanguage = async (req, res) => {
  try {
    const deletedLanguage = await Language.findByIdAndDelete(req.params.id);
    if (!deletedLanguage) return res.status(404).json({ message: 'Language not found' });
    res.json({ message: 'Language deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
