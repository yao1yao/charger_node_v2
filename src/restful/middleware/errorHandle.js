module.exports = function(err,req,res,next) {
    res.json({
        errCode:4,
        errMsg:err.message
    });
    next(err);
}