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

const PATTERN = /(?<label>[a-z]+)(?<operator>-|=)(?<focalLength>[0-9]?)/

function solution2(input) {
  const instructions = formatInput(input)

  const boxes = {}

  for (const instruction of instructions) {
    const { label, operator, focalLength } = instruction.match(PATTERN).groups
    const key = hash(label)

    if (!boxes[key]) boxes[key] = []

    if (operator === '-') {
      boxes[key] = boxes[key].filter(box => box.label !== label)
      continue
    }

    if (operator === '=') {
      const idx = boxes[key].findIndex(box => box.label === label)
      const nextBox = { label, focalLength: Number(focalLength) }

      if (idx === -1) {
        boxes[key].push(nextBox)
        continue
      }

      boxes[key][idx] = nextBox
    }
  }

  const powers = Object.entries(boxes).flatMap(([boxNum, lenses]) =>
    lenses.map(
      ({ focalLength }, idx) => (1 + Number(boxNum)) * (idx + 1) * focalLength
    )
  )

  return sum(powers)
}

// console.log(solution2(data)) // 244461

module.exports = {
  hash,
  solution1,
  solution2,
}
