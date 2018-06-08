const express = require('express')
const app = express()
const apiRoutes = express.Router()
const path = require('path')
const fs = require('fs')
const os = require('os')
const zlib = require('zlib')
const fstream = require('fstream')
const tar = require('tar')

const build = path.resolve(__dirname, '../../output/build')
const result = path.resolve(__dirname, '../../output/result')

apiRoutes.get('/download', (req, res) => {
  const query = req.query
  fstream.Reader({'path': build})
  .pipe(tar.Pack())
  .pipe(zlib.Gzip())
  .pipe(fstream.Writer({'path': result}))

  return res.json({
    code: 0,
    message: "success"
  })
})

module.exports = apiRoutes