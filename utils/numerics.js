'use strict'

/**
 * Check if a string is an integer
 * @param {String} value
 * @return {Boolean} True or false
 */
const isInteger = function (value) {
  return /^-{0,1}\d+$/.test(value)
}

module.exports = {
  isInteger: isInteger
}
