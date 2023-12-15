const { solution1, solution2, hash } = require('./')

test('hash', () => {
  expect(hash('HASH')).toEqual(52)
})

const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`

test('solution1', () => {
  expect(solution1(input)).toEqual(1320)
})

test('solution2', () => {
  expect(solution2(input)).toEqual(145)
})
