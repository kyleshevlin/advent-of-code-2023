const { getInput } = require('../utils')

const data = getInput(__dirname)

const formatInputPart1 = input => {
  const [seeds, ...maps] = input.trim().split('\n\n')

  return {
    seeds: seeds.split(': ').at(1).split(' ').map(Number),
    maps: maps.map(parseMap),
  }
}

class Range {
  constructor(start, length) {
    this.start = start
    this.end = start + length - 1
  }

  has(value) {
    return value >= this.start && value <= this.end
  }
}

class RangeMap {
  constructor(dest, src, length) {
    this.srcRange = new Range(src, length)
    this.destRange = new Range(dest, length)
    this.offset = dest - src
  }

  getValue(key) {
    return this.srcRange.has(key) ? key + this.offset : null
  }
}

class RangeGroup {
  constructor(rangeMaps) {
    this.rangeMaps = rangeMaps
  }

  getValue(key) {
    for (const map of this.rangeMaps) {
      const nextKey = map.getValue(key)

      if (!nextKey) continue

      return nextKey
    }

    return key
  }
}

const parseMap = section => {
  const ranges = section
    .split('map:')
    .at(1)
    .trim()
    .split('\n')
    .map(line => line.split(' ').map(Number))
  const rangeMaps = ranges
    .map(range => new RangeMap(...range))
    .toSorted((a, b) => a.start - b.start)

  return new RangeGroup(rangeMaps)
}

function solution1(input) {
  const { seeds, maps } = formatInputPart1(input)

  const locations = seeds.map(seed => {
    let result = seed

    for (const map of maps) {
      result = map.getValue(result)
    }

    return result
  })

  return Math.min(...locations)
}

function makeSeedRanges(seeds) {
  const nums = seeds.split(': ')[1].split(' ').map(Number)
  const result = []

  while (nums.length) {
    const start = nums.shift()
    const length = nums.shift()

    result.push(new Range(start, length))
  }

  return result
}

function parseMapsReverse(section) {
  const ranges = section
    .split('map:')
    .at(1)
    .trim()
    .split('\n')
    .map(line => line.split(' ').map(Number))

  // We're reversing the maps in part 2
  const rangeMaps = ranges
    .map(([dest, src, length]) => new RangeMap(src, dest, length))
    .toSorted((a, b) => a.start - b.start)

  return new RangeGroup(rangeMaps)
}

function formatInputPart2(input) {
  const [seeds, ...maps] = input.trim().split('\n\n')

  return {
    seeds: makeSeedRanges(seeds),
    maps: maps.toReversed().map(parseMapsReverse),
  }
}

function solution2(input) {
  const { seeds, maps } = formatInputPart2(input)

  let i = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let result = i
    for (const map of maps) {
      result = map.getValue(result)
    }

    for (const seedRange of seeds) {
      if (seedRange.has(result)) return i
    }

    i++
  }
}

// console.log(solution1(data)) // 331445006

// console.log(solution2(data)) // 6472060

module.exports = {
  solution1,
  solution2,
  parseSection: parseMap,
}
