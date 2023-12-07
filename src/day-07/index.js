const { getInput, sum } = require('../utils')

const data = getInput(__dirname)

const CARD_VALUE_MAP = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
}

const HAND_POWER_MAP = {
  'Five of a kind': 0,
  'Four of a kind': 1,
  'Full house': 2,
  'Three of a kind': 3,
  'Two pair': 4,
  'One pair': 5,
  'High card': 6,
}

const sortCards = (a, b) => CARD_VALUE_MAP[a] - CARD_VALUE_MAP[b]

function getCardCounts(cardsStr) {
  const cards = cardsStr.split('')
  const result = {}

  cards.forEach(card => {
    if (!result[card]) result[card] = 0
    result[card]++
  })

  return result
}

function getHandType(hand) {
  const keys = Object.keys(hand)
  const values = Object.values(hand)

  switch (true) {
    case keys.length === 1:
      return 'Five of a kind'

    case values.includes(4):
      return 'Four of a kind'

    case values.includes(3) && values.includes(2):
      return 'Full house'

    case values.includes(3):
      return 'Three of a kind'

    case values.filter(x => x === 2).length === 2:
      return 'Two pair'

    case values.includes(2):
      return 'One pair'

    default:
      return 'High card'
  }
}

const sortHandTypes = (a, b) => HAND_POWER_MAP[b] - HAND_POWER_MAP[a]

function makeHandPart1(line) {
  const [cards, bid] = line.split(' ')

  return {
    bid: Number(bid),
    cards,
    type: getHandType(getCardCounts(cards)),
  }
}

const formatInput = input => input.trim().split('\n')

function sortHands(handA, handB) {
  const result = sortHandTypes(handA.type, handB.type)

  if (result !== 0) return result

  let cardResult = 0
  const cardsA = handA.cards.split('')
  const cardsB = handB.cards.split('')

  while (!cardResult) {
    const a = cardsA.shift()
    const b = cardsB.shift()

    cardResult = sortCards(a, b)
  }

  return cardResult
}

function solution1(input) {
  const lines = formatInput(input)
  const hands = lines.map(makeHandPart1)
  const sorted = hands.toSorted(sortHands)

  const results = sorted.map((round, idx) => {
    const rank = idx + 1
    return round.bid * rank
  })

  return sum(results)
}

// console.log(solution1(data)) // 251545216

function getCardCountsPart2(cardsStr) {
  const cards = cardsStr.split('')
  const noJokers = cards.filter(c => c !== 'J')
  const jokers = cards.filter(c => c === 'J')

  const result = {}

  noJokers.forEach(card => {
    if (!result[card]) result[card] = 0
    result[card]++
  })

  if (!jokers.length) return result

  const sortedResultEntries = Object.entries(result).toSorted(
    (a, b) => b[1] - a[1]
  )

  // If it's all Jokers, just assign it to J
  const highestKey = sortedResultEntries?.[0]?.[0] ?? 'J'

  // Find the cards with the greatest count and add all the Js to it
  jokers.forEach(() => {
    if (!result[highestKey]) result[highestKey] = 0
    result[highestKey]++
  })

  return result
}

function makeHandPart2(line) {
  const [cards, bid] = line.split(' ')

  return {
    bid: Number(bid),
    cards,
    type: getHandType(getCardCountsPart2(cards)),
  }
}

const CARD_VALUE_MAP_PART_2 = {
  ...CARD_VALUE_MAP,
  J: 1,
}

const sortCardsPart2 = (a, b) =>
  CARD_VALUE_MAP_PART_2[a] - CARD_VALUE_MAP_PART_2[b]

function sortHandsPart2(handA, handB) {
  const result = sortHandTypes(handA.type, handB.type)

  if (result !== 0) return result

  let cardResult = 0
  const cardsA = handA.cards.split('')
  const cardsB = handB.cards.split('')

  while (!cardResult) {
    const a = cardsA.shift()
    const b = cardsB.shift()

    cardResult = sortCardsPart2(a, b)
  }

  return cardResult
}

function solution2(input) {
  const lines = formatInput(input)
  const hands = lines.map(makeHandPart2)
  const sorted = hands.toSorted(sortHandsPart2)

  const results = sorted.map((round, idx) => {
    const rank = idx + 1
    return round.bid * rank
  })

  return sum(results)
}

// console.log(solution2(data)) // 250384185

module.exports = {
  solution1,
  solution2,
}
