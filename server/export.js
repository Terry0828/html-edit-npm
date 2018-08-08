/*
 * @Author: WenJW
 * @Date: 2018-08-02 17:41:10
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-08-07 19:39:23
 * @description
 */

const Common = require('./routers/common') 
const Upload = require('./routers/upload')
const Download = require('./routers/download')
const Build = require('./routers/build')
const Project = require('./routers/project')

module.exports = [
  Common,
  Upload,
  Download,
  Build,
  Project
]