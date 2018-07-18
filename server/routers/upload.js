const express = require('express')
const app = express()
const apiRoutes = express.Router()

apiRoutes.get('/home', (req, res) => {
  res.send('yes! you are success')
})

module.exports = apiRoutes