import { loginRequired } from '../controllers/UserController'
import { getAll, getOneById, newInterviewRequest, updateInterviewRequest, deleteInterviewRequest } from '../controllers/interviewController'

const express = require('express')
const router = express.Router()

// Get All Interview Records in the database
router.get('/', loginRequired, getAll)

// Get a specific record using the ID provided
router.get('/:contactID', loginRequired, getOneById)

// Create a new Interview record
router.post('/', loginRequired, newInterviewRequest)

// Update an existing Interview record
router.put('/:contactID', loginRequired, updateInterviewRequest)

// Delete an existing Interview record
router.delete('/:contactID', loginRequired, deleteInterviewRequest)

module.exports = router
