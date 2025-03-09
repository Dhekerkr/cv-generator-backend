const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true,

  },
  certificationName: {
    type: String,
    required : true,
  },
  issuer: {
    type: String,
    required : true,
  },
  issueDate: {
    type: Date,
    required : true,
  },
  expirationDate: {
    type: Date,
    required : true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Certification = mongoose.model('Certification', certificationSchema);
module.exports = Certification;
