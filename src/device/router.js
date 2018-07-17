const notifyNewDevice = require('./api/notifyNewDevice')
const setChargingStart = require('./api/setChargingStart')
const notifyHeartPackage = require('./api/notifyHeartPackage')
const notifyChargerStatus = require('./api/notifyChargerStatus')
module.exports = function(socketServer){
    socketServer.use("notifyNewDevice", notifyNewDevice); //授权接口
    socketServer.use("setChargingStart", setChargingStart); //发送控制命令接口
    socketServer.use('notifyHeartPackage',notifyHeartPackage) // 心跳包接口
    socketServer.use('notifyChargerStatus',notifyChargerStatus) // 推送设备状态
    // socketServer.use(3, apiHeart); //心跳包接口
    // socketServer.use(4, apiStatus); //状态检查接口
    // socketServer.use(5, apiOta) // ota 升级端口
}