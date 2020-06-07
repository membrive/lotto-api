'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Markets', [
      {
        id: 1,
        marketName: 'Germany',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 2,
        marketName: 'United Kingdom',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 3,
        marketName: 'Australia',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Markets', [
      {
        marketName: 'Germany'
      },
      {
        marketName: 'United Kingdom'
      },
      {
        marketName: 'Australia'
      }
    ])
  }
}
