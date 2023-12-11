const { getInput, createStack, sum, getManhattanDistance } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

function expandGrid(grid, factor = 2) {
  const colIndexesToExpand = []

  for (let i = 0; i < grid[0].length; i++) {
    if (grid.every(r => r[i] === '.')) {
      colIndexesToExpand.push(i)
    }
  }

  const result = grid
    // Expand rows
    .flatMap(row =>
      row.split('').every(c => c === '.') ? Array(factor).fill(row) : [row]
    )
    // Expand columns
    .map(row =>
      row
        .split('')
        .flatMap((c, i) =>
          colIndexesToExpand.includes(i) ? Array(factor).fill(c) : [c]
        )
        .join('')
    )

  return result
}

function solution1(input, expansionFactor = 2) {
  const grid = formatInput(input)
  const gridExpanded = expandGrid(grid, expansionFactor)

  let id = 1
  const galaxyLocations = gridExpanded.reduce((acc, row, rowIdx) => {
    row.split('').forEach((char, colIdx) => {
      if (char !== '.') {
        acc[id] = [rowIdx, colIdx]
        id++
      }
    })

    return acc
  }, {})

  const pairsDistances = {}

  for (const [idA, locA] of Object.entries(galaxyLocations)) {
    for (const [idB, locB] of Object.entries(galaxyLocations)) {
      if (idA === idB) continue

      const key = [idA, idB].sort().join('-')

      if (pairsDistances[key]) continue

      const distance = getManhattanDistance(...locA, ...locB)
      pairsDistances[key] = distance
    }
  }

  return sum(Object.values(pairsDistances))
}

// console.log(solution1(data)) // 9509330

function solution2(input, expansionFactor) {
  return solution1(input, expansionFactor)
}

// console.log(solution2(data, 1_000_000))

module.exports = {
  solution1,
  solution2,
}
