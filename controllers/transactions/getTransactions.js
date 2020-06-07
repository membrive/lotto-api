'use strict'

const logger = require('../../utils/logger')
const Transaction = require('../../models').Transaction
const Player = require('../../models').Player
const Lottery = require('../../models').Lottery
const numerics = require('../../utils/numerics')

module.exports = async (req, res) => {
  const messages = {
    noSearchQuery: 'No search query provided. Please, provide playerId or marketId.',
    onlyOneSearchQuery: 'Only one search query was expected',
    queryStringShouldBeInt: 'marketId or playerId should be integers',
    noTransactionsFound: 'No transactions founds',
    generalError: 'An error has ocurred. No transactions found'
  }

  const { playerId, marketId } = req.query

  if (!playerId && !marketId) {
    return res.status(400).json({ message: messages.noSearchQuery })
  }

  if (playerId && marketId) {
    return res.status(400).json({ message: messages.onlyOneSearchQuery })
  }

  if (!numerics.isInteger(playerId) && !numerics.isInteger(marketId)) {
    return res.status(400).json({ message: messages.queryStringShouldBeInt })
  }

  try {
    let transactionsResult
    const transactions = []

    if (playerId) {
      transactionsResult = await Transaction.findAll({
        include: [
          { model: Lottery }
        ],
        where: { playerId: playerId }
      })
    }

    if (marketId) {
      transactionsResult = await Transaction.findAll({
        include: [
          {
            model: Player,
            where: { marketId: marketId }
          },
          { model: Lottery }
        ]
      })
    }

    for (let i = 0; i < transactionsResult.length; i++) {
      transactions.push({
        id: transactionsResult[i].id,
        lottery: transactionsResult[i].Lottery.lotteryName,
        amount: transactionsResult[i].amount,
        createdAt: transactionsResult[i].createdAt
      })
    }

    if (transactions.length === 0) {
      return res.status(404).json({ message: messages.noTransactionsFound })
    }

    return res.status(200).json(transactions)
  } catch (err) {
    console.log(err)
    logger.error(req.body, messages.generalError + ': ' + err.message)
    return res.status(500).json({ message: messages.generalError })
  }
}
