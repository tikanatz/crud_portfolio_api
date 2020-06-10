import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const User = require('../models/users')

// Determine if user is authorized to data requested
export const loginRequired = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' })
  }
}

// Create a new User
export const register = (req, res) => {
  const newUser = new User(req.body)
  // Take the password from the body and immediately salt it using bcrypt
  newUser.hashPassword = bcrypt.hashSync(req.body.password + process.env.Password_Pepper, 10)
  // save the new user to the database
  newUser.save((e, user) => {
    // if there is an error, return error message
    if (e) {
      return res.status(400).send({ message: e })
    } else // When returning the user details assign undefined to the hashPassword variable
    {
      user.hashPassword = undefined
      return res.json(user)
    }
  })
}

// Log into to application
export const login = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.json({ error: err })
    }
    if (!user) {
      res.status(401).json({
        message: 'Authentication failed. Please retry with a valid username or password.'
      })
    } else if (!user.comparePassword(req.body.password + process.env.Password_Pepper, user.hashPassword)) {
      res.status(401).json({
        message: 'Authentication failed. Please retry with a valid username or password.'
      })
    } else {
      return res.json({
        token: jwt.sign({
          email: user.email,
          username: user.username,
          _id: user.id
        },
        process.env.secretOrPrivateKey)
      })
    }
  })
}
