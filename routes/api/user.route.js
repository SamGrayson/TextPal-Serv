var express = require('express')

var router = express.Router()

// Getting the user controller

var UserController = require('../../controllers/user.controller')
var MessageController = require('../../controllers/message.controller')

/** Middleware */
var requiresLogin = require('../api-middleware.js')

// Map for each route

router.post('/create', UserController.create)
router.post('/authenticate', UserController.authenticate)
router.get('/messages/:number', requiresLogin, MessageController.getUserMessages)
router.get('/profile', requiresLogin, UserController.profile)
router.get('/logout', requiresLogin, UserController.logout)

// Export the router

module.exports = router