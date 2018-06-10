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
  _createFile,
  _deleteFile,
  _deleteFolder,
  _getFileType,
  _readFile } = require('../utils/utils')


apiRoutes.post('/add', (req, res) => {
  const query = req.body
  // console.log('body', req.body)

  _readFile(config.file.build + '/css/a.txt')
  .then(res => console.log('res', res))
  
  // _getFileType(config.file.build + '/css/a.txt')
  // .then(res => console.log(res))
  // .catch(err => console.log('err', err))

  // _isExists(config.file.build + '/css/a.txt').then(res => console.log(res))
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
  .then(() => _getAllFiles())
  .then(res => _compressedFile(res))
  .then(() => _deleteFolder(config.file.build + '/css'))
  .then(res => console.log('res', res))
  .catch(err => console.log('err', err))


  return res.json({
    code: 0,
    message: "success"
  })
})

module.exports = apiRoutes