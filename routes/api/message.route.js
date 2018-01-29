var express = require('express')

var router = express.Router()

// Getting the Message Controller

var MessageController = require('../../controllers/message.controller');

// Map each API to the Controller FUnctions

router.get('/:id', MessageController.getMessage)

router.post('/', MessageController.createMessage)

router.put('/', MessageController.updateMessage)

router.delete('/:id',MessageController.deleteMessage)


// Export the Router

module.exports = router;