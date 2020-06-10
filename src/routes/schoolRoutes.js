import {
  getAllSchools,
  getSchool,
  updateSchool,
  newSchool,
  deleteSchool
} from '../controllers/schoolController'
import { loginRequired } from '../controllers/UserController'

const express = require('express')
const router = express.Router()

// Get List of All Schools
router.get('/', loginRequired, getAllSchools)

// Get a School by Id
router.get('/:SchoolID', loginRequired, getSchool)

// Create a new School
router.post('/', loginRequired, newSchool)

// Update a specific School
router.put('/:SchoolID', loginRequired, updateSchool)

// Delete a specific School
router.delete('/:SchoolID', loginRequired, deleteSchool)

module.exports = router
