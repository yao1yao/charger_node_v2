const apiAuth = require('./api/1-auth')
const apiSend = require('./api/2-send')
module.exports = function(socketServer){
    socketServer.use(1, apiAuth); //授权接口
    socketServer.use(2, apiSend); //发送控制命令接口
    // socketServer.use(3, apiHeart); //心跳包接口
    // socketServer.use(4, apiStatus); //状态检查接口
    // socketServer.use(5, apiOta) // ota 升级端口
}