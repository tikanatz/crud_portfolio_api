const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const EmployerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    max: 255
  },
  address: {
    type: String,
    required: true,
    unique: true,
    max: 255
  },
  companyURL: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
    max: 255
  }
})
EmployerSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Work', EmployerSchema)
