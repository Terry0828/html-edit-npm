const express = require('express')
const apiRoutes = express.Router()
const ejs = require('ejs')
const htmlMinify = require('html-minifier').minify

const config = require('../config')
const {
  _readFile,
  _createFile } = require('../utils/utils')

const data = {
  filename: config.path.module + '/index.html',
  config: {
    mobile: 'pc', // app 会渲染 rem 适配代码
    title: '测试',
    desc: '1111111',
    key: ''
  },
  data: {
    list: 'ssafasf',
    js: '<script>console.log("sda")</script>'
  }
}

apiRoutes.get('/build', (req, res) => {
  _readFile(config.path.module + '/index.html')
  .then(result => {
    const module = ejs.render(result, data)
    return _createFile(config.path.result + '/index.html', htmlMinify(module, config.HtmlMinify))
    // return _createFile(config.file.result + '/index.html', module)
  })
  .then(() => {
    return res.json({
      code: 0,
      message: "success"
    })
  })
})


module.exports = apiRoutes