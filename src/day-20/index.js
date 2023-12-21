const { getInput, createQueue } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n').map(parseModules)

function createFlipFlopModule(key, destinations, type) {
  let state = false

  return {
    destinations,
    key,
    type,
    receive: pulse => {
      if (pulse.type === 'high') return []

      state = !state

      return destinations.map(to => ({
        from: key,
        to,
        type: state ? 'high' : 'low',
      }))
    },
  }
}

function createConjunctionModule(key, destinations, type) {
  const state = {}

  const getNextPulseType = () =>
    Object.values(state).every(v => v === 'high') ? 'low' : 'high'

  return {
    destinations,
    key,
    type,
    addInput: key => {
      state[key] = 'low'
    },
    receive: pulse => {
      const { from, type } = pulse

      state[from] = type

      return destinations.map(to => ({
        from: key,
        to,
        type: getNextPulseType(),
      }))
    },
  }
}

function createBroadcasterModule(key, destinations) {
  return {
    destinations,
    key,
    type: 'broadcaster',
    receive: () =>
      destinations.map(to => ({
        from: key,
        to,
        type: 'low',
      })),
  }
}

function parseModules(line) {
  const [name, destinationsStr] = line.split(' -> ')
  const destinations = destinationsStr.split(', ')

  if (name === 'broadcaster') {
    return createBroadcasterModule(name, destinations)
  }

  const type = name.at(0)
  const key = name.replace(type, '')

  if (type === '%') {
    return createFlipFlopModule(key, destinations, 'flip-flop')
  }

  if (type === '&') {
    return createConjunctionModule(key, destinations, 'conjunction')
  }

  throw new Error(`something went wrong parsing ${line}`)
}

function solution1(input) {
  const mods = formatInput(input)
  const modsByKey = mods.reduce((acc, m) => {
    acc[m.key] = m
    return acc
  }, {})

  const conjunctionKeys = new Set(
    mods.filter(m => m.type === 'conjunction').map(m => m.key)
  )

  mods.forEach(m => {
    m.destinations.forEach(d => {
      if (conjunctionKeys.has(d)) modsByKey[d].addInput(m.key)
    })
  })

  const counts = {
    low: 0,
    high: 0,
  }

  for (let i = 0; i < 1000; i++) {
    const queue = createQueue()
    queue.enqueue({ to: 'broadcaster', type: 'low' })

    while (!queue.isEmpty()) {
      const pulse = queue.dequeue()
      counts[pulse.type]++
      const receiver = modsByKey[pulse.to]

      // This is here for the second test case with `output`
      if (!receiver) continue

      const nextPulses = receiver.receive(pulse)

      nextPulses.forEach(pulse => {
        queue.enqueue(pulse)
      })
    }
  }

  return counts.low * counts.high
}

// console.log(solution1(data)) // 806332748

function solution2(input) {
  const mods = formatInput(input)
  const modsByKey = mods.reduce((acc, m) => {
    acc[m.key] = m
    return acc
  }, {})

  const conjunctionKeys = new Set(
    mods.filter(m => m.type === 'conjunction').map(m => m.key)
  )

  mods.forEach(m => {
    m.destinations.forEach(d => {
      if (conjunctionKeys.has(d)) modsByKey[d].addInput(m.key)
    })
  })

  let count = 0
  let rxLowPulseSent = false
  while (!rxLowPulseSent) {
    count++
    const queue = createQueue()
    queue.enqueue({ to: 'broadcaster', type: 'low' })

    while (!queue.isEmpty()) {
      const pulse = queue.dequeue()

      if (pulse.to === 'rx' && pulse.type === 'low') {
        rxLowPulseSent = true
      }

      const receiver = modsByKey[pulse.to]

      // This is here for the second test case with `output`
      if (!receiver) continue

      const nextPulses = receiver.receive(pulse)

      nextPulses.forEach(pulse => {
        queue.enqueue(pulse)
      })
    }
  }

  return count
}

// console.log(solution2(data))

module.exports = {
  solution1,
  solution2,
}
