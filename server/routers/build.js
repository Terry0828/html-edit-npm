const express = require('express')
const apiRoutes = express.Router()
const ejs = require('ejs')

const config = require('../config')
const {
  _readFile,
  _createFile,
  _createFolder,
  _copyFolder,
  _copyFile,
  _deleteFolder } = require('../utils/file')

const {
  _JSCodeMinify,
  _CSSCodeMinify,
  _HTMLMinify,
  _styleLink,
  _jsLink,
  _CreateHtmlCode } = require('../utils/code')

apiRoutes.post('/save', (req, res) => {
  const code = JSON.parse(req.body.data)
})


const handleFile = () => {
  // 处理文件
  return _createFolder(config.path.build)
  .then(() => _copyFile(config.path.module + '/favicon.ico', config.path.build + '/favicon.ico'))
  .then(() => _copyFolder(config.path.module + '/js', config.path.build + '/js'))
  .then(() => _copyFolder(config.path.module + '/css', config.path.build + '/css'))
  .then(() => _copyFolder(config.path.module + '/static', config.path.build + '/static'))
}
const handleJS = (js) => {
  // 处理 js 代码
  return _JSCodeMinify(js)
  .then(result => {
    if(result === false) { return false }
    _createFile(config.path.build + '/js/index.js', result.code)
  })
}
const handleCSS = (style, src) => {
  // 处理 style 代码
  return _CSSCodeMinify(style)
  .then(result => {
    if(result === false) { return false }
    src ? _createFile(src, result) : _createFile(config.path.build + '/css/index.css', result)
  })
}
const handleHTML = (body) => {
  // 处理 html 模版
  const data = {
    filename: config.path.module + '/index.html',
    ...body.config,
    linkCSS: _styleLink(body.link.style),
    linkJS: _jsLink(body.link.js)
  }
  let htmlRes

  return _CreateHtmlCode(body.html.layout, body.html.attr)
  .then(result => htmlRes = result)
  // 将结构写入 html
  .then(() => data.layout = htmlRes.layout)
  .then(() => _readFile(config.path.module + '/index.html'))
  .then(result => {
    const module = ejs.render(result, data)
    return _HTMLMinify(module)
  })
  .then(res => _createFile(config.path.build + '/index.html', res))
  // 最后将 layout 中的样式单独抽离返回，和下面的样式一起处理
  .then(() => htmlRes.style)
}

apiRoutes.post('/build', (req, res) => {
  const _body = JSON.parse(req.body.data)

  handleFile()
  .then(() => handleHTML(_body))
  .then((layoutStr) => handleCSS(layoutStr + _body.style))
  .then(() => handleJS(_body.js))
  .then(() => {
    return res.json({
      code: 0,
      message: "success"
    })
  })

})


module.exports = apiRoutes
