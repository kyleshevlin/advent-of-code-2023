const { getInput, sum } = require('../utils')

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(row => {
      const [springs, groupingsStr] = row.split(' ')
      const groupings = groupingsStr.split(',').map(Number)

      return [springs, groupings]
    })

function* getCombos(length, current = '') {
  if (length === 0) {
    yield current
    return
  }

  yield* getCombos(length - 1, current + '.')
  yield* getCombos(length - 1, current + '#')
}

function isValid(spring, groupings) {
  const groups = spring.replaceAll(/\.+/g, ' ').split(' ').filter(Boolean)

  if (groups.length !== groupings.length) return false

  return groupings.every((num, idx) => num === groups[idx]?.length)
}

function findNumberOfPossibleArrangements(springs, groupings) {
  // Make every possible permutation given the springs
  // Find out how many question marks you have
  const unknowns = springs.split('').filter(c => c === '?').length

  // Make every possible combo of operational/broken you can for that many unknowns
  const comboGenerator = getCombos(unknowns)

  // Loop through the combos, replacing all the ?s with the chars of it
  // Check if it's valid. If so, add it to the count
  let result = 0

  for (const combo of comboGenerator) {
    const comboChars = combo.split('')
    const spring = springs
      .split('')
      .map(c => (c === '?' ? comboChars.shift() : c))
      .join('')

    if (isValid(spring, groupings)) {
      result++
    }
  }

  return result
}

function solution1(input) {
  const rows = formatInput(input)
  const arrangements = rows.map(row => findNumberOfPossibleArrangements(...row))

  return sum(arrangements)
}

// console.log(solution1(data)) // 7857

function solution2(input) {
  const rows = formatInput(input)
  const unfoldedRows = rows.map(row => {
    const [springs, groupings] = row

    return [
      Array(5).fill(springs).join('?'),
      Array(5)
        .fill(undefined)
        .flatMap(() => [...groupings]),
    ]
  })

  const arrangements = unfoldedRows.map(row =>
    findNumberOfPossibleArrangements(...row)
  )

  return sum(arrangements)
}

module.exports = {
  solution1,
  solution2,
}
