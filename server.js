import jwt from 'jsonwebtoken'
import cors from 'cors'

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

/** -------------------------------------------------------------- **/
/**  Assign express middleware functionality to local variable **/
const app = express()

// Define Environment Variables
const confPath = path.join(__dirname, '.env')
dotenv.config({ path: confPath })

/** -------------------------------------------------------------- **/
/**  Connect Mongoose to MongoDB Atlas Cloud Platform
---------------------------------------------------------------
Comment out the below 5 variables if using local database  **/

// const username = process.env.DB_USERNAME
// const password = process.env.MongoPassword
// const database = process.env.MongoDBAtlas
// const uri =
// `mongodb+srv://${username}:${password}${database}/portfolio?retryWrites=true&w=majority`
// const message = 'Successfully connected to MongoDB Atlas'
// const dbServer = 'cloud'

/** -------------------------------------------------------------- **/
/** ****  Local Connection  **** **/
// Connect Mongoose to MongoDB local database - MUST BE INSTALLED
/*  comment out the below 3 variables if using Cloud database  */
const dbServer = process.env.DB_SERVER
const uri = `mongodb://${dbServer}/portfolio`
const message = 'Successfully connected to localhost'

/** -------------------------------------------------------------- **
 *                       Connecting to Docker                       *
 **  ------------------------------------------------------------ **/
/** Connecting to Docker **/
// const dbServer = process.env.DB_SERVER
// const dockerPort = process.env.DOCKER_PORT
// const uri = `mongodb://${dbServer}:${dockerPort}/portfolio`
// const message = 'Successfully connected to Docker'

/** -------------------------------------------------------------- **
 *                  Port to render API/APP                          *
 **  ------------------------------------------------------------ **/
const port = process.env.PORT

/** -------------------------------------------------------------- **
*                       Default Options                             *
*         Required for both connections - MUST BE ENABLED           *
** -------------------------------------------------------------- **/
const mongooseOptions = {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4, // Will only use IPv4, skip trying to connect with IPv6
  autoIndex: false, // Don't build indexes
  poolSize: 3, // Will only maintain 3 socket connections
  serverSelectionTimeoutMS: 5000, // Will keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000 // Will close sockets after 45 seconds of inactivity
}

/** -------------------------------------------------------------- **
*               Establish Connection to Database                    *
*  Ensure only localhost variables or cloud variables are enabled.  *
*              Comment out the one not being used                   *
** -------------------------------------------------------------- **/
setTimeout(() => {
  mongoose.connect(uri, mongooseOptions)
    .then(
      () => {
        console.log(message)
      },
      (err) => {
        if (err) {
          throw err
        }
      })
}, 5000) // TimeOut set to 5 seconds

/** -------------------------------------------------------------- **
 *                          Defining CORS                           *
 **  ------------------------------------------------------------ **/
app.use(cors())

/** -------------------------------------------------------------- **
*                        Serving Static Files                       *
** -------------------------------------------------------------- **/
app.use(express.static(path.join(__dirname, 'client')))

/** -------------------------------------------------------------- **
*                      Body-Parser Middleware                       *
** -------------------------------------------------------------- **/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/** -------------------------------------------------------------- **
*                          JWT Setup                                *
** -------------------------------------------------------------- **/
const key = process.env.secretOrPrivateKey
const expire = process.env.TokenExpiration

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], `${key}`, { maxAge: `${expire}` }, (error, decode) => {
      if (error) req.user = undefined
      req.user = decode
      next()
    })
  } else {
    req.user = undefined
    next()
  }
})

/** -------------------------------------------------------------- **
*            Defining Variables for each route                      *
** -------------------------------------------------------------- **/
const index = require('./src/routes/index')
const user = require('./src/routes/UserRoutes')
const interview = require('./src/routes/interviewRoutes')
const proj = require('./src/routes/projectRoutes')
const work = require('./src/routes/employerRoutes')
const role = require('./src/routes/roleRoutes')
const school = require('./src/routes/schoolRoutes')
const tech = require('./src/routes/technologyRoutes')
const seedData = require('./src/routes/seeddata')

/** -------------------------------------------------------------- **
*       Establishing base routes for each endpoint                  *
** -------------------------------------------------------------- **/
app.use('/', index)
app.use('/auth', user)
app.use('/api/interview', interview)
app.use('/api/project', proj)
app.use('/api/company', work)
app.use('/api/role', role)
app.use('/api/school', school)
app.use('/api/tech', tech)
app.use('/api/seeddata', seedData)

/** -------------------------------------------------------------- **
*      Middleware - Confirming connection with Servers              *
** -------------------------------------------------------------- **/
app.listen(port, () => {
  console.log(`Server is running on port:  ${port}`)
  console.log(`MongoDB is running on port:  ${dbServer}`)
})
