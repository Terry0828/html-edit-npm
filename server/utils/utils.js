
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

  const files = fs.readdirSync(root, err => err)
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
const isExists = async(src = config.file.result) => {
  return fs.existsSync(src)
}
exports._isExists = (src) => isExists(src)

/**
 * @description 重命名
 * @param {*} oldSrc
 * @param {*} newSrc
 * @returns
 */
const rename = async(oldSrc, newSrc) => {
  return fs.renameSync(oldPath, newPath)
}
exports._rename = (oldPath, newPath) => rename(oldPath, newPath)

/**
 * @description 创建文件夹、文件
 * @param {*} src
 */
const createFolder = async(src = config.file.result) => {
  return fs.mkdirSync(src, err => err)
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
  return fs.writeFileSync(path.resolve(src), content, options)
}
exports._createFile = (src, content, options) => createFile(src, content, options)

/**
 * @description 删除文件夹、文件
 * @param {*} src
 */
const deleteFolder = src => {
  let files = []
  if(fs.existsSync(src)) {
    files = fs.readdirSync(src)
    files.forEach(function(file,index){
      const curPath = src + '/' + file
      if(fs.statSync(curPath).isDirectory()) {
        return deleteFolder(curPath)
      } else { return fs.unlinkSync(curPath) }
    })
    return fs.rmdirSync(src)
  }
}
exports._deleteFolder = async(src) => deleteFolder(src)

const deleteFile = async(src) => {
  return fs.unlinkSync(src)
}
exports._deleteFile = src => deleteFile(src)

/**
 * @description 判断文件类型
 * @param {*} src
 * @returns
 */
const getFileType = async(src) => {
  let res = 'other'
  if(fs.statSync(src).isDirectory()) {
    res = 'folder'
  } else if (fs.statSync(src).isFile()) {
    res = 'file' }
  return res
}
exports._getFileType = src => getFileType(src)

/**
 * @description 读取文件
 * @param {*} src
 * @param {number} [size=1024] 缓冲区大小
 * @returns
 */
const readFile = async(src, size = 1024) => {
  if(!fs.statSync(src).isFile()) { return false }
  const buf = new Buffer(size)
  const fd = fs.openSync(src, 'r+')
  const bytes = fs.readSync(fd, buf, 0, buf.length, 0)
  let res = false
  if(bytes > 0){
    res = buf.slice(0, bytes).toString() }
  fs.closeSync(fd)
  return res
}
exports._readFile = (src, size) => readFile(src, size)

/**
 * @description 获取 ip 地址
 * @returns
 */
const getIp = async() => {
  let ip = '127.0.0.1'
  try {
    const network = os.networkInterfaces()
    const iplist = network.en0

    if (iplist == null) {
      for (let key in network) {
        iplist = network[key]
        break }
      if (iplist == null) {
        return ip }
    }

    if (iplist.length == 1) {
      return iplist[0].address
    } else {
      for (let key in iplist) {
        const ipModel = iplist[key]
        if (ipModel.family == 'IPv4') {
          return ipModel.address
        }
      } }
  } catch (e) {
    console.log(e.message)
    return false }
  return ip
}
exports._getIp = () => getIp()
