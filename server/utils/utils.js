
const archiver = require('archiver')
const path = require('path')
const fs = require('fs')
const os = require('os')

const config = require('../../config/config')

/**
 * @description 压缩文件或目录
 * @param {*} [files=[]] 文件数组，[{ url: '/a.txt', name: 'file1.txt' }]
 * @param {*} params 配置
 */
const _compressedFile = (files = [], params) => {
  params = params || {
    type: 'zip',
    outputName: 'result.zip',
    result: config.file.result,
    build: config.file.build }

  const archive = archiver(params.type)
  const output = fs.createWriteStream(path.join(params.result, params.outputName))
  archive.pipe(output)
  
  files.map((item, index) => {
    archive.append(fs.createReadStream(item.url), { name: item.name })
  })
  archive.finalize()
}

/**
 * @description 得到目录下的文件
 * @param {*} [root=config.file.build] 文件目录
 * @param {boolean} [reg=false] 正则，可筛选文件后缀
 * @returns 返回一个数组，[{ url: '', name: '' }]
 */
const _getAllFiles = (root = config.file.build, reg = false) => {
  var res = []

  var files = fs.readdirSync(root)
  files.forEach(function(file) {
    var pathname = root + '/' + file
    var stat = fs.lstatSync(pathname)

    if (!stat.isDirectory()) {
      var fitlPath = path.resolve(root, file).replace(/\\/g, '/')
      if (reg === false || reg.test(fitlPath)) {
        res.push({ url: fitlPath, name: fitlPath.replace(config.file.build, '') })
      }
    } else {
      res = res.concat(_getAllFiles(pathname, reg))
    }
  })
  // console.log(res)
  return res
}

const _getFileBlobArr = (url = config.file.build, dit = false) => {
  fs
}

module.exports = {
  _compressedFile,
  _getAllFiles,
  _getFileBlobArr,
}
