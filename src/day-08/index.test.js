const { solution1, solution2 } = require('.')

const input = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`

test('solution1', () => {
  expect(solution1(input)).toEqual(6)
})

const input2 = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`

test('solution2', () => {
  expect(solution2(input2)).toEqual(6)
})
