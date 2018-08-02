/*
 * @Author: WenJW
 * @Date: 2018-08-02 17:41:10
 * @Last Modified by: WenJW
 * @Last Modified time: 2018-08-02 17:48:48
 * @description
 */

const Upload = require('./routers/upload')
const Download = require('./routers/download')
const Build = require('./routers/build')
const Project = require('./routers/project')

module.exports = [
  Upload,
  Download,
  Build,
  Project
]