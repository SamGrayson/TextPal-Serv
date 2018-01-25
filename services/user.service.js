/* Import User for service */
var User = require("../models/user.model");

/** _this variable for context of module */
_this = this

/** Create new user in mongo */
exports.createUser = async function(userData) {
    var user = new User(userData);

    try {
        var savedUser = await user.save()
        return savedUser;
    } catch (err) {
        throw Error('Error creating new user: ' + err)
    }
}

/** Get user from mongo with _id */
exports.getUser = async function(id, callback) {
    try {
        var user = await User.findById(id, "name phone _id");
        return user
    } catch (e) {
        throw Error('Error getting user from mongo with _id', + e);
    }
}

