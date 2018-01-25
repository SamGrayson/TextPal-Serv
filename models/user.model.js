var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        requied: true
    },
    passwordConf: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;