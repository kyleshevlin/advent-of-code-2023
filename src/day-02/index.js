const { getInput, sum } = require('../utils')

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      const { id, results } = getGameResults(line)

      acc[id] = results

      return acc
    }, {})

/**
 * Parse a game (a line from the input) into its `id` and into objects
 * representing each pull from the bag of cubes.
 *
 * Input: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
 * Output: {
 *   id: '1',
 *   results: [
 *     { blue: 3, green: 0, red: 4 },
 *     { blue: 0, green: 2, red: 1 },
 *     { blue: 6, green: 2, red: 0 }
 *   ],
 * }
 */
const getGameResults = game => {
  const [gameStr, pullsStr] = game.split(': ')
  const id = gameStr.replace('Game ', '')
  const pulls = pullsStr.split('; ')

  const results = pulls.map(pull => {
    const cubes = pull.split(', ')

    const result = {
      blue: 0,
      green: 0,
      red: 0,
    }

    cubes.forEach(cube => {
      const [int, color] = cube.split(' ')
      result[color] = parseInt(int, 10)
    })

    return result
  })

  return { id, results }
}

const BAG = {
  blue: 14,
  green: 13,
  red: 12,
}

const isPullPossible = ({ blue, green, red }) =>
  blue <= BAG.blue && green <= BAG.green && red <= BAG.red

const isGamePossible = pulls => pulls.every(isPullPossible)

function solution1(input) {
  const formatted = formatInput(input)
  const possibleGames = Object.entries(formatted).filter(([_key, pulls]) =>
    isGamePossible(pulls)
  )
  const nums = possibleGames.map(([key]) => parseInt(key, 10))

  return sum(nums)
}

const getMinimumRequired = pulls => {
  const result = { blue: 0, green: 0, red: 0 }

  for (const pull of pulls) {
    if (pull.blue > result.blue) result.blue = pull.blue
    if (pull.green > result.green) result.green = pull.green
    if (pull.red > result.red) result.red = pull.red
  }

  return result
}

const getPower = ({ blue, green, red }) => blue * green * red

function solution2(input) {
  const formatted = formatInput(input)
  const minimums = Object.values(formatted).map(getMinimumRequired)
  const powers = minimums.map(getPower)

  return sum(powers)
}

// console.log(solution1(data)) // 2317

// console.log(solution2(data)) // 74804

module.exports = {
  solution1,
  solution2,
}
