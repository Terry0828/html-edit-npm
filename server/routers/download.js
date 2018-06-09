const express = require('express')
const apiRoutes = express.Router()

const path = require('path')
const fs = require('fs')
const os = require('os')

const config = require('../../config/config')
const {
  _compressedFile,
  _getAllFiles,
  _isExists,
  _createFolder,
  _createFile } = require('../utils/utils')


apiRoutes.post('/add', (req, res) => {
  const query = req.body
  console.log('body', req.body)
  // _isExists(config.file.build + '/css/a.txt')
  // .then(res => {
  //   return _createFile(config.file.build + '/css/a.txt', 'this is a file for test222!')
  // })
  // .then(res => res ? console.log('the file is create success!') : console.log('the file is exists!'))

  return res.json({
    code: 0,
    message: "success"
  })
})

apiRoutes.get('/zip', (req, res) => {
  const query = req.query

  _isExists()
  .then(res => {
    if(res) { return false }
    else { return _createFolder() }
  })
  .then(res => _getAllFiles())
  .then(res => _compressedFile(res))


  return res.json({
    code: 0,
    message: "success"
  })
})

module.exports = apiRoutes