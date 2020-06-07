'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Lotteries', [
      {
        id: 1,
        lotteryName: 'EuroMillions',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 2,
        lotteryName: 'PowerBall',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 3,
        lotteryName: 'EuroJackpot',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 4,
        lotteryName: 'MegaMillions',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        id: 5,
        lotteryName: 'MINILotto',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Lotteries', [
      {
        lotteryName: 'EuroMillions'
      },
      {
        lotteryName: 'PowerBall'
      },
      {
        lotteryName: 'EuroJackpot'
      },
      {
        lotteryName: 'MegaMillions'
      },
      {
        lotteryName: 'MINILotto'
      }
    ])
  }
}
