/** Basic message model */
var Message = require('../models/message.model')

/** _this variable for context of module */
_this = this

exports.getMessage = async function(id) {
    try {
        var message = await Message.findById(id)
        return message
    } catch (e) {
        throw Error('Error finding message')
    }
}

exports.createMessage = async function (message) {
    // Create mongood object
    var newMessage = new Message({
        type: message.type,
        type_code: message.type_code,
        createdBy: message.createdBy,
        message: message.message,
        date: message.date,
        active: message.active
    })

    try {
        // Save the message
        var savedMessage = await newMessage.save()
        return savedMessage
    } catch (e) {
        throw Error('Error creating new message ' + e)
    }
}

exports.getUserMessags = async function (message) {
    // Pagination setup
    var options = {
        page,
        limit
    }

    // Try catch promise/handle error
    try {
        var messages = await Message.paginate(query, options)

        // Return list from promise
        return messages
    } catch (e) {
        // Return error message

        throw Error('Error while getting messages ' + e)
    }
}

exports.updateMessage = async function (message) {
    var id = message.id

    try {
        // find old message
        var oldMessage = await Message.findById(id)
    } catch (e) {
        throw Error('Error occured while looking for message' + e)
    }

    if (!oldMessage) {
        return false;
    }

    oldMessage.type = message.type
    oldMessage.type_code = message.type_code
    oldMessage.message = message.message
    oldMessage.createdby = message.createdby
    oldMessage.date = message.date
    oldMessage.active = message.active

    try {
        var savedMessage = await oldMessage.save()
        return savedMessage
    } catch (e) {
        throw Error('Error updating existing message' + e)
    }
}

exports.deleteMessage = async function (id) {
    // Delete message

    try {
        var deleted = await Message.remove({_id:id})
        if (deleted.n === 0) {
            throw Error('Message could not be deleted')
        }
        return true;
    } catch (e) {
        throw Error("Error occured while deleted the message" + e)
    }
}

