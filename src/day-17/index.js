const { getInput } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

function createGraph() {
  const nodes = []
  const edges = {}

  return {
    nodes: () => nodes,
    edges: () => edges,
    addNode: node => {
      nodes.push(node)
      edges[node] = []
    },
    addEdge: (from, to, weight, dir) => {
      edges[from].push({ to, weight, dir })
    },
    inspect: () => {
      console.log(JSON.stringify({ nodes, edges }))
    },
  }
}

function traverse(graph, startNode) {
  const distances = {}
  const visited = {}
  const path = {}
  const queue = []

  graph.nodes().forEach(node => {
    distances[node] = Infinity
    visited[node] = false
    path[node] = null
  })

  distances[startNode] = 0

  queue.push({ node: startNode, distance: 0, dir: undefined, steps: 0 })

  while (queue.length) {
    queue.sort((a, b) => a.distance - b.distance)
    const current = queue.shift()
  }
}

function solution1(input) {
  const grid = formatInput(input)
  const graph = createGraph()

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const key = `${row},${col}`
      graph.addNode(key)
    }
  }

  graph.nodes().forEach(node => {
    const [row, col] = node.split(',').map(Number)

    const neighbors = [
      [row - 1, col, 'N'],
      [row + 1, col, 'S'],
      [row, col - 1, 'W'],
      [row, col + 1, 'E'],
    ].filter(([r, c]) => grid?.[r]?.[c] !== undefined)

    neighbors.forEach(([r, c, dir]) => {
      const key = `${r},${c}`
      const weight = Number(grid[r][c])

      graph.addEdge(node, key, weight, dir)
    })
  })

  graph.inspect()

  return grid
}

function solution2(input) {}

module.exports = {
  solution1,
  solution2,
}
