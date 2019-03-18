const { env } = require('../config')
// const { VALIDATION_MSG } = require('../api/user/constants')
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        len: [2, 155]
      }
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['email', 'username', 'uuid', 'token']
    }],
    timestamps: true
    // version: true,
  })

  // Note.prototype.authenticate = function (password) {
  //   return bcrypt.compareSync(password, this.passwordDigest) ? this : false
  // }
  Note.prototype.view = function (full) {
    let view = {}
    let fields = ['uuid', 'firstName', 'lastName', 'email', 'username', 'isEmailVerified']
    if (full) {
      fields = [...fields, 'email', 'createdAt', 'updatedAt']
    }
    fields.forEach((field) => {
      view[field] = this[field]
    })
    return view
  }

  Note.beforeValidate((user, options) => {
    if (!user.isEmailVerified) { // NOTE: This should only happen when the user first signs up.
      /* could call some service methods to fire off or modify data here */
      /* istanbul ignore next */
      const rounds = env === 'test' ? 1 : 10
      // TODO: need to figure out some error hanlding for here.
      user.passwordDigest = bcrypt.hashSync(user.password, bcrypt.genSaltSync(rounds))
      user.password = null
    }
  })
  return Note
}
