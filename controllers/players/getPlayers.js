'use strict'

const logger = require('../../utils/logger')
const Player = require('../../models').Player
const Market = require('../../models').Market

module.exports = async (req, res) => {
  const messages = {
    generalError: 'Cannot find players'
  }

  try {
    const playersResult = await Player.findAll({
      include: { model: Market }
    })

    const players = []
    for (let i = 0; i < playersResult.length; i++) {
      players.push({
        id: playersResult[i].id,
        fullName: playersResult[i].fullName,
        birthDate: playersResult[i].birthDate,
        country: playersResult[i].Market.marketName,
        balance: playersResult[i].balance,
        createdAt: playersResult[i].createdAt
      })
    }

    if (players.length === 0) {
      return res.status(404).json({ message: messages.noPlayersFound })
    }

    return res.status(200).json(players)
  } catch (err) {
    logger.error(req.body, req.query, messages.generalError + ': ' + err.message)
    return res.status(500).json({ message: messages.generalError })
  }
}
