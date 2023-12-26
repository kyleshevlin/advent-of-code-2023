const { solution1, solution2 } = require('./')

const input = `
19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3
`

test('solution1', () => {
  expect(solution1(input, 7, 27)).toEqual(2)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(47)
})
