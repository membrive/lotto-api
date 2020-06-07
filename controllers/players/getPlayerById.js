'use strict'

const logger = require('../../utils/logger')
const Player = require('../../models').Player
const Market = require('../../models').Market
const numerics = require('../../utils/numerics')

module.exports = async (req, res) => {
  const messages = {
    generalError: 'Cannot find player',
    playerIdIsNotAnInteger: 'playerId query parameter is not an integer',
    playerNotFound: 'Player does not exist'
  }

  const playerId = req.params.playerId
  if (!numerics.isInteger(playerId)) {
    return res.status(400).json({ message: messages.playerIdIsNotAnInteger })
  }

  try {
    const playerResult = await Player.findOne({
      include: { model: Market },
      where: { id: playerId }
    })

    if (!playerResult) {
      return res.status(404).json({ message: messages.playerNotFound })
    }

    const player = {
      id: playerResult.id,
      fullName: playerResult.fullName,
      birthDate: playerResult.birthDate,
      country: playerResult.Market.marketName,
      balance: playerResult.balance,
      createdAt: playerResult.createdAt
    }

    return res.status(200).json(player)
  } catch (err) {
    logger.error(req.body, req.query, messages.generalError + ': ' + err.message)
    return res.status(500).json({ message: messages.generalError })
  }
}
