const { getNextBeams, solution1, solution2 } = require('./')

const input = `
.|...#....
|.-.#.....
.....|-...
........|.
..........
.........#
..../.##..
.-.-/..|..
.|....-|.#
..//.|....
`

test('solution1', () => {
  expect(solution1(input)).toEqual(46)
})

test('solution2', () => {
  expect(solution2(input)).toEqual()
})

test('getNextBeams', () => {
  expect(getNextBeams({ row: 0, col: 0, dir: 'N' }, '.')).toEqual([
    {
      row: -1,
      col: 0,
      dir: 'N',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'E' }, '.')).toEqual([
    {
      row: 0,
      col: 1,
      dir: 'E',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'S' }, '.')).toEqual([
    {
      row: 1,
      col: 0,
      dir: 'S',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'W' }, '.')).toEqual([
    {
      row: 0,
      col: -1,
      dir: 'W',
    },
  ])

  expect(getNextBeams({ row: 0, col: 0, dir: 'N' }, '|')).toEqual([
    {
      row: -1,
      col: 0,
      dir: 'N',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'E' }, '|')).toEqual([
    {
      row: -1,
      col: 0,
      dir: 'N',
    },
    {
      row: 1,
      col: 0,
      dir: 'S',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'S' }, '|')).toEqual([
    {
      row: 1,
      col: 0,
      dir: 'S',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'W' }, '|')).toEqual([
    {
      row: -1,
      col: 0,
      dir: 'N',
    },
    {
      row: 1,
      col: 0,
      dir: 'S',
    },
  ])

  expect(getNextBeams({ row: 0, col: 0, dir: 'N' }, '-')).toEqual([
    {
      row: 0,
      col: -1,
      dir: 'W',
    },
    {
      row: 0,
      col: 1,
      dir: 'E',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'E' }, '-')).toEqual([
    {
      row: 0,
      col: 1,
      dir: 'E',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'S' }, '-')).toEqual([
    {
      row: 0,
      col: -1,
      dir: 'W',
    },
    {
      row: 0,
      col: 1,
      dir: 'E',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'W' }, '-')).toEqual([
    {
      row: 0,
      col: -1,
      dir: 'W',
    },
  ])

  expect(getNextBeams({ row: 0, col: 0, dir: 'N' }, '/')).toEqual([
    {
      row: 0,
      col: 1,
      dir: 'E',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'E' }, '/')).toEqual([
    {
      row: -1,
      col: 0,
      dir: 'N',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'S' }, '/')).toEqual([
    {
      row: 0,
      col: -1,
      dir: 'W',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'W' }, '/')).toEqual([
    {
      row: 1,
      col: 0,
      dir: 'S',
    },
  ])

  expect(getNextBeams({ row: 0, col: 0, dir: 'N' }, '#')).toEqual([
    {
      row: 0,
      col: -1,
      dir: 'W',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'E' }, '#')).toEqual([
    {
      row: 1,
      col: 0,
      dir: 'S',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'S' }, '#')).toEqual([
    {
      row: 0,
      col: 1,
      dir: 'E',
    },
  ])
  expect(getNextBeams({ row: 0, col: 0, dir: 'W' }, '#')).toEqual([
    {
      row: -1,
      col: 0,
      dir: 'N',
    },
  ])
})
