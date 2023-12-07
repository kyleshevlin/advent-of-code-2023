const { solution1, solution2, parseSection, Range } = require('.')

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

test('parseSection', () => {
  const section = parseSection(
    `
seed-to-soil map:
50 98 2
52 50 48
`,
    'seed-to-soil map:'
  )

  expect(section.getNextKey(49)).toEqual(49)
  expect(section.getNextKey(50)).toEqual(52)
  expect(section.getNextKey(53)).toEqual(55)
  expect(section.getNextKey(100)).toEqual(100)
})

describe('Range.intersection', () => {
  test('overlap', () => {
    const r1 = new Range(1, 10)
    const r2 = new Range(6, 10)
    const intersection = Range.intersection(r1, r2)

    expect(intersection.start).toEqual(6)
    expect(intersection.end).toEqual(10)
  })

  test('disjoint', () => {
    const r1 = new Range(1, 5)
    const r2 = new Range(10, 5)
    const intersection = Range.intersection(r1, r2)

    expect(intersection).toEqual(null)
  })
})
