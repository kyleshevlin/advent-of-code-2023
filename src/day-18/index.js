const { getInput, createStack } = require('../utils')

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => {
      const [dir, amount, wrappedColor] = line.split(' ')
      const color = wrappedColor.replace('(', '').replace(')', '')

      return { dir, amount: Number(amount), color }
    })

function getNextCoord(dir, row, col) {
  switch (dir) {
    case 'U':
      return [row - 1, col]
    case 'D':
      return [row + 1, col]
    case 'R':
      return [row, col + 1]
    case 'L':
      return [row, col - 1]
  }
}

function dig(instructions) {
  const visited = {
    '0,0': true,
  }

  let current = [0, 0]
  for (const inst of instructions) {
    const { dir, amount } = inst

    for (let i = 0; i < amount; i++) {
      const nextCoord = getNextCoord(dir, ...current)
      visited[nextCoord.join(',')] = true
      current = nextCoord
    }
  }

  return visited
}

/**
 * We're going to make the top-most left-most visited spot 0,0 and adjust all
 * the keys accordingly
 */
function normalizeVisited(visited) {
  const keys = Object.keys(visited)
  const rows = keys.map(key => key.split(',').map(Number).at(0))
  const cols = keys.map(key => key.split(',').map(Number).at(1))

  const minRow = Math.min(...rows)
  const minCol = Math.min(...cols)

  const rowAdj = minRow * -1
  const colAdj = minCol * -1

  const normalizedKeys = keys.map(key => {
    const [row, col] = key.split(',').map(Number)

    return [row + rowAdj, col + colAdj].join(',')
  })

  return normalizedKeys.reduce((acc, key) => {
    acc[key] = true
    return acc
  }, {})
}

function getPerimeter(visited) {
  const keys = Object.keys(visited)
  const rows = keys.map(key => key.split(',').map(Number).at(0))
  const cols = keys.map(key => key.split(',').map(Number).at(1))

  const minRow = Math.min(...rows)
  const maxRow = Math.max(...rows)
  const minCol = Math.min(...cols)
  const maxCol = Math.max(...cols)

  const rowDiff = maxRow + 1 - minRow
  const colDiff = maxCol + 1 - minCol

  // We're probably gonna have to be able to shift the whole map so the top most
  // left most ends up 0,0

  const grid = Array(rowDiff)
    .fill()
    .map(() => Array(colDiff).fill('.'))

  for (const key of keys) {
    const [r, c] = key.split(',')
    grid[r][c] = '#'
  }

  return grid
}

function fillGrid(grid, startRow, startCol) {
  const clone = grid.map(x => x.slice()).slice()

  const isValid = (r, c) => {
    const char = clone?.[r]?.[c]
    return char && char !== '#'
  }

  const DIRS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  function fill(row, col) {
    const stack = createStack()
    stack.push([row, col])

    while (!stack.isEmpty()) {
      const [r, c] = stack.pop()

      for (const [rAdj, cAdj] of DIRS) {
        const nr = r + rAdj
        const nc = c + cAdj

        if (isValid(nr, nc)) {
          clone[nr][nc] = '#'
          stack.push([nr, nc])
        }
      }
    }
  }

  fill(startRow, startCol)

  return clone
}

function visualize(visited) {
  const grid = getPerimeter(visited)
  console.log(grid.map(row => row.join('')).join('\n'))
}

function solution1(input) {
  const instructions = formatInput(input)
  const visited = dig(instructions)
  const normalized = normalizeVisited(visited)
  const perimeter = getPerimeter(normalized)

  /**
   * Making a bit of an assumption here, but since I normalized the grid to move
   * the left most square to a c === 0, I am confident that I can assume the first
   * row that starts with an '#' that we encounter is a corner. Given that in
   * order to fill inner space we need to have inner space, we can probably safely
   * assume that going 1 row further down and 1 column in from there, is the
   * leftmost interior square of the loop.
   */
  const firstRowIdx = perimeter.findIndex(row => row.at(0) === '#')
  const filled = fillGrid(perimeter, firstRowIdx + 1, 1)

  return filled.flatMap(row => row.filter(c => c === '#')).length
}

// console.log(solution1(data)) // 106459

function solution2(input) {}

module.exports = {
  solution1,
  solution2,
}
