var express = require('express')

var router = express.Router()
var messages = require('./api/message.route')


router.use('/message', messages);


module.exports = router;