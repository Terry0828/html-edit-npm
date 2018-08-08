const express = require('express')
const ejs = require('ejs')
const http = require('http')
const bodyParser = require('body-parser') // 获取 Post 中的参数
const path = require('path')

const config = require('./project-config')
const Routers = require('./server/export')


const app = express()
const apiRoutes = express.Router()
const os = require('os')
console.log(os.homedir())
console.log(__dirname)


app.engine('.html', require('ejs').__express)
app.set('views', __dirname + '/views/')
app.set('view engine', 'html')
// app.use('/assets', express.static('assets'))


app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/api', [apiRoutes, ...Routers])
const server = http.createServer(app)

server.listen(config.server.port, '0.0.0.0', () => {
  console.log(`🚀🚀🚀 启动成功 http://localhost:${config.port}`)
})
