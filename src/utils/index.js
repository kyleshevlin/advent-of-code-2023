const fs = require('fs')
const path = require('path')

function getInput(dir) {
  return fs.readFileSync(path.resolve(dir, './input.txt'), {
    encoding: 'utf-8',
  })
}

/**
 * Data Structures
 */

function createQueue() {
  const queue = []

  return {
    enqueue(item) {
      queue.push(item)
    },
    dequeue() {
      return queue.shift()
    },
    isEmpty() {
      return queue.length === 0
    },
    peek() {
      return queue[0]
    },
    print() {
      console.log(queue)
    },
  }
}

function createPriorityQueue() {
  const queue = []

  const createQueueElement = (key, priority) => ({ key, priority })

  const result = {
    enqueue(key, priority) {
      const element = createQueueElement(key, priority)
      let added = false

      for (const [idx, item] of queue.entries()) {
        if (element.priority < item.priority) {
          queue.splice(idx, 0, element)
          added = true
          break
        }
      }

      if (!added) queue.push(element)
    },
    dequeue() {
      const item = queue.shift()
      return item?.key
    },
    isEmpty() {
      return queue.length === 0
    },
    print() {
      console.log(queue)
    },
  }

  return result
}

function createStack() {
  const stack = []

  return {
    push(item) {
      stack.push(item)
    },
    pop() {
      return stack.pop()
    },
    isEmpty() {
      return stack.length === 0
    },
    peek() {
      return stack[stack.length - 1]
    },
    print() {
      console.log(stack)
    },
  }
}

const inc = x => x + 1
const dec = x => x - 1
const lessThanOrEqualTo = (x, y) => x <= y
const greaterThanOrEqualTo = (x, y) => x >= y

function createRange(from, to) {
  const result = []

  let change = inc
  let comparison = lessThanOrEqualTo

  const diff = to - from

  if (Math.sign(diff) === -1) {
    change = dec
    comparison = greaterThanOrEqualTo
  }

  let i
  for (i = from; comparison(i, to); i = change(i)) {
    result.push(i)
  }

  return result
}

function traverse(node, visitFn, depth = 0) {
  visitFn(node, depth)

  node.children.forEach(child => traverse(child, visitFn, depth + 1))
}

function createTreeNode(key, meta, parentNode = null) {
  const children = []

  const node = {
    key,
    children,
    meta,
    parentNode,
    addChild(childKey, childMeta) {
      const childNode = createTreeNode(childKey, childMeta, node)
      children.push(childNode)
    },
    findChild(childKey) {
      return node.children.find(child => child.key === childKey)
    },
  }

  return node
}

function createTree(rootKey, meta) {
  const rootNode = createTreeNode(rootKey, meta)

  return {
    rootNode,
    print() {
      let result = ''

      function addKeyToResult(node, depth) {
        const text = `${node.key} ${JSON.stringify(node.meta)}`
        result +=
          result.length === 0 ? text : `\n${' '.repeat(depth * 2)}${text}`
      }

      traverse(rootNode, addKeyToResult)

      console.log(result)

      return result
    },
  }
}

/**
 * Math helpers
 */

const add = (x, y) => x + y

const sum = nums => nums.reduce(add)

const subtract = (x, y) => x - y

const difference = nums => nums.reduce(subtract)

const multiply = (x, y) => x * y

const product = nums => nums.reduce(multiply)

const divide = (x, y) => x / y

const quotient = nums => nums.reduce(divide)

/**
 * Set helpers
 */

function intersection(...sets) {
  return sets.reduce((set1, set2) => {
    const result = new Set()

    for (const item of set2) {
      if (set1.has(item)) {
        result.add(item)
      }
    }

    return result
  })
}

function union(...sets) {
  const result = new Set()

  for (const set of sets) {
    for (const item of set) {
      result.add(item)
    }
  }

  return result
}

function isDisjoint(a, b) {
  for (const item of a) {
    if (b.has(item)) return false
  }

  for (const item of b) {
    if (a.has(item)) return false
  }

  return true
}

function setDifference(a, b) {
  const result = new Set(a)

  for (const item of b) {
    if (result.has(item)) result.delete(item)
  }

  return result
}

/**
 * Functional Programming helpers
 */

// prettier-ignore
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

const map = fn => array => array.map(fn)

const reduce = (reducer, initialArg) => array =>
  array.reduce(reducer, initialArg)

const spread = fn => array => fn(...array)

/**
 * Use this with map to log out the current value next to the message while
 * still returning the value to keep your composition working. Example:
 *
 * ```javascript
 * const result = [1, 2, 3]
 *   .map(double)
 *   .map(trace('after double'))
 *   .reduce(add, 0)
 * ```
 */
const trace = msg => x => (console.log(msg, x), x)

/**
 * Matrix helpers
 */

function transpose(matrix) {
  const result = matrix.map(row => [...row])

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < i; j++) {
      const tmp = result[i][j]

      result[i][j] = result[j][i]
      result[j][i] = tmp
    }
  }

  return result
}

function reverseRows(matrix) {
  return matrix.map(row => [...row].reverse())
}

function rotateClockwise(matrix) {
  return reverseRows(transpose(matrix))
}

function rotateCounterClockwise(matrix) {
  return transpose(reverseRows(matrix))
}

const safeGridGet = (grid, rowIdx, colIdx) => grid[rowIdx]?.[colIdx]

const getManhattanDistance = (x1, y1, x2, y2) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2)

// found online:
// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
function getLineIntersection(line1, line2) {
  const [x1, y1, x2, y2] = line1
  const [x3, y3, x4, y4] = line2

  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) return

  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)

  // Lines are parallel
  if (denominator === 0) return

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return

  const x = x1 + ua * (x2 - x1)
  const y = y1 + ua * (y2 - y1)

  return { x, y }
}

function zip(a, b) {
  const result = []

  while (a.length || b.length) {
    if (a.length) result.push(a.shift())
    if (b.length) result.push(b.shift())
  }

  return result
}

function drawGrid(grid) {
  return `\n${grid.map(row => row.join('')).join('\n')}\n`
}

function findLastIndex(arr, fn) {
  const clone = [...arr].reverse()
  const index = clone.findIndex(fn)

  if (index === -1) return index

  return clone.length - 1 - index
}

/**
 * I'm leaving a note here to my future self: This is a clever, immutable, recursive
 * 1-line version of GCD.
 *
 * The first version I saw looked like this:
 * ```javascript
 * function gcd(a, b) {
 *   let tmp = b
 *
 *   while (b !== 0) {
 *     b = a % b
 *     a = tmp
 *     tmp = b
 *   }
 *
 *   return a
 * }
 * ```
 */
const gcd = (a, b) => (a ? gcd(b % a, a) : b)

const lcm = (a, b) => (a * b) / gcd(a, b)

module.exports = {
  add,
  createPriorityQueue,
  createQueue,
  createRange,
  createStack,
  createTree,
  difference,
  divide,
  drawGrid,
  findLastIndex,
  gcd,
  getInput,
  getLineIntersection,
  getManhattanDistance,
  intersection,
  isDisjoint,
  lcm,
  map,
  multiply,
  pipe,
  product,
  quotient,
  reduce,
  rotateClockwise,
  rotateCounterClockwise,
  safeGridGet,
  setDifference,
  spread,
  subtract,
  sum,
  trace,
  traverse,
  union,
  zip,
}
