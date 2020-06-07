'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('Lotto API rocks!'))

module.exports = router
