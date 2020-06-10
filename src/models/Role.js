const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const RolesSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: 255
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
})
RolesSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Roles', RolesSchema)
