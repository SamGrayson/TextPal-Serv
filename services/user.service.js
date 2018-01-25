/* Import User for service */
var User = require("../models/user.model");

/** _this variable for context of module */
_this = this

exports.createUser = async function(userData) {
    var user = new User(userData);

    try {
        var savedUser = await user.save()
        return savedUser;
    } catch (err) {
        throw Error('Error creating new user: ' + err)
    }
}

