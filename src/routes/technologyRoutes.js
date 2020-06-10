import {
  getAllTechnologies,
  getTechnology,
  newTechnology,
  updateTechnology,
  deleteTechnology
} from '../controllers/technologyController'
// import { loginRequired } from '../controllers/UserController'

const express = require('express')
const router = express.Router()

// Get List of All Technologies
router.get('/', /* loginRequired, */ getAllTechnologies)

// Get a Technology by Id
router.get('/:TechID', /* loginRequired, */ getTechnology)

// Create a new Technology
router.post('/', /* loginRequired, */ newTechnology)

// Update a specific Technology
router.put('/:TechID', /* loginRequired, */ updateTechnology)

// Delete a specific Technology
router.delete('/:TechID', /* loginRequired, */ deleteTechnology)

module.exports = router
