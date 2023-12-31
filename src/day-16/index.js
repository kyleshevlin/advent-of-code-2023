const { getInput } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

function getNextBeams(beam, char) {
  const { row, col, dir } = beam

  switch (char) {
    case '.': {
      switch (dir) {
        case 'N':
          return [{ row: row - 1, col, dir }]
        case 'E':
          return [{ row, col: col + 1, dir }]
        case 'S':
          return [{ row: row + 1, col, dir }]
        case 'W':
          return [{ row, col: col - 1, dir }]
      }
    }

    case '|': {
      switch (dir) {
        case 'N':
          return [{ row: row - 1, col, dir }]
        case 'E':
          return [
            { row: row - 1, col, dir: 'N' },
            { row: row + 1, col, dir: 'S' },
          ]
        case 'S':
          return [{ row: row + 1, col, dir }]
        case 'W':
          return [
            { row: row - 1, col, dir: 'N' },
            { row: row + 1, col, dir: 'S' },
          ]
      }
    }

    case '-': {
      switch (dir) {
        case 'N':
          return [
            { row, col: col - 1, dir: 'W' },
            { row, col: col + 1, dir: 'E' },
          ]
        case 'E':
          return [{ row, col: col + 1, dir }]
        case 'S':
          return [
            { row, col: col - 1, dir: 'W' },
            { row, col: col + 1, dir: 'E' },
          ]
        case 'W':
          return [{ row, col: col - 1, dir }]
      }
    }

    case '/': {
      switch (dir) {
        case 'N':
          return [{ row, col: col + 1, dir: 'E' }]
        case 'E':
          return [{ row: row - 1, col, dir: 'N' }]
        case 'S':
          return [{ row, col: col - 1, dir: 'W' }]
        case 'W':
          return [{ row: row + 1, col, dir: 'S' }]
      }
    }

    case '\\': {
      switch (dir) {
        case 'N':
          return [{ row, col: col - 1, dir: 'W' }]
        case 'E':
          return [{ row: row + 1, col, dir: 'S' }]
        case 'S':
          return [{ row, col: col + 1, dir: 'E' }]
        case 'W':
          return [{ row: row - 1, col, dir: 'N' }]
      }
    }

    default:
      throw new Error(`beam: ${JSON.stringify(beam)}, char: ${char}`)
  }
}

function getEnergized(grid, start) {
  const visited = {}

  const beams = [start]
  while (beams.length) {
    const beam = beams.shift()
    const { row, col, dir } = beam
    const char = grid?.[row]?.[col]

    // If we are off the grid, go to the next beam
    if (!char) continue

    const key = `${row},${col}`

    // Instantiate an object to track which direction we hit this cell
    if (!visited[key]) visited[key] = {}

    // If we've come from that direction before, we have a loop and can skip it
    if (visited[key][dir]) continue

    // Mark the cell and direction as visited
    visited[key][dir] = true

    beams.push(...getNextBeams(beam, char))
  }

  return Object.keys(visited).length
}

function solution1(input) {
  const grid = formatInput(input)

  return getEnergized(grid, { row: 0, col: 0, dir: 'E' })
}

// console.log(solution1(data)) // 7060

function solution2(input) {
  const grid = formatInput(input)

  const results = []

  for (let r = 0; r < grid.length; r++) {
    results.push(getEnergized(grid, { row: r, col: 0, dir: 'E' }))
    results.push(
      getEnergized(grid, { row: r, col: grid[0].length - 1, dir: 'W' })
    )
  }

  for (let c = 0; c < grid[0].length; c++) {
    results.push(getEnergized(grid, { row: 0, col: c, dir: 'S' }))
    results.push(getEnergized(grid, { row: grid.length - 1, col: c, dir: 'N' }))
  }

  return Math.max(...results)
}

// console.log(solution2(data)) // 7493

module.exports = {
  getNextBeams,
  solution1,
  solution2,
}
