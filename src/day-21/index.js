const { getInput, createQueue } = require('../utils')

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(row => row.split(''))

function findStart(grid) {
  for (const [r, row] of grid.entries()) {
    for (const [c, char] of row.entries()) {
      if (char === 'S') return [r, c]
    }
  }
}

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]

const makeKey = (r, c) => `${r},${c}`
const decodeKey = key => key.split(',').map(Number)

function fill(grid, startRow, startCol, stepLimit) {
  let result = new Set([makeKey(startRow, startCol)])

  const isValid = (r, c) => {
    const char = grid?.[r]?.[c]
    return char === '.' || char === 'S'
  }

  for (let i = 0; i < stepLimit; i++) {
    const nextResult = new Set()

    for (const key of result.values()) {
      const [row, col] = decodeKey(key)

      for (const [dr, dc] of DIRECTIONS) {
        const nextRow = row + dr
        const nextCol = col + dc

        if (isValid(nextRow, nextCol)) {
          nextResult.add(makeKey(nextRow, nextCol))
        }
      }
    }

    result = nextResult
  }

  return result
}

function solution1(input, steps) {
  const grid = formatInput(input)
  const [startRow, startCol] = findStart(grid)
  const fillResults = fill(grid, startRow, startCol, steps)

  return fillResults.size
}

// console.log(solution1(data, 64)) // 3768

function solution2(input) {}

module.exports = {
  solution1,
  solution2,
}
