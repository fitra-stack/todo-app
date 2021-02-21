const uuid = require('uuid')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = '12345678'
    return queryInterface.bulkInsert('Users', [
      {
        id: uuid.v4(),
        username: 'budi',
        password: bcrypt.hashSync(password, 12)
      },
      {
        id: uuid.v4(),
        username: 'ani',
        password: bcrypt.hashSync(password, 12)
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null)           
  }
};
