const { solution1, solution2 } = require('./')

const input = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`

test('solution1', () => {
  expect(solution1('???.### 1,1,3')).toEqual(1)
  expect(solution1('.??..??...?##. 1,1,3')).toEqual(4)
  expect(solution1('?#?#?#?#?#?#?#? 1,3,1,6')).toEqual(1)
  expect(solution1('????.#...#... 4,1,1')).toEqual(1)
  expect(solution1('????.######..#####. 1,6,5')).toEqual(4)
  expect(solution1('?###???????? 3,2,1')).toEqual(10)
  expect(solution1(input)).toEqual(21)
})

test('solution2', () => {
  expect(solution2('???.### 1,1,3')).toEqual(1)
  // expect(solution2('.??..??...?##. 1,1,3')).toEqual(16384)
  // expect(solution2('?#?#?#?#?#?#?#? 1,3,1,6')).toEqual(1)
  // expect(solution2('????.#...#... 4,1,1')).toEqual(16)
  // expect(solution2('????.######..#####. 1,6,5')).toEqual(2500)
  // expect(solution2('?###???????? 3,2,1')).toEqual(506250)
  // expect(solution2(input)).toEqual(21)
})
