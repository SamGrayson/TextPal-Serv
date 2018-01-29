// Accessing service

var MessageService = require('../services/message.service')

// Saving the context of this module

_this = this

exports.getMessage = async function(req, res, next) {
    if (!req.params.id) {
        return res.status(400).json({status: 400, message: "Id must be present"})
    }
    
    var id = req.params.id

    try {
        var message = await MessageService.getMessage(id)
        return res.status(200).json({status:200, data:message, message:'Sucessfully recieved message'});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getUserMessages = async function(req, res, next) {
     // Check the existence of the query parameters, If the exists doesn't exists assign a default value
     var page = req.query.page ? req.query.page : 1
     var limit = req.query.limit ? req.query.limit : 10
 
     if (!req.params.number) {
         return res.status(400).json({status: 400, message: "Id must be present"})
     }
 
     var number = req.params.number
 
     // Try catch promise/handle error
     try {
         var messages = await MessageService.getUserMessages({createdBy:number}, page, limit)
 
         // Return list from message service with HTTP Status Code
         return res.status(200).json({status:200, data:messages, message:'Sucessfully recieved messages'});
     } catch (e) {
         // Return error message
 
         return res.status(400).json({status: 400, message: e.message});
     }
}

exports.createMessage = async function (req, res, next) {
    // Create mongood object
    var newMessage = {
        type: req.body.type,
        type_code: req.body.type_code,
        message: req.body.message,
        createdBy: req.body.createdBy,
        date: req.body.date,
        active: req.body.active
    }

    try {
        // Save the message
        var savedMessage = await MessageService.createMessage(newMessage)

        return res.status(200).json({status:200, data:savedMessage, message:'Sucessfully saved message'});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.updateMessage = async function (req, res, next) {
    if (!req.body._id) {
        return res.status(400).json({status: 400, message: "Id must be present"})
    }

    var id = req.body._id;

    var message = {
        id,
        type: req.body.type ? req.body.type : null,
        type_code: req.body.type_code ? req.body.type_code : null,
        createdBy: req.body.createdBy ? req.body.createdBy : null,
        message: req.body.message ? req.body.message : null,
        date: req.body.date ? req.body.date : null,
        active: req.body.active ? req.body.active : null
    }

    try {
        var updatedMessage = await MessageService.updateMessage(message)
    
        return res.status(200).json({status:200, data:updatedMessage, message:'Sucessfully updated message'});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.deleteMessage = async function (req, res, nextid) {
    if (!req.params.id) {
        return res.status(400).json({status: 400, message: "Id must be present"})
    }

    // Delete message
    var id = req.params.id;

    try {
        var deleted = await MessageService.deleteMessage(id)
        return res.status(200).json({status:200, message: "Succesfully deleted message"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}