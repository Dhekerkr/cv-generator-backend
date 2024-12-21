const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require('../controllers/projectController.js');

// Create Project
router.post('/create', createProject);

// Get Projects by userId
router.get('/:userId', getProjects);

// Update Project
router.put('/:id', updateProject);

// Delete Project
router.delete('/:id', deleteProject);

module.exports = router;
