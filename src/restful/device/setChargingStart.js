exports.post = function(req,res,next){
    let {socketServer} = req.app.locals
    let {DeviceInfo} = socketServer.services_db
    let id = req.body.deviceId
    let setDuration = req.body.setDuration
    let type = req.body.type
    socketServer.sendCommand(id,{
        apiId: 2,
        data: {
            type: type,
            setDuration: setDuration
        }
    }).then(data=>{
        res.json(data);
        next();
    }).catch(err=>{
        // todo::日志记录错误信息
        res.json(err.message)
        next();
    })
}