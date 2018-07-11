const socketServerLog = require('debug')('socket:server')
const httpServerLog = require('debug')('socket:http')
const config = require('config')
const SocketServer = require('sockets-server')
const socketError = require('./src/services/error'); //错误处理服务
const DB = require('./src/services/db');  //数据库服务
//const OTA = require('./src/services/ota'); // ota 模块
const deviceRouter = require('./src/device/router'); //设备层路由
const socketServer = new SocketServer(config.CLIENT_SERVER)
const readline = require('readline')

// 注入设备层错误处理服务
 socketServer.service('error',socketError)
// 注入数据库服务，添加数据库配置项
 socketServer.service('db',DB(config.DB))

// 注入 ota 服务

//实例化路由对象

deviceRouter(socketServer)

socketServer.listen(config.SOCKET_PORT,'0.0.0.0',function(){
    socketServerLog(`socket server listen ${config.SOCKET_PORT}`)
})

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const router = require('./src/restful/router')
const errHandle = require('./src/restful/middleware/errorHandle')
app.locals.socketServer = socketServer //将设备端服务绑定在 app 上
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false }))
// parse application/json
app.use(bodyParser.json())

router(app)

app.use(errHandle)

app.listen(config.SERVER_PORT,function(){
    httpServerLog(`http server listen ${config.SERVER_PORT}`)
})