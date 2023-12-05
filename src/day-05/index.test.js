const { solution1, solution2, parseRange, parseSection } = require('.')

const input = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`

test('solution1', () => {
  expect(solution1(input)).toEqual(35)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(46)
})

test('parseRange', () => {
  const range = parseRange('50 98 2')

  expect(range.destStart).toEqual(50)
  expect(range.srcStart).toEqual(98)
  expect(range.length).toEqual(2)
  expect(range.getNextKey(97)).toEqual(97)
  expect(range.getNextKey(98)).toEqual(50)
  expect(range.getNextKey(99)).toEqual(51)
  expect(range.getNextKey(100)).toEqual(100)
})

test('parseSection', () => {
  const section = parseSection(
    `
seed-to-soil map:
50 98 2
52 50 48
`,
    'seed-to-soil map:'
  )

  expect(section.ranges.length).toEqual(2)
  expect(section.getNextKey(49)).toEqual(49)
  expect(section.getNextKey(50)).toEqual(52)
  expect(section.getNextKey(53)).toEqual(55)
  expect(section.getNextKey(100)).toEqual(100)
})
