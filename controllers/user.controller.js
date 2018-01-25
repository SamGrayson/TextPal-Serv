// Accessing service

var UserService = require('../services/user.service')

// Saving the context of this module

_this = this

exports.create = async function(req, res, next) {
    if (req.body.password !== req.body.passwordConf) {
        return resizeBy.status(400).json({status: 400, message: "Passwords do not match!"});
    }

    if (req.body.phone &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            phone: req.body.phone,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        }
   
        try {
            var user = await UserService.createUser(userData);

            return res.status(200).json({status:200, userData, message:'Sucessfully created user :)!'});
        } catch (e) {
            return res.status(400).json({status: 400, message: e.message });
        }
    }
}