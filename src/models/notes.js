const bcrypt = require('bcryptjs')
const {
    env
} = require('../config')
// const { VALIDATION_MSG } = require('../api/user/constants')
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                isAlpha: true,
                len: [2, 155]
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: [3, 225]
            }
        },
        token: { // I could make the tokens uuids? what is the best option for this?
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            isEmail: true,
            validate: {
                len: [2, 255]
            }
        },
        /* Password must be passed in twice. */
        password: {
            type: DataTypes.STRING
        },
        passwordDigest: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        roles: {
            type: DataTypes.ENUM(['admin', 'user']),
            defaultValue: 'user'
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        /* For reset password */
        resetPasswordToken: {
            type: DataTypes.STRING
        },
        resetPasswordExpires: {
            type: DataTypes.DATE
        }
    }, {
        indexes: [{
            unique: true,
            fields: ['email', 'username', 'uuid', 'token']
        }],
        timestamps: true
        // version: true,
    })
    User.prototype.authenticate = function (password) {
        return bcrypt.compareSync(password, this.passwordDigest) ? this : false
    }
    User.prototype.view = function (full) {
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
    User.beforeValidate((user, options) => {
        if (!user.isEmailVerified) { // NOTE: This should only happen when the user first signs up.
            /* could call some service methods to fire off or modify data here */
            /* istanbul ignore next */
            const rounds = env === 'test' ? 1 : 10
            // TODO: need to figure out some error hanlding for here.
            user.passwordDigest = bcrypt.hashSync(user.password, bcrypt.genSaltSync(rounds))
            user.password = null
        }
    })
    // NOTE: A User holds no references to a Check-In or DogPark.
    // User.beforeUpdate((user, options) => {
    //   if (user.isEmailVerified) {
    //     user.email = user.email.toLowerCase()
    //     user.firstName = user.firstName.toLowerCase()
    //     user.lastName = user.lastName.toLowerCase()
    //     /* could call some service methods to fire off or modify data here */
    //     /* istanbul ignore next */
    //     const rounds = env === 'test' ? 1 : 10
    //     user.passwordDigest = bcrypt.hashSync(user.password, bcrypt.genSaltSync(rounds))
    //     user.password = null
    //   }
    // })
    // TODO: After the user signs up, I want them to be validated through email.
    return User
}
