module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Todos',
      {
        id: {
          type: Sequelize.UUID,
          default: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        description: {
          type: Sequelize.STRING
        },
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {                   
    return queryInterface.dropTable('Todos')
  }
};
