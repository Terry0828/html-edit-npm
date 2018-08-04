const express = require('express')
const apiRoutes = express.Router()
const ejs = require('ejs')
const fs = require('fs')

const { _isExists, _getAllFiles } = require('../utils/file')

const config = require('../config')

apiRoutes.get('/projectInit', (req, res) => {
  console.log(req.query)
  console.log(config.path.projectInit)

  _getAllFiles()
  .then(result => {
    console.log('src: ', result)
  })
  .catch(err => {
    console.log(err)
  })
  _isExists(config.path.projectInit)
  .then(result => {
    console.log('exists: ', result)
    return res.json({
      code: 0,
      message: "success",
      data: result
    })
  })
  
})

module.exports = apiRoutes