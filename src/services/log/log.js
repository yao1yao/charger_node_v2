module.exports = class log extends EventEmitter{
    /**
     *
     * @param options
     * @param {Object} options.LOG_PATH log 保存文件路径
     */
    constructor(options={}){
        super()
        this.options = options
        this.LOG_PATH = options.LOG_PATH || __dirname;

    }
}