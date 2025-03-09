const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true,
  },
  fullName: {
    type: String,
    required : true,
  },
  phone: {
    type: String,
    required : true,
  },
  email: {
    type: String,
    required : true,
    unique: true
  },
  address: {
    type: String,
    required : true,
  },
  summary: {
    type: String,
    required : true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);
module.exports = PersonalInfo;
