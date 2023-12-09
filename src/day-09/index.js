const { getInput, sum } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

const createHistory = str => {
  const sequence = str.split(' ').map(Number)

  function getSequences() {
    const result = [sequence]

    let currentSequence = sequence
    while (!currentSequence.every(n => n === 0)) {
      const clone = [...currentSequence]
      const nextSequence = []
      let currentNum = clone.shift()

      while (clone.length) {
        const nextNum = clone.shift()
        const diff = nextNum - currentNum
        nextSequence.push(diff)
        currentNum = nextNum
      }

      result.push(nextSequence)
      currentSequence = nextSequence
    }

    return result
  }

  function getNextRightValue() {
    return getSequences()
      .map(s => s.at(-1))
      .reduceRight((acc, cur) => acc + cur)
  }

  function getNextLeftValue() {
    return getSequences()
      .map(s => s[0])
      .reduceRight((acc, cur) => cur - acc)
  }

  return { sequence, getNextRightValue, getNextLeftValue }
}

function solution1(input) {
  const lines = formatInput(input)
  const histories = lines.map(createHistory)
  const nextValues = histories.map(h => h.getNextRightValue())

  return sum(nextValues)
}

// console.log(solution1(data)) // 1666172641

function solution2(input) {
  const lines = formatInput(input)
  const histories = lines.map(createHistory)
  const nextValues = histories.map(h => h.getNextLeftValue())

  return sum(nextValues)
}

// console.log(solution2(data)) // 933

module.exports = {
  solution1,
  solution2,
}
