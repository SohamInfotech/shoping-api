var express = require('express');
var router = express.Router();
var VC=require('../controller/LoSi') 

router.post('/login',VC.logindata)
router.post('/singup',VC.singupdata)

module.exports = router;
