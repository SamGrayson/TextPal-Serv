var express = require('express')
var router = express.Router()

/** Import app routes */
var message = require('./api/message.route')
var user = require('./api/user.route')
var pal = require('./api/pal.route')

/** Test api */
router.get('/', function(req, res, next) {
    return res.send("I'm currently working!")
})

router.post('/', function(req, res) {
    console.log(req.body)
    return res.send(req.body)
})

/** Make sure user is logged in to access certain calls. */
function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      return next();
    } else {
      var err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err);
    }
}

/** Map other routes */
router.use('/pal', requiresLogin, pal)
router.use('/message', requiresLogin, message)
router.use('/user', user)

module.exports = router;