// const _ = require('lodash')
const { success, notFound } = require('../../services/response/')
const Note = require('../../models').Note
module.exports = {

  async create ({ body }, res, next) {
    const noteString = body.text
    const validNoteString = noteString.length <= 140
    // const validNoteString = // validate string length less than 140. less than or equal to 140
    if (noteString && validNoteString) {
      try {
        await Note.create({
          text: noteString
        })
        return res.status(201).json({
          success: true,
          message: 'You successfully created a note!'
        }).end()
      } catch (error) {
        console.log(error)
        return res.status(400).json({
          success: false,
          error: JSON.stringify(error)
        }).end()
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'Note is more than 140 characters long.'
      }).end()
    }
  },

  async view (req, res, next) {
    if (req.params.uuid) {
      try {
        // return read only data defined in model
        const noteModel = await Note.findById(req.params.id)
        return res.status(200).json({
          success: true,
          note: noteModel.view()
        })
      } catch (error) {
        console.log(error)
        return res.status(400).json({
          success: false,
          error: JSON.stringify(error)
        }).end()
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid UUID'
      }).end()
    }
  },

  async list (req, res, next) {
    try {
      const arrayOfNoteModels = await Note.findAll({ raw: true })
      // TODO: map to json something
      return res.status(200).json({
        success: true,
        note: arrayOfNoteModels
      })
    } catch (error) {
      console.log(error)
      // pass to error service.
    }
  },

  async update (req, res, next) {
    const validUUID = req.params.uuid
    if (validUUID) {
      try {
        const noteModel = await Note.upsert({
          id: req.params.id,
          text: req.body.text
        }, {
          return: true // return updated model to display
        })
        return res.status(200).json({
          success: true,
          note: noteModel.view()
        })
      } catch (error) {
        console.log(error)
        return res.status(401).json({
          success: false,
          error: JSON.stringify(error)
        }).end()
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid UUID'
      }).end()
    }
  },

  async destroy (req, res, next) {
    let choosenNote
    try {
      choosenNote = await Note.findById(req.params.uuid)
      choosenNote.destroy()
      success(res, 204)
    } catch (err) {
      // NOTE: need to record different errors and eventually creat a service for this.
      if (err.name === `SequelizeValidationError` || err.name === `SequelizeUniqueConstraintError`) {
        if (err.errors) {
          err.errors.forEach((entry) => {
            delete entry.value
            delete entry.__raw
            delete entry.path
          })
          delete err.fields
          delete err.parent
          delete err.original
          delete err.sql
        }
        // TODO: Log error.
        res.status(422).send(err)
      }
    }
  }
}
