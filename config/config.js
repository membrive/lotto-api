'use strict'

const logger = require('../utils/logger')
require('dotenv').config()

module.exports = {
  docker: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    dialect: 'mysql',
    operatorsAliases: 'Sequelize.Op',
    logging: logger.error.bind(logger)
  }
}
