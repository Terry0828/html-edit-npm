const express = require('express')
const apiRoutes = express.Router()
const ejs = require('ejs')

const config = require('../../config/config')
const {
  _readFile,
  _createFile } = require('../utils/utils')

const data = {
  title: '测试',
  list: 'ssss'
}

apiRoutes.get('/build', (req, res) => {
  _readFile(config.file.module + '/index.html')
  .then(res => {
    console.log(res)
    const re = ejs.render(res, data)
    return _createFile(config.file.result + '/index.html', re)
  })
  .then(() => res.json(
    {
      code: 0,
      message: "success"
    }
  ))
})


module.exports = apiRoutes