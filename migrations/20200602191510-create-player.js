'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false
      },
      birthDate: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false,
        validate: {
          isDate: true
        }
      },
      marketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Markets',
          key: 'id'
        }
      },
      balance: {
        allowNull: false,
        type: Sequelize.FLOAT,
        unique: false,
        validate: {
          isFloat: true,
          min: 0
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
    return queryInterface.dropTable('Players')
  }
}
