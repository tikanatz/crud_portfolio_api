import {
  getAllEmployers,
  getEmployer,
  newCompany,
  updateCompany,
  deleteCompany
} from '../controllers/employerController'
import { loginRequired } from '../controllers/UserController'

const express = require('express')
const router = express.Router()

// Get List of All Employers route
router.get('/', loginRequired, getAllEmployers)

// Get an employer by Id
router.get('/:getByID', loginRequired, getEmployer)

// Create a new employer
router.post('/', loginRequired, newCompany)

// Update a specific employer
router.put('/:companyID', loginRequired, updateCompany)

// Delete a specific employer
router.delete('/:companyID', loginRequired, deleteCompany)

module.exports = router
