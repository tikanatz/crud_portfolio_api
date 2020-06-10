const express = require('express')
const router = express.Router()
// const dotenv = require('dotenv')

// const port = process.env.PORT

/** ****  Initial Output page  ******/
// Temporary...To be replaced
router.get('/', (req, res) => {
  res.send(`
  <div style="text-align: center">
    <h1>Welcome</h1>
    <hr>
    <p>My Portfolio API Service is running</p>
    <footer>
        <p></p>
    </footer>
  </div>
  `)
})

module.exports = router
