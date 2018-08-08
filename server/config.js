const path = require('path')

module.exports = {
  path: {
    root: path.resolve(__dirname, '../'),
    module: path.resolve(__dirname, './views'),
    build: path.resolve(__dirname, '../output/build'),
    result: path.resolve(__dirname, '../output/result'),
    imgs: '',
    json: path.resolve(__dirname, '../json'),
    projectInit: path.resolve(__dirname, '../json/project.json')
  },
  // babel-core 配置
  Babel: {
    ast: false,
    extends: path.resolve(__dirname, './babel/.babelrc'),
  },
  // 压缩代码配置
  JsMinify: {
  },
  CssMinify: {
    maxLineLen: 500,
    expandVars: true
  },
  HtmlMinify: {
    collapseBooleanAttributes: true, // 忽略属性布尔值
    collapseWhitespace: true, // 折叠文本换行
    collapseInlineTagWhitespace: true, // 折叠不留空白
    conservativeCollapse: true, // 总是折叠到1空间
    decodeEntities: false, // 尽可能使用直接的Unicode字符
    html5: true, // 根据HTML5规范解析输入
    keepClosingSlash: true, // 保留单身元素上的尾部斜线
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true,
    processConditionalComments: true, // 通过缩小器处理条件注释的内容
    removeAttributeQuotes: false, // 尽可能删除属性周围的引号
    useShortDoctype: true, // 使用短 Doctype
    removeRedundantAttributes: true, // 当值匹配默认值时删除属性。
    removeEmptyElements: true, // 删除空白内容的所有元素
  },
  autoCloseTag: ['br', 'hr', 'area', 'base', 'img', 'input', 'link', 'meta', 'basefont', 'param', 'col', 'frame', 'embed', 'keygen', 'source', 'command', 'track', 'wbr'] // 自闭合标签
}