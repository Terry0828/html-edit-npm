const express = require('express')
const apiRoutes = express.Router()

const path = require('path')
const fs = require('fs')
const os = require('os')

const config = require('../../config/config')
const { 
  _compressedFile,
  _getAllFiles } = require('../utils/utils')

apiRoutes.get('/download', (req, res) => {
  const query = req.query

  const filesArr = _getAllFiles()
  _compressedFile(filesArr)

  return res.json({
    code: 0,
    message: "success"
  })
})

module.exports = apiRoutes