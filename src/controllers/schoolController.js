const SchoolModel = require('../models/school')

// Get a list of all School
export const getAllSchools = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  SchoolModel.find({}, (er, schools) => {
    if (er) {
      res.send(er)
      next()
    }
    res.json({
      success: true,
      message: 'All records have been retrieved',
      all: schools
    })
    console.log(schools)
  }).sort({ endDate: -1 })
}

// Get a specific School by Id
export const getSchool = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  SchoolModel.findById({ _id: req.params.SchoolID }, (er, school) => {
    if (er) {
      res.send(er)
      next()
    }
    res.json({
      success: true,
      message: 'The record have been retrieved',
      all: school
    })
    console.log(school)
  })
}

// Create a new School
export const newSchool = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  const school = req.body

  if (!school.startDate) {
    school.startDate = new Date()
  }

  if (!school.name || !school.program) {
    res.status(400).json({
      error: 'Bad data, could not be inserted into the database.'
    })
    next()
  } else {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)

    const newSchool = new SchoolModel(school)
    newSchool.save((er, school) => {
      if (er) {
        res.send(er)
      } else {
        res.json({
          success: true,
          message: 'New school Saved',
          Details: school
        })
      }
    })
  }
}

// Update an existing School record by Id
export const updateSchool = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  SchoolModel.findOneAndUpdate(
    { _id: req.params.schoolID },
    req.body,
    {
      new: true,
      useFindAndModify: false
    },
    (err, school) => {
      if (err) {
        res.send(err)
        next()
      }
      res.json({
        success: true,
        message: `Successfully updated record ${req.params.SchoolID}`,
        Tech: school
      })
    }
  )
}

// Delete an existing School record by Id
export const deleteSchool = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  SchoolModel.deleteOne({ _id: req.params.schoolID }, (err, sch) => {
    if (err) {
      res.send(err)
      next()
    }
    res.json({
      success: true,
      message: `Successfully deleted Technology record ${req.params.schoolID}`
    })
    next()
  })
}
