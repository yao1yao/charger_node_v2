/*设置类*/
const setChargingStart = require('./api/setChargingStart')
const setChargingEnd = require('./api/setChargingEnd')
/*推送类*/
const notifyNewDevice = require('./api/notifyNewDevice')
const notifyHeartPackage = require('./api/notifyHeartPackage')
const notifyChargerStatus = require('./api/notifyChargerStatus')
const notifyChargingInfo = require('./api/notifyChargingInfo')
const notifyEndCharging = require('./api/notifyEndCharging')
/*获取类*/
const getChargerStatus = require('./api/getChargerStatus')
const getChargingInfo = require('./api/getChargingInfo')
module.exports = function(socketServer){
    socketServer.use('setChargingStart', setChargingStart); //发送开启充电命令
    socketServer.use('setChargingEnd',setChargingEnd); // 发送停止充电命令

    socketServer.use('getChargerStatus',getChargerStatus) // 发送获取设备状态命令
    socketServer.use('getChargingInfo',getChargingInfo) // 发送获取设备充电信息命令


    socketServer.use('notifyNewDevice', notifyNewDevice); //授权接口
    socketServer.use('notifyHeartPackage',notifyHeartPackage) // 心跳包接口
    socketServer.use('notifyChargerStatus',notifyChargerStatus) // 推送设备状态
    socketServer.use('notifyChargingInfo',notifyChargingInfo) // 推送设备正在充电的信息
    socketServer.use('notifyEndCharging',notifyEndCharging)   // 推送设备结束充电信息
}