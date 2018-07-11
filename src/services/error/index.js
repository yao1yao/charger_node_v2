const DeviceError = require('./DeviceError')
const CustomError = require('./CustomError')
const ERR_TYPE = require('./errorType')

module.exports = {
    ERR_TYPE,
    deviceError(type,message){
        return new DeviceError(type,message)
    },
    customError(type,message){
        return new CUstomError(type, message)
    }
}