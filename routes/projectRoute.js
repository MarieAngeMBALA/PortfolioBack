const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/create', projectController.createProject);
router.get('/all', projectController.getAllProjects);
router.delete('/delete/:id', projectController.deleteProject);
router.put('/update/:id', projectController.updateProject);


module.exports = router;