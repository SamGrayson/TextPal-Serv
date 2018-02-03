var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var MessageSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    type_code: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
})

MessageSchema.plugin(mongoosePaginate)
const Message = mongoose.model('Message', MessageSchema)

module.exports = Message;