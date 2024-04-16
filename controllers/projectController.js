const Project = require('../models/projectModel');

exports.createProject = async (req, res) => {
  try {
    const { title, content, images } = req.body;
    const newProject = await Project.create({ title, content, images });
    res.status(201).json({
        status: 'success',
        data: {
          project: newProject
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};