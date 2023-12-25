const { getInput, product } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n')

function createGraph() {
  const nodes = new Set()
  const edges = new Set()

  const addNode = node => {
    nodes.add(node)
  }

  const addEdge = (x, y) => {
    edges.add([x, y])
  }

  return {
    addEdge,
    addNode,
    edges,
    nodes,
  }
}

function areSetsOfStringsEqual(s1, s2) {
  if (s1.size !== s2.size) return false

  for (const item of s1) {
    if (!s2.has(item)) return false
  }

  for (const item of s2) {
    if (!s1.has(item)) return false
  }

  return true
}

/**
 * This is called Karger's algorithm (a variation of it). It finds the smallest
 * cut necessary to split a graph into two separated graphs. I don't fully
 * understand it yet.
 *
 * I borrowed this from a Python solution I found on Reddit. This is much more
 * verbose than their solution was. Sets in JS aren't nearly as nice to work with.
 *
 * I'll do my best to explain it as I understand it now:
 *
 * - Start each outer loop with a list of subsets where every subset is a
 *   single node from the graph
 * - While we have more than 2 subsets
 *   - Pick a random edge from the graph
 *   - Find the subsets containing the nodes of the edge
 *   - If they are the same subset, continue
 *   - Else, move every node in subset2 into subset1 and remove subset2 from subsets
 *
 * --- The next part isn't truly Karger's, but necessary for our puzzle
 *
 * - When we're down to two subsets, filter the edges for the ones whose nodes
 *   are not in the same subset
 * - If the length of the filtered list of edges is less than 4, we can stop looping
 *   We've found the 3 wires we can cut.
 */
function kargersMinCut(graph) {
  const { edges, nodes } = graph

  let subsets = []
  const getSubset = node => subsets.find(s => s.has(node))

  // eslint-disable-next-line no-constant-condition
  while (true) {
    subsets = Array.from(nodes, node => new Set([node]))

    while (subsets.length > 2) {
      const [n1, n2] = Array.from(edges).at(
        Math.floor(Math.random() * edges.size)
      )

      const subset1 = getSubset(n1)
      const subset2 = getSubset(n2)

      if (!areSetsOfStringsEqual(subset1, subset2)) {
        for (const node of subset2) {
          subset1.add(node)
        }

        subsets = subsets.filter(set => set !== subset2)
      }
    }

    if (
      Array.from(edges).filter(([n1, n2]) => {
        return getSubset(n1) !== getSubset(n2)
      }).length < 4
    ) {
      break
    }
  }

  return subsets
}

function solution1(input) {
  const lines = formatInput(input)
  const graph = createGraph()

  for (const line of lines) {
    const [node, ...neighbors] = line.replace(':', '').split(' ')

    graph.addNode(node)

    for (const neighbor of neighbors) {
      graph.addNode(neighbor)
      graph.addEdge(node, neighbor)
    }
  }

  const subsets = kargersMinCut(graph)

  return product(subsets.map(set => set.size))
}

// console.log(solution1(data)) // 551196

module.exports = {
  solution1,
}
