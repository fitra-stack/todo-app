const uuid = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT `id` from `Users`'
    )

    if (users && users.length > 0) {
      return Promise.all(
        users.map((user, index) => queryInterface.bulkInsert('Todos', [
          {
            id: uuid.v4(),
            name: 'Belajar',
            description: '',
            user_id: user[index].id
          },
          {
            id: uuid.v4(),
            name: 'Makan',
            description: '',
            user_id: user[index].id
          }
        ]))
      )
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null)           
  }
};
