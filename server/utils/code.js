/*
 * @Author: WenJW
 * @Date: 2018-07-06 17:00:25
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-07-10 15:38:54
 * @description
 */

const htmlMinify = require('html-minifier').minify
const UglifyJS = require('uglify-js')
const UglifyCSS = require('uglifycss')

const Config = require('../config')
const {
  _GetDataType,
  _ValMap,
  _GetVarFormHump } = require('./utils')

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
// 处理内联 style 样式
const createStyle = (style, hash) => {
  if(!style) { return { name: '', code: '' } }
  let result = `.style-${hash} {`
  _ValMap(style, (item, key) => {
    const className = _GetVarFormHump(key)
    result += `${className}: ${item};`
  })
  return {
    name: `style-${hash}`,
    code: result + '}'
  }
}
// 处理 class 属性，必须是 array
const createClass = (classList) => {
  let result = ''
  if(_GetDataType(classList) !== 'array') { return }

  let res = ''
  _ValMap(classList, (item, index) => {
    index === 0 ? res += item : res += ` ${item}`
  })
  result += ` class="${res}"`
  return result
}
// 处理 value 等属性
const createAttr = (attr, data, other) => {
  let result = ''
  _GetDataType(attr) === 'object' ? _ValMap(attr, (item, key) => { item && (result += ` ${key}="${item}"`) }) : void 0
  _GetDataType(data) === 'object' ? _ValMap(data, (item, key) => { item && (result += ` data-${key}="${item}"`) }) : void 0
  _GetDataType(other) === 'string' && other ? result += ` ${other}` : void 0
  return result
}
// 处理 html 标签
const createTag = (arr, tag, attr, content) => {
  if(arr.includes(tag)) {
    return `<${tag}${attr} />` }
  else { return `<${tag}${attr}>${content || ""}</${tag}>` }
}
// 添加 data-lw 用于追踪 dom 元素
const addDataIndex = (val, data) => {
  if(data.lw) { return '不可以占用 data-lw 提示' }
  return ` data-lw="${val}"`
}
// 创建 html 结构
const createHtmlLayout = (layout, attrArr) => {
  let result = '', style = ''
  _ValMap(layout, (item, index) => {

    let attr = '', content = ''
    const attrData = attrArr[item.key]
    const styleObj = createStyle(attrData.style, item.key)
    
    // 样式单独抽离出来，后续生成一个 css 文件
    style += styleObj.code
    styleObj.name && attrData.class.push(styleObj.name)
    attr += createClass(attrData.class)
    attr += createAttr(attrData.attr, attrData.data, attrData.other)
    // attr += createStyle(attrData.style)
    attr += addDataIndex(item.key, attrData.data)
    content += attrData.text
    if(item.children) { 
      const childHtmlObj = createHtmlLayout(item.children, attrArr)
      content += childHtmlObj.layout
      style += childHtmlObj.style
      console.log('childHtmlObj', childHtmlObj)
    }
    result += createTag(Config.autoCloseTag, attrData.el, attr, content)
  })
  console.log('result', result)
  return { layout: result, style }
}
exports._CreateHtmlCode = async(layout, attrArr) => createHtmlLayout(layout, attrArr)

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
  if(_GetDataType(code) !== 'string') { return false }
  const result = UglifyJS.minify(code, config)
  return result
}
exports._JSCodeMinify = (code, config) => JSCodeMinify(code, config)


const JSFileMinify = async(files, config = Config.JsMinify) => {
  if(_GetDataType(files) !== 'array') { return false }
  const result = UglifyJS.minify(files, config)
  return result
}
exports._JSFileMinify = (files, config) => JSFileMinify(files, config)

const CSSCodeMinify = async(code, config = Config.CssMinify) => {
  if(_GetDataType(code) !== 'string') { return false }
  const result = UglifyCSS.processString(code, config)
  return result
}
exports._CSSCodeMinify = (code, config) => CSSCodeMinify(code, config)

const CSSFileMinify = async(files, config = Config.CssMinify) => {
  if(_GetDataType(files) !== 'array') { return false }
  const result = UglifyCSS.processFiles(files, config)
  return result
}
exports._CSSFilesMinify = (files, config) => CSSFileMinify(files, config)
