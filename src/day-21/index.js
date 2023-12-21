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

function bfs(grid, startRow, startCol, stepLimit) {
  const visited = new Set()
  const queue = createQueue()
  queue.enqueue([startRow, startCol, 0])

  const isValid = (r, c) => {
    const char = grid?.[r]?.[c]

    return char && char !== '#' && !visited.has(makeKey(r, c))
  }

  while (!queue.isEmpty()) {
    const [row, col, steps] = queue.dequeue()

    for (const [dr, dc] of DIRECTIONS) {
      const nextRow = row + dr
      const nextCol = col + dc
      const nextSteps = steps + 1

      if (nextSteps > stepLimit) continue

      if (isValid(nextRow, nextCol)) {
        visited.add(makeKey(nextRow, nextCol))
        queue.enqueue([nextRow, nextCol, steps + 1])
      }
    }
  }

  return visited
}

function solution1(input, steps) {
  const grid = formatInput(input)
  const [startRow, startCol] = findStart(grid)
  const searchResults = bfs(grid, startRow, startCol, steps)

  return [...searchResults].filter(key => {
    const [row, col] = decodeKey(key)
    const diffRow = startRow - row
    const diffCol = startCol - col

    /**
     * I'm not going to lie, I got this idea from Reddit. And it's still a bit
     * difficult for me to describe or intuit how this works, but here's my best
     * explanation.
     *
     * Any even number of steps taken below the `steps` input can be achieved with
     * some amount of shuffling back and forth on two squares.
     *
     * Essentially, the same can be achieved for any odd number of steps by first
     * stepping in the "wrong" direction and then following an "even" path to
     * that square.
     */
    return (diffRow + diffCol) % 2 === steps % 2
  }).length
}

// console.log(solution1(data, 64)) // 3768

function solution2(input) {}

module.exports = {
  solution1,
  solution2,
}
