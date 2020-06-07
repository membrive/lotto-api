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
    const response = await request(app)
      .post('/players')
      .send({
        fullName: 'TestUser3',
        birthDate: 'TEST',
        country: 'United Kingdom',
        balance: 3000
      })

    expect(response.status).toEqual(400)
    expect(response.type).toBe('application/json')
  })

  it('should get the players list', async () => {
    const response = await request(app).get('/players')

    expect(response.status).toEqual(200)
    expect(response.type).toBe('application/json')
  })

  it('should get the player with id 1', async () => {
    const response = await request(app).get('/players/1')

    expect(response.status).toEqual(200)
    expect(response.type).toBe('application/json')
  })

  it('should create a new user from Germany', async () => {
    const response = await request(app).post('/players').send({
      fullName: 'TestUser4',
      birthDate: '2020-06-03',
      country: 'Australia',
      balance: 100
    })

    expect(response.status).toEqual(201)
    expect(response.type).toBe('application/json')
  })

  it('should delete the player with id 1', async () => {
    const response = await request(app).delete('/players/1')

    expect(response.status).toEqual(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('message', 'The player has been deleted')
  })

  it('should not get the player with id adfadfadf', async () => {
    const response = await request(app).get('/players/adfadfadf')

    expect(response.status).toEqual(400)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty(
      'message',
      'playerId query parameter is not an integer'
    )
  })

  it('should not delete the player with id adfadfadf', async () => {
    const response = await request(app).delete('/players/adfadfadf')

    expect(response.status).toEqual(400)
    expect(response.type).toBe('application/json')
  })
})
