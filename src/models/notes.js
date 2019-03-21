// const { VALIDATION_MSG } = require('../api/user/constants')
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    // The note will eseentially be a tweet..
    // build a twitter app.
    // As a user I want to be able to create a tweet.
    // a tweet has, a 150 characters. can't go over 150 characters (validation).
    // can't be empty( validation )
    // can be any combintation of numbers, letters, and white space.
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 140]
      }
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['uuid']
    }],
    timestamps: true
  })

  Note.prototype.view = function (full) {
    let view = {}
    let fields = ['uuid', 'text', 'updatedAt', 'createdAt']
    fields.forEach((field) => {
      view[field] = this[field]
    })
    return view
  }

  return Note
}
