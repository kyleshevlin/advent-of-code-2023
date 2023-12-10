const { getInput, createStack } = require('../utils')

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => line.trim())

function findStart(grid) {
  for (const [rowIdx, row] of grid.entries()) {
    const chars = row.split('')
    const colIdx = chars.findIndex(c => c === 'S')

    if (colIdx > -1) return [rowIdx, colIdx]
  }
}

// Based on the direction you went into the pipe, what direction
// would you be going next.
const PIPES_TO_CURRENT_DIRECTION_TO_NEXT_DIRECTION = {
  '|': { S: 'S', N: 'N' },
  '-': { E: 'E', W: 'W' },
  L: { S: 'E', W: 'N' },
  J: { S: 'W', E: 'N' },
  7: { N: 'W', E: 'S' },
  F: { N: 'E', W: 'S' },
}

function getStartingDirs(grid, r, c) {
  const startingDirs = []

  if (['|', '7', 'F'].includes(grid?.[r - 1]?.[c])) {
    startingDirs.push('N')
  }

  if (['-', 'L', 'F'].includes(grid?.[r]?.[c - 1])) {
    startingDirs.push('W')
  }

  if (['-', 'J', '7'].includes(grid?.[r]?.[c + 1])) {
    startingDirs.push('E')
  }

  if (['|', 'L', 'J'].includes(grid?.[r + 1]?.[c])) {
    startingDirs.push('S')
  }

  return startingDirs
}

function getNextLocation(grid, dir, location) {
  const [row, col] = location

  switch (dir) {
    case 'N':
      return [row - 1, col]
    case 'E':
      return [row, col + 1]
    case 'S':
      return [row + 1, col]
    case 'W':
      return [row, col - 1]
  }
}

function getNextStep(grid, walker) {
  const { dir, location } = walker

  const nextLocation = getNextLocation(grid, dir, location)
  const [nextRow, nextCol] = nextLocation
  const nextSquare = grid?.[nextRow]?.[nextCol]
  const nextDir = PIPES_TO_CURRENT_DIRECTION_TO_NEXT_DIRECTION[nextSquare][dir]

  return { dir: nextDir, location: nextLocation }
}

function areSameLocations(loc1, loc2) {
  const [r1, c1] = loc1
  const [r2, c2] = loc2

  return r1 === r2 && c1 === c2
}

function solution1(input) {
  const grid = formatInput(input)
  const start = findStart(grid)
  const startingDirs = getStartingDirs(grid, ...start)

  let steps = 0
  let walkers = startingDirs.map(dir => ({
    dir,
    location: start,
  }))

  do {
    const nextWalkers = walkers.map(w => getNextStep(grid, w))
    steps++
    walkers = nextWalkers
  } while (!areSameLocations(walkers[0].location, walkers[1].location))

  return steps
}

// console.log(solution1(data)) // 7086

function closureFill(grid, startingRow, startingCol) {
  const clone = grid.map(x => x.slice()).slice()

  const isValid = (a, b) => {
    const char = clone?.[a]?.[b]
    return char && char !== 'X' && char !== 'O'
  }

  const DIRS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]

  // stack based flood fill (recursive caused stack overflow errors)
  function fill(row, col) {
    const stack = createStack()
    stack.push([row, col])

    while (!stack.isEmpty()) {
      const [currentRow, currentCol] = stack.pop()

      for (const [rowAdjustment, colAdjustment] of DIRS) {
        const nextRow = currentRow + rowAdjustment
        const nextCol = currentCol + colAdjustment

        if (isValid(nextRow, nextCol)) {
          clone[nextRow][nextCol] = 'O'
          stack.push([nextRow, nextCol])
        }
      }
    }
  }

  fill(startingRow, startingCol)

  return clone
}

function solution2(input) {
  const grid = formatInput(input)

  /**
   * I realized that we could extend the grid, both vertically and horizontally
   * to ensure that no 2 pipes in the loop are adjacent, and therefore disrupting
   * the ability to flood fill.
   *
   * We'll add the extensions and a perimeter to the grid, and then once we've
   * flooded the grid, we'll remove them in order to get the correct count.
   */
  const withExtensions = grid
    .map(row => row.split('').reduce((acc, cur) => [...acc, cur, '-'], []))
    .reduce((acc, cur) => [...acc, cur, Array(cur.length).fill('|')], [])
    .map(row => row.join(''))

  const originalStart = findStart(grid)
  const extendedStart = findStart(withExtensions)
  const startingDirs = getStartingDirs(grid, ...originalStart)

  let walkers = startingDirs.map(dir => ({
    dir,
    location: extendedStart,
  }))

  do {
    const nextWalkers = walkers.map(w => getNextStep(withExtensions, w))

    // Update the grid where the walkers have been to an 'X'
    walkers.forEach(walker => {
      const [r, c] = walker.location
      const chars = withExtensions[r].split('')
      chars[c] = 'X'
      withExtensions[r] = chars.join('')
    })

    walkers = nextWalkers
  } while (!areSameLocations(walkers[0].location, walkers[1].location))

  /**
   * The pipe loop isn't getting closed because we don't have a way in the
   * do..while loop to put an 'X' on the final spot, so we're going to do that
   * manually here
   */
  const [r, c] = walkers[0].location
  const chars = withExtensions[r].split('')
  chars[c] = 'X'
  withExtensions[r] = chars.join('')

  // Now we're going to prepare the grid to flood fill.
  // Set every non 'X' to 'I'
  const withIs = withExtensions.map(line =>
    line.split('').map(c => (c !== 'X' ? 'I' : 'X'))
  )

  /**
   * Add a perimeter of I's so we can flood fill and ensure to get everything
   * If we don't, then it's possible for there to be outside values that aren't
   * accessible because the flooding won't go into the undefined area of the grid
   */
  const withPerimeter = [
    Array(withIs.at(0).length + 2).fill('I'),
    ...withIs.map(row => ['I', ...row, 'I']),
    Array(withIs.at(0).length + 2).fill('I'),
  ]

  const floodedGrid = closureFill(withPerimeter, 0, 0)

  /**
   * Now, we're going to remove all of the extra cells we added, starting with
   * the perimeter
   */
  const withoutPerimeter = floodedGrid
    .filter((_, idx) => idx !== 0 && idx !== floodedGrid.length - 1)
    .map(r => {
      return r.filter((_, i) => i !== 0 && i !== r.length - 1)
    })

  // And now any of our extensions
  const withoutExtensions = withoutPerimeter
    .filter((_, i) => i % 2 === 0)
    .map(r => r.filter((_, i) => i % 2 === 0))

  // We're left with a grid of our original size and only the correct 'I's remaining
  return withoutExtensions.flat().filter(c => c === 'I').length
}

// console.log(solution2(data)) // 317

module.exports = {
  solution1,
  solution2,
}
