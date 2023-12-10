const { solution1, solution2 } = require('./')

const input1 = `
.....
.S-7.
.|.|.
.L-J.
.....
`

const input2 = `
-L|F7
7S-7|
L|7||
-L-J|
L|-JF
`

const input3 = `
7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ
`

test('solution1', () => {
  expect(solution1(input1)).toEqual(4)
  expect(solution1(input2)).toEqual(4)
  expect(solution1(input3)).toEqual(8)
})

const input4 = `
..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........
`

const input5 = `
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
`

const input6 = `
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJIF7FJ-
L---JF-JLJIIIIFJLJJ7
|F|F-JF---7IIIL7L|7|
|FFJF7L7F-JF7IIL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`

test('solution2', () => {
  expect(solution2(input4)).toEqual(4)
  expect(solution2(input5)).toEqual(8)
  expect(solution2(input6)).toEqual(10)
})
