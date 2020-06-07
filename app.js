'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(
  cors({
    origin: '*'
  })
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.disable('x-powered-by')

// Routes
app.use(require('./controllers'))
app.use(require('./controllers/players'))
app.use(require('./controllers/transactions'))

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.statusCode = 404
  next(err)
})

// Errors handler
app.use(require('./middlewares/errors'))

module.exports = app
