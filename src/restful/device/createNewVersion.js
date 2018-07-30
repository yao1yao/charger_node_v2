const {check,validationResult} = require('express-validator/check')
const formidable = require('formidable')
const debug = require('debug')('socket:createNewVersion')
exports.post = function(req,res,next){
    const result = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => {
        return `${msg}`;
    });
    if (!result.isEmpty()) {
        throw new Error(result.array().join())
    }
    let {socketServer} = req.app.locals
    let {DeviceVersionInfo} = socketServer.services.DB;
    let serviceOTA = socketServer.services.OTA
    let {upload} = serviceOTA

    let fileForm = new formidable.IncomingForm({
        keepExtensions: true,
        uploadDir: serviceOTA.OTA_PATH, // 限定存储路径
        maxFieldsSize: serviceOTA.UPLOAD_MAXSIZE // 限定上传尺寸
    });

    // 处理传输错误
    fileForm.on('error',function(err){
        next(err)
    })

    fileForm.parse(req, function(err, fields, files){
        if(err){
            next(err)
        }else{
            upload.storeOTA(files.file)
                .then((saveInfo)=>{  // 保存成功执行数据库操作
                    let deviceVersion = DeviceVersionInfo.build({
                        version_sn: saveInfo.versionSN,
                        size: saveInfo.versionSize,
                        checksum: saveInfo.versionSum,
                        description: saveInfo.description
                    });
                    // 返回保存行为
                    return deviceVersion.save().then(
                        ()=>{
                            // 数据保存成功，返回设备版本上传成功命令
                            res.json({
                                respCode: 100,
                                version_sn: saveInfo.versionSN,
                                size: saveInfo.versionSize,
                                checksum: saveInfo.versionSum,
                                description: saveInfo.description
                            })
                            next()
                        }
                    )
                }).catch((err)=>{
                    // todo 此处为了查询校验错误信息，可查看 debug()
                    next(err)
            })
        }
    })

}