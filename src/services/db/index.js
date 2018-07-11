const Sequelize = require('sequelize')
const DeviceInfoConstructor = require('./models/DeviceInfo')
const DeviceOwnerInfoConstructor = require('./models/DeviceOwnerInfo')
const DeviceVersionInfoConstructor = require('./models/DeviceVersionInfo')

module.exports = function(options){
    let sequelize = new Sequelize({
        dialect: 'mysql',
        pool: {
            max: 2,
            min: 1,
            idle: 30000,
            acquire: 6000
        },...options
    })
    // 获取模型
    let DeviceInfo = DeviceInfoConstructor(sequelize)
    let DeviceOwnerInfo = DeviceOwnerInfoConstructor(sequelize)
    let DeviceVersionInfo = DeviceVersionInfoConstructor(sequelize)
    // 模型关联
    DeviceInfo.belongsTo(DeviceVersionInfo,{foreignKey: 'version_id'})
    DeviceInfo.belongsTo(DeviceOwnerInfo,{foreignKey: 'owner_id'})
    // 返回实例
    return {
        sequelize,
        DeviceInfo,
        DeviceOwnerInfo,
        DeviceVersionInfo
    }
}