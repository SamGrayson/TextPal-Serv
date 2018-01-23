import { lchmod } from 'fs';

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: String,
    phone: String,
    date: Date,
    active: String,
    name: String
})

const User = mongoose.model('User', UserSchema);

module.exports = User;