const { solution1, solution2 } = require('./')

const input = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`

test('solution1', () => {
  expect(solution1(input)).toEqual(136)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(64)
})
