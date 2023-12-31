const { getInput, sum } = require('../utils')

const data = getInput(__dirname)

const formatInput = input => input.trim().split('\n\n')

const alwaysTrue = () => true

const OP_TO_FN = {
  '>': (x, y) => x > y,
  '<': (x, y) => x < y,
}

const pattern = /(?<key>[a-z]+)(?<op><|>)(?<value>[0-9]+)/

function parseRule(rule) {
  if (!rule.includes(':')) {
    return { op: alwaysTrue, target: rule }
  }

  const [test, target] = rule.split(':')
  const found = test.match(pattern)
  const { key, op, value } = found.groups

  return { key, op: OP_TO_FN[op], value: Number(value), target }
}

function solution1(input) {
  const [workflowBlock, itemsBlock] = formatInput(input)
  const workflows = workflowBlock.split('\n').reduce((acc, line) => {
    const [name, rulesLine] = line.split('{')
    const rules = rulesLine.replace('}', '').split(',').map(parseRule)

    acc[name] = rules
    return acc
  }, {})

  const items = itemsBlock.split('\n').map(line =>
    line
      .replaceAll(/{|}/g, '')
      .split(',')
      .reduce((acc, rating) => {
        const [key, value] = rating.split('=')
        acc[key] = Number(value)
        return acc
      }, {})
  )

  const accepted = []

  items: for (const item of items) {
    let name = 'in'

    // eslint-disable-next-line no-constant-condition
    rules: while (true) {
      const rules = workflows[name]

      for (const rule of rules) {
        const { key, op, value, target } = rule

        if (op(item[key], value)) {
          if (target === 'A') {
            accepted.push(item)
            continue items
          }

          if (target === 'R') {
            continue items
          }

          name = target
          continue rules
        }
      }
    }
  }

  return sum(accepted.flatMap(Object.values))
}

// console.log(solution1(data)) // 398527

function solution2(input) {}

module.exports = {
  solution1,
  solution2,
}
