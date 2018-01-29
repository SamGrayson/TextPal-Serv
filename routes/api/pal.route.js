var express = require('express')

var router = express.Router()

// Getting the pal controller

var PalController = require('../../controllers/pal.controller')
var MessageController = require('../../controllers/message.controller')

// Map the API calls

router.get('/:id', PalController.getPal)
router.get('/messages/:id', MessageController.getPalMessages)
router.post('/', PalController.createPal)
router.put('/', PalController.updatePal)
router.delete('/:id', PalController.deletePal)

// EXPORT ROUTER
module.exports = router