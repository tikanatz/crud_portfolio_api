const ProjectModel = require('../models/Project')

// Get a list of all Projects
export const getAllProjects = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  ProjectModel.find({}, (er, projects) => {
    if (er) {
      res.send(er)
      next()
    }
    res.json({
      success: true,
      message: 'All records have been retrieved',
      all: projects
    })
    console.log(projects)
  }).sort({ title: 1 })
}

// Get a specific Project by Id
export const getProject = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  ProjectModel.findById({ _id: req.params.ProjectID }, (er, project) => {
    if (er) {
      res.send(er)
      next()
    }
    res.json({
      success: true,
      message: 'The record have been retrieved',
      all: project
    })
    console.log(project)
  })
}

// Create a new Project
export const newProject = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  const proj = req.body

  if (!proj.startDate) {
    proj.startDate = new Date()
  }

  if (!proj.title || !proj.description) {
    res.status(400).json({
      error: 'Bad data, could not be inserted into the database.'
    })
    next()
  } else {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)

    const newProject = new ProjectModel(proj)
    newProject.save((er, project) => {
      if (er) {
        res.send(er)
      } else {
        console.log(project)
        res.json({
          success: true,
          message: 'New Project Saved',
          Details: project
        })
      }
    })
  }
}

// Update an existing Project record by Id
export const updateProject = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  ProjectModel.findOneAndUpdate(
    { _id: req.params.ProjectID },
    req.body,
    {
      new: true,
      useFindAndModify: false
    },
    (err, project) => {
      if (err) {
        res.send(err)
        next()
      }
      console.log(project)
      res.json({
        success: true,
        message: `Successfully updated record ${req.params.ProjectID}`,
        Tech: project
      })
    }
  )
}

// Delete an existing Project record by Id
export const deleteProject = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  ProjectModel.deleteOne({ _id: req.params.ProjectID }, (err, proj) => {
    if (err) {
      res.send(err)
      next()
    }
    res.json({
      success: true,
      message: `Successfully deleted Technology record ${req.params.ProjectID}`
    })
    next()
  })
}
