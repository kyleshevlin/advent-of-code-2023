const { solution1, solution2 } = require('.')

const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`

test('solution1', () => {
  expect(solution1(input)).toEqual(114)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(2)
})
