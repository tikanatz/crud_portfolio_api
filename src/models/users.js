import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    max: 30
  },
  email: {
    type: String,
    required: [true, 'Enter a valid email address'],
    unique: true,
    lowercase: true,
    max: 30
  },
  hashPassword: {
    type: String,
    required: true,
    max: 30
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
/**  Using BCrypt to compare password provided against database to ensure they match  **/
UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
}
UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', UserSchema)
