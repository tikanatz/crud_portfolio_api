import {
  getAllRoles,
  getRole,
  newRole,
  updateRole,
  deleteRole
} from '../controllers/roleController'
import { loginRequired } from '../controllers/UserController'

const express = require('express')
const router = express.Router()

// Get List of All Roles
router.get('/', loginRequired, getAllRoles)

// Get a Role by Id
router.get('/:RoleID', loginRequired, getRole)

// Create a new Role
router.post('/', loginRequired, newRole)

// Update a specific Role
router.put('/:RoleID', loginRequired, updateRole)

// Delete a specific Role
router.delete('/:RoleID', loginRequired, deleteRole)

module.exports = router
