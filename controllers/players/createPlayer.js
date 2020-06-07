'use strict'

const logger = require('../../utils/logger')
const Player = require('../../models').Player
const Market = require('../../models').Market

module.exports = async (req, res) => {
  const messages = {
    countryNotSupported: 'Player country not supported',
    generalError: 'Error creating the player'
  }

  const { fullName, birthDate, country, balance } = req.body
  try {
    const marketIdResult = await Market.findOne({
      where: { marketName: country }
    })
    if (!marketIdResult) {
      logger.debug(req.body, messages.countryNotSupported)
      return res.status(400).json({ message: messages.countryNotSupported })
    }

    const marketId = marketIdResult.dataValues.id
    const player = await Player.create({ fullName, birthDate, marketId, balance })
    logger.debug(req.body, messages.success)

    return res.status(201).json({ player })
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
