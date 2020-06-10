const RoleModel = require('../models/Role')

// Get a list of all Roles
export const getAllRoles = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  RoleModel.find({}, (er, roles) => {
    if (er) {
      res.send(er)
      next()
    }
    res.json({
      success: true,
      message: 'All roles have been retrieved',
      all: roles
    })
    console.log(roles)
  }).sort({ endDate: -1 })
}

// Get a specific Role by Id
export const getRole = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  RoleModel.findById({ _id: req.params.RoleID }, (er, role) => {
    if (er) {
      res.send(er)
      next()
    }
    res.json({
      success: true,
      message: 'The record have been retrieved',
      all: role
    })
    console.log(role)
  })
}

// Create a new Role
export const newRole = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  const role = req.body

  if (!role.startDate) {
    role.startDate = new Date()
  }

  if (!role.title) {
    res.status(400).json({
      error: 'Bad data, could not be inserted into the database.'
    })
    next()
  } else {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)

    const newRole = new RoleModel(role)
    newRole.save((er, newrole) => {
      if (er) {
        res.send(er)
      } else {
        console.log(newrole)
        res.json({
          success: true,
          message: 'New role Saved',
          Details: newrole
        })
      }
    })
  }
}

// Update an existing Role record by Id
export const updateRole = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  RoleModel.findOneAndUpdate(
    { _id: req.params.RoleID },
    req.body,
    {
      new: true,
      useFindAndModify: false
    },
    (err, role) => {
      if (err) {
        res.send(err)
        next()
      }
      res.json({
        success: true,
        message: 'Successfully updated role',
        Role: role
      })
    }
  )
}

// Delete an existing Role record by Id
export const deleteRole = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  RoleModel.deleteOne({ _id: req.params.RoleID }, (err, role) => {
    if (err) {
      res.send(err)
      next()
    }
    res.json({
      success: true,
      message: `Successfully deleted Role ${req.params.RoleID}`
    })
    next()
  })
}
