'use strict'

const numerics = require('../../utils/numerics')

describe('unit tests for numerics util lib', function () {
  it('should return true for a "123" string', async () => {
    expect(numerics.isInteger('123')).toBe(true)
  })

  it('should return false for a "test" string', async () => {
    expect(numerics.isInteger('test')).toBe(false)
  })

  it('should return true for a 123 integer', async () => {
    expect(numerics.isInteger(123)).toBe(true)
  })

  it('should return false for a 1.2 float', async () => {
    expect(numerics.isInteger(1.2)).toBe(false)
  })
})
