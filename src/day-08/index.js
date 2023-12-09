const { getInput, lcm } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => {
  const [turns, graph] = input.trim().split('\n\n')

  const nodeLines = graph.split('\n')

  const nodes = {}

  for (const line of nodeLines) {
    const [id, children] = line.split(' = ')
    const [left, right] = children.replace('(', '').replace(')', '').split(', ')

    nodes[id] = { id, left, right }
  }

  return { turns, nodes }
}

const TURN_MAP = {
  L: 'left',
  R: 'right',
}

function solution1(input) {
  const { turns, nodes } = formatInput(input)

  return getSteps({
    nodes,
    startingKey: 'AAA',
    turns,
    winCondition: x => x === 'ZZZ',
  })
}

function getSteps({ nodes, startingKey, turns, winCondition }) {
  let steps = 0
  let complete = false
  let currentNode = nodes[startingKey]

  while (!complete) {
    const idx = steps % turns.length
    const turn = turns[idx]
    const method = TURN_MAP[turn]
    const nextNodeKey = currentNode[method]
    steps++

    if (winCondition(nextNodeKey)) {
      complete = true
      break
    }

    currentNode = nodes[nextNodeKey]
  }

  return steps
}

// console.log(solution1(data)) // 12169

function solution2(input) {
  const { turns, nodes } = formatInput(input)

  const startingNodes = Object.entries(nodes)
    .filter(([key]) => key.at(-1) === 'A')
    .map(entry => entry[1])

  const stepsPerCycle = startingNodes.map(node => {
    return getSteps({
      nodes,
      startingKey: node.id,
      turns,
      winCondition: x => x.at(-1) === 'Z',
    })
  })

  return stepsPerCycle.reduce(lcm)
}

// console.log(solution2(data)) // 12030780859469

module.exports = {
  solution1,
  solution2,
}
