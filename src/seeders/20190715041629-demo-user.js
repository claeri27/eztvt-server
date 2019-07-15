const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync()

    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuid(),
          username: 'claeri27',
          password: bcrypt.hashSync('bilbo', salt),
          email: 'claeri27@gmail.com',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
        {
          id: uuid(),
          username: 'bobojenkins',
          password: bcrypt.hashSync('bilbo', salt),
          email: 'bobo@gmail.com',
          createdAt: Sequelize.literal('NOW()'),
          updatedAt: Sequelize.literal('NOW()'),
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
