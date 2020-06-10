const CompanyModel = require('../models/employer')

// Get All Employer records in the database
export const getAllEmployers = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  CompanyModel.find({}, (er, employers) => {
    if (er) {
      res.send(er)
      next()
    }
    res.json({
      success: true,
      message: 'All records have been retrieved',
      all: employers
    })
    // console.log(employers)
  }).sort({ name: -1 })
}

// Get a specific employer record by ID
export const getEmployer = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  CompanyModel.findById({ _id: req.params.getByID }, (er, employer) => {
    if (er) {
      res.send(er)
      next()
    }
    res.json({
      success: true,
      message: 'The employer record have been retrieved',
      all: employer
    })
    console.log(employer)
  })
}

// Create a new Employer
export const newCompany = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  const employer = req.body
  if (!employer.name || !employer.address || !employer.companyURL) {
    res.status(400).json({
      error: 'Bad data, could not be inserted into the database.'
    })
    next()
  } else {
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)

    const newEmployer = new CompanyModel(employer)
    newEmployer.save((er, company) => {
      if (er) {
        res.send(er)
      } else {
        res.json({
          success: true,
          message: 'New Employer Saved',
          Details: company
        })
      }
    })
  }
}

// Update an existing Employer record by Id
export const updateCompany = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  CompanyModel.findOneAndUpdate(
    { _id: req.params.companyID },
    req.body,
    {
      new: true,
      useFindAndModify: false
    },
    (err, company) => {
      if (err) {
        res.send(err)
        next()
      }
      res.json({
        success: true,
        message: `Successfully updated record ${req.params.companyID}`,
        employer: company
      })
    }
  )
}

// Delete an existing Employer record by Id
export const deleteCompany = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  CompanyModel.deleteOne({ _id: req.params.companyID }, (err, company) => {
    if (err) {
      res.send(err)
      next()
    }
    res.json({
      success: true,
      message: `Successfully deleted Employer record ${req.params.companyID}`
    })
    next()
  })
}
