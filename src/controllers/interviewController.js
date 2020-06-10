const InterviewModel = require('../models/interview')

// Get All Interview Records in the database
export const getAll = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  InterviewModel.find({}, (e, data) => {
    if (e) {
      res.send(e)
      next()
    }
    res.json({
      success: true,
      message: 'All records have been retrieved',
      all: data
    })
    console.log(data)
  }).sort({ interviewDate: -1 })
}

// Get a specific record using the ID provided
export const getOneById = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  InterviewModel.findById(req.params.contactID, (e, data) => {
    if (e) {
      res.send(e)
      next()
    }
    res.json({
      success: true,
      message: 'The record has been retrieved',
      all: data
    })
  })
}

// Create a new Interview record
export const newInterviewRequest = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)

  const newInterview = req.body
  if (!newInterview.interviewDate) {
    newInterview.interviewDate = new Date()
  }

  if (!newInterview.contactName || !newInterview.companyName || !newInterview.country || !newInterview.contactNumber || !newInterview.timeSlot) {
    res.status(400).json({ error: 'Bad data, could not be inserted into the database.' })
    next()
  } else {
    // Middleware Dialog
    console.log(`Request from : ${req.originalUrl}`)
    console.log(`Request type : ${req.method}`)

    const Interview = new InterviewModel(newInterview)
    Interview.save((e, data) => {
      if (e) { res.send(e) } else {
        res.json({
          success: true,
          message: 'New Interview Saved',
          Details: data
        })
      }
    })
  }
}

// Update an existing Interview record
export const updateInterviewRequest = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  InterviewModel.findOneAndUpdate(
    { _id: req.params.contactID },
    req.body,
    {
      new: true,
      useFindAndModify: false
    },
    (err, interview) => {
      if (err) {
        res.send(err)
        next()
      }
      // console.log(`Response Head : ${res.head}`);
      // console.log(`Response Body : ${res.body}`);
      res.json({
        success: true,
        message: `Successfully updated record ${req.params.contactID}`,
        record: interview
      })
      next()
    })
}

// Delete an existing Interview record
export const deleteInterviewRequest = (req, res, next) => {
  // Middleware Dialog
  console.log(`Request from : ${req.originalUrl}`)
  console.log(`Request type : ${req.method}`)
  // console.log(`Request Headers : ${req.headers}`);
  // console.log(`Request Body : ${req.body}`);
  InterviewModel.deleteOne({ _id: req.params.contactID }, (err, interview) => {
    if (err) {
      res.send(err)
      next()
    }
    // console.log(`Response Headers : ${res.headers}`);
    // console.log(`Response Body : ${res.body}`);
    res.json({
      success: true,
      message: `Successfully deleted record ${req.params.contactID}`
    })
    next()
  })
}
