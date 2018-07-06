/*
 * @Author: WenJW
 * @Date: 2018-07-06 17:00:25
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-07-06 18:15:00
 * @description
 */

const htmlMinify = require('html-minifier').minify
const UglifyJS = require('uglify-js')
const UglifyCSS = require('uglifycss')


const Config = require('../config')
const { _getDataType } = require('./utils')

// 代码引入处理
const styleLink = (arr = []) => {
  let result = ''
  arr.map(item => {
    result += `<link rel="stylesheet" href="${item}" />`
  })
  return result
}
exports._styleLink = (arr) => styleLink(arr)

const jsLink = (arr = []) => {
  let result = ''
  arr.map(item => {
    result += `<script src="${item}"></script>`
  })
  return result
}
exports._jsLink = (arr) => jsLink(arr)

// 代码生成处理
const CreateHtmlCode = async(code) => {}
exports._CreateHtmlCode = (code) => CreateHtmlCode(code)

const CreateCssCode = async(code) => {}
exports._CreateCssCode = (code) => CreateCssCode(code)

const CreateJSCode = async(code) => {}
exports._CreateJSCode = (code) => CreateJSCode(code)

// 代码压缩处理
const HTMLMinify = async(code, config = Config.HtmlMinify) => {
  return htmlMinify(code, config)
}
exports._HTMLMinify = (code, config) => HTMLMinify(code, config)

const JSCodeMinify = async(code, config = Config.JsMinify) => {
  if(_getDataType(code) !== 'string') { return false }
  const result = UglifyJS.minify(code, config)
  return result
}
exports._JSCodeMinify = (code, config) => JSCodeMinify(code, config)


const JSFileMinify = async(files, config = Config.JsMinify) => {
  if(_getDataType(files) !== 'array') { return false }
  const result = UglifyJS.minify(files, config)
  return result
}
exports._JSFileMinify = (files, config) => JSFileMinify(files, config)

const CSSCodeMinify = async(code, config = Config.CssMinify) => {
  if(_getDataType(code) !== 'string') { return false }
  const result = UglifyCSS.processString(code, config)
  return result
}
exports._CSSCodeMinify = (code, config) => CSSCodeMinify(code, config)

const CSSFileMinify = async(files, config = Config.CssMinify) => {
  if(_getDataType(files) !== 'array') { return false }
  const result = UglifyCSS.processFiles(files, config)
  return result
}
exports._CSSFilesMinify = (files, config) => CSSFileMinify(files, config)
