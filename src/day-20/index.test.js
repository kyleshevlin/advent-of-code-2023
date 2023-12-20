const { solution1, solution2 } = require('./')

const input = `
broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a
`

const input2 = `
broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output
`

test('solution1', () => {
  expect(solution1(input)).toEqual(32000000)
  expect(solution1(input2)).toEqual(11687500)
})

test('solution2', () => {
  expect(solution2(input)).toEqual()
})
