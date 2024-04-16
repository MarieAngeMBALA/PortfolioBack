const Project = require('../models/projectModel');

exports.createProject = async (req, res) => {
  try {
    const { title, description, content, images } = req.body;
    const newProject = await Project.create({ title, description, content, images });
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

exports.deleteProject = async (req, res) => {
    try {
      const { id } = req.params; // L'ID du projet à supprimer est obtenu à partir des paramètres de l'URL
      const project = await Project.findByIdAndDelete(id);
  
      if (!project) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      }
      res.status(204).json({ // 204 No Content indique une suppression réussie sans envoyer de contenu de retour
        status: 'deleted successfully',
        data: null
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  };
  