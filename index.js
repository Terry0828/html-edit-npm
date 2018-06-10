const express = require('express')
const ejs = require('ejs')
const http = require('http')
const bodyParser = require('body-parser') // 获取 Post 中的参数
const path = require('path')

const config = require('./config/config')
const Upload = require('./server/routers/upload')
const Download = require('./server/routers/download')
const Build = require('./server/routers/build')

const app = express()
const apiRoutes = express.Router()

const { _createFile, } = require('./server/utils/utils')

app.engine('.html', require('ejs').__express)
app.set('views', __dirname + '/views/')
app.set('view engine', 'html')
// app.use('/assets', express.static('assets'))


app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/api', [apiRoutes, Upload, Download, Build])
const server = http.createServer(app)

server.listen(config.server.port, '0.0.0.0', () => {
  console.log(`${config.port} : 启动成功`)
})
