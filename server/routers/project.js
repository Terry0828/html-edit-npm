const express = require('express')
const apiRoutes = express.Router()
const ejs = require('ejs')

const config = require('../config')

apiRoutes.get('/init', (req, res) => {
  console.log(req.query)
  return res.json({
    code: 0,
    message: "success",
    data: res.body
  })
})

module.exports = apiRoutes