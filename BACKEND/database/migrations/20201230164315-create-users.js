module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Users',
      {
        id: {
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4,
          primaryKey: true
        },
        username: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {                   
    return queryInterface.dropTable('Users')
  }
};
