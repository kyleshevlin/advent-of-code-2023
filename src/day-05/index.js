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

class Range {
  constructor(start, length) {
    this.start = start
    this.length = length
    this.end = start + length - 1
  }

  contains(value) {
    return value >= this.start && value <= this.end
  }
}

class RangeMap {
  #cache = {}
  #offset

  constructor(dest, src, length) {
    this.srcRange = new Range(src, length)
    this.destRange = new Range(dest, length)
    this.#offset = dest - src
  }

  #isInCache(key) {
    return this.#cache[key] !== undefined
  }

  #getFromCache(key) {
    return this.#cache[key]
  }

  #saveInCache(key, value) {
    this.#cache[key] = value
  }

  getNextKey(key) {
    if (this.#isInCache(key)) return this.#getFromCache(key)

    if (this.srcRange.contains(key)) {
      const nextKey = key + this.#offset

      this.#saveInCache(key, nextKey)
      return nextKey
    }

    this.#saveInCache(key, key)
    return key
  }
}

class RangeGroup {
  #cache = {}

  constructor(lines) {
    this.rangeMaps = lines.map(line => {
      const [dest, src, length] = line.split(' ').map(Number)
      return new RangeMap(dest, src, length)
    })
  }

  #isInCache(key) {
    return this.#cache[key] !== undefined
  }

  #getFromCache(key) {
    return this.#cache[key]
  }

  #saveInCache(key, value) {
    this.#cache[key] = value
  }

  getNextKey(key) {
    if (this.#isInCache(key)) return this.#getFromCache(key)

    for (const map of this.rangeMaps) {
      const nextKey = map.getNextKey(key)

      if (nextKey === key) continue

      this.#saveInCache(key, nextKey)
      return nextKey
    }

    this.#saveInCache(key, key)
    return key
  }
}

const parseSection = (section, heading) => {
  const ranges = section.replace(heading, '').trim().split('\n')
  return new RangeGroup(ranges)
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
  for (const seedRange of seeds) {
    // LOL, this won't work for the actual data
    for (let i = seedRange.start; i < seedRange.end; i++) {
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

    result.push(new Range(start, length))
  }

  return result
}

// console.log(solution1(data)) // 331445006

// console.log(solution2(data))

module.exports = {
  solution1,
  solution2,
  parseSection,
}
