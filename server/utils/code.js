/*
 * @Author: WenJW
 * @Date: 2018-07-06 17:00:25
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-07-07 20:59:18
 * @description
 */

const htmlMinify = require('html-minifier').minify
const UglifyJS = require('uglify-js')
const UglifyCSS = require('uglifycss')

const Config = require('../config')
const {
  _getDataType,
  _valMap } = require('./utils')

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

// 处理 class 属性
const createClass = (classList) => {
  let result = ''
  if(_getDataType(classList) === 'string') {
    result += ` class="${classList}"`
  } else if(_getDataType(classList) === 'array') {
    let res = ''
    _valMap(classList, (item, index) => {
      index === 0 ? res += item : res += ` ${item}`
    })
    result += ` class="${res}"`
  }
  return result
}
// 处理 value 等属性
const createAttr = (attr, data, other) => {
  let result = ''
  _getDataType(attr) === 'object' ? _valMap(attr, (item, key) => { item && (result += ` ${key}="${item}"`) }) : void 0
  _getDataType(data) === 'object' ? _valMap(data, (item, key) => { item && (result += ` data-${key}="${item}"`) }) : void 0
  _getDataType(other) === 'string' && other ? result += ` ${other}` : void 0
  return result
}
// 处理 html 标签
const createTag = (arr, tag, attr, content) => {
  if(arr.includes(tag)) {
    return `<${tag}${attr} />` }
  else { return `<${tag}${attr}>${content || ""}</${tag}>` }
}
// 创建 html 结构
const createHtmlLayout = layout => {
  let result = ''
  _valMap(layout, item => {
    let attr = '', content = ''
    attr += createClass(item.class)
    attr += createAttr(item.attr, item.data, item.other)
    content += item.text
    if(item.children) { content += createHtmlLayout(item.children) }
    result += createTag(Config.autoCloseTag, item.el, attr, content)
  })
  return result
}
exports._CreateHtmlCode = async(layout) => createHtmlLayout(layout)

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
