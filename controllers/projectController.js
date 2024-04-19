const multer = require('multer');
const storage = multer.memoryStorage(); // Stores files in memory
const upload = multer({ storage: storage });
const Project = require('../models/projectModel');
const skillsKeywords = {
    programmation: 
    ["node.js", "api", "database", "server", "python", "java", "ruby", "php", "express",
    "C++", "C#", "Go", "Scala", "Perl", "Swift", "Kotlin", "Bash", "Rust", "TypeScript",
    "Objective-C", "Lua", "F#", "Dart", "Groovy", "Elixir", "Erlang", "Haskell", "Julia",
    "Matlab", "Assembly", "javascript", "html", "css", "react", "angular", "vue", "frontend", "ui", "ux",
    "webpack", "jQuery", "SASS", "LESS", "TypeScript", "Bootstrap", "Foundation",
    "Material UI", "Ant Design", "Ajax", "GraphQL", "Redux", "mobx", "Vuetify",
    "Next.js", "Nuxt.js", "Gatsby", "Figma", "Sketch", "Adobe XD", "tailwindcss"],

    projectManagement: 
    ["scrum", "agile", "kanban", "project", "timeline", "budget", "sprint", "team",
    "stakeholder", "milestone", "risk management", "resource allocation", "capacity planning",
    "performance tracking", "project charter", "work breakdown structure", "Gantt chart",
    "project scope", "change management", "quality management", "project lifecycle",
    "critical path method", "project dashboard", "status reporting", "deliverables",
    "project closure", "PMO", "cost management", "procurement management", "communication plan"],

    dataManagement: 
    ["data", "sql", "nosql", "database", "big data", "hadoop", "spark", "data science",
    "data warehousing", "data mining", "machine learning", "data analytics", "data modeling",
    "ETL", "BI tools", "data governance", "data quality", "data security", "data integration",
    "metadata management", "data visualization", "predictive analytics", "data architecture",
    "data lake", "data pipeline", "real-time data processing", "data privacy", "cloud data services",
    "distributed data systems", "data compliance"],

    embeddedSystem: 
    ["microcontroller", "firmware", "RTOS", "embedded Linux", "Arduino", "Raspberry Pi", "IoT",
    "sensor", "actuator", "robotics", "CAN bus", "Modbus", "I2C", "SPI", "UART", "FPGA",
    "ARM", "PLC", "SCADA", "fieldbus", "industrial PC", "real-time computing", "embedded software",
    "signal processing", "embedded networking", "safety-critical systems", "wireless communication",
    "energy management", "hardware integration", "RTOS-ThreadX", "VxWorks", "embedded debugging"]
  };

  exports.createProject = async (req, res) => {
    try {
      const { title, description, keywords, content } = req.body;
      const newProject = await Project.create({ title, description, keywords, content });
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

exports.getProjectById = async (req, res) => {
    try {
      const { id } = req.params; // Récupération de l'ID du projet depuis les paramètres de l'URL
      const project = await Project.findById(id);
  
      if (!project) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          project: project
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve project',
        error: error.message
      });
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

  exports.updateProject = async (req, res) => {
    try {
      const { id } = req.params; // L'ID du projet à mettre à jour est obtenu à partir des paramètres de l'URL
      const updateData = req.body; // Les données à mettre à jour sont récupérées du corps de la requête
  
      console.log("Data received for update:", updateData);
      // Mise à jour du projet dans la base de données
      const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
        new: true, // Retourne le document mis à jour
        runValidators: true // Assure que les validations du schéma sont appliquées lors de la mise à jour
      });

      if (!updatedProject) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          project: updatedProject
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  };

  exports.countProjects = async (req, res) => {
    try {
      const count = await Project.countDocuments(); 
      res.status(200).json({
        status: 'success',
        data: {
          count: count
        }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to count projects',
        error: error.message
      });
    }
  };

  exports.analyzeProjectsSkills = async (req, res) => {
    try {
      const projects = await Project.find({});
      let skillsProjects = {
        programmation: new Set(),
        projectManagement: new Set(),
        dataManagement: new Set(),
        embeddedSystem: new Set()
      };
  
      projects.forEach(project => {
        const description = project.description.toLowerCase();
        const words = new Set(description.match(/\b(\w+)\b/g) || []);
  
        words.forEach(word => {
          for (let skill in skillsKeywords) {
            if (skillsKeywords[skill].includes(word)) {
              skillsProjects[skill].add(word); // Ajouter le mot au set correspondant à la compétence
            }
          }
        });
      });
  
      let skillsPercentage = {};
      let listCounts = {};
      for (let skill in skillsProjects) {
        // Utiliser la taille de chaque liste de compétences pour le calcul du pourcentage
        const totalKeywordsInList = skillsKeywords[skill].length;
        skillsPercentage[skill] = (skillsProjects[skill].size / totalKeywordsInList * 100).toFixed(2) + '%';
        listCounts[skill] = totalKeywordsInList;  // Ajouter le nombre d'éléments de chaque liste
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          skillsPercentage,
          skillsCount: {
            programmation: skillsProjects.programmation.size,
            projectManagement: skillsProjects.projectManagement.size,
            dataManagement: skillsProjects.dataManagement.size,
            embeddedSystem: skillsProjects.embeddedSystem.size
          },
          totalKeywordsInList: listCounts  // Nombre total de mots-clés dans chaque liste
        }
      });
    } catch (error) {
      console.error("Error during project skills analysis: ", error);
      res.status(500).json({
        status: 'error',
        message: 'Error analyzing project skills across all projects',
        error: error.message
      });
    }
  };