const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const interviewSchema = new Schema({
  contactName: {
    type: String,
    required: [true, 'Please provide a contact name'],
    lowerCase: true,
    max: 50
  },
  contactNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  email: {
    type: String,
    required: [true, 'Enter a valid email address'],
    unique: true,
    lowercase: true,
    max: 30
  },
  companyName: {
    type: String,
    required: [true, 'Please provide the company name'],
    lowerCase: true,
    unique: true,
    max: 50
  },
  city: {
    type: String,
    required: false
  },
  province: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: [true, 'Please provide the country of the position']
  },
  companyWebsite: {
    type: String,
    required: false,
    lowerCase: true,
    max: 255
  },
  interviewDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
interviewSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Interview', interviewSchema)
