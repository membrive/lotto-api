'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Players',
          key: 'id'
        },
        validate: {
          isInt: true
        }
      },
      lotteryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Lotteries',
          key: 'id'
        },
        validate: {
          isInt: true
        }
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
        unique: false,
        validate: {
          isFloat: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions')
  }
}
