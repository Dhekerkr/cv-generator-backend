const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  certificationName: {
    type: String,
    required: true
  },
  issuer: {
    type: String
  },
  issueDate: {
    type: Date
  },
  expirationDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Certification = mongoose.model('Certification', certificationSchema);
module.exports = Certification;
