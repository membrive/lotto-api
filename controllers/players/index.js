'use strict'

const express = require('express')
const router = express.Router()

router.post('/players', require('./createPlayer'))
router.get('/players', require('./getPlayers'))
router.get('/players/:playerId', require('./getPlayerById'))

module.exports = router
