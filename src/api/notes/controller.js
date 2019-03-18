// const _ = require('lodash')
// const { success } = require('../../services/response/')
const Note = require('../../models').Note
module.exports = {
    // create ({ user, bodymen: { body } }, res, next) {
    async createCheckIn({
        user,
        body
    }, res, next) {
        console.log(body)
        // Validate once more before the CheckIn is created,
        // That it is close to the dog park. Geo Validation?
        // All the pay load will have is gps data.
        // Validate all date coming in.
        // Find Dog Park,
        // Take Dog park UUID, GPS and User UUID and create Check-IN.
        // pass uuid from jwt
        // pass in geo point and try to save checking.
        // First Check, look for dog parks based on incoming-gps-point, then if no dog parks, redirect to 404 page or tell them no dog parks nearby.
        try {
            body.createdByUserUUID = user.uuid
            await CheckIn.create(body)
        } catch (err) {
            console.log(err)
            next(err)
        }
        return res.status(201).json({
            success: true,
            message: 'You successfully Checked In'
        }).end()
    }
    // async getCheckIn (req, res, next) {
    //   console.log(req.body)
    //   // retrieve public json data object about checkin.
    // }
    // // index ({ querymen: { query, select, cursor } }, res, next) {
    // index (req, res, next) {
    //   return CheckIn.find()
    //     .populate('user')
    //     .then((checkIns) => checkIns.map((checkIn) => checkIn.view()))
    //     .then(success(res))
    //     .catch(next)
    // },
    // // show ({ params }, res, next) {
    // show (req, res, next) {
    //   return CheckIn.findById(req.params.id)
    //     .populate('user')
    //     .then(notFound(res))
    //     .then((checkIn) => checkIn ? checkIn.view() : null)
    //     .then(success(res))
    //     .catch(next)
    // },

    // // update ({ bodymen: { body }, params }, res, next) {
    // update (req, res, next) {
    //   return CheckIn.findById(req.params.id)
    //     .populate('user')
    //     .then(notFound(res))
    //     // .then((checkIn) => checkIn ? _.merge(checkIn, body).save() : null)
    //     .then((checkIn) => checkIn ? checkIn.view(true) : null)
    //     .then(success(res))
    //     .catch(next)
    // },

    // // destroy ({ params }, res, next) {
    // destroy (req, res, next) {
    //   return CheckIn.findById(req.params.id)
    //     .then(notFound(res))
    //     .then((checkIn) => checkIn ? checkIn.remove() : null)
    //     .then(success(res, 204))
    //     .catch(next)
    // }
}
