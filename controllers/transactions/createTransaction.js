'use strict'

const logger = require('../../utils/logger')
const Transaction = require('../../models').Transaction
const Player = require('../../models').Player
const Lottery = require('../../models').Lottery
const db = require('../../models')

module.exports = async (req, res) => {
  const messages = {
    generalError: 'Cannot create the transaction',
    lotteryNotSupported: 'Lottery not supported',
    playerNotExist: 'The player does not exist',
    notEnoughBalance: 'The player does not have enough balance to complete the transaction'
  }

  const { playerId, lottery, amount } = req.body
  try {
    const lotteryIdResult = await Lottery.findOne({
      where: { lotteryName: lottery }
    })
    if (!lotteryIdResult) {
      return res.status(400).json({ message: messages.lotteryNotSupported })
    }
    const lotteryId = lotteryIdResult.dataValues.id

    const playerIdResult = await Player.findOne({ where: { id: playerId } })
    if (!playerIdResult) {
      return res.status(400).json({ message: messages.playerNotExist })
    }

    const playerBalance = playerIdResult.dataValues.balance
    if (amount > playerBalance) {
      return res.status(400).json({ message: messages.notEnoughBalance })
    }

    let transaction
    await db.sequelize.transaction(async (t) => {
      await Player.update(
        { balance: playerBalance - amount },
        { where: { id: playerId } },
        { transaction: t }
      )

      transaction = await Transaction.create({
        playerId: playerId,
        lotteryId: lotteryId,
        amount
      }, { transaction: t })
    })

    return res.status(201).json({ transaction })
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      logger.debug(
        req.body, messages.generalError + ': ' + err.errors[0].message
      )
      return res.status(400).json({
        message: messages.generalError + ': ' + err.errors[0].message
      })
    }

    logger.error(req.body, messages.generalError + ': ' + err.message)
    return res.status(500).json({ message: messages.generalError })
  }
}
