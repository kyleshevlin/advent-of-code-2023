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

  const cache = {}

  return {
    ranges,
    getNextKey(key) {
      if (cache[key] !== undefined) return cache[key]

      for (const range of ranges) {
        const nextKey = range.getNextKey(key)

        if (nextKey === key) continue

        cache[key] = nextKey
        return nextKey
      }

      cache[key] = key
      return key
    },
  }
}

const parseRange = line => {
  const [destStart, srcStart, length] = line.split(' ').map(Number)

  const cache = {}

  return {
    destStart,
    srcStart,
    length,
    getNextKey(key) {
      if (cache[key] !== undefined) return cache[key]

      if (key >= srcStart && key <= srcStart + length - 1) {
        const nextKey = destStart + (key - srcStart)

        cache[key] = nextKey
        return nextKey
      }

      cache[key] = key
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

  return lowest
}

function solution2(input) {
  const formatted = formatInput(input)

  // adjust the seeds for part 2
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

  const cache = {}

  let lowest = Infinity
  for (const seed of seeds) {
    // LOL, this won't work for the actual data
    for (let i = seed.start; i < seed.start + seed.length; i++) {
      if (cache[i] !== undefined) {
        // Don't even need to calculate it because if it's lowest, it'll already
        // be stored
        continue
      }

      let result = i

      for (const map of order) {
        const nextKey = map.getNextKey(result)
        result = nextKey
      }

      cache[i] = result

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
