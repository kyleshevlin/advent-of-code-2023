const { solution1, solution2 } = require('./')

const input = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`

test('solution1', () => {
  expect(solution1(input)).toEqual(142)
})

const input2 = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`

test('solution2', () => {
  expect(solution2(input2)).toEqual(281)
})
