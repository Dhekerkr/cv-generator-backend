const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String
  },
  summary: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);
module.exports = PersonalInfo;
