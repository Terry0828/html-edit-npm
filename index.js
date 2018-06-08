const express = require('express')
const http = require('http')

const config = require('./config/config')
const Upload = require('./server/routers/upload')
const Download = require('./server/routers/download')

const app = express()
const apiRoutes = express.Router()
apiRoutes.get('/test', (req, res) => {
  res.send('aa')
})
app.use('/api', [apiRoutes, Upload, Download])
const server = http.createServer(app)

server.listen(config.server.port, '0.0.0.0', () => {
  console.log(`${config.port} : 启动成功`)
})
