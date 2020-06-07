'use strict'

const request = require('supertest')
const app = require('../../app')

describe('/random404', function () {
  it('should return a 404 when an endpoint does not exist', async () => {
    const response = await request(app).get('/random404')

    expect(response.status).toEqual(404)
    expect(response.type).toBe('application/json')
  })
})
