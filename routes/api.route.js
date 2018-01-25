var express = require('express')
var router = express.Router()

/** Import app routes */
var message = require('./api/message.route')
var user = require('./api/user.route')

/** Test api */
router.get('/', function(req, res, next) {
    return res.send("I'm currently working!")
})

router.post('/', function(req, res) {
    console.log(req.body)
    return res.send(req.body)
})

/** Map other routes */
router.use('/message', message)
router.use('/user', user)

module.exports = router;