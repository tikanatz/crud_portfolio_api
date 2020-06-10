import { loginRequired } from '../controllers/UserController'

import {
  getAllProjects,
  getProject,
  newProject,
  updateProject,
  deleteProject
} from '../controllers/projectController'

const express = require('express')
const router = express.Router()

// Get List of All Projects
router.get('/', loginRequired, getAllProjects)

// Get a Project by Id
router.get('/:ProjectID', loginRequired, getProject)

// Create a new Project
router.post('/', loginRequired, newProject)

// Update a specific Project
router.put('/:ProjectID', loginRequired, updateProject)

// Delete a specific Project
router.delete('/:ProjectID', loginRequired, deleteProject)

module.exports = router
