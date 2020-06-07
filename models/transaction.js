'use strict'

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    playerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
      validate: {
        isInt: true
      }
    },
    lotteryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
      validate: {
        isInt: true
      }
    },
    amount: {
      allowNull: false,
      type: DataTypes.FLOAT,
      unique: false,
      validate: {
        isFloat: true
      }
    }
  }, {})
  Transaction.associate = function (models) {
    Transaction.belongsTo(models.Player, { foreignKey: 'playerId' })
    Transaction.belongsTo(models.Lottery, { foreignKey: 'lotteryId' })
  }

  return Transaction
}
