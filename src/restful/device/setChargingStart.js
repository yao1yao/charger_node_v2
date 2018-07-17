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
    let setDuration = req.body.setDuration
    let deviceId = parseInt(req.body.deviceId)
    let type = req.body.type
    DeviceInfo.searchId({
        id : deviceId
    }).then(result=>{
        // 设备不存在
        if(!result){
            throw new Error('device did not found')
        }else{
            return socketServer.sendCommand(deviceId,{
                "reqType": "setChargingStart",
                "data":{
                    "type": 0,
                    "userId": 1,
                    "time": 60,
                    "energy": 0
                }
            })
        }
    }).then(data=>{
        res.json(data)
        next()
    }).catch(err=>{
        res.json(err)
        next()
    })
}