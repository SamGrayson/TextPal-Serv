// Pal Service

var PalService = require('../services/pal.service')

// Context

_this = this

exports.getPal = async function(req, res, next) {
    var id = req.params.id;

    try {
        var pal = await PalService.getPal(id)

        return res.status(200).json({status:200, data:pal, message:'Sucessfully recieved pal'})
    } catch (e) {
        return res.status(400).json({status:400, message: e.message})
    }
}

exports.createPal = async function(req, res, next) {
    var newPal = {
        name: req.body.name,
        user_id: req.body.user_id,
        active: true
    }

    try {
        // create new pal
        var savedPal = await PalService.createPal(newPal)

        return res.status(200).json({status:200, data:savedPal, message:'Sucessfully saved pal'});
    } catch (e) {
        return res.status(400).json({status:400, message: e.message})
    }
}

exports.updatePal = async function(req, res, next) {
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    var pal = {
        id,
        name: req.body.name ? req.body.name : null,
        active: req.body.active ? req.body.active : null,
        user_id: req.body.user_id ? req.body.user_id : null,
    }

    try {
        var updatedPal = await PalService.updatePal(pal)

        return res.status(200).json({status:200, data:updatedPal, message:'Sucessfully updated pal'});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.deletePal = async function(req,res,next) {
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.params.id;

    try {
        var deleted = await PalService.deletePal(id)
        return res.status(200).json({status:200, message: "Succesfully deleted pal"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}