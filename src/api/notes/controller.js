// const _ = require('lodash')
const { success, notFound } = require('../../services/response/')
const Note = require('../../models').Note
module.exports = {
  // create ({ user, bodymen: { body } }, res, next) {
  async create ({
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
      await Note.create(body)
    } catch (err) {
      console.log(err)
      next(err)
    }
    return res.status(201).json({
      success: true,
      message: 'You successfully created a note!'
    }).end()
  },
  async view (req, res, next) {
    return Note.findById(req.params.id)
      .populate('note')
      .then(notFound(res))
      .then((checkIn) => checkIn ? checkIn.view() : null)
      .then(success(res))
      .catch(next)
    // retrieve public json data object about checkin.
  },
  list (req, res, next) {
    return Note.find()
      .populate('note')
      .then((checkIns) => checkIns.map((checkIn) => checkIn.view()))
      .then(success(res))
      .catch(next)
  },
  async update (req, res, next) {
    return Note.findById(req.params.id)
      .populate('note')
      .then(notFound(res))
      // .then((checkIn) => checkIn ? _.merge(checkIn, body).save() : null)
      .then((checkIn) => checkIn ? checkIn.view(true) : null)
      .then(success(res))
      .catch(next)
  },

  // destroy ({ params }, res, next) {
  destroy (req, res, next) {
    return Note.findById(req.params.id)
      .then(notFound(res))
      .then((note) => note ? note.remove() : null)
      .then(success(res, 204))
      .catch(next)
  }
}
