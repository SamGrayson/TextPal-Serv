/** Basic pal model */
var Pal = require('../models/pal.model')

/** _this for context */
_this = this

exports.getPal = async function(id) {
    try {
        var pal = await Pal.findById(id)
        return pal
    } catch (e) {
        throw Error('Error getting pal by id: ' + e)
    }
}

exports.createPal = async function(pal) {
    var pal = new Pal({
        name: pal.name,
        user_id: pal.user_id,
        active: true
    })

    try {
        var newPal = await pal.save()
        return newPal
    } catch (e) {
        throw Error('Error creating pal: ' + e );
    }
}

exports.updatePal = async function(pal) {
    var id = pal.id

    try {
        var oldPal = await Pal.findById(id)
    } catch (e) {
        throw Error('Error getting pal by id: ' + e)
    }

    if (!oldPal) {
        return false
    }

    oldPal.name = pal.name
    oldPal.active = pal.active
    oldPal.user_id = pal.user_id

    try {
        var savedPal = await oldPal.save()
        return savedPal 
    } catch (e) {
        throw Error('Error updating existing pal: ' + e)
    }
}

exports.deletePal = async function(id) {
    try {
        var deletedPal = await Pal.remove({_id:id})
        if (deletedPal.n === 0) {
            throw Error('Pal could not be deleted')
        }
        return true
    } catch (e) {
        throw Error('Error occured while deleting pal: ' + e)
    }
}