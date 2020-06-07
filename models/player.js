'use strict'

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define(
    'Player',
    {
      fullName: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
      birthDate: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false,
        validate: {
          isDate: true
        }
      },
      marketId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        validate: {
          isInt: true
        }
      },
      balance: {
        allowNull: false,
        type: DataTypes.FLOAT,
        unique: false,
        validate: {
          isFloat: true,
          min: 0
        }
      }
    },
    {}
  )
  Player.associate = function (models) {
    Player.hasMany(models.Transaction)
    Player.belongsTo(models.Market, { foreignKey: 'marketId' })
  }

  return Player
}
