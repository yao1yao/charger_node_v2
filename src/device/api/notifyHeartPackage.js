/**
 * socket 授权接口，验证设备连接合法性
 * 执行如下操作.
 * 1. 验证客户端合法性
 * 2. 处理重复握手
 * 3. 响应结果
 */
const debug = require('debug')('socket:notifyHeartPackage')
const {packageErr, packageSuccess, isAuth} = require('../utils');
module.exports = function (client, next) {
    // 提取设备数据
    let deviceData = client.data;
    // 拉取错误服务
    let  ERR_TYPE = client.server.services.AppError.constructor.error;
    if (isAuth(client)) {
        // 已授权设备判断是否重连请求
        client.write(packageSuccess({
            "respType":deviceData.reqType,
        }))
    } else {
        client.write(packageErr(ERR_TYPE.DEFAULT,'please auth first!'));
        client.destroy();
        next();
    }
}