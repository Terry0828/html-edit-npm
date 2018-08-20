
const archiver = require('archiver')
const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const slash = require('slash')
// const childProcess = require('child_process') // 可以输出 cmd 命令

const config = require('../config')

const normalizeFilePaths = (files) => {
  Object.keys(files).forEach(file => {
    const normalized = slash(file)
    if (file !== normalized) {
      files[normalized] = files[file]
      delete files[file]
    }
  })
  return files
}
exports._normalizeFilePaths = (files) => normalizeFilePaths(files)

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
    result: config.path.result,
    build: config.path.build }
  return compressedFile(files, params)
}

/**
 * @description 得到目录下的文件
 * @param {*} [root=config.path.build] 文件目录
 * @param {boolean} [reg=false] 正则，可筛选文件后缀
 * @returns 返回一个数组，[{ url: '', name: '' }]
 */
const getAllFiles = (root = config.path.build, reg = false) => {
  let res = []

  const files = fs.readdirSync(root)
  files.forEach(function(file) {
    const pathname = root + '/' + file
    const stat = fs.lstatSync(pathname)

    if (!stat.isDirectory()) {
      const fitlPath = path.resolve(root, file).replace(/\\/g, '/')
      if (reg === false || reg.test(fitlPath)) {
        res.push({ url: fitlPath, name: fitlPath.replace(config.path.build, '') })
      }
    } else {
      res = res.concat(getAllFiles(pathname, reg))
    }
  })
  return res
}
exports._getAllFiles = async(root, reg) => getAllFiles(root, reg)

/**
 * @description 得到目录下的文件夹和文件
 * @param {*} [root=config.path.build] 文件目录
 * @returns 返回 { files: [], dirs: [] }
 */
const getDirs = (root = config.path.build, reg = false) => {
  let res = {
    hidden: { files: [], dirs: [] },
    visible: { files: [], dirs: [] }
  }

  const files = normalizeFilePaths(fs.readdirSync(root))
  files.forEach(function(file) {
    const pathname = root + '/' + file
    const stat = fs.lstatSync(pathname)

    if (stat.isDirectory()) {
      const fitlPath = path.resolve(root, file).replace(/\\/g, '/')
      if (reg === false || reg.test(fitlPath)) {
        const dir = fitlPath.replace(root + '/', '')
        if(/^\./.test(dir) === true) {
          res.hidden.dirs.push({ url: fitlPath, dir })
        } else {
          res.visible.dirs.push({ url: fitlPath, dir })
        }
      }
    } else if(stat.isFile()) {
      const fitlPath = path.resolve(root, file).replace(/\\/g, '/')
      if (reg === false || reg.test(fitlPath)) {
        const file = fitlPath.replace(root + '/', '')
        if(/^\./.test(file) === true) {
          res.hidden.files.push({ url: fitlPath, file })
        } else {
          res.visible.files.push({ url: fitlPath, file })
        }
      }
    }
  })
  return res
}
exports._getDirs = async(root) => getDirs(root)

/**
 * @description 判断文件或文件夹是否存在
 * @param {*} src
 */
const isExists = async(src = config.path.result) => {
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
const createFolder = async(src = config.path.result) => {
  return fs.mkdirSync(src)
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
 * @param {*} rmSelf 是否删除本身文件夹，默认删除 true
 */
const deleteFolder = (src, rmSelf = true) => {
  let files = []
  if(fs.existsSync(src)) {
    files = fs.readdirSync(src)
    files.forEach(function(file,index){
      const curPath = src + '/' + file
      if(fs.statSync(curPath).isDirectory()) {
        return deleteFolder(curPath)
      } else { return fs.unlinkSync(curPath) }
    })
    return rmSelf === false ? null : fs.rmdirSync(src)
  }
}
exports._deleteFolder = async(src, self) => deleteFolder(src, self)

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
  if(!fs.statSync(src).isFile()) { return fs.mkdirSync(src) }
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
 * @description 复制文件
 * @param {*} src
 */
const copyFile = (src, dst) => {
  if(!fs.existsSync(src)) { return false }
  const readstream = fs.createReadStream(src)
  const writestream = fs.createWriteStream(dst)
  readstream.pipe(writestream)
}
exports._copyFile = async(src, dst) => copyFile(src, dst)

/**
 * @description 复制文件夹
 * @param {*} src 源文件
 * @param {*} dst 目标文件
 */
const copyFolder = (src, dst) => {
  const paths = fs.readdirSync(src)
  if(!fs.existsSync(dst)){
    fs.mkdirSync(dst) }
  paths.map(_p => {
    if(!/\./.test(_p)) {
      let p = path.join(dst, _p)
      if(!fs.existsSync(p)){ fs.mkdirSync(p) }
      return copyFolder(path.join(src,_p), p)
    }
    const readstream = fs.createReadStream(path.join(src, _p))
    const writestream = fs.createWriteStream(path.join(dst, _p))
    readstream.pipe(writestream)
  })
}
exports._copyFolder = async(src, dst) => copyFolder(src, dst)

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
