'use strict'

const request = require('supertest')
const app = require('../../app')
const Player = require('../../models').Player

describe('/transactions', function () {
  it('should create a new transaction', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({
        playerId: 2,
        lottery: 'EuroMillions',
        amount: '8'
      })

    expect(response.status).toEqual(201)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('transaction')
  })

  it('should not create a transaction with a lottery that does not exist', async () => {
    const response = await request(app).post('/transactions').send({
      playerId: 2,
      lottery: 'TEST',
      amount: '1'
    })

    expect(response.status).toEqual(400)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty(
      'message',
      'Lottery not supported'
    )
  })

  it('should not create a transaction with a player that does not exist', async () => {
    const response = await request(app).post('/transactions').send({
      playerId: 1000000,
      lottery: 'EuroMillions',
      amount: '1'
    })

    expect(response.status).toEqual(400)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('message', 'The player does not exist')
  })

  it('should not create a transaction bigger than the player balance', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({
        playerId: 2,
        lottery: 'EuroMillions',
        amount: '80000'
      })

    expect(response.status).toEqual(400)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveProperty('message', 'The player does not have enough balance to complete the transaction')
  })

  it('should get a list with one transaction by marketId', async () => {
    const response = await request(app).get('/transactions?marketId=3')
    expect(response.status).toEqual(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveLength(1)
  })

  it('should get a list with one transaction by playerId', async () => {
    const response = await request(app).get('/transactions?playerId=2')
    expect(response.status).toEqual(200)
    expect(response.type).toBe('application/json')
    expect(response.body).toHaveLength(1)
  })

  it('should not get a list with invalid query strings', async () => {
    const response = await request(app).get('/transactions?playerId=adfadfadf')
    expect(response.status).toEqual(400)
    expect(response.type).toBe('application/json')
  })

  it('should not get a list withoug query strings', async () => {
    const response = await request(app).get('/transactions')
    expect(response.status).toEqual(400)
    expect(response.type).toBe('application/json')
  })
})
