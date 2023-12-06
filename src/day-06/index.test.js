const { solution1, solution2 } = require('.')

const input = `
Time:      7  15   30
Distance:  9  40  200
`

test('solution1', () => {
  expect(solution1(input)).toEqual(288)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(71503)
})
