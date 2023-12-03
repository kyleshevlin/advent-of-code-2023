const { solution1, solution2 } = require('.')

const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

test('solution1', () => {
  expect(solution1('1*')).toEqual(1)
  expect(solution1('*1')).toEqual(1)
  expect(solution1(input)).toEqual(4361)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(467835)
})
