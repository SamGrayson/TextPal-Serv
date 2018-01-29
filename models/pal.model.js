var mongoose = require('mongoose')      

var PalSchema = new mongoose.Schema({
    name: String,
    user_id: String,
    active: Boolean
})

const Pal = mongoose.model('Pal', PalSchema)

module.exports = Pal;