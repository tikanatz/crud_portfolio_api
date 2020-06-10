const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const SchoolSchema = new Schema({
  name: {
    type: String,
    unique: true,
    lowercase: true,
    max: 255
  },
  address: {
    type: String,
    unique: true,
    lowercase: true,
    max: 255
  },
  program: {
    type: String,
    unique: true,
    lowercase: true,
    max: 255
  },
  schoolUrl: {
    type: String,
    unique: true,
    lowercase: true,
    max: 255
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  award: {
    type: String,
    unique: true,
    lowercase: true,
    max: 255
  }
})
SchoolSchema.plugin(uniqueValidator)
module.exports = mongoose.model('School', SchoolSchema)
