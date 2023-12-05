const { getInput } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => {
  const [
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemp,
    tempToHumidity,
    humidtyToLocation,
  ] = input.trim().split('\n\n')

  const result = {}

  result.seeds = seeds.split(': ')[1].split(' ').map(Number)

  result.seedToSoilMap = parseSection(seedToSoil, 'seed-to-soil map:')
  result.soilToFertilizerMap = parseSection(
    soilToFertilizer,
    'soil-to-fertlizer map:'
  )
  result.fertilizerToWaterMap = parseSection(
    fertilizerToWater,
    'fertilizer-to-water map:'
  )
  result.waterToLightMap = parseSection(waterToLight, 'water-to-light map:')
  result.lightToTempMap = parseSection(lightToTemp, 'light-to-temperature map:')
  result.tempToHumidityMap = parseSection(
    tempToHumidity,
    'temp-to-humidity map:'
  )
  result.humidtyToLocationMap = parseSection(
    humidtyToLocation,
    'humidity-to-location map:'
  )

  return result
}

const parseSection = (section, heading) => {
  const ranges = section.replace(heading, '').trim().split('\n').map(parseRange)

  return {
    ranges,
    getNextKey(key) {
      for (const range of ranges) {
        const nextKey = range.getNextKey(key)

        if (nextKey === key) continue

        return nextKey
      }

      return key
    },
  }
}

const parseRange = line => {
  const [destStart, srcStart, length] = line.split(' ').map(Number)

  // would be good to have methods that could check a range if a value should be found in it

  return {
    destStart,
    srcStart,
    length,
    getNextKey(key) {
      if (key >= srcStart && key <= srcStart + length - 1) {
        return destStart + (key - srcStart)
      }

      return key
    },
  }
}

function solution1(input) {
  const formatted = formatInput(input)

  const {
    seeds,
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTempMap,
    tempToHumidityMap,
    humidtyToLocationMap,
  } = formatted

  const order = [
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTempMap,
    tempToHumidityMap,
    humidtyToLocationMap,
  ]

  let lowest = Infinity
  for (const seed of seeds) {
    let result = seed

    for (const map of order) {
      const nextKey = map.getNextKey(result)
      result = nextKey
    }

    if (result < lowest) {
      lowest = result
    }
  }

  // if a seed number is not found in a map, then the number of the corresponding
  // value is the same. So if we have seed 0 and the seed-to-soil map does not have
  // a key of 0, then its soil number is _also_ 0.

  return lowest
}

function solution2(input) {
  const formatted = formatInput(input)

  // adjust the seeds
  formatted.seeds = makeSeedRanges(formatted.seeds)

  const {
    seeds,
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTempMap,
    tempToHumidityMap,
    humidtyToLocationMap,
  } = formatted

  const order = [
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTempMap,
    tempToHumidityMap,
    humidtyToLocationMap,
  ]

  let lowest = Infinity
  for (const seed of seeds) {
    // LOL, this won't work for the actual data
    for (let i = seed.start; i < seed.start + seed.length; i++) {
      let result = i

      for (const map of order) {
        const nextKey = map.getNextKey(result)
        result = nextKey
      }

      if (result < lowest) {
        lowest = result
      }
    }
  }

  return lowest
}

function makeSeedRanges(seeds) {
  const clone = [...seeds]
  const result = []

  while (clone.length) {
    const start = clone.shift()
    const length = clone.shift()

    result.push({ start, length })
  }

  return result
}

// console.log(solution1(data)) // 331445006

// console.log(solution2(data))

module.exports = {
  solution1,
  solution2,
  parseRange,
  parseSection,
}
