var express = require('express');
var router = express.Router();

const setChargingStart = require('../device/setChargingStart')

router.post('/setChargingStart',setChargingStart.post)

module.exports = router;