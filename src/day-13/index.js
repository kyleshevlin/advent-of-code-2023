const { getInput } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n\n')

function findMirror(note) {
  const rows = note.split('\n')
  const rowResult = findReflection(rows, 'row')

  if (rowResult) return rowResult

  const cols = []
  rows.forEach(row => {
    row.split('').forEach((char, idx) => {
      if (!cols[idx]) cols[idx] = []
      cols[idx].push(char)
    })
  })

  const colResult = findReflection(
    cols.map(c => c.join('')),
    'column'
  )

  return colResult
}

function findReflection(rows, type) {
  let i = 0
  for (i; i < rows.length; i++) {
    const rowsBefore = rows.slice(0, i + 1)
    const rowsAfter = rows.slice(i + 1)
    const rowsToCheck = Math.min(rowsBefore.length, rowsAfter.length)
    const rowsBeforeAdj = rowsBefore.toReversed().slice(0, rowsToCheck)
    const rowsAfterAdj = rowsAfter.slice(0, rowsToCheck)

    if (!rowsBeforeAdj.length || !rowsAfterAdj.length) continue

    let j = 0
    let success = true
    for (j; j < rowsToCheck; j++) {
      if (rowsBeforeAdj[j] !== rowsAfterAdj[j]) {
        success = false
        break
      }
    }

    if (success) {
      return { type, idx: i + 1 }
    }
  }
}

function solution1(input) {
  const notes = formatInput(input)
  const mirrors = notes.map(findMirror)
  const values = mirrors.reduce((acc, cur) => {
    const value = cur.type === 'row' ? cur.idx * 100 : cur.idx
    return acc + value
  }, 0)

  return values
}

// console.log(solution1(data)) // 37113

function solution2(input) {}

module.exports = {
  solution1,
  solution2,
}
