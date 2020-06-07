'use strict'

module.exports = (sequelize, DataTypes) => {
  const Market = sequelize.define('Market', {
    marketName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    }
  }, {})
  Market.associate = function (models) {
    Market.hasMany(models.Player, { as: 'players' })
    Market.belongsToMany(models.Lottery, {
      through: 'LotteryMarket',
      as: 'lottery',
      foreignKey: 'marketId',
      otherKey: 'lotteryId'
    })
  }

  return Market
}
