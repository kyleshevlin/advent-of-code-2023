const { getInput } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n').map(createBrick)

function createBrick(line) {
  const [point1, point2] = line.split('~')
  const [x1, y1, z1] = point1.split(',').map(Number)
  const [x2, y2, z2] = point2.split(',').map(Number)
  let _z1 = z1
  let _z2 = z2

  const drop = () => {
    _z1 -= 1
    _z2 -= 1
  }

  return {
    drop,
    x1,
    y1,
    get z1() {
      return _z1
    },
    x2,
    y2,
    get z2() {
      return _z2
    },
  }
}

function createBrickStack(bricks) {
  // we'll do stuff to bricks here
  return {
    bricks: bricks.toSorted(
      (a, b) => Math.min(a.z1, a.z2) - Math.min(b.z1, b.z2)
    ),
    drop: () => {
      // somehow make the bricks fall
    },
  }
}

function solution1(input) {
  const bricks = formatInput(input)
  const brickStack = createBrickStack(bricks)

  return brickStack
}

function solution2(input) {}

module.exports = {
  solution1,
  solution2,
}
