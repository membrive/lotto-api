require('./unit/numerics.test')
require('./integration/errors.test')
require('./integration/players.test')
require('./integration/transactions.test')

const Player = require('../models').Player

afterAll(() => {
  return Player.destroy({
    where: {
      fullName: [
        'TestUser1',
        'TestUser2',
        'TestUser3',
        'TestUser4',
        'TestUser5'
      ]
    }
  })
})
