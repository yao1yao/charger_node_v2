const {check,validationResult} = require('express-validator/check')
exports.post = function(req,res,next){
    const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => {
        return `${msg}`;
    });
    if (!result.isEmpty()) {
        throw new Error(result.array().join())
    }
    let {socketServer} = req.app.locals
    let {DeviceInfo} = socketServer.services.DB;
    let allAuthClientInfo = []
    let allAuthClient = socketServer.authClient
    console.log(allAuthClient)
    for(let key in allAuthClient){
        // todo::主要是避免获取原型上面的属性
        if(allAuthClient.hasOwnProperty(key)){
            let client = allAuthClient[key]
            let clientInfo = {
                illegal: true,
                onTime: new Date(),
                id: client.auth.id,
                url: client.auth.notifyUrl,
                ownerId: client.auth.ownerId,
            }
        }
    }


    // let {DeviceInfo} = socketServer.services.DB;
    // let deviceId = parseInt(req.body.deviceId)
    // DeviceInfo.searchId({
    //     id : parseInt(deviceId)
    // }).then(result=>{
    //     // 设备不存在
    //     if(!result){
    //         throw new Error('device did not found')
    //     }else{
    //         return socketServer.sendCommand(deviceId,{
    //             "reqType": "getChargerStatus"
    //         })
    //     }
    // }).then(data=>{
    //     res.json(data)
    //     next()
    // }).catch(err=>{
    //     res.json(err)
    //     next()
    // })
}