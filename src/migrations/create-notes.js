module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            unqiue: true,
            allowNull: false,
            isEmail: true
        },
        isEmailVerified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        password: {
            type: Sequelize.STRING
        },
        passwordDigest: {
            type: Sequelize.STRING,
            allowNull: false
        },
        resetPasswordToken: {
            type: Sequelize.STRING
        },
        resetPasswordExpires: {
            type: Sequelize.DATE
        },
        roles: {
            type: Sequelize.ENUM(['admin', 'user', 'finder']),
            defaultValue: 'user'
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    }),
    down: queryInterface => queryInterface.dropTable('Users')
}
