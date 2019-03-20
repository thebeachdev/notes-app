module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notes', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    text: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Notes')
}
