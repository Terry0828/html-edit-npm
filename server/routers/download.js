const express = require('express')
const apiRoutes = express.Router()

const config = require('../config')
const {
  _compressedFile,
  _getAllFiles,
  _isExists,
  _createFolder,
  _createFile,
  _deleteFile,
  _deleteFolder,
  _getFileType,
  _readFile,
  _getIp } = require('../utils/file')

apiRoutes.post('/add', (req, res) => {
  const query = req.body
  // console.log('body', req.body)

  _getIp().then(ip => console.log(ip))
  
  // _getFileType(config.path.build + '/css/a.txt')
  // .then(res => console.log(res))
  // .catch(err => console.log('err', err))

  // _isExists(config.path.build + '/css/a.txt').then(res => console.log(res))
  // .then(res => {
  //   return _createFile(config.path.build + '/css/a.txt', 'this is a file for test222!')
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
  .then(() => _deleteFolder(config.path.build + '/css'))
  .then(res => console.log('res', res))
  .catch(err => console.log('err', err))


  return res.json({
    code: 0,
    message: "success"
  })
})

module.exports = apiRoutes