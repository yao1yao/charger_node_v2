const deviceRouter = require('./deviceRouter')

module.exports = function(app){
    app.use('/command',deviceRouter)  //创建对应的路由
}