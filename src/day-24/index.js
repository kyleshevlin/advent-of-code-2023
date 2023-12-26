const { getInput, getLineIntersection } = require('../utils')

const data = getInput(__dirname)

const formatInput = input =>
  input
    .trim()
    .split('\n')
    .map(line => line.replace(' @', ',').split(', ').map(Number))

function getIntersections(items) {
  const results = []

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const [x1, y1, , vx1, vy1] = items[i]
      const [x2, y2, , vx2, vy2] = items[j]

      const crossProduct = vx1 * vy2 - vx2 * vy1

      if (crossProduct === 0) continue

      const dx = x2 - x1
      const dy = y2 - y1

      const t1 = (vy2 * dx - vx2 * dy) / crossProduct
      const t2 = (vy1 * dx - vx1 * dy) / crossProduct

      if (t1 < 0 || t2 < 0) continue

      const intersectionX = x1 + t1 * vx1
      const intersectionY = y1 + t1 * vy1

      results.push({ x: intersectionX, y: intersectionY })
    }
  }

  return results
}

function solution1(input, min, max) {
  const stones = formatInput(input)
  const intersections = getIntersections(stones)
  const withinRange = intersections.filter(
    ({ x, y }) => x > min && x < max && y > min && y < max
  )

  return withinRange.length
}

const solution1Min = 200_000_000_000_000
const solution1Max = 400_000_000_000_000

// console.log(solution1(data, solution1Min, solution1Max)) // 26611

function solution2(input) {}

module.exports = {
  solution1,
  solution2,
}
