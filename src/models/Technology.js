const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const TechnologySchema = new Schema({
  title: {
    type: String,
    required: true
  }
})
TechnologySchema.plugin(uniqueValidator)
module.exports = mongoose.model('Technology', TechnologySchema)
