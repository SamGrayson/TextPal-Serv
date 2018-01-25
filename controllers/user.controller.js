// Accessing service

var UserService = require('../services/user.service')
var User = require('../models/user.model')

// Saving the context of this module

_this = this

exports.create = async function(req, res, next) {
    if (req.body.password !== req.body.passwordConf) {
        return res.status(400).json({status: 400, message: "Passwords do not match!"});
    }

    if (req.body.phone &&
        req.body.name &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            phone: req.body.phone,
            name: req.body.name,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        }
   
        try {
            var user = await UserService.createUser(userData);

            return res.status(200).json({status:200, data:userData, message:'Sucessfully created user :)!'});
        } catch (e) {
            return res.status(400).json({status: 400, message: e.message });
        }
    }
}

exports.authenticate = async function(req, res, next) {
    if (req.body.phone && req.body.password) {
        User.authenticate(req.body.phone, req.body.password, function(error, user) {
            if (error || !user) {
                return res.status(401).json({status: 401, message: "Wrong email or password." });
            } else {
                req.session.userId = user._id;
                return res.redirect('/api/user/profile');
            }
        })
    } else {
        var e = Error("Missing credentials")
        e.status = 401;
        next(e);
    }
}

exports.profile = async function(req, res, next) {
    if (req.session.userId) {
        try {
            var user = await UserService.getUser(req.session.userId)
            return res.status(200).json({status:200, data:user, message:'Sucessfully authenticated user!'});            
        } catch(e) {
            return res.status(401).json({status: 401, message: "Error getting user from _id" });
        }
    } else {
        var e = new Error("User is not authenticated")
        e.status = 401;
        next(e);
    }
}