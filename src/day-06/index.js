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
  const total = race.time

  const results = []

  for (let i = 0; i <= total; i++) {
    const speed = i * 1
    const time = total - i
    const distance = speed * time

    results.push({ distance })
  }

  return results
}

function solution1(input) {
  const [timesLine, distancesLine] = formatInput(input)
  const { times, distances } = getTimesAndDistances(timesLine, distancesLine)
  const races = getRaces(times, distances)

  const winningWays = races
    .map(race =>
      getRaceResults(race).filter(result => result.distance > race.distance)
    )
    .map(winners => winners.length)

  return product(winningWays)
}

// console.log(solution1(data)) // 449820

function getTimesAndDistancesPart2(timesLine, distancesLine) {
  const times = Number(timesLine.replace(/Time:\s+/, '').replaceAll(' ', ''))
  const distances = Number(
    distancesLine.replace(/Distance:\s+/, '').replaceAll(' ', '')
  )

  return { times, distances }
}

function solution2(input) {
  const [timesLine, distancesLine] = formatInput(input)
  const { times: time, distances: distance } = getTimesAndDistancesPart2(
    timesLine,
    distancesLine
  )
  const race = { time, distance }

  return getRaceResults(race).filter(result => result.distance > race.distance)
    .length
}

// console.log(solution2(data)) // 42250895

module.exports = {
  solution1,
  solution2,
}
