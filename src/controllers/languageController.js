const Language = require('../models/languagesModel.js');

// Create a new Language
exports.createLanguage = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: "Expected an array of languages" });
    }
    const languageData = req.body[0];
    const newLanguage = new Language(languageData);
    await newLanguage.save();
    const languages = [newLanguage];
    if (req.body.length > 1) {
      for (let i = 1; i < req.body.length; i++) {
        const language = new Language(req.body[i]);
        await language.save();
        languages.push(language);
      }
    }
    res.status(201).json(languages);
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
