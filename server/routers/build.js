const express = require('express')
const apiRoutes = express.Router()
const ejs = require('ejs')

const config = require('../config')
const {
  _readFile,
  _createFile,
  _copyFolder,
  _copyFile } = require('../utils/file')

const {
  _JSCodeMinify,
  _CSSCodeMinify,
  _HTMLMinify,
  _styleLink,
  _jsLink,
  _CreateHtmlCode } = require('../utils/code')

apiRoutes.post('/test', (req, res) => {
  const code = JSON.parse(req.body.data)
  // console.log(code.html)
  _CreateHtmlCode(code.html.layout, code.html.attr)
  .then(result => {
    return res.json({
      code: 0,
      message: "success",
      data: result
    })
  })
  
})

apiRoutes.post('/build', (req, res) => {
  const _body = JSON.parse(req.body.html),
    _data = _body.data,
    _link= _body.link,
    _config = _body.config,
    _js = _data.js,
    _style = _data.style,
    _layout = _data.layout
  
  console.log(_styleLink(_link.style))

  const data = {
    filename: config.path.module + '/index.html',
    ..._config,
    layout: _layout,
    linkCSS: _styleLink(_link.style),
    linkJS: _jsLink(_link.js)
  }
  _JSCodeMinify(_js)
  .then(res => {
    if(res === false) { return false }
    _createFile(config.path.build + '/js/index.js', res.code)
  })
  .then(() => _CSSCodeMinify(_style))
  .then(res => {
    if(res === false) { return false }
    _createFile(config.path.build + '/css/index.css', res)
  })
  .then(() => _copyFile(config.path.module + '/favicon.ico', config.path.build + '/favicon.ico'))
  .then(() => _readFile(config.path.module + '/index.html'))
  .then(result => {
    const module = ejs.render(result, data)
    return _HTMLMinify(module)
  })
  .then(res => _createFile(config.path.build + '/index.html', res))
  .then(() => {
    return res.json({
      code: 0,
      message: "success"
    })
  })
})


module.exports = apiRoutes
