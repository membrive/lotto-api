'use strict'

const logger = require('../utils/logger')

module.exports = (err, req, res, next) => {
  logger.error(err)

  err.statusCode = err.statusCode || 500
  if (err.statusCode > 499) {
    err.message = 'Internal Server Error'
  }

  return res.status(err.statusCode).json({ message: err.message })
}
