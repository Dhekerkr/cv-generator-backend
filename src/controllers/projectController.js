const Project = require('../models/projectModel.js');

// Create a new Project
exports.createProject = async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: "Expected an array of projects" });
    }
    
    const projectData = req.body[0];
    
    const newProject = new Project(projectData);
    
    await newProject.save();
    
    const projects = [newProject];
    if (req.body.length > 1) {
      for (let i = 1; i < req.body.length; i++) {
        const project = new Project(req.body[i]);
        await project.save();
        projects.push(project);
      }
    }
    
    res.status(201).json(projects);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get Projects by userId
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.userId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Project by ID
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Project by ID
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
