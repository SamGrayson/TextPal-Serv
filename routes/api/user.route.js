var express = require('express')

var router = express.Router()

// Getting the user controller

var UserController = require('../../controllers/user.controller')

// Map for each route

router.post('/create', UserController.create)

// Export the router

module.exports = router