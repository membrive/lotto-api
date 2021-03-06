'use strict'

const logger = require('../../utils/logger')
const Player = require('../../models').Player
const Market = require('../../models').Market
const numerics = require('../../utils/numerics')

module.exports = async (req, res) => {
  const messages = {
    generalError: 'Cannot find player',
    playerIdIsNotAnInteger: 'playerId query parameter is not an integer',
    playerNotFound: 'Player does not exist',
    playerCountryCantBeChanged: 'Player country can not be changed'
  }

  const playerId = req.params.playerId
  if (!numerics.isInteger(playerId)) {
    return res.status(400).json({ message: messages.playerIdIsNotAnInteger })
  }

  try {
    const playerResult = await Player.findOne({ where: { id: playerId } })

    if (!playerResult) {
      return res.status(404).json({ message: messages.playerNotFound })
    }

    const marketIdResult = await Market.findOne({
      where: { marketName: req.body.country }
    })
    if (!marketIdResult) {
      logger.debug(req.body, messages.countryNotSupported)
      return res.status(400).json({ message: messages.countryNotSupported })
    }
    const marketId = marketIdResult.dataValues.id
    if (playerResult.marketId !== marketId) {
      return res.status(403).json({ message: messages.playerCountryCantBeChanged })
    }

    playerResult.fullName = req.body.fullName
    playerResult.birthDate = req.body.birthDate
    playerResult.balance = req.body.balance

    playerResult.save()

    return res.status(200).json(playerResult)
  } catch (err) {
    logger.error(req.body, req.query, messages.generalError + ': ' + err.message)
    return res.status(500).json({ message: messages.generalError })
  }
}
