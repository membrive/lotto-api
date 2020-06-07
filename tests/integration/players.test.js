'use strict'

const request = require('supertest')
const app = require('../../app')
const Player = require('../../models').Player

describe('/players', function () {
  it('should create a new user from Germany', async () => {
    const response = await request(app)
      .post('/players')
      .send({
        fullName: 'TestUser1',
        birthDate: '2020-06-03',
        country: 'Germany',
        balance: 100
      })

    expect(response.status).toEqual(201)
    expect(response.type).toBe('application/json')
  })

  it('should not create a new user from Spain', async () => {
    const response = await request(app)
      .post('/players')
      .send({
        fullName: 'TestUser2',
        birthDate: '2020-06-06',
        country: 'Spain',
        balance: 100
      })

    expect(response.status).toEqual(400)
    expect(response.type).toBe('application/json')
  })

  it('should get a validation error with a bad date', async () => {
    const response = await request(app).post('/players').send({
      fullName: 'TestUser4',
      birthDate: 'TEST',
      country: 'United Kingdom',
      balance: 3000
    })

    expect(response.status).toEqual(400)
    expect(response.type).toBe('application/json')
  })
})

afterAll(() => {
  Player.destroy({ where: { fullName: 'TestUser1' } })
  Player.destroy({ where: { fullName: 'TestUser2' } })
})
