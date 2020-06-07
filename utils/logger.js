const bunyan = require('bunyan')
const logger = bunyan.createLogger({ name: 'lotto', streams: [], src: true })
require('dotenv').config()

logger.addStream({
  name: 'lotto-console',
  level: process.env.LOG_LEVEL || 'info',
  stream: process.stdout
})

module.exports = logger
