const { getInput, intersection, sum } = require('../utils')

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map((line, idx) => {
      const [cardNumber, numbers] = line.split(': ')
      const [winnersStr, yoursStr] = numbers.split(' | ')

      return {
        id: cardNumber.replace(/Card\s+/, ''),
        winners: new Set(winnersStr.split(' ').filter(Boolean).map(Number)),
        yours: new Set(yoursStr.split(' ').filter(Boolean).map(Number)),
      }
    })

const findMatches = ({ winners, yours }) => intersection(winners, yours)

// It might suprise people that any number to the power of 0 is 1 (n ** 0 === 1)
// Hence, why I use a ternary to return 0 in the case of no matches
const getWorth = set => (set.size ? 2 ** (set.size - 1) : 0)

function solution1(input) {
  const cards = formatInput(input)
  const values = cards.map(findMatches).map(getWorth)

  return sum(values)
}

function solution2(input) {
  const cards = formatInput(input)
  const copyQuantitiesById = {}

  // Keeping this in scope so I don't have to pass `cards`
  // or `copyQuantitiesById` into it
  function processCard(card, cardIdx) {
    const matches = findMatches(card)

    if (!matches.size) return

    let i = 0
    for (i; i < matches.size; i++) {
      const nextIdx = cardIdx + 1 + i
      const id = cards[nextIdx].id

      if (!copyQuantitiesById[id]) {
        copyQuantitiesById[id] = 0
      }

      copyQuantitiesById[id]++
    }
  }

  let cardIdx = 0
  for (cardIdx; cardIdx < cards.length; cardIdx++) {
    const original = cards[cardIdx]
    const copies = copyQuantitiesById[original.id] ?? 0
    // original card === 1
    const total = 1 + copies

    for (let i = 0; i < total; i++) {
      processCard(original, cardIdx)
    }
  }

  return cards.length + sum(Object.values(copyQuantitiesById))
}

// console.log(solution1(data)) // 20107

// console.log(solution2(data)) // 8172507

module.exports = {
  solution1,
  solution2,
}
