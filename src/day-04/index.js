const { getInput, intersection, sum } = require('../utils')

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => {
      const [cardNumber, numbers] = line.split(': ')
      const [winnersStr, yoursStr] = numbers.split(' | ')

      return {
        id: cardNumber.replace(/Card\s+/, ''),
        winners: new Set(winnersStr.split(' ').filter(Boolean).map(Number)),
        yours: new Set(yoursStr.split(' ').filter(Boolean).map(Number)),
      }
    })

const findMatches = ({ winners, yours }) => intersection(winners, yours)

const getWorth = set => (set.size ? 2 ** (set.size - 1) : 0)

function solution1(input) {
  const cards = formatInput(input)
  const values = cards.map(findMatches).map(getWorth)

  return sum(values)
}

function solution2(input) {
  const cards = formatInput(input)

  const copiesMap = {}

  let idx = 0
  for (idx; idx < cards.length; idx++) {
    const original = cards[idx]
    processCard(original, idx)

    const copies = copiesMap[original.id]

    if (copies) {
      for (let i = 0; i < copies; i++) {
        processCard(original, idx)
      }
    }
  }

  function processCard(card, cardIdx) {
    const matches = findMatches(card)

    if (!matches.size) return

    Array(matches.size)
      .fill()
      .forEach((_, idx) => {
        const nextIdx = cardIdx + 1 + idx
        const id = cards[nextIdx].id

        if (!copiesMap[id]) {
          copiesMap[id] = 0
        }

        copiesMap[id]++
      })
  }

  return cards.length + sum(Object.values(copiesMap))
}

// console.log(solution1(data)) // 20107

// console.log(solution2(data)) // 8172507

module.exports = {
  solution1,
  solution2,
}
