// Accessing service

var MessageService = require('../services/message.service')

// Saving the context of this module

_this = this

exports.getMessages = async function(query, page, limit) {
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10

    // Try catch promise/handle error
    try {
        var messages = await MessageService.getMessages({}, page, limit)

        // Return list from message service with HTTP Status Code
        return res.status(200).json({status:200, data:messages, message:'Sucessfully recieved messages'});
    } catch (e) {
        // Return error message

        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createMessage = async function (message) {
    // Create mongood object
    new newMessage = {
        type: req.body.type,
        message: req.body.message,
        date: req.body.date,
        active: req.body.active
    }

    try {
        // Save the message
        var savedMessage = await MessageService.createMessage(newMessage)

        return res.status(201).json({status:201, data:savedMessage, message:'Sucessfully saved message'});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateMessage = async function (message) {
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    var message = {
        id,
        type: req.body.type ? req.body.type : null,
        message: req.body.message ? req.body.message : null,
        date: req.body.date ? req.body.date : null,
        active: req.body.active ? req.body.active : null
    }

    try {
        var updatedMessage = await MessageService.updateMessage(message)
    
        return res.status(200).json({status:200, data:updatedMessage, message:'Sucessfully updated message'});
    } catch (e) {
        throw Error('Error occured while looking for message')
    }
}

exports.deleteMessage = async function (id) {
    // Delete message
    var id = req.params.id;

    try {
        var deleted = await MessageService.deleteMessage(id)

        return res.status(204).json({status:204, message: "Succesfully deleted message"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}