// const _ = require('lodash')
const Note = require('../../models').Note
module.exports = {

  async create ({ body }, res, next) {
    const noteString = body.textField
    const validNoteString = noteString.length <= 140
    // const validNoteString = // validate string length less than 140. less than or equal to 140
    if (noteString && validNoteString) {
      try {
        await Note.create({
          text: noteString
        })
        return res.status(201).json({
          success: true,
          result: 'You successfully created a note!'
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
        const noteModel = await Note.findById(req.params.uuid)
        return res.status(200).json({
          success: true,
          result: noteModel.view()
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
        result: arrayOfNoteModels
      })
    } catch (error) {
      console.log(error)
      // pass to error service.
    }
  },

  async update (req, res, next) {
    const validUUID = req.params.uuid
    const noteString = req.body.textField
    const validNoteString = noteString.length <= 140

    if (validUUID && validNoteString) {
      try {
        await Note.update(
          {
            text: noteString
          }, {
            where: {
              uuid: req.params.uuid
            }
          })
        return res.status(200).json({
          success: true,
          result: 'Note Entry Updated'
        })
      } catch (error) {
        console.log(error)
        return res.status(401).json({
          success: false,
          result: JSON.stringify(error)
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
      return res.status(200).json({
        success: true,
        result: 'The Note has been deleted'
      })
    } catch (error) {
      console.log(error)
      return res.status(401).json({
        success: false,
        error: JSON.stringify(error)
      }).end()
    }
  }
}
