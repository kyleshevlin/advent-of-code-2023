const { getInput, sum } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split(',')

function hash(str) {
  let value = 0

  for (const char of str.split('')) {
    value += char.charCodeAt(0)
    value *= 17
    value %= 256
  }

  return value
}

function solution1(input) {
  const instructions = formatInput(input)

  return sum(instructions.map(hash))
}

// console.log(solution1(data)) // 514025

function solution2(input) {}

module.exports = {
  hash,
  solution1,
  solution2,
}
