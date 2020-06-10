const TechnologyModel = require('../models/Technology')

// Get a list of all technologies
export const getAllTechnologies = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  TechnologyModel.find({}, (er, technologies) => {
    if (er) {
      res.send(er)
      next()
    }
    res.json({
      success: true,
      message: 'All records have been retrieved',
      all: technologies
    })
    console.log(technologies)
  }).sort({ title: 1 })
}

// Get a specific technology by Id
export const getTechnology = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  TechnologyModel.findById({ _id: req.params.TechID }, (er, technology) => {
    if (er) {
      res.send(er)
      next()
    }
    res.json({
      success: true,
      message: 'The record have been retrieved',
      all: technology
    })
    console.log(technology)
  })
}

// Create a new Technology
export const newTechnology = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  const tech = req.body
  if (!tech.title) {
    res.status(400).json({
      error: 'Bad data, could not be inserted into the database.'
    })
    next()
  } else {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)

    const newTech = new TechnologyModel(tech)
    newTech.save((er, tech) => {
      if (er) {
        res.send(er)
      } else {
        res.json({
          success: true,
          message: 'New technology Saved',
          Details: tech
        })
      }
    })
  }
}

// Update an existing Technology record by Id
export const updateTechnology = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  TechnologyModel.findOneAndUpdate(
    { _id: req.params.TechID },
    req.body,
    {
      new: true,
      useFindAndModify: false
    },
    (err, technology) => {
      if (err) {
        res.send(err)
        next()
      }
      res.json({
        success: true,
        message: `Successfully updated record ${req.params.TechID}`,
        Tech: technology
      })
    }
  )
}

// Delete an existing Technology record by Id
export const deleteTechnology = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  TechnologyModel.deleteOne({ _id: req.params.TechID }, (err, tech) => {
    if (err) {
      res.send(err)
      next()
    }
    res.json({
      success: true,
      message: `Successfully deleted Technology record ${req.params.TechID}`
    })
    next()
  })
}
