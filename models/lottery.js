'use strict'

module.exports = (sequelize, DataTypes) => {
  const Lottery = sequelize.define('Lottery', {
    lotteryName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  }, {})
  Lottery.associate = function (models) {
    Lottery.hasMany(models.Transaction, { as: 'transactions' })
    Lottery.belongsToMany(models.Market, {
      through: 'LotteryMarket',
      as: 'market',
      foreignKey: 'lotteryId',
      otherKey: 'marketId'
    })
  }

  return Lottery
}
