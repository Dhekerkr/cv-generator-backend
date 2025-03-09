const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String , required : true,},
  technologies: { type: [String] , required : true,}, // This expects an array
  startDate: { type: Date , required : true,},
  endDate: { type: Date , required : true,},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project; 