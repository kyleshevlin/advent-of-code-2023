const { getInput, sum } = require('../utils')

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      const [gameStr, pullsStr] = line.split(': ')
      const id = gameStr.replace('Game ', '')
      const pulls = pullsStr.split('; ')

      const results = pulls.map(pull => {
        const cubes = pull.split(', ')

        const result = {
          blue: 0,
          green: 0,
          red: 0,
        }

        for (const cube of cubes) {
          const [int, color] = cube.split(' ')
          result[color] = parseInt(int, 10)
        }

        return result
      })

      acc[id] = results
      return acc
    }, {})

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
