const express = require('express')
const http = require('http')
const bodyParser = require('body-parser') // 获取 Post 中的参数

const config = require('./config/config')
const Upload = require('./server/routers/upload')
const Download = require('./server/routers/download')

const app = express()
const apiRoutes = express.Router()

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/api', [apiRoutes, Upload, Download])
const server = http.createServer(app)

server.listen(config.server.port, '0.0.0.0', () => {
  console.log(`${config.port} : 启动成功`)
})
