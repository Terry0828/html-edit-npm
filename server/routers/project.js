const express = require('express')
const apiRoutes = express.Router()

const { _isExists } = require('../utils/file')

const config = require('../config')

apiRoutes.get('/projectInit', (req, res) => {
  _isExists(config.path.projectInit)
  .then(result => {
    return res.json({
      code: 0,
      message: "success",
      data: {
        exists: true,
        content: '',
        root: config.path.root,
        nowPath: config.path.root
      }
    })
  })
})

module.exports = apiRoutes