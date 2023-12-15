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

function solution2(input) {
  const instructions = formatInput(input)

  const boxes = {}

  for (const instruction of instructions) {
    const label = instruction.split(/=|-/).at(0)
    const key = hash(label)

    if (!boxes[key]) boxes[key] = []

    if (instruction.includes('-')) {
      boxes[key] = boxes[key].filter(box => box.label !== label)
    }

    if (instruction.includes('=')) {
      const idx = boxes[key].findIndex(box => box.label === label)
      const focalLength = instruction.split('=').at(1)
      const nextBox = { label, focalLength: Number(focalLength) }

      if (idx === -1) {
        boxes[key].push(nextBox)
        continue
      }

      boxes[key][idx] = nextBox
    }
  }

  const powers = []

  for (const [boxNumber, lenses] of Object.entries(boxes)) {
    for (const [idx, { focalLength }] of lenses.entries()) {
      const value = (1 + Number(boxNumber)) * (idx + 1) * focalLength
      powers.push(value)
    }
  }

  return sum(powers)
}

// console.log(solution2(data)) // 244461

module.exports = {
  hash,
  solution1,
  solution2,
}
