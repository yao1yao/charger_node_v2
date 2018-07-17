var express = require('express');
var router = express.Router();
const {check,validationResult} = require('express-validator/check')
const {matchData,sanitize} = require('express-validator/filter')
/*设置类*/
const setChargingStart = require('../device/setChargingStart')
const setChargingEnd = require('../device/setChargingEnd')

/*获取类*/

router.post('/setChargingStart',[
    check('deviceId','deviceId must be int ').isInt(),
    check('type').matches(/^[0-1]$/).withMessage('type must be 0 or 1'),
    check('userId','userId must be int').isInt(),
    check('time','time must be int').isInt(),
    check('energy','energy must be int').isInt()
],setChargingStart.post)
router.post('/setChargingEnd',setChargingEnd.post)
module.exports = router;