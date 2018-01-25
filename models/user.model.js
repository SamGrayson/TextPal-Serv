var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

/** Simple default register user */
var UserSchema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
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

/** Authentication, read hash password */
UserSchema.statics.authenticate = function(phone, password, callback) {
    User.findOne({phone:phone})
        .exec(function (err, user) {
            if (err) {
                throw Error("Error executing findOne by phone")
            } else if (!user) {
                throw Error("User not found by phone")
            }
            bcrypt.compare(password, user.password, function(err, result) {
                if (result === true) {
                    return callback(null, user)
                } else {
                    return callback()
                }
            })
        })
}

/** Hash password before putting into DB */
UserSchema.pre('save', function(next){
    var user = this
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})

/** Hash passwordConf before putting into DB */
UserSchema.pre('save', function(next){
    var user = this
    bcrypt.hash(user.passwordConf, 10, function(err, hash) {
        if (err) {
            return next(err)
        }
        user.passwordConf = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;