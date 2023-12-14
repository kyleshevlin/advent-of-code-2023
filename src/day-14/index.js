const {
  getInput,
  rotateClockwise,
  rotateCounterClockwise,
  sum,
} = require('../utils')

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(row => row.split(''))

function tiltRocks(row) {
  const result = row

  let i = result.length - 1
  for (i; i >= 0; i--) {
    if (result[i] !== 'O') continue

    let swapped = true
    let j = i
    while (swapped) {
      swapped = false
      const prev = result?.[j + 1]

      if (prev === '.') {
        result[j + 1] = 'O'
        result[j] = '.'
        swapped = true
        j++
      }
    }
  }

  return result
}

function solution1(input) {
  const matrix = formatInput(input)
  const tilted = rotateCounterClockwise(rotateClockwise(matrix).map(tiltRocks))
  const loads = tilted.map(
    (row, idx) => row.filter(c => c === 'O').length * (tilted.length - idx)
  )

  return sum(loads)
}

// console.log(solution1(data)) // 110779

function solution2(input) {}

module.exports = {
  solution1,
  solution2,
}
