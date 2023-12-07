const { solution1, solution2 } = require('.')

const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`

test('solution1', () => {
  expect(solution1(input)).toEqual(6440)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(5905)
})
