const { getData, sum } = require('../utils')

const data = getData(__dirname)

const formatInput = input => input.trim().split('\n')

const isNumber = char => /[0-9]/.test(char)

function solution1(input) {
  const lines = formatInput(input)

  const nums = lines.map(line => {
    const chars = line.split('')
    const first = chars.find(isNumber)
    const second = chars.toReversed().find(isNumber)

    return Number(`${first}${second}`)
  })

  return sum(nums)
}

const WORD_TO_DIGIT = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
}

const coerceToDigit = numOrWord => {
  const num = parseInt(numOrWord, 10)

  if (!isNaN(num)) return num

  return WORD_TO_DIGIT[numOrWord]
}

const strReverse = str => str.split('').toReversed().join('')

function solution2(input) {
  const lines = formatInput(input)

  const nums = lines.map(line => {
    const [first] = line.match(
      /[0-9]|one|two|three|four|five|six|seven|eight|nine|zero/
    )
    const [second] = strReverse(line).match(
      /[0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|orez/
    )

    return Number(`${coerceToDigit(first)}${coerceToDigit(strReverse(second))}`)
  })

  return sum(nums)
}

// console.log(solution1(data)) // 54304

// console.log(solution2(data)) // 54418

module.exports = {
  solution1,
  solution2,
}
