const express = require('express')
const apiRoutes = express.Router()

const { _getDirs } = require('../utils/file')

const config = require('../config')

apiRoutes.get('/dir', (req, res) => {
  const path = req.query.root || config.path.root
  _getDirs(path)
  .then(result => {
    return res.json({
      code: 0,
      message: "success",
      data: result
    })
  })
  
})

module.exports = apiRoutes