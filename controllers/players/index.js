'use strict'

const express = require('express')
const router = express.Router()

router.post('/players', require('./createPlayer'))

module.exports = router
