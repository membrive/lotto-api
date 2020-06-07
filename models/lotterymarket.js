'use strict'
module.exports = (sequelize, DataTypes) => {
  const LotteryMarket = sequelize.define('LotteryMarket', {
    lotteryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
      validate: {
        isInt: true
      }
    },
    marketId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: false,
      validate: {
        isInt: true
      }
    }
  }, {})
  LotteryMarket.associate = function (models) {
    // associations can be defined here
  }
  return LotteryMarket
}
