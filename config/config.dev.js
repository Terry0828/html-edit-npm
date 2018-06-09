'use strict'

const path = require('path')

module.exports = {
  // dev
  port: 10011,
  host: 'local.dev.smartstudy.com',
  server: {
    port: 10012, // 本地 api 的端口
  },
  // 线上
  build: {},
  // 文件操作
  file: {
    build: path.resolve(__dirname, '../output/build/'),
    result: path.resolve(__dirname, '../output/result/'),
  }
}