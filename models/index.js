'use strict'

const fs = require('fs')
const path = require('path')
const { MYSQL_MODULE } = process.env
const sequelizePackage = MYSQL_MODULE === 'sequelize-mock' ? 'sequelize-mock' : 'sequelize'
const Sequelize = require(sequelizePackage)
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'docker'
const config = require(path.resolve('config', 'config.js'))[env]
const db = {}

let sequelize

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
