'use strict'

const logger = require('../../utils/logger')
const Player = require('../../models').Player
const numerics = require('../../utils/numerics')

module.exports = async (req, res) => {
  const messages = {
    generalError: 'Cannot delete the player',
    playerIdIsNotAnInteger: 'playerId query parameter is not an integer',
    playerNotFound: 'Player does not exist',
    playerDeleted: 'The player has been deleted'
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

    await Player.destroy({ where: { id: playerId } })

    return res.status(200).json({ message: messages.playerDeleted })
  } catch (err) {
    logger.error(req.body, req.query, messages.generalError + ': ' + err.message)
    return res.status(500).json({ message: err.message })
  }
}
