const { solution1, solution2 } = require('./')

const input = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`

test('solution1', () => {
  expect(solution1(input.split('\n\n').at(0))).toEqual(5)
  expect(solution1(input.split('\n\n').at(1))).toEqual(400)
  expect(solution1(input)).toEqual(405)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(400)
})
