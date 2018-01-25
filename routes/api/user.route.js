var express = require('express')

var router = express.Router()

// Getting the user controller

var UserController = require('../../controllers/user.controller')

// Map for each route

router.post('/create', UserController.create)
router.post('/authenticate', UserController.authenticate)
router.get('/profile', UserController.profile)
router.get('/logout', UserController.logout)

// Export the router

module.exports = router