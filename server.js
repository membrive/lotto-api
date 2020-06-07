'use strict'

const app = require('./app.js')
const db = require('./models')
const logger = require('./utils/logger')
const port = process.env.PORT || 3000

db.sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection to MySQL has been established successfully')
    app.listen(port, () => logger.info('Lotto API started at port ' + port))
  })
  .catch((err) => {
    logger.error('Unable to connect to the MySQL database:', err.message)
  })
