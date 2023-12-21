const { solution1, solution2 } = require('./')

const input = `
...........
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........
`

test('solution1', () => {
  expect(solution1(input, 6)).toEqual(16)
})

test('solution2', () => {
  expect(solution2(input)).toEqual()
})
