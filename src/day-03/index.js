const { getInput, sum, trace } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

const getNumbers = lines =>
  lines
    .map((line, rowIdx) =>
      line.split('').map((char, colIdx) => ({
        char,
        rowIdx,
        colIdx,
      }))
    )
    .flatMap(items => {
      const results = []

      let num = null
      for (const [idx, item] of items.entries()) {
        const { char } = item
        const int = parseInt(char, 10)

        if (isNaN(int)) {
          // we might be done building a number, store and reset
          if (num) {
            results.push(num)
            num = null
          }

          continue
        }

        if (!num) {
          num = item
        } else {
          num = {
            ...num,
            char: num.char + char,
          }
        }

        if (idx === items.length - 1 && num) {
          results.push(num)
        }
      }

      return results
    })

const isAdjacentToSymbol = (lines, value) => {
  const rowBeforeIdx = value.rowIdx - 1
  const rowAfterIdx = value.rowIdx + 1
  const colBeforeIdx = value.colIdx - 1
  const colAfterIdx = value.colIdx + value.char.length

  for (let rowIdx = rowBeforeIdx; rowIdx <= rowAfterIdx; rowIdx++) {
    for (let colIdx = colBeforeIdx; colIdx <= colAfterIdx; colIdx++) {
      const char = lines?.[rowIdx]?.[colIdx]

      if (char === undefined) continue

      if (!/[0-9]|\./.test(char)) {
        return true
      }
    }
  }

  return false
}

function solution1(input) {
  const formatted = formatInput(input)
  const numbers = getNumbers(formatted)
  const adjacentNumbers = numbers.filter(item =>
    isAdjacentToSymbol(formatted, item)
  )
  const ints = adjacentNumbers.map(({ char }) => parseInt(char, 10))

  return sum(ints)
}

function getGears(lines) {
  return lines
    .flatMap((chars, rowIdx) =>
      chars.split('').map((char, colIdx) => {
        return { char, rowIdx, colIdx }
      })
    )
    .filter(item => item.char === '*')
}

const getRatios = (gears, numbers) => {
  const results = []

  for (const gear of gears) {
    const { rowIdx: gearRowIdx, colIdx: gearColIdx } = gear
    const rowBeforeGear = gearRowIdx - 1
    const rowAfterGear = gearRowIdx + 1
    const colBeforeGear = gearColIdx - 1
    const colAfterGear = gearColIdx + 1

    const adjacentNums = []

    for (let rowIdx = rowBeforeGear; rowIdx <= rowAfterGear; rowIdx++) {
      for (let colIdx = colBeforeGear; colIdx <= colAfterGear; colIdx++) {
        // This is inefficient, looping through the numbers each time, but it'll do for now
        for (const num of numbers) {
          if (num.rowIdx === rowIdx) {
            const start = num.colIdx
            const end = num.colIdx + num.char.length - 1

            if (start <= colIdx && colIdx <= end) {
              // Don't add a num that's already included
              // A more efficient algorithm would be able to skip past the rest of the number
              if (!adjacentNums.includes(num)) {
                adjacentNums.push(num)
              }
            }
          }
        }
      }
    }

    if (adjacentNums.length === 2) {
      const [first, second] = adjacentNums.map(item => parseInt(item.char, 10))
      results.push(first * second)
    }
  }

  return results
}

function solution2(input) {
  const lines = formatInput(input)
  const numbers = getNumbers(lines)
  const gears = getGears(lines)
  const ratios = getRatios(gears, numbers)

  return sum(ratios)
}

// console.log(solution1(data)) // 533775

// console.log(solution2(data)) // 78236071

module.exports = {
  solution1,
  solution2,
}
