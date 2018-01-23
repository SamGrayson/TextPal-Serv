var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var MessageSchema = new mongoose.Schema({
    type: String,
    message: String,
    date: Date,
    active: Boolean
})

MessageSchema.plugin(mongoosePaginate)
const Message = mongoose.model('Message', MessageSchema)

module.exports = Message;