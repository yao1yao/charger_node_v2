module.exports = function(err,req,res,next) {
    if(err) {
        res.json({
            "respType": req.url.replace(/\/command\//g, ''),
            "data": {
                respCode: 4,
                errMsg: err.message
            },
        });
    }
    next(err);
}