const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true,
  },
  language: {
    type: String,
    required : true,
  },
  proficiency: {
    type: String,  // Example: Beginner, Intermediate, Advanced
    required : true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Language = mongoose.model('Language', languageSchema);
module.exports = Language;
