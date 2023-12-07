const { getInput, product } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

function getTimesAndDistances(timesLine, distancesLine) {
  const times = timesLine
    .replace(/Time:\s+/, '')
    .split(' ')
    .filter(Boolean)
    .map(Number)
  const distances = distancesLine
    .replace(/Distance:\s+/, '')
    .split(' ')
    .filter(Boolean)
    .map(Number)

  return { times, distances }
}

function getRaces(times, distances) {
  const races = []

  while (times.length && distances.length) {
    const time = times.shift()
    const distance = distances.shift()

    races.push({ time, distance })
  }

  return races
}

function getRaceResults(race) {
  const results = []

  for (let i = 0; i <= race.time; i++) {
    const speed = i * 1
    const time = race.time - i
    const distance = speed * time

    results.push({ distance })
  }

  return results
}

function solution1(input) {
  const [timesLine, distancesLine] = formatInput(input)
  const { times, distances } = getTimesAndDistances(timesLine, distancesLine)
  const races = getRaces(times, distances)

  const wins = races.map(
    race =>
      getRaceResults(race).filter(result => result.distance > race.distance)
        .length
  )

  return product(wins)
}

// console.log(solution1(data)) // 449820

function getRacePart2(timesLine, distancesLine) {
  const time = Number(timesLine.replace(/Time:\s+/, '').replaceAll(' ', ''))
  const distance = Number(
    distancesLine.replace(/Distance:\s+/, '').replaceAll(' ', '')
  )

  return { time, distance }
}

function solution2(input) {
  const [timesLine, distancesLine] = formatInput(input)
  const race = getRacePart2(timesLine, distancesLine)

  return getRaceResults(race).filter(result => result.distance > race.distance)
    .length
}

// console.log(solution2(data)) // 42250895

module.exports = {
  solution1,
  solution2,
}
