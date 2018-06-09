
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
const compressedFile = (files, params) => {
  const archive = archiver(params.type)
  const output = fs.createWriteStream(path.join(params.result, params.outputName))
  archive.pipe(output)
  
  files.map((item, index) => {
    archive.append(fs.createReadStream(item.url), { name: item.name })
  })
  archive.finalize()
}
exports._compressedFile = async(files = [], params) => { 
  params = params || {
    type: 'zip',
    outputName: 'result.zip',
    result: config.file.result,
    build: config.file.build }
  return compressedFile(files, params)
}

/**
 * @description 得到目录下的文件
 * @param {*} [root=config.file.build] 文件目录
 * @param {boolean} [reg=false] 正则，可筛选文件后缀
 * @returns 返回一个数组，[{ url: '', name: '' }]
 */
const getAllFiles = (root = config.file.build, reg = false) => {
  let res = []

  const files = fs.readdirSync(root)
  files.forEach(function(file) {
    const pathname = root + '/' + file
    const stat = fs.lstatSync(pathname)

    if (!stat.isDirectory()) {
      const fitlPath = path.resolve(root, file).replace(/\\/g, '/')
      if (reg === false || reg.test(fitlPath)) {
        res.push({ url: fitlPath, name: fitlPath.replace(config.file.build, '') })
      }
    } else {
      res = res.concat(getAllFiles(pathname, reg))
    }
  })
  return res
}
exports._getAllFiles = async(root, reg) => getAllFiles(root, reg)

/**
 * @description 判断文件或文件夹是否存在
 * @param {*} src
 */
const isExists = (src = config.file.result) => {
  return new Promise((resolve, reject) => {
    fs.exists(src, res => resolve(res) )
  })
}
exports._isExists = (src) => isExists(src)

/**
 * @description 创建文件夹、文件
 * @param {*} src
 */
const createFolder = async(src = config.file.result) => {
  fs.mkdirSync(src)
  return true
}
exports._createFolder = src => createFolder(src)

const createFile = async(src, content = '', options = {}) => {
  const pathArr = src.split('/')
  const dirPath = pathArr.slice(0, pathArr.length)
  // const fileName = pathArr.slice(pathArr.length)
  for (let i = 0; i < dirPath.length; i++) {
    const p = path.resolve(dirPath.slice(0, i).join('/'))
    if (dirPath[i] && !fs.existsSync(p)) {
      fs.mkdirSync(p)
    }
  }
  fs.writeFileSync(path.resolve(src), content, options)
  return true
}
exports._createFile = (src, content, options) => createFile(src, content, options)

const _getFileBlobArr = (url = config.file.build, dit = false) => {
  fs
}
