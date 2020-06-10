const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    lowerCase: true,
    unique: true,
    max: 100
  },
  description: {
    type: String,
    required: true,
    max: 255
  },
  startDate: {
    type: Date,
    required: true
  },
  completionDate: {
    type: Date,
    required: false
  },
  projectURL: {
    type: String,
    required: false,
    max: 100
  }

})
ProjectSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Project', ProjectSchema)
