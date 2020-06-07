'use strict'

const express = require('express')
const router = express.Router()

router.post('/transactions', require('./createTransaction'))
router.get('/transactions', require('./getTransactions'))

module.exports = router
